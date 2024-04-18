// const express = require('express');

// const router = express.Router();

// router.post("/addproduct", addproduct);

// module.exports = router;

const express = require("express");
const addproduct = require('../Controllers/ProductController/addproduct');
const deleteProduct = require('../Controllers/ProductController/deleteproduct');
const getProduct = require("../Controllers/ProductController/getproduct");
const getProductbyname = require("../Controllers/ProductController/getproductbyname");
const getProductbycategory = require("../Controllers/ProductController/getproductbycategory");
const updateProduct = require("../Controllers/ProductController/updateproduct");
const updateProductbyname = require("../Controllers/ProductController/updateproductbyname");

const router = express.Router();

router.post("/addproduct", addproduct);
router.put("/updateproduct/:Id", updateProduct);
router.put("/updateproductbyname/:name", updateProductbyname);
router.delete("/deleteproduct/:id", deleteProduct);
router.get("/getproduct", getProduct)
router.get("/getproductbyname/:name",getProductbyname)
router.get("/getproductbycategory/:category",getProductbycategory)


module.exports = router;
