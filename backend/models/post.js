const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

// model is a blueprint

module.exports = mongoose.model('Post', postSchema);