import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summery: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      _id: String,
      url: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", BlogSchema);
