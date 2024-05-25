const fs = require("fs");
const univModel = require("../models/University");

// create code for university //
const createUniversity = async (req, res) => {
  try {
    //console.log(req.body);
    const createUniv = await univModel.create({
      name: req.body.name,
      image: req.file.filename,
    });
    if (createUniv) res.status(201).send("university created");
    else res.status(404).send("unable to create university");
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
};
const updateUniversity = async (req, res) => {
  try {
    const id = req.body.id;
    const updateUniv = await univModel.findByIdAndUpdate(id, {
      name: req.body.name,
      image: req.file.filename,
    });
    if (updateUniv) res.status(201).send("university update successfull...");
    else res.status(404).send("university can't be updated");
  } catch (error) {
    console.log(error);
  }
};
const deleteUniversity = async (req, res) => {
  try {
    const id = req.body.id;
    const findUniversity = await univModel.findById(id);
    //getting the imagepath with the help of id and delete the image //
    fs.unlink(`uploadUniv/${findUniversity.image}`, (error) => {
      if (error) {
        console.log(`error while deleting the image : ${error}`);
      } else {
        console.log("image deleted successfully");
      }
    });
    const deleteUniv = await univModel.findByIdAndDelete(id);
    if (deleteUniv) res.status(201).send("university delete successfully");
    else res.status(404).send("university can't be deleted ");
  } catch (error) {
    console.log(error);
  }
};
const getUniversities = async (req, res) => {
  try {
    const getUniversities = await univModel.find();
    res.status(201).send(getUniversities);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getUniversities,
};
