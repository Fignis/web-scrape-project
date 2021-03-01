import { scrapperEbay /*, formatCl, getClHtml*/ } from "./components/scrape";

const go = async () => {
  const formattedEbayRes = await scrapperEbay("Takumar");
  //const clHtml = await getClHtml("Takumar");
  const formattedClRes = formatCl(clHtml);
  console.log(JSON.stringify(formattedEbayRes, null, 2));
  // console.log("Cl Stuff", formattedClRes);
};
go();
