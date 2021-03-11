import mongoose from "mongoose";

const schema = mongoose.Schema;

const listingSchema = new schema({
  title: {
    type: String,
    requried: true,
    unique: false,
  },
  subtitle: {
    type: String,
    required: true,
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
var Listing = mongoose.model("listing", listingSchema);
export { Listing };
