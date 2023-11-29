const express = require('express');
const { buyerBookProductController } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const { index, indexByUser, store, destroy, update, getById } =
    buyerBookProductController;

// Register application routes here...

router.route('/').get(auth, index).post(auth, store);
router.route('/user').get(auth, indexByUser);

router.route('/:id').get(auth, getById).put(auth, update).delete(auth, destroy);

module.exports = router;
