import { scrapperEbay } from "./components/scrape";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Listing } from "./models/listing";
import mongoose from "mongoose";
import path, { format } from "path";
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const app = express();
const port = process.env.PORT_NUM || 7640;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/scrape", async (req, res, next) => {
  const formattedEbayRes = await scrapperEbay("Helios44-2");
  //const clHtml = await getClHtml("Takumar");
  //console.log(JSON.stringify(formattedEbayRes, null, 2));

  const [{ title, price, shippingInfo, subTitle, link }] = formattedEbayRes;
  const makeNewListing = () => {
    Listing.count(
      {
        title: title,
      },
      (err, test) => {
        if (test === 0) {
          let listing = new Listing({
            title: title,
            price: price,
            link: link,
            shippingInfo: shippingInfo,
            subtitle: subTitle,
          });

          listing.save((err, doc) => {
            err ? console.log(err) : console.log(doc);
          });
        }
        console.log(err);
      }
    );
  };
  /* formattedEbayRes.forEach((ele) => {
    makeNewListing;
  });*/

  // console.log("Cl Stuff", formattedClRes);
});

mongoose.connect(
  process.env.DB_ACCESS,
  { useCreateIndex: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);
app.listen(port, () => {
  console.log(`server is running!!: ${port}`);
});
