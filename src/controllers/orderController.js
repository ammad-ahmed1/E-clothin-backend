const Delivery = require("../modals/deliverySchema");
const Order = require("../modals/ordersSchema");
const Product = require("../modals/productsSchema");
//is validMongoid

//------------------create order--------------------
exports.createOrder = async (req, res, next) => {
  try {
    const {
      //product,
      //customer,
      productId,
      shippingAddress,
      size,
      quantity,
      price,
      totalBill,
    } = req.body;
    const product = await Product.findById(req.body.productId);
    console.log(req.body.productId);
    if (!product) {
      return res.status(404).send("Product not found!");
    }
    console.log(product);
    let calPrice = product.salePrice * req.body.quantity;
    let productUnitSalePrice = product.salePrice;
    //now do updations in product
    product.quantity = product.quantity - quantity;
    product.profit =
      product.salePrice * quantity - product.costPrice * quantity;
    await product.save();
    const order = new Order({
      //products: req.body.productId,
      //customer: req.body.shippingAddress,
      unitSalePrice: productUnitSalePrice,
      productId: req.body.productId,
      size: req.body.size,
      quantity: req.body.quantity,
      price: calPrice,
    });
    await order.save();
    // res.status(201).json({
    //   success: true,
    //   message: "order placed successfully",
    //   product,
    // });
    console.log("order response status: ", res.status);
    // if (res) {
    const delivery = await Delivery.create({
      order: order._id,
      deliveryStatus: "pending",
    });
    res.status(200).json({
      success: true,
      message: "Delivery status updated successfully",
      delivery,
    });
    // }
  } catch (error) {
    next(error);
  }
};
//------------------get orders--------------------
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    next(error);
  }
};
//------------------update orders--------------------
exports.updateOrders = async (req, res, next) => {
  try {
    // {console.log("req product id: ", req.body.productId);
    // const productOrdered = await Order.findOne({
    //   productId: req.body.productId,
    // });
    // console.log(
    //   "get product by product id from order collection: ",
    //   productOrdered.id
    // );
    // const product = await Product.findOne({ id: productOrdered.id });
    // console.log("Product id from product collection: ", product);}
    const orderInfo = await Order.findById(req.body.id);
    console.log("order info: ", orderInfo);
    console.log(req.body.id);
    const order = await Order.findByIdAndUpdate(
      req.body.id,
      {
        //  products: [],
        size: req.body.size,
        quantity: req.body.quantity,
        price: req.body.quantity * orderInfo.unitSalePrice,
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    console.log(order);
    res.json(order);
  } catch (error) {
    next(error);
  }
};
