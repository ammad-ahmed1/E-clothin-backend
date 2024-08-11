// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// // Connect to the database
// mongoose.connect("mongodb://127.0.0.1:27017/e-clothing");

// // Parse incoming requests
// app.use(bodyParser.json());

// // Define routes
// const productRoutes = require("./src/routes/products");
// app.use("/api", productRoutes);

// // Start the server
// app.listen(4000, () => {
//   console.log("Server listening on port 4000");
// });

//////////
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoutes = require("./src/routes/products");
const orderRoutes = require("./src/routes/orders");
const userRoutes = require("./src/routes/users");
const deliveryRoutes = require("./src/routes/delivery");
const app = express();

const env = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const User = require("./models/user");
env.config();
mongoose.connect("mongodb://127.0.0.1:27017/e-clothing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB database");
});
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/user", userRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
