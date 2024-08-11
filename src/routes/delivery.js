const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");

router.get("/", deliveryController.getDeliveryInfo);
router.put("/:id", deliveryController.updateDeliveryStatus);
// router.get("/:id", productController.getProductById);
router.delete("/", deliveryController.deleteDelivery);

module.exports = router;
