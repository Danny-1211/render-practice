const Blog = require('../models/blogs');


const blog_index = (req, res) => {
    Blog.find().sort()
        .then((result) => {
            res.render('index', {
                title: 'all blogs',
                blogs: result,
                show: true,
                titleH2: 'all blogs H2222',
                foods: ['apple', 'banana', 'orange']
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_details = (req, res) => {
    const blogId = req.params.id;
    Blog.findById(blogId)
        .then(result => {
            res.render('details', { blog: result, title: 'blog details' });
        }).catch(err => {
            res.status(404).render('404', {
                title: 'this page not found',
            });
        })
}

const blog_create_get = (req, res) => {
    res.render('create', {
        title: 'create',
    });
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_delete = (req, res) => {
    blogId = req.params.id;
    Blog.findByIdAndDelete(blogId)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        }).catch(err => {
            console.log(err);
        })
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}