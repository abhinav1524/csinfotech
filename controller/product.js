const productModel = require("../models/Product");
const path = require("path");
const fs = require("fs");
const createProduct = async (req, res) => {
  try {
    const newProduct = await productModel.create({
      name: req.body.name,
      price: req.body.price,
      discription: req.body.discription,
      qty: req.body.qty,
      department: req.body.departmentId,
      active: req.body.active,
      images: req.files.map((file) => path.basename(file.path)),
    });
    res.status(201).send(newProduct);
  } catch (error) {
    console.log(error);
  }
};
// update the products //
const updateProduct = async (req, res) => {
  try {
    const id = req.body.id;
    let new_images = [];
    if (req.files && req.files.length > 0) {
      // Assuming you're using an array of files
      new_images = req.files.map((item) => {
        return item.filename;
      });
      if (req.body.old_images && Array.isArray(req.body.old_images)) {
        // Check if req.body.old_images is defined and is an array
        req.body.old_images.forEach((oldImage) => {
          const imagePath = path.join("uploadPro/", oldImage);
          try {
            fs.unlink(imagePath);
            console.log(`Deleted file: ${imagePath}`);
          } catch (error) {
            console.log(`Error deleting file ${imagePath}:`, error);
          }
        });
      }
    } else {
      new_images = req.body.old_images || []; // Use an empty array if old_images is not defined
    }
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          department: req.body.departmentId,
          active: req.body.active,
          images: new_images,
        },
      },
      { new: true } // Return the updated document
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

//deleting the products //
const deleteProduct = async (req, res) => {
  try {
    const id = req.body.id;
    const findProduct = await productModel.findById(id);
    // getting the images one by one and deleting form the uploadPro folder //
    findProduct.images.forEach((image) => {
      fs.unlink(`uploadPro/${image}`, (error) => {
        if (error) {
          console.log(`Error while deleting the image : ${error}`);
        } else {
          console.log(`${image} deleted successfully`);
        }
      });
    });
    const deleteProduct = await productModel.findByIdAndDelete(id);
    if (deleteProduct) res.status(200).send("Product delete successfull...");
    else res.status(404).send("unable to delete data !");
  } catch (error) {
    console.log(error);
  }
};
// getting product details //
const getProduct = async (req, res) => {
  try {
    const getProduct = await productModel
      .find({ _id: req.query.id })
      .populate({ path: "department", populate: [{ path: "university" }] });
    res.status(200).send({ getProduct });
  } catch (error) {
    console.log(error);
  }
};
//getting product details including departments //
const getProductByDepId = async (req, res) => {
  try {
    const depId = req.query.departmentId;
    const proData = await productModel.find({ department: depId }).populate({
      path: "department",
      populate: [{ path: "university" }],
    });
    res.status(200).send({ proData });
  } catch (error) {
    console.log(error);
  }
};
//updating quantity of product //
const updateProQty = async (req, res) => {
  try {
    const id = req.body.id;
    let product = await productModel.findOne({ _id: id });
    let active = true;
    if (product.qty - req.body.qty <= 0) {
      active = false;
    }
    let proData = await productModel.findByIdAndUpdate(id, {
      qty: product.qty - req.body.qty,
      active: active,
    });
    if (proData) res.status(200).send({ message: "product aty updated" });
    else res.status(404).send({ message: "unable to update data" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  updateProQty,
  getProductByDepId,
};
