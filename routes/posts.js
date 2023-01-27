const express = require('express');
const router = express.Router();

const posts = require('../controllers/postController');

router.get('/', posts.get_all_posts);

router.get('/:id', posts.get_a_post);

router.post('/', posts.post_new_post);

router.get('/:id/comments', posts.get_all_comments);

module.exports = router;