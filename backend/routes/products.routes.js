import express from "express";

const productRouter = express.Router();

productRouter.route("/add-product").post((req, res) => {
  response.send("this is to send somethin");
});

export default productRouter;
