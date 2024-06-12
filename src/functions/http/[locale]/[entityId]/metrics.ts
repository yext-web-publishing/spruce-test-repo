import {PagesHttpRequest, PagesHttpResponse, Site} from "@yext/pages/*";

export default async function GetMetrics(
  request: PagesHttpRequest
): Promise<PagesHttpResponse> {
  const { pathParams, site } = request;
  const url = setUpQuery(pathParams, site);
  const results = {
    'site': '',
    'performance': '',
    'accessibility': '',
    'seo': '',
    'best-practices': '',
  };
  await fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
      // to learn more about each of the properties in the response object.
      results['site'] = json.id
      const lighthouse = json.lighthouseResult;
      results['performance'] = lighthouse.categories['performance'].score
      results['accessibility'] = lighthouse.categories['accessibility'].score
      results['seo'] = lighthouse.categories['seo'].score
      results['best-practices'] = lighthouse.categories['best-practices'].score
    });

  return {
    body: JSON.stringify(results),
    headers: {},
    statusCode: 200,
  };
}

function setUpQuery(pathParams: { [key: string]: string }, site: Site) {
  const api: string = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

  console.log(site)

  // Define the parameters with proper types
  const parameters: { [key: string]: string[] } = {
    url: [encodeURIComponent(`https://ruggedly-intensive-dinosaur.pgsdemo.com/${pathParams.locale}/${pathParams.entityId}`)],
    category: ['performance', 'accessibility', 'seo', 'best-practices'],
  };

  let query: string = `${api}?`;
  let queryParams: string[] = [];

  // Iterate over the keys of the parameters object
  for (let key in parameters) {
    // Iterate over the actual values in each key's array
    for (let value of parameters[key]) {
      queryParams.push(`${key}=${value}`);
    }
  }

  query += queryParams.join('&');
  console.log(query);
  return query;
}
