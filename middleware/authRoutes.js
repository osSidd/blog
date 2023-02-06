const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authRoutes = async function(req,res, next){
    try{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({
            error: "Unauthorized request"
        })
    }
    
    const token = authorization.split(' ')[1]
    const {id} = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({_id: id}).select('_id')
    
    next()
    }catch(err){
        res.status(401).json({
            error:err.message
        })
    }
}

module.exports = authRoutes