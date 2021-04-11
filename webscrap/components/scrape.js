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
  const imgLink = $.find("img[class='s-item__image-img']").attr("src").trim();
  //returns title of ebay listing, subtitle, shipping,price and the link
  return { title, subTitle, price, shippingInfo, link, imgLink };
};
const formatResults = (data) => {
  //this function formats the results, it maps each result on the search results
  //to the getEbayPrices function which gets all the info we want.
  const $ = cheerio.load(data);

  const results = $(
    "ul[class='srp-results srp-list clearfix']>li[class='s-item      s-item--watch-at-corner']"
  );

  const mapResults = results.map((index, ele) => {
    const eleSelect = $(ele);
    return getEbayPrices(eleSelect);
  });

  //after mapping the results to a new array.
  //get() gets the array from the cheerio object it extracts it.
  //this filters out all the blank entries without titles.
  const filtrResults = mapResults.get().filter((result) => result.title !== "");

  return filtrResults;
  // return cheerioConvertedRes;
};

const scrapperEbay = async (
  searchTerm,
  newUrl = `https://www.ebay.com/sch/i.html?_from=R40&_nkw=${searchTerm}&_sacat=0&LH_BIN=1&_sop=15&_pgn=1`
) => {
  //fetch data with inputed searchterm
  const htmlData = await getHtml(newUrl);

  //format the data
  const displayedResults = formatResults(htmlData);

  // const numberOfAllResults = +displayedResults.length;

  //recursion:
  //when to stop the recursion
  /*A temporary fix I will limit the number of results 3/5/21 */

  const numberOfCurrentPg = parseInt(newUrl.match(/pgn=(\d+)$/)[1], 10);

  if (numberOfCurrentPg == 3) {
    /*----update 3/5/21 ----*/
    //to limit number of results I've implemented a page cap because it does not make sense to get all the results from a search for this project.

    //if the number of results on page is equal to 0 stop and return displayedResults
    console.log(`inital/terminate: ${displayedResults.length}`);
    return displayedResults;
  } else {
    //cut the page number off the link and convert to an int
    const numberOfNextPage = parseInt(newUrl.match(/pgn=(\d+)$/)[1], 10) + 1;
    //make a new link with the new page number
    const nextPage = `https://www.ebay.com/sch/i.html?_from=R40&_nkw=${searchTerm}&_sacat=0&LH_BIN=1&_sop=15&_pgn=${numberOfNextPage}`;
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

/*Etsy*/
const etsyScraper = async (
  searchTerm,
  url = `https://www.etsy.com/search?q=${searchTerm}&page=1&ref=pagination`
) => {
  const etsyHtml = getHtml(url);
  const etsyResults = formatEtsyRes(etsyHtml);
};

const formatEtsyRes = (data) => {
  const $ = cheerio.load(data);
  const etsyResults = $(
    'ul[class="wt-grid wt-grid--block wt-pl-xs-0 tab-reorder-container"]'
  );
  const mapEtsyResults = etsyResults.map((listing) => {
    const selListing = $(listing);
    return getEtsyPrices(selListing);
  });
  return mapEtsyResults.get();
};

const getEtsyPrices = ($) => {
  const etsyTitle = $.find(
    "h3[class='wt-mb-xs-0 wt-text-truncate wt-text-caption']"
  )
    .text()
    .trim();
  const etsyPrice = $.find("p[class='wt-text-title-01']").text().trim();
  const etsyShipping = $.find(
    "span[class='wt-badge wt-badge--small wt-badge--sale-01']"
  )
    .text()
    .trim();
  const etsyLink = $.find("a[class='listing-link']").attr("href").trim();
  const etsyImgLink = $.find(
    'img[class="wt-width-full wt-height-full wt-display-block wt-position-absolute loaded"]'
  )
    .attr("src")
    .trim();

  return { etsyTitle, etsyPrice, etsyShipping, etsyLink, etsyImgLink };
};
export { scrapperEbay /*formatCl, getClHtml*/ };
