const express = require('express');
const router = express.Router();

const blogs = require('../controllers/blogsController');
const authRoutes = require('../middleware/authRoutes')

//authorizing users
router.use(authRoutes)

//routes

//get all blogs
router.get('/', blogs.get_all_blogs);

//post a new blog
router.post('/', blogs.post_new_blog);

//get all comments
router.get('/:id/comments', blogs.get_all_comments)

//post a new comment for a specific blog
router.post('/:id/comments', blogs.post_new_comment);

module.exports = router;