import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";

export default async function helloWorld(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { pathParams, queryParams, site } = request;

  return {
    body: "Hello World",
    headers: {},
    statusCode: 200,
  };
}