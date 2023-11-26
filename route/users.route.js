const express = require('express');
const { userController } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const { index, store, getByEmamil, destroy, update, jwtToken } = userController;

// Register application routes here...

router.route('/').get(index).post(store);

router.route('/:email').get(getByEmamil).put(update).delete(destroy);
router.route('/jwt/:email').put(jwtToken);

module.exports = router;
