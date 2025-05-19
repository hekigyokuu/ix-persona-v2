const express = require('express');
const router = express.Router();

const authenticationRoutes = require('./auth');
const profileRoutes = require('./profile');
const testRoutes = require('./test');
const pagesRoutes = require('./pages');

router.use('/', pagesRoutes);
router.use('/auth', authenticationRoutes);
router.use('/profile', profileRoutes);
router.use('/enneagram-test', testRoutes);

module.exports = router;
