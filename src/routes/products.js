const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:category", productController.getProductsByCategory);
router.put("/:id", productController.updateProduct);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.deleteProductById);

module.exports = router;
