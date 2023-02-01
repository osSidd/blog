const express = require('express');
const router = express.Router();

const blogs = require('../controllers/blogsController');

//routes

//get all blogs
router.get('/', blogs.get_all_blogs);

//get a specific blog
router.get('/:id', blogs.get_a_blog);

//post a new blog
router.post('/', blogs.post_new_blog);

//post a new comment for a specific blog
router.patch('/:id', blogs.post_new_comment);

module.exports = router;