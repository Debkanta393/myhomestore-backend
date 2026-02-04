const Product = require("../module/product-module");
const uploadToCloudinary = require("../utils/cloudinary");

const uploadProduct = async (req, res) => {
  try {
    const { category, type, brand } = req.body;
    // Validate category, type and brand
    if (!category || !type || !brand) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Category, type and brand can't be empty",
        });
    }
    // Upload product
    const product = await Product.create(req.body);
    // Return response
    return res
      .status(200)
      .json({
        success: true,
        message: "Product uploaded successfull.",
        product,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Uploading product failed.",
        erorr: error,
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
    const { id } = req.body;
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
