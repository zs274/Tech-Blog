const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [['date', ASC]],
            inclide: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render(signup);
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPosts = await Post.findAll({
            where: { user_id: req.session.user_id },
            order: [['username', 'ASC']],
        });

        const myPosts = userPosts.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            myPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;