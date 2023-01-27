const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Min length must be greater than equal to 3, got {value}'],
    },
    password : {
        type: String,
        required : [true, 'Password is required'],
        validate: {
            validator: function(v){
                return !(v === this.username);
            },
            message: 'Password must not be same as username'
        },
        minLength: [8, 'Password cannot be shorter than 8 characters']
    }
});

module.exports = mongoose.model("Users", userSchema);