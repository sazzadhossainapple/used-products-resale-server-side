const express = require('express');
const { productController } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const { index, store, destroy, update, getBySlug } = productController;

// Register application routes here...

router.route('/').get(index).post(auth, store);

router.route('/:id').get(getBySlug).put(auth, update).delete(auth, destroy);

module.exports = router;
