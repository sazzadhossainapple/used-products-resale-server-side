const express = require('express');
const { userController } = require('../controller');
const { auth } = require('../middleware');

const router = express.Router();

const {
    index,

    store,
    getByEmamil,
    destroy,
    update,
    jwtToken,
    checkIfSeller,
    checkIfAdmin,
    checkIfBuyer,
} = userController;

// Register application routes here...

router.route('/').get(auth, index).post(store);
router.route('/seller').get(auth, checkIfSeller);
router.route('/admin').get(auth, checkIfAdmin);
router.route('/buyer').get(auth, checkIfBuyer);

router
    .route('/:email')
    .get(auth, getByEmamil)
    .put(update)
    .delete(auth, destroy);
router.route('/jwt/:email').put(jwtToken);

module.exports = router;
