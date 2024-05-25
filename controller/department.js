const fs = require("fs");
const depModel = require("../models/Department");
const createDepartment = async (req, res) => {
  try {
    const createdep = await depModel.create({
      name: req.body.name,
      image: req.file.filename,
      university: req.body.universityId,
    });
    if (createdep) res.status(201).send("department create successfully..");
    else res.status(404).send("unable to create department");
  } catch (error) {
    console.log(error);
  }
};
const updateDepartment = async (req, res) => {
  try {
    const id = req.body.id;
    const updatedep = await depModel.findByIdAndUpdate(id, {
      name: req.body.name,
      image: req.file?.filename,
      university: req.body.universityId,
    });
    if (updatedep) res.status(201).send("department update successfully");
    else res.status(404).send("unable to update department");
  } catch (error) {
    console.log(error);
  }
};
const deleteDepartment = async (req, res) => {
  try {
    const id = req.body.id;
    // console.log(id);
    const findDepartment = await depModel.findById(id);
    // getting the imagpath from the user to delete the image //
    fs.unlink(`uploadDep/${findDepartment.image}`, (error) => {
      if (error) {
        console.log(`error while deleting the image : ${error}`);
      } else {
        console.log("image deleted successfully");
      }
    });
    const deleteDepartment = await depModel.findByIdAndDelete(id);
    if (deleteDepartment)
      res.status(200).send("department delete successfully...");
    else res.status(500).send("unable to delete department!");
  } catch (error) {
    console.log(error);
  }
};
const getDepartment = async (req, res) => {
  try {
    const getuniv = req.query.universityId;
    const getDepartment = await depModel
      .find({ university: getuniv })
      .populate("university");
    res.status(200).send(getDepartment);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
};
