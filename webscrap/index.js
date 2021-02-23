import {
  getHtml,
  getClHtml,
  getEbayPrices,
  formatResults,
} from "./components/scrape";

const go = async () => {
  const htmlData = await getHtml("Basketball");
  const formattedEbayRes = await formatResults(htmlData);

  console.log(formattedEbayRes);
};
go();
