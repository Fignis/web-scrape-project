import { scrapperEbay } from "./components/scrape";
import express from "express";
import morgan from "morgan";
import { Listing } from "./models/listing";
import mongoose from "mongoose";
import path from "path";
import { etsyScraper } from "./components/scrape";
import { cheapListing } from "./models/cheapListing";
import { etsyListing } from "./models/etsyListing";

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const app = express();
const port = process.env.PORT_NUM || 3333;

app.use(express.json());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

//gets the searchterm from the frontend
app.post("/api/st", (req, res) => {
  const { searchTerm } = req.body;
  const stringSearchTerm = searchTerm;
  console.log(stringSearchTerm);
  userSearchTerm = stringSearchTerm;
});
let userSearchTerm = "";

//this gets executed when the user gets to the endpoint of /scrape
app.get("/api/scrape", async (req, res) => {
  try {
    const [ebayData, etsyData] = await Promise.all([
      scrapperEbay(userSearchTerm),
      etsyScraper(userSearchTerm),
    ]);
    console.log(ebayData);
    // const formattedEbayRes = await scrapperEbay(userSearchTerm);
    const formattedEbayRes = ebayData;
    // const formattedEtsyRes = await etsyScraper(userSearchTerm);
    const formattedEtsyRes = etsyData;
    const dbc = mongoose.connection;

    /* NOTES 3/8/21
getting first document from listing collection and saving to another collection to
be tracked later. 
this will be apart of a new function of the web app which allows the user to save searches
so if the user saves a search the first record in the listings collection will be saved
and executed continously in order to track the lowest price over time of that saved item.
*/
    // const firstDoc = Listing.findOne({});
    // const cheapList = new cheapListing({
    //   title: firstDoc.title,
    //   price: firstDoc.price,
    //   link: firstDoc.link,
    //   shippingInfo: firstDoc.link,
    // });

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
    const makeEtsyListing = ({ title, price, shippingInfo, link, imgLink }) => {
      etsyListing.count(
        {
          title: title,
        },
        (err, test) => {
          if (test === 0) {
            let eListing = new etsyListing({
              title: title,
              price: price,
              shippingInfo: shippingInfo,
              link: link,
              imgLink: imgLink,
            });
            eListing.save((err, doc) => {
              err ? console.log(err) : console.log(doc);
            });
          }
        }
      );
    };
    formattedEtsyRes.forEach((ele) => {
      makeEtsyListing(ele);
    });
  } catch (err) {
    console.log(err);
  }
  res.redirect("/api/data");
});

//gets db data and sends to /data endpoint
app.get("/api/data", async (req, res) => {
  try {
    const ebayListData = await Listing.find().sort({ price: 1 }).exec();

    const etsyListData = await etsyListing.find().sort({ price: 1 }).exec();

    res.send([ebayListData, etsyListData]);
  } catch (err) {
    console.log(err);
  }
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
