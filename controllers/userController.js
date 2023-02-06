const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

function createToken(id){
    const token = jwt.sign({id}, process.env.SECRET, {expiresIn: '3d'})
    return token;
}

//login user
exports.login = async (req,res,next) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email,password)
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}

//signup user
exports.signup = async (req,res,next) => {
    const {email, password} = req.body

    try{
        const user = await User.signup(email,password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}