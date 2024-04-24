import {PluginGlobalEnvironment, privilegedPostMessage} from './globals.ts';
import {InvokeMessage, InvokeResultMessage} from './messages.ts';

// executed when the worker is sent a plugin message
onmessage = async (e: MessageEvent<InvokeMessage>) => {
  const url = new URL(e.data.url);

  // decodeURI to allow proper {{var}} matching later on
  const plugin = e.data.pathToPluginInfo.get(decodeURI(url.pathname));
  if (plugin === undefined) {
    const returnMsg: InvokeResultMessage = {res: undefined, error: 'No plugin found for path', status: 400};
    privilegedPostMessage(returnMsg);
    return;
  }

  const eventTypeParams = e.data.eventTypeSpecificParams.get(plugin.eventType);
  if (eventTypeParams === undefined) {
    const returnMsg: InvokeResultMessage = {res: undefined, error: 'Unsupported event type', status: 400};
    privilegedPostMessage(returnMsg);
    return;
  }
  let err = validateParams(e.data.jsonBody, eventTypeParams);
  if (err.error !== undefined) {
    const returnMsg: InvokeResultMessage = {res: undefined, error: err, status: 400};
    privilegedPostMessage(returnMsg);
    return;
  }

  // Set env vars as thread-scoped global variables
  for (const [key, value] of Object.entries(e.data.envVars)) {
    globalThis[key] = value;
  }

  try {
    if (!e.data.dynamicImports.has(plugin.functionFilePath)) {
      const functionFile = await import(plugin.functionFilePath);
      e.data.dynamicImports.set(String(plugin.functionFilePath), functionFile);
    }
  } catch (err) {
    console.log(err);
    const returnMsg: InvokeResultMessage = {res: undefined, error: `Couldn't import function file`, status: 400};
    privilegedPostMessage(returnMsg);
    return;
  }

  // override globals to mimic platform behavior
  // we do this to disallow customer plugins wreaking havoc with global-scoped values and functions
  // however, to return the message from this worker back to the host, we must use the original postMessage
  // function that was on globalThis
  let pluginGlobalEnv = new PluginGlobalEnvironment();
  try {
    pluginGlobalEnv.activate();
  } catch (err) {
    const returnMsg: InvokeResultMessage = {res: undefined, error: `Error applying global overrides: ${err}`, status: 400};
    privilegedPostMessage(returnMsg);
    return;
  }

  const mod = e.data.dynamicImports.get(plugin.functionFilePath);

  if (mod === undefined) {
    const returnMsg: InvokeResultMessage = {res: undefined, error: 'Unable to import mod.ts file', status: 400};
    privilegedPostMessage(returnMsg);
    return;
  }

  try {
    // Execute the plugin
    let res = await mod[String(plugin.functionName)](e.data.jsonBody);
    const returnMsg: InvokeResultMessage = {res: res, error: undefined, status: 200};
    privilegedPostMessage(returnMsg);
    return;
  } catch (err) {
    console.log(err);
    const returnMsg: InvokeResultMessage = {res: undefined, error: `Error running plugin`, status: 400};
    privilegedPostMessage(returnMsg);
    return;
  }
};

// validateParams ensures that the jsonBody contains the parameters necessary to run the plugin
// note: need to redefine in worker.ts, otherwise EOF error
function validateParams(jsonBody: any, params: string[]): any {
  for (let i = 0; i < params.length; i++) {
    if (jsonBody[params[i]] === undefined) {
      return {error: `Request body is missing: ${params[i]}`};
    }
  }
  return {};
}
