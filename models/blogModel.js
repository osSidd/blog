const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength : 10,
    },
    snippet: {
        type: String,
        required: true,
        minlength:20,
    },
    body: {
        type: String,
        required: true,
        minLength: 30,
    },
    
}, {timestamps: true});

module.exports = mongoose.model('Blog', blogSchema);