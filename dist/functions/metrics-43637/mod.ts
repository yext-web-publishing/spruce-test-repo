async function GetMetrics(request) {
  const { pathParams, site } = request;
  const url = setUpQuery(pathParams, site);
  const results = {
    "site": "",
    "performance": "",
    "accessibility": "",
    "seo": "",
    "best-practices": ""
  };
  await fetch(url).then((response) => response.json()).then((json) => {
    console.log(json);
    results["site"] = json.id;
    const lighthouse = json.lighthouseResult;
    results["performance"] = lighthouse.categories["performance"].score;
    results["accessibility"] = lighthouse.categories["accessibility"].score;
    results["seo"] = lighthouse.categories["seo"].score;
    results["best-practices"] = lighthouse.categories["best-practices"].score;
  });
  return {
    body: results,
    headers: {},
    statusCode: 200
  };
}
function setUpQuery(pathParams, site) {
  const api = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  console.log(site);
  const parameters = {
    url: [encodeURIComponent(`https://${pathParams.url}`)],
    category: ["performance", "accessibility", "seo", "best-practices"]
  };
  let query = `${api}?`;
  let queryParams = [];
  for (let key in parameters) {
    for (let value of parameters[key]) {
      queryParams.push(`${key}=${value}`);
    }
  }
  query += queryParams.join("&");
  console.log(query);
  return query;
}
export {
  GetMetrics as default
};
