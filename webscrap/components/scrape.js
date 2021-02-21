import axios from "axios";
import cheerio from "cheerio";
const getHtml = async (searchTerm) => {
  try {
    //get the response from the search url
    const { data } = await axios.get(
      `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1311&_nkw=${searchTerm}&_sacat=0&LH_TitleDesc=0&_osacat=3323&_odkw=${searchTerm}`,
      {
        headers: {
          "User-Agent": "Node.js",
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err.response);
  }
};

const getEbayPrices = async (sel) => {
  //Function gets the data i want by using cheerio and finding the paths to the info i need
  const pathForItemInfo = sel.find("div[class='s-item__info clearfix']");
  const title = pathForItemInfo
    .find("a[class='s-item__link']>h3[class='s-item__title']")
    .text()
    .trim();
  const subTitle = pathForItemInfo
    .find("div[class='s-item__subtitle']")
    .text()
    .trim();
  const pathForPriceInfo = sel.find("div[class='s-item__details clearfix']");
  const price = pathForItemInfo
    .find(
      "div[class='s-item__detail s-item__detail--primary'] > span[class='s-item__price']"
    )
    .text()
    .trim();
  const shippingInfo = pathForPriceInfo
    .find("div[class='s-item__detail s-item__detail--primary']")
    .text()
    .trim();

  const link = sel.find("a[class='s-item__link']").attr("href").trim();
  //returns title of ebay listing, subtitle, shipping,price and the link
  return { title, subTitle, price, shippingInfo, link };
};
const formatResults = (data) => {
  //this function formats the results, it maps each result on the search results
  //to the getEbayPrices function which gets all the info we want.
  const sel = cheerio.load(data);
  const results = sel(
    "ul[class='srp-results srp-list clearfix']> li[class='s-item    s-item--watch-at-corner']"
  );

  const mapResults = results
    .map((ind, ele) => {
      const elementselect = sel(ele);
      return getEbayPrices(elementselect);
    })
    .get();
  console.log(mapResults);
};
const getFbHtml = async (searchTerm) => {
  try {
    const { data } = await axios.get(
      `https://www.facebook.com/marketplace/nyc/search/?query=${searchTerm}`
    );
    return data;
  } catch (err) {
    console.log(`error:${response.err}`);
  }
};
export { getHtml, getEbayPrices, formatResults };
