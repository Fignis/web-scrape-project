import { scrapperEbay } from "./components/scrape";

const go = async () => {
  const formattedEbayRes = await scrapperEbay("Helios44-2");
  console.log(`here are the results: ${formattedEbayRes}`);
};
go();
