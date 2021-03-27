const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth');
const fs = require('fs');

router.get('/new', async (req, res) => {
    try {
        res.render('newpost');
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (!postData) {
            res.status(404).json({ message: 'No post with this id' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('editpost', {
            post,
            logged_in: req.session.logged_in,
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.post('/new', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            name: req.body.name,
            description: req.body.description,
            user_id: req.session.user_id,
        });

        updateFilename(newPost);
        const filename = newPost.id;
        const writeFile = req.body.text;

        writeToFile(writeFile, filename);

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});


updateFilename = async (post) => {
    const updatedFilename = post.id;
    try {
        const getPost = await Post.findByPk(post.id)
        if (getPost) {
            getPost.update({
                filename: updatedFilename,
            })
        }
    } catch (err) {
        console.log(err);
    }
};
