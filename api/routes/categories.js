const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get middleware to force API call to authenticate when trying to create a category
const checkAuth = require('../middleware/check-auth');

// Let's use Controller approach instead
const CategoryController = require('../controllers/categories');

// Get a list of all categories
router.get('/', CategoryController.categories_get_all);
// Add category to DB
router.post('/', checkAuth, CategoryController.category_add);

// Make it visible
module.exports = router;