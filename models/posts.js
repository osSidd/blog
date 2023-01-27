const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
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
        minLength: 300,
    },
    display: {
        type: Boolean,
        default: false,
        required: true,
    },
    comments : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments',
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Blog', postSchema);