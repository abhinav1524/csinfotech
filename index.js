require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const session = require("express-session");
const {
  createUniversity,
  updateUniversity,
  deleteUniversity,
  getUniversities,
} = require("./controller/university");
const {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
} = require("./controller/department");
const {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getProductByDepId,
  updateProQty,
} = require("./controller/product");
const {
  registerUser,
  loginUser,
  getUsers,
  getcurrentUser,
} = require("./controller/user");
const {
  createCartProduct,
  getCartProduct,
  deleteCartProduct,
} = require("./controller/shoppingcart");
const PORT = 8000;
const app = express();
//middlewares starts //
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
//storing user session //
app.use(
  session({
    secret: "mysite",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      expires: new Date(Date.now() + 1800000), // sets the expires property
    },
  })
);
const userlogout = async (req, res) => {
  console.log("userlogout route hit ");
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).send("error destroying session");
      } else {
        console.log("user session destroyed successfully ");
        res.status(200).send("user logout successfully... ");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
// multer  //
const storeUniv = multer.diskStorage({
  destination: "uploadUniv/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}...${file.originalname}`);
  },
});
const uploadsUniv = multer({
  storage: storeUniv,
});
// storing department image in uploadDep name folder //
const storeDep = multer.diskStorage({
  destination: "uploadDep/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}...${file.originalname}`);
  },
});
const uploadsDep = multer({
  storage: storeDep,
});
// storing product image in uploadPro name folder //
const storePro = multer.diskStorage({
  destination: "uploadPro/",
  filename: (req, files, cb) => {
    cb(null, `${Date.now()}...${files.originalname}`);
  },
});
const uploadsPro = multer({
  storage: storePro,
});
// // storing user image in uploadUser name folder //
const storeUser = multer.diskStorage({
  destination: "uploadUser/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}...${file.originalname}`);
  },
});
const uploadsUser = multer({
  storage: storeUser,
});
app.use(express.static("uploadUniv"));
app.use(express.static("uploadDep"));
app.use(express.static("uploadPro"));
app.use(express.static("uploadUser"));
//middlewar ends //

// routes //
// university routes start here//
app.post("/university", uploadsUniv.single("image"), createUniversity);
app.put("/university", uploadsUniv.single("image"), updateUniversity);
app.delete("/university", deleteUniversity);
app.get("/university", getUniversities);
// university routes ends here //
// department routes start here //
app.post("/department", uploadsDep.single("image"), createDepartment);
app.put("/department", uploadsDep.single("image"), updateDepartment);
app.delete("/department", deleteDepartment);
app.get("/department", getDepartment);
// department routes ends here //

//product routes start here //
app.post("/product", uploadsPro.array("images", 3), createProduct);
app.put("/product", uploadsPro.array("images", 3), updateProduct);
app.put("/product/qty", updateProQty);
app.get("/product", getProduct);
app.get("/product/dep", getProductByDepId);
app.delete("/product", deleteProduct);
//product routes end here //
// user routes start here //
app.post("/register", uploadsUser.single("profilePic"), registerUser);
app.post("/login", loginUser);
app.post("/logout", userlogout);
app.get("/getusers", getUsers);
app.get("/getcurrentuser", getcurrentUser);
//user routes end here //
//shopping cart route start here //
app.post("/cartproduct", createCartProduct);
app.get("/cartproduct", getCartProduct);
app.delete("/cartproduct", deleteCartProduct);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("connection to database successfull..."))
  .catch((error) => console.log(error));
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
