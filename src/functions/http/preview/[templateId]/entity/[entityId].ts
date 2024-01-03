import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import fetch from 'node-fetch';

export default async function generatePreview(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { pathParams, queryParams, site } = request;

  console.log(site)

  const templateId = pathParams['templateId']
  const entityId = pathParams['entityId']

  const entityResponse = await fetch(`https://sbx-api.yextapis.com/v2/accounts/me/sites/${site.siteId}/fetchentitydocument?entityId=${entityId}&templateId=${templateId}&deploymentId=${site.deployId}&api_key=1180012a82bbd5acd01414744612c3df&v=20230601`);
  const entityJson = await entityResponse.json();
  const entityData = entityJson.response.document

  const generateResponse = await fetch(`https://sbx-api.yextapis.com/v2/accounts/me/sites/${site.siteId}/generatepagecontent?templateId=${templateId}&deploymentId=${site.deployId}&api_key=1180012a82bbd5acd01414744612c3df&v=20161012`, 
    {method: 'POST', body: JSON.stringify(entityData), headers: {'Content-Type': 'application/json'}});
  const generateJson = await generateResponse.json();

  const html = generateJson.response.content as string
  const htmlWithCorrectPath = html.replaceAll('../', '../../../')

  console.log("done")

  return {
    body: htmlWithCorrectPath,
    headers: {'Content-Type': 'text/html'},
    statusCode: 200,
  };
}