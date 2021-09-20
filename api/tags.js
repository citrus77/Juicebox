// api/tags.js
const express = require('express');
const router = express.Router();

const { getAllTags, getPostsByTagName } = require('../db');

router.use((req, res, next) => {
    console.log('A request is being made to /tags');
    
    next();
});

router.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
});

router.get('/:tagName/posts', async (req, res, next) => {
    try {
        const { tagName } = req.params;
        const posts = await getPostsByTagName(tagName);
        console.log(posts)
        res.send({ posts });
    } catch ({ name, message }) {
        next ({ name, message})
    }
});

module.exports = router;