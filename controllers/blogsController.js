const mongoose = require('mongoose')
const Blog = require('../models/blogs');
const Comment = require('../models/comment')

//get all blogs
exports.get_all_blogs = async function(req,res,next) {
   try{
        const blogs = await Blog.find().sort({createdAt: -1})
        res.status(200).json(blogs)
   }catch(err){
        res.status(400).json({
            error: err.message
        })
   }
};

//post a new blog
exports.post_new_blog = async function(req,res,next){

    try{
        const {title, snippet, body} = req.body;
        const blog = await Blog.create({
            title,
            snippet,
            body
        })

        res.status(200).json(blog)

    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}

//get all comments
exports.get_all_comments = async function(req,res,next){
    try{
        const id = req.params.id
        
        const comments = await Comment.find({blog: id}).sort({createdAt: -1})
        res.status(200).json(comments)
    }catch(err){
        res.status(400).json(err.message)
    }
}

//post a new comment for a specific blog
exports.post_new_comment = async function(req,res,next){
    try{
        const id = req.params.id
        const {text,author} = req.body
        
        if(!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).json({
                error: id + " is not a valid id"
            })
        
        const comment = await Comment.create({text, author, blog: id})
        
        res.status(200).json(comment)
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}