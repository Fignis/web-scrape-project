import { scrapperEbay } from "./components/scrape";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Listing } from "./models/listing";
import mongoose from "mongoose";
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const app = express();
const port = process.env.PORT_NUM || 7640;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.get("/scrape", async (req, res, next) => {
  // const formattedEbayRes = await scrapperEbay("Helios44-2");
  //const clHtml = await getClHtml("Takumar");
  //console.log(JSON.stringify(formattedEbayRes, null, 2));

  let listing = new Listing(await scrapperEbay("Helios44-2"));
  /* listing.save((err, dat) => {
    err ? console.log(err) : console.log(dat);
  });*/
  res.send("scrape is finished");
  res.sendStatus(200);
  // console.log("Cl Stuff", formattedClRes);
});

mongoose.connect(process.env.DB_ACCESS, { useCreateIndex: true }, () => {
  console.log("db connected");
});
app.listen(port, () => {
  console.log(`server is running!!: ${port}`);
});
