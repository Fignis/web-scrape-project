import mongoose from "mongoose";
const schema = mongoose.Schema;

const cheapListingSchema = new schema({
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
  date: {
    type: Date,
    required: true,
  },
});
var cheapListing = mongoose.model("cheapListing", cheapListingSchema);
export { cheapListing };
