import mongoose from "mongoose";

const schema = mongoose.Schema;

const listingSchema = new schema({
  _id: schema.Types.ObjectId,
  title: {
    type: String,
    requried: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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
});
var Listing = mongoose.model("listing", listingSchema);
export { Listing };
