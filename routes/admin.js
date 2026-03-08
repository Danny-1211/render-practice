const express = require('express');
const router = express.Router(); 
const blogsRouter = require('./module/blogs.js');

router.use('/blogs', blogsRouter);

module.exports = router