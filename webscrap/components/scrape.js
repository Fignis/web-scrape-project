import axios from "axios";
import cheerio from "cheerio";

const getHtml = async (url) => {
  try {
    //get the response from the search url
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Node.js",
      },
    });

    return data;
  } catch (err) {
    console.log(err.response);
  }
};

const getEbayPrices = ($) => {
  //Function gets the data i want by using cheerio and finding the paths to the info i need
  const pathForItemInfo = $.find("div[class='s-item__info clearfix']");
  const title = pathForItemInfo
    .find("a[class='s-item__link']>h3[class='s-item__title']")
    .text()
    .trim();
  const subTitle = pathForItemInfo
    .find("div[class='s-item__subtitle']")
    .text()
    .trim();
  const pathForPriceInfo = $.find("div[class='s-item__details clearfix']");
  const price = pathForItemInfo
    .find(
      "div[class='s-item__detail s-item__detail--primary'] > span[class='s-item__price']"
    )
    .text()
    .trim();
  const shippingInfo = pathForPriceInfo
    .find(
      "div[class='s-item__detail s-item__detail--primary']> span[class='s-item__shipping s-item__logisticsCost']"
    )
    .text()
    .trim();

  const link = $.find("a[class='s-item__link']").attr("href").trim();
  //returns title of ebay listing, subtitle, shipping,price and the link
  return { title, subTitle, price, shippingInfo, link };
};
const formatResults = (data) => {
  //this function formats the results, it maps each result on the search results
  //to the getEbayPrices function which gets all the info we want.
  const $ = cheerio.load(data);
  const results = $(
    "ul[class='srp-results srp-list clearfix']> li[class='s-item    s-item--watch-at-corner']"
  );
  const mapResults = results.map((index, ele) => {
    const elementselect = $(ele);
    return getEbayPrices(elementselect);
  });

  //after mapping the results to a new array.
  //get() gets the array from the cheerio object it extracts it.
  const numberOfResults = mapResults.length - 1;
  const cheerioConvertedRes = mapResults.get();
  return mapResults.get();
  // return cheerioConvertedRes;
};

const scrapperEbay = async (
  searchTerm,
  newUrl = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1311&_nkw=${searchTerm}&_sacat=0&LH_TitleDesc=0&_pgn=1`
) => {
  //fetch data with inputed searchterm
  const htmlData = await getHtml(newUrl);
  //format the data
  const displayedResults = formatResults(htmlData);
  const numberOfAllResults = +displayedResults.length;

  //recursion:
  //when to stop the recursion
  if (displayedResults.length < 1) {
    //if the number of results on page is equal to 0 stop and return displayedResults
    console.log(`inital/terminate: ${displayedResults.length}`);
    return displayedResults;
  } else {
    //cut the page number off the link and convert to an int
    const numberOfNextPage = parseInt(newUrl.match(/pgn=(\d+)$/)[1], 10) + 1;
    //make a new link with the new page number
    const nextPage = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1311&_nkw=${searchTerm}&_sacat=0&LH_TitleDesc=0&_pgn=${numberOfNextPage}`;
    //add the next page results to current page results.
    const combinedRes = displayedResults.concat(
      await scrapperEbay(searchTerm, nextPage)
    );
    console.log(`scrapping: ${newUrl}`);

    return combinedRes;
  }
};

const getKehData = () => {};

//Craigslist section
/*
const getClHtml = async (searchTerm) => {
  try {
    const { data } = await axios.got.get(
      `https://newyork.craigslist.org/d/for-sale/search/sss?query=${searchTerm}&sort=rel`
    );
    return data;
  } catch (err) {
    console.log(`Cl-error:${err}`);
  }
};
const getClprices = ($) => {
  const indvidClSearchRes = $.find('ul[class="row"]> li[class="result-row"]')
    .text()
    .trim();
  const clPrice = $.find('a >span[class="result-price"]').text().trim();
  const clTitle = $.find('h3[class="result-heading "]> a').text().trim();
  const clLink = $.find('h3[class= "result-heading"]> a')
    .attr("href")
    .text()
    .trim();

  return { clTitle, clPrice, clLink };
};
const formatCl = (data) => {
  const $ = cheerio.load(data);
  const clResults = $('ul[class="row"]>li[class="result-row"]');
  const mappedClRes = clResults.map((ind, res) => {
    const indivClRes = $(res);
    return getClprices(indivClRes);
  });
  return mappedClRes.get();
};
*/
export { scrapperEbay /*formatCl, getClHtml*/ };
