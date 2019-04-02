const express = require('express');
const router = express.Router();
const bookRoute = require('./book');
const memberRoute = require('./member');
const transactionRoute = require('./transaction');

router.use('/books', bookRoute);
router.use('/members', memberRoute);
router.use('/transactions', transactionRoute);

module.exports = router;