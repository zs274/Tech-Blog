const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
            content: req.body.text
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('./edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            },
        });

        postData.description = req.body.description;
        postData.content = req.body.content;
        postData.name = req.body.name;

        if (!postData) {
            res.status(404).json({ message: 'No post with this id' });
            return;
        }

        postData.name = req.body.name;
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post with this id' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Comment,
                attributes: ['id', 'user_id', 'post_id', 'comment_text', 'date_posted'],
            include: {
                model: User,
                attributes: ['username']
            }
            },
        {
            model: User,
            attributes: ['username']
        }
        ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post with this id' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('post', {
            post, 
            logged_in: req.sessiom.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:id', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.user_id,
            post_id: req.body.id
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;