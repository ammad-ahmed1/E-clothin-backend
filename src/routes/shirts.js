const express = require("express");
const router = express.Router();
const Shirt = require("../modals/shirtsschema");
//add shirt
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    let shirt = await Shirt.create(req.body);
    console.log(shirt);
    res.status(200).send(user);
  } catch (e) {
    console.log(e.message);
    res.status(400).send("something went wrong");
  }
});
//get shirts
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET req to shirts...",
  });
});
//search shirt
router.get("/:shirtid", (req, res, next) => {
  const id = req.params.shirtid;
  if (id == "special") {
    res.status(200).json({
      message: "You discovered the id...",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You entered the id....",
    });
  }
});
//update shirt
router.patch("/:shirtid", (req, res, next) => {
  res.status(200).json({
    message: "Handling PATCH request to shirts...",
  });
});
router.delete("/:shirtid", (req, res, next) => {
  res.status(200).json({
    message: "Handling DELETE request to shirts...",
  });
});

function myMiddleware(req, res, next) {
  // Middleware logic here
  next();
}
module.exports = router;
