import mongoose from "mongoose";

const schema = mongoose.Schema;

const listingSchema = new schema({
  _id: schema.Types.ObjectId,
  title: {
    type: String,
    requried: true,
    unique: true,
  },
  subtitle: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
});
export { listing };
