const exporess = require("express");
const {
  uploadProduct,
  getAllProduct,
  getProductById,
  getProductByTypeAndName,
  getProductByType,
  getProductByBrand,
  deleteProduct,
} = require("../controller/product-controller");

const router = exporess.Router();

router.post("/product/uploadProduct", uploadProduct);
router.get("/product/getallProduct", getAllProduct);
router.post("/product/getProductById/:id", getProductById);
router.post("/product/getProductbyTypeName", getProductByTypeAndName);
router.post("/product/getProductbyType", getProductByType);
router.post("/product/getProductbyBrand", getProductByBrand);
router.post("/product/deleteProduct", deleteProduct);

module.exports = router;
