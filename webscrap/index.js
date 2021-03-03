import { scrapperEbay /*, formatCl, getClHtml*/ } from "./components/scrape";
import express from "express";
const app = express();
const port = process.env.PORT_NUM || 7640;
app.get("/scrape", async (req, res, next) => {
  const formattedEbayRes = await scrapperEbay("Takumar");
  //const clHtml = await getClHtml("Takumar");
  const formattedClRes = formatCl(clHtml);
  console.log(JSON.stringify(formattedEbayRes, null, 2));
  res.json(formattedEbayRes);
  // console.log("Cl Stuff", formattedClRes);
});

app.listen(port, () => {
  console.log(`server is running!!: ${port}`);
});
