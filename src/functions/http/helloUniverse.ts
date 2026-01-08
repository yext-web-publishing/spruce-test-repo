import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

export default async function helloUniverse(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { pathParams, queryParams, site } = request;

  return {
    body: "Hello Universe",
    headers: {},
    statusCode: 200,
  };
}
