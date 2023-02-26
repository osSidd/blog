const express = require('express');
const router = express.Router();

const blogs = require('../controllers/blogsController');
const authRoutes = require('../middleware/authRoutes')

//routes

//get all blogs
router.get('/', blogs.get_all_blogs);

//get all comments
router.get('/:id/comments', blogs.get_all_comments)


//authorizing users
//router.use(authRoutes)


//post a new blog
router.post('/', blogs.post_new_blog);

//post a new comment for a specific blog
router.post('/:id/comments', blogs.post_new_comment);

module.exports = router;