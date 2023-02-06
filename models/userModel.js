const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new Schema({
    email : {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
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

//signup statics function
userSchema.statics.signup = async function(email,password){
    if(!email || !password){
        throw new Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw new Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw new Error('Password is not strong')
    }

    const exists = await this.findOne({email})
    if(exists){
        throw new Error('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = this.create({email, password: hash})

    return user
}

//login statics function
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw new Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw new Error('Email is not valid')
    }
   
    const user = await this.findOne({email})
    if(!user){
        throw new Error('Incorrect email id')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw new Error('Incorrect password')
    }

    return user

}

module.exports = mongoose.model("User", userSchema);