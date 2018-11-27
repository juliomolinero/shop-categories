// The ORM
const mongoose = require('mongoose');

// Schema
const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // Let MongoDB to create an identifier for us
    name: { type: String, required: true }
});

// Make it visible
module.exports = mongoose.model('Category', categorySchema);