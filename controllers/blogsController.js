const mongoose = require('mongoose')
const async = require('async')

const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel')

//get all blogs
exports.get_all_blogs = async function(req,res,next) {
   try{
        const blogs = await Blog.find({}, 'title snippet createdAt _id').sort({createdAt: -1})
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
exports.get_all_comments = (req,res,next) => {
    async.parallel({
        blog(cb){
            Blog.findById(req.params.id)
            .exec(cb)
        },
        comments(cb){
            Comment.find({blog:req.params.id}).sort({createdAt: -1}).exec(cb)
        }
    }, function(err,result){
        if(err)
            return next(err)
        if(result.blog === null){
            const error = new Error('Blog not found')
            error.status(404)
            return next(err)
        }
        res.json({
            blog: result.blog,
            comments: result.comments
        })
    })
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