const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');

router.use('/auth', authRoutes);
router.use('/course', courseRoutes);

module.exports = router;