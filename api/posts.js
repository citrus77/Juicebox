// api/posts.js
const express = require('express');
const router = express.Router();

const { getAllPosts, createPost } = require('../db');
const { requireUser } = require('./utils')

router.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = ""} = req.body;

    const tagArr = tags.trim().split(/\s+/)
    const postData = {};

    if (tagArr.length){
        postData.tags = tagArr;
    }

    try {
        const postDate = {
            authorId: `${user.id}`,
            title,
            content
        }
        const post = await createPost(postData);
        res.send(post);
    } catch ({ name, message }) {
        next ({ name, message });
    };
});

router.use((req, res, next) => {
    console.log('A request is being made to /posts');
    
    next();
});

router.get('/', async (req, res) => {
    const posts = await getAllPosts();

    res.send({
        posts
    });
});

module.exports = router;