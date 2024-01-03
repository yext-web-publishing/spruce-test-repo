import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import fetch from 'node-fetch';

export default async function generatePreview(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { pathParams, queryParams, site } = request;

  const { templateId, entityId, suggestionId } = pathParams

  // fetch entity data
  const entityResponse = await fetch(`https://sbx-api.yextapis.com/v2/accounts/me/sites/${site.siteId}/fetchentitydocument?entityId=${entityId}&templateId=${templateId}&deploymentId=${site.deployId}&editIds=${suggestionId}&api_key=1180012a82bbd5acd01414744612c3df&v=20230601`);
  const entityJson = await entityResponse.json();
  const entityData = entityJson.response.document

  // generate page preview
  const generateResponse = await fetch(`https://sbx-api.yextapis.com/v2/accounts/me/sites/${site.siteId}/generatepagecontent?templateId=${templateId}&deploymentId=${site.deployId}&api_key=1180012a82bbd5acd01414744612c3df&v=20161012`, 
    {method: 'POST', body: JSON.stringify(entityData), headers: {'Content-Type': 'application/json'}});
  const generateJson = await generateResponse.json();

  const html = generateJson.response.content as string
  // replace relative path
  const htmlWithCorrectPath = html.replaceAll('../', '../../../')

  return {
    body: htmlWithCorrectPath,
    headers: {'Content-Type': 'text/html'},
    statusCode: 200,
  };
}