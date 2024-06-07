import {EventType} from './host.ts';

/** A message used to communicate with the worker. */
export type PluginMessage = InvokeMessage;

/** The result of a `PluginMessage` operation. */
export type PluginResultMessage = InvokeResultMessage;

/**
 * A request to invoke a plugin function.
 *
 * The result will be posted as an `InvokeResultMessage`.
 */
export interface InvokeMessage {
  /** The url of the request that we want to host. */
  url: string;
  /** The json-parsed body of the request.  */
  jsonBody;
  /** A map that stores plugin information for plugin paths. */
  pathToPluginInfo: Map<string, any>
  /** A map that specifies necessary parameters for an event type. */
  eventTypeSpecificParams: Map<EventType, string[]>
  /** A map that stores function files for plugin paths. */
  dynamicImports: Map<string, any>
  /** A json object containing the env vars to set as global variables. **/
  envVars;
}

/**
 * The result of invoking a plugin function.
 */
export interface InvokeResultMessage {
  /** The response from invoking the plugin. Undefined if error.*/
  res: any;
  /** The error string if error occurs. Res is undefined if there is an error. */
  error: string;
  /** The status code from invocation. */
  status: number;
}
