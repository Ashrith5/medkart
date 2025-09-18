const express = require("express");
const router = express.Router();

const sellerSignup = require('../controllers/sellers/sellerSignUp');
const sellerSignIn = require('../controllers/sellers/sellerSignIn');
const sellerAuth = require("../middleware/sellerAuth");
const authRole = require("../middleware/authRole");
const authMiddleware= require('../middleware/authmiddleware');
const adminApproval = require("../controllers/sellers/adminApproval");
const upload = require("../middleware/upload");
const productUpload = require("../middleware/productUpload"); 
const uploadProduct = require("../controllers/sellers/uploadproduct");

const getProfile = require("../controllers/sellers/getProfile");
const updateProfile = require("../controllers/sellers/updateProfile");
const addProduct = require("../controllers/sellers/addProduct");
const getProducts = require("../controllers/sellers/getProducts");
const getOrders = require("../controllers/sellers/getOrders");
const updateOrderStatus = require("../controllers/sellers/updateOrderStatus");
const getStats = require("../controllers/sellers/getStats");
router.post("/admin-signup", upload.single("identityProof"), sellerSignup);
router.post("/admin-login", sellerSignIn);
router.post("/approve-seller", authMiddleware, authRole(["admin"]), adminApproval);
router.get("/dashboard", sellerAuth, getProfile);
router.get("/profile", sellerAuth, getProfile);
router.put("/profile", sellerAuth, updateProfile);

// Upload product → **use uploadProduct middleware**
router.post("/upload-product", sellerAuth, productUpload.single("image"),uploadProduct);

// Products, orders, stats
router.get("/products", sellerAuth, getProducts);
router.get("/orders", sellerAuth, getOrders);
router.put("/orders", sellerAuth, updateOrderStatus);
router.get("/stats", sellerAuth, getStats);

module.exports = router;
