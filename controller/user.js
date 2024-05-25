const userModel = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const registerUser = async (req, res) => {
  try {
    const userid = req.body.email;
    const userExist = await userModel.findOne({ email: userid });
    if (userExist) return res.status(404).send("user already exist");
    else {
      const {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        postalCode,
        phoneno,
        email,
        role,
      } = req.body;
      const HashPassword = await bcrypt.hash(req.body.password, saltRounds);
      const createUser = await userModel.create({
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        postalCode,
        phoneno,
        email,
        role,
        password: HashPassword,
        profilePic: req.file?.filename,
      });
      if (createUser) res.status(201).send("user create successfull...");
      else res.status(404).send("unable to create user...");
    }
  } catch (error) {
    console.log(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userid = email;
    const userfind = await userModel.findOne({ email: userid });

    if (!userfind) {
      console.log("User not found");
      return res.status(404).send("user doesn't exist");
    }

    bcrypt.compare(password, userfind.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (isMatch) {
        // Correct credentials
        req.session.user = userfind;
        return res.status(200).send("User login successfully... ");
      } else {
        // Incorrect password
        return res.status(401).send("Wrong username or password ");
      }
    });
  } catch (error) {
    console.log(`Login: ${error}`);
    res.status(500).send("Internal Server Error");
  }
};

const getUsers = async (req, res) => {
  try {
    const getUsers = await userModel.find();
    if (getUsers) res.status(200).send(getUsers);
    else res.status(404).send("unable to fetch users !");
  } catch (error) {
    console.log(`error while fetching users data from database ${error}`);
  }
};
const getcurrentUser = async (req, res) => {
  if (req.session.user) {
    res.status(200).send(req.session.user);
  } else {
    res.status(401).send("User not logged in");
  }
};

module.exports = { registerUser, loginUser, getUsers, getcurrentUser };
