import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";

export default async function TestPlugin(
    request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { pathParams, queryParams, site } = request;
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
    port: chrome.port
  };
  const runnerResult = await lighthouse('https://www.yext.com', options);

// `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;

// `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score);
  console.log('accessibility score was', runnerResult.lhr.categories.accessibility.score);
  console.log('best-practices score was', runnerResult.lhr.categories["best-practices"].score);
  console.log('seo score was', runnerResult.lhr.categories.seo.score);

  chrome.kill();

  return {
    body: reportHtml,
    headers: {'Content-Type': 'text/html'},
    statusCode: 200,
  };
}