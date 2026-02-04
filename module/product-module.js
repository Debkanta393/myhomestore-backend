const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    category: {
      type: String,
      require: true,
      index: true,
    },
    type: {
      type: String,
      require: true,
      index: true,
    },
    brand: {
      type: String,
      require: true,
      index: true,
    },
    productImage: [
      {
        url: String,
        public_id: String,
      },
    ],
    functionsImage: [
      {
        url: String,
        public_id: String,
      },
    ],
    range: String,
    productName: String,
    description: [String],
    productDetails: String,
    sku: String,
    thikness: String,
    petfriendly: String,
    waterresistant: String,
    scratchresistant: String,
    color: [String],
    pattern: String,
    dimensions: String,
    packsize: String,
    brochurelink: String,
  },
  { timestamps: true },
);

const Product = model("Product", productSchema);
module.exports = Product;
