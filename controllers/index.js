const router = require('express').Router();
const { post } = require('./api');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const postRoutes = require('./post');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/post', postRoutes);

module.exports = router;