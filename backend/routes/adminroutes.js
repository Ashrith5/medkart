const express = require("express");
const router = express.Router();
const signup = require("../controllers/admin/adminSignUp");
const signin = require("../controllers/admin/adminSignin");
const categoryController = require("../controllers/admin/categoryController");
const customerController = require("../controllers/admin/customerController");
const uploadiconcategory = require("../middleware/uploadiconcategory");

router.post(
  '/categories',
  uploadiconcategory.single('icon'), // 'icon' should match the field name in your form
  categoryController.createCategory
);


// Signup
router.post("/signup/request-otp", signup.requestSignupOtp);
router.post("/signup/verify-otp", signup.verifySignupOtp);

// Signin
router.post("/login/password", signin.loginWithPassword);
router.post("/login/request-otp", signin.requestLoginOtp);
router.post("/login/verify-otp", signin.verifyLoginOtp);

// CRUD for Categories
router.post(
  '/categories',
  uploadiconcategory.single('icon'), // Use this route for creating a category with an icon
  categoryController.createCategory
);
router.get("/categories", categoryController.getCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.put("/categories/:id", uploadiconcategory.single('icon'), categoryController.updateCategory); // Correctly handle file uploads on update
router.delete("/categories/:id", categoryController.deleteCategory);


// Reorder
router.put("/categories/reorder", categoryController.reorderCategories);

// CRUD for Customers
router.get("/customers", customerController.getAllCustomers);
router.get("/customers/:id", customerController.getCustomerById);
router.put("/customers/:id", customerController.updateCustomer);

module.exports = router;


