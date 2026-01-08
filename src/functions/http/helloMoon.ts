import { PagesHttpRequest, PagesHttpResponse } from "@yext/pages/*";

export default async function helloMoon(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { pathParams, queryParams, site } = request;

  return {
    body: "Hello Moon",
    headers: {},
    statusCode: 200,
  };
}
