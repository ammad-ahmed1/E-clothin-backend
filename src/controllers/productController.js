const Product = require("../modals/productsSchema");
//------------------create product--------------------
exports.createProduct = async (req, res, next) => {
  try {
    const {
      title,
      detail,
      size,
      category,
      subCategory,
      color,
      quantity,
      costPrice,
      salePrice,
      profit,
      image,
    } = req.body;

    const imageFile = req.file;
    const imagePath = imageFile.path;
    // const { name, contentType, data, type } = req.file;
    // const image = {
    //   name,
    //   contentType,
    //   data,
    //   type,
    // };
    const product = new Product({
      title: req.body.title,
      detail: req.body.detail,
      size: req.body.size,
      category: req.body.category,
      subCategory: req.body.subCategory,
      color: req.body.color,
      quantity: req.body.quantity,
      costPrice: req.body.costPrice,
      salePrice: req.body.salePrice,
      profit: req.body.profit,
      image: imagePath,
    });
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};
//------------------get products--------------------
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    next(error);
  }
};
//-----------------get products by id----------------
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

//------------------get product by category--------------------
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    console.log(category);
    const products = await Product.find({ category: category });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in the category" });
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
};

//------------------update product--------------------
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        detail: req.body.detail,
        size: req.body.size,
        category: req.body.category,
        subCategory: req.body.subCategory,
        color: req.body.color,
        quantity: req.body.quantity,
        costPrice: req.body.costPrice,
        salePrice: req.body.salePrice,
        profit: req.body.profit,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//------------------delete product by id--------------------
exports.deleteProductById = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    next(error);
  }
};
