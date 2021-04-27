import mongoose from "mongoose";

const schema = mongoose.Schema;

const etsyListingSchema = new schema({
  title: {
    type: String,
    requried: true,
    unique: false,
  },
  price: {
    type: String,
    required: true,
  },
  shippingInfo: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  imgLink: {
    type: String,
    required: true,
  },
});
var etsyListing = mongoose.model("etsyListing", etsyListingSchema);
export { etsyListing };
