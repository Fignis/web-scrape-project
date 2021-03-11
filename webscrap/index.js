import { scrapperEbay } from "./components/scrape";
import express from "express";
import cors from "cors";
import { Listing } from "./models/listing";
import mongoose from "mongoose";
import path from "path";
import { cheapListing } from "./models/cheapListing";

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const app = express();
const port = process.env.PORT_NUM || 7640;
app.use(express.json());
app.use(cors());
//this gets executed when the user gets to the endpoint of /scrape
app.get("/scrape", async () => {
  const formattedEbayRes = await scrapperEbay("Helios44-2");

  const dbc = mongoose.connection;
  /* NOTES 3/8/21
getting first document from listing collection and saving to another collection to
be tracked later. 
this will be apart of a new function of the web app which allows the user to save searches
so if the user saves a search the first record in the listings collection will be saved
and executed continously in order to track the lowest price over time of that saved item.
*/

  const firstDoc = Listing.findOne({});
  const cheapList = new cheapListing({
    title: firstDoc.title,
    price: firstDoc.price,
    link: firstDoc.link,
    shippingInfo: firstDoc.link,
  });
  //saves the first listing which is the lowest priced one;
  /*doesnt work for now 
  const getFirstListing = (firstDoc) => {
    dbc.collection("cheapListing").insertOne(cheapList, (err, doc) => {
      if (err) {
        console.log(err);
      }
      {
        return doc;
      }
    });
  };
*/

  // this clears the collection first to save space.
  dbc.collection("listings").deleteMany({});
  //this function makes a new listing for every listing that is passed in.
  const makeNewListing = ({
    title,
    price,
    shippingInfo,
    subTitle,
    link,
    imgLink,
  }) => {
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
            imgLink: imgLink,
          });

          listing.save((err, doc) => {
            err ? console.log(err) : console.log(doc);
          });
        }

        console.log(err);
      }
    );
  };
  /*this loop ensures that the function executes itself over and over until there are no
  elements left in the formattedEbayResults array.
  */
  formattedEbayRes.forEach((ele) => {
    makeNewListing(ele);
  });

  // console.log("Cl Stuff", formattedClRes);
});

//this starts up the db on a specific port.
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
