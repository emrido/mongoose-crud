const express = require('express');
const router = express.Router();
const memberController = require('../controller/member');

router.get('/', memberController.list);
router.post('/', memberController.add);
router.get('/:id', memberController.read);
router.put('/:id', memberController.update);
router.delete('/:id', memberController.remove);

module.exports = router;