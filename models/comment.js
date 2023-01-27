const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    
}, {
    timestamps:{
        createdAt: true,
        updatedAt: false,
    }
});

module.exports = mongoose.model('Comment', commentSchema);