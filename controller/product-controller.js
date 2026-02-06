const Product = require("../module/product-module");
const uploadToCloudinary = require("../utils/cloudinary");

const uploadProduct = async (req, res) => {
  try {
    let {
      category,
      type,
      brand,
      specifications,
      thickness,
      pattern,
      color,
      productName,
      description,
      sku,
      price,
      range,
      productDetails,
      petfriendly,
      waterresistant,
      scratchresistant,
    } = req.body;

    if (!category || !type || !brand) {
      return res.status(400).json({
        success: false,
        message: "Category, type and brand can't be empty",
      });
    }

    if (typeof specifications === "string") {
      specifications = JSON.parse(specifications);
    }

    const productImages = req.files?.productImage || [];
    const functionsImages = req.files?.functionsImage || [];

    if (!productImages.length) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const [uploadedProductImages, uploadedFunctionsImages] = await Promise.all([
      Promise.all(
        productImages.map((file) =>
          uploadToCloudinary(file.buffer, "Product/images"),
        ),
      ),
      Promise.all(
        functionsImages.map((file) =>
          uploadToCloudinary(file.buffer, "Product/function-images"),
        ),
      ),
    ]);

    const product = await Product.create({
      category,
      type,
      brand,
      thickness,
      pattern,
      color,
      productName,
      description,
      sku,
      price,
      range,
      productDetails,
      petfriendly,
      waterresistant,
      scratchresistant,
      specifications,
      productImage: uploadedProductImages,
      functionsImage: uploadedFunctionsImages,
    });

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Uploading product failed",
      error: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

    return res
      .status(200)
      .json({ success: true, message: "All product fetched", products });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Procuct id:", id);
    const products = await Product.findById(id);

    return res
      .status(200)
      .json({ success: true, message: "All product fetched", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProductByTypeAndName = async (req, res) => {
  try {
    const { type, productName } = req.body;
    console.log(req.body);

    // Filter
    const filter = {};
    if (type) filter.type = type;
    if (productName) filter.productName = productName;

    // Filter by type
    const product = await Product.find(filter);

    console.log(product);
    // Return response
    return res.status(200).json({
      success: true,
      message: "Product fetch successfull",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProductByType = async (req, res) => {
  try {
    const { type } = req.body;

    // Filter by type
    const product = await Product.find({ type });

    // Return response
    return res.status(200).json({
      success: true,
      message: "Product fetch successfull",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProductByBrand = async (req, res) => {
  try {
    const { brand } = req.body;

    // Filter by type
    const product = await Product.find({ brand });

    // Return response
    return res.status(200).json({
      success: true,
      message: "Product fetch successfull",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteProduct = (req, res) => {
  try {
    // Get product type or brand
    const { type, brand } = req.body;

    // Filter
    const filter = {};
    if (type) filter.type = type;
    if (brand) filter.brand = brand;

    // Delete product
    const product = Product.deleteOne({ filter });

    // Return response
    return res.status(200).json({
      success: true,
      message: "Product delete successfully",
      data: product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Product delete failed" });
  }
};

module.exports = {
  uploadProduct,
  getAllProduct,
  getProductById,
  getProductByTypeAndName,
  getProductByType,
  getProductByBrand,
  deleteProduct,
};
