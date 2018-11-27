// The ORM
const mongoose = require('mongoose');

// The model
const Category = require('../models/category');

// Add category to database IIF name does not exist
exports.category_add = (req, res, next) => {    
    // IIF category name exists do nothing
    Category.find({ name: req.body.name })
        .exec()
        .then(cat => {
            if (cat.length == 0) {
                const category = new Category({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name
                });
                category.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'Category created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            } else {
                res.status(200).json({
                    message: 'Category exists'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
// Get a list of all categories
exports.categories_get_all = (req, res, next) => {
    Category.find().sort({ name: 1 }) // sort by name in ascending order
        .exec()
        .then(docs => {            
            const response = {
                count: docs.length,
                categories: docs.map(doc => {
                    return {                        
                        _id: doc._id,
                        name: doc.name                        
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {            
            res.status(500).json({
                error: err
            });
        });
};