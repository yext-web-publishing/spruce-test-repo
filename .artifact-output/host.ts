import {serve} from 'https://deno.land/std@0.125.0/http/server.ts';

import {PluginMessage, PluginResultMessage} from './messages.ts';

let dynamicImports = new Map<string, any>();
let pathToPluginInfo = new Map<string, any>();
let envVars;

// define different plugin event types
export enum EventType {
  Event_UNKNOWN_EVENT,
  Event_ON_URL_CHANGE,
  Event_ON_PAGE_GENERATE,
  Event_API,
}

// define parameters necessary to upload plugin info
const requiredUploadPluginInfoParams: string[] = [
  'pathToPluginInfo',
];

// define parameters that are required for every plugin
const requiredParamsPerPlugin: string[] = [
  'functionFilePath',
  'functionName',
  'eventType',
];

// define parameters used for each event type
const eventTypeSpecificParams = new Map<EventType, string[]>([
  // keep this in sync with gocode/src/yext/publish/sitesplugins/pkg/onpagegenerate/onurlchange/arguments.go
  [EventType.Event_ON_PAGE_GENERATE, [
    'feature',
    'streamOutput',
    'site',
  ]],
  // keep this in sync with gocode/src/yext/publish/sitesplugins/pkg/pluginarguments/onurlchange/arguments.go
  [EventType.Event_ON_URL_CHANGE, [
    'url',
    'entityId',
    'locale',
    'feature',
    'path',
    'domains',
    'site',
  ]],
  // keep this in sync with gocode/src/yext/consumerweb/serving/pkg/plugin/plugin.go#PluginRequestJson
  [EventType.Event_API, [
    'userAgent',
    'headers',
    'method',
    'body',
    'site',
    'queryParams',
    'pathParams',
    'referrer',
    'referrerPolicy',
    'url',
    'cache',
  ]],
  [EventType.Event_UNKNOWN_EVENT, []],
]);

// handle the incoming http request
async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  if (url.pathname == '/status') {
    return returnResponse(JSON.stringify({status: 'Healthy'}), 200);
  } else if (url.pathname == '/uploadPluginInfo' && req.body) {
    const body = await req.text();
    let jsonBody = JSON.parse(body);
    let err = validateParams(jsonBody, requiredUploadPluginInfoParams);
    if (err.error !== undefined) {
      return returnResponse(JSON.stringify(err), 400);
    }

    for (const [path, pluginInfo] of Object.entries(jsonBody.pathToPluginInfo)) {
      let err = validateParams(pluginInfo, requiredParamsPerPlugin);
      if (err.error !== undefined) {
        return returnResponse(JSON.stringify(err), 400);
      }
      pathToPluginInfo.set(path, pluginInfo);
    }
    return returnResponse(JSON.stringify({status: 'Uploaded plugin info'}), 200);
  } else if (url.pathname == '/uploadEnvironmentVariables' && req.body) {
    const body = await req.text();
    let jsonBody = JSON.parse(body);
    envVars = jsonBody;

    for (const [key, value] of Object.entries(jsonBody)) {
      globalThis[key] = value;
    }
    return returnResponse(JSON.stringify({status: 'Uploaded environment variables'}), 200);
  }
  // if none of the above paths are matched, attempt to find execute a plugin matching this request url

  // create a worker: we do this to mimic the plugin server execution context. plugin server also uses workers which
  // by definition don't have access to window/DOM.
  const worker = createWorker();

  // parse jsonBody, which contains the parameters used for the plugin
  let jsonBody = {};
  if (req.body) {
    const body = await req.text();
    jsonBody = JSON.parse(body);
  }

  // create message to send to the worker, note that we cannot directly make the req an attribute of the msg
  const msg: PluginMessage = {
    url: req.url,
    jsonBody: jsonBody,
    pathToPluginInfo: pathToPluginInfo,
    eventTypeSpecificParams: eventTypeSpecificParams,
    dynamicImports: dynamicImports,
    envVars: envVars,
  };

  // create resolver. we will use this to resolve the promise from the worker message handler
  let resolver: any = undefined;
  // create result variable. the promise will write to this after the main thread's
  // worker message handler is invoked
  let result: any = undefined;
  // create promise. we will await this in the main thread and resolve it in the message handler
  const messagePromise = new Promise(resolve => resolver = resolve);

  // establish onmessage handler for worker - this code will be invoked when
  // the worker calls postMessage, sending information back to the main thread
  worker.onmessage = async ({data: payload}: {data: any}) => {
    result = payload;
    worker.onmessage = null;
    resolver?.();
  };

  // send message to worker
  worker.postMessage(msg);

  // wait for the promise to be resolved in the message handler
  await messagePromise;

  return returnWorkerResponse(result);
}

// validateParams ensures that the jsonBody contains the parameters necessary to run the plugin
export function validateParams(jsonBody: any, params: string[]): any {
  for (let i = 0; i < params.length; i++) {
    if (jsonBody[params[i]] === undefined) {
      return {error: `Request body is missing: ${params[i]}`};
    }
  }
  return {};
}

// returnResponse returns a new response with a given body and status (2xx, 4xx, etc.)
export function returnResponse(body: string, status: number): Response {
  return new Response(body, {
    status: status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  });
}

// returnWorkerResponse takes the result message from the worker and returns a response with its body populated with
// either an error or the successful plugin response.
export function returnWorkerResponse(responseMessage: PluginResultMessage): Response {
  let responseBody: any;
  if (responseMessage.error !== undefined) {
    responseBody = responseMessage.error;
  } else {
    responseBody = responseMessage.res;
  }
  return new Response(JSON.stringify(responseBody), {
    status: responseMessage.status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
  });
}

// creates a new plugin worker
function createWorker() {
  return new Worker(new URL('worker.ts', import.meta.url), {
    'type': 'module',
  });
}


serve(handler, {port: 4243});
