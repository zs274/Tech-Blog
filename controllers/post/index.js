const router = require('express').Router();
const postRoutes = require('./postRoutes');

router.use('/', postRoutes);

module.exports = router;