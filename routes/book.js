const express = require('express');
const router = express.Router();
const bookController = require('../controller/book');

router.get('/', bookController.list);
router.post('/', bookController.add);
router.get('/:id', bookController.read);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.remove);

module.exports = router;