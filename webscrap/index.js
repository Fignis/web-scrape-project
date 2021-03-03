import { scrapperEbay /*, formatCl, getClHtml*/ } from "./components/scrape";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import listing from "./models/listing";

const app = express();
const port = process.env.PORT_NUM || 7640;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.get("/scrape", async (req, res, next) => {
  const formattedEbayRes = await scrapperEbay("Takumar");
  //const clHtml = await getClHtml("Takumar");
  //console.log(JSON.stringify(formattedEbayRes, null, 2));
  res.json(formattedEbayRes, 2);
  res.end();
  // console.log("Cl Stuff", formattedClRes);
});

app.listen(port, () => {
  console.log(`server is running!!: ${port}`);
});

var listing = new listing(formattedEbayRes);
