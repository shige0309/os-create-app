const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
      max: 23,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    descriptionImage: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
