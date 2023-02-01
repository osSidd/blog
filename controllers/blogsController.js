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

//get a specific blog
exports.get_a_blog = async function(req,res,next){
    try{
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id))
           return res.status(400).json({
                error: id + " is not a valid id"
            })
        
        const blog = await Blog.findById(id).populate('comments')

        if(!blog)
            return res.status(404).json({
                error: "blog not found"
            })
        
        res.status(200).json(blog)

    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}

//post a new blog
exports.post_new_blog = async function(req,res,next){

    try{
        const {title, snippet, body, display} = req.body;
        const blog = await Blog.create({
            title,
            snippet,
            body,
            display
        })

        res.status(200).json(blog)

    }catch(err){
        res.status(400).json({
            error: err.message
        })
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
        
        const comment = await Comment.create({text, author})
        const commentId = comment._id

        const blog = await Blog.findByIdAndUpdate({_id: id}, {
            "$push" :{
                "comments": commentId
            }
        })

        if(!blog)
            return res.status(404).json({
                error: "blog not found"
            })
        
        res.status(200).json(blog)

    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}