const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transaction');

router.get('/', transactionController.list);
router.post('/', transactionController.add);
router.get('/:id', transactionController.read);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.remove);

module.exports = router;