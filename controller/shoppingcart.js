const shopingcartModel = require("../models/ShopingCart");
const createCartProduct = async (req, res) => {
  try {
    const createCartProduct = await shopingcartModel.create({ ...req.body });
    if (createCartProduct)
      res.status(200).send(`product created successfully ${createCartProduct}`);
    else res.status(500).send("unable to save data !");
  } catch (error) {
    console.log(`error while fetching the information ${error}`);
  }
};
const getCartProduct = async (req, res) => {
  try {
    const getCartProduct = await shopingcartModel.find();
    if (getCartProduct) res.status(200).send(getCartProduct);
    else res.status(500).send("unable to fetch data ");
  } catch (error) {
    console.log(`error while fetching the product from the cart ${error}`);
  }
};
const deleteCartProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const deleteItem = await shopingcartModel.findByIdAndDelete(id);
    if (deleteItem) res.status(200).send(`item deleted ${deleteItem}`);
    else res.status(500).send("unable to delete the product ");
  } catch (error) {
    console.log(`error while deleting the product ${error}`);
  }
};
module.exports = { createCartProduct, getCartProduct, deleteCartProduct };
