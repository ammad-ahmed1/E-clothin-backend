const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Extract the JWT from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    // Verify the JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Add the user ID to the request object
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
