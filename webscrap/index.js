import { getHtml, getEbayPrices, formatResults } from "./lib/scrape";

async function go() {
  const htmlData = await getHtml("Basketball");

  const formattedEbayRes = await formatResults(htmlData);
  console.log(`Here is a list of prices:${formattedEbayRes}.`);
}
go();
