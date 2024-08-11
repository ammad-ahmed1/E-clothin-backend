const delivery = require("../modals/deliverySchema");
exports.getDeliveryInfo = async (req, res, next) => {
  try {
    const deliveries = await delivery.find();
    res.send(deliveries);
  } catch (error) {
    next(error);
  }
};
exports.updateDeliveryStatus = async (req, res, next) => {
  try {
    const deliveryItem = await delivery.findByIdAndUpdate(
      req.params.id,
      {
        deliveryStatus: req.body.deliveryStatus,
      },
      { new: true }
    );
    if (!deliveryItem) {
      return res.status(404).json({ message: "Delivery Not Found!" });
    }
    res.json(delivery);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteDelivery = async (req, res, next) => {
  try {
    const deleteItem = await delivery.findByIdAndDelete(req.body.id);
    if (!deleteItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.send(deleteItem);
  } catch (error) {
    next(error);
  }
};
