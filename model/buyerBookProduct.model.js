const mongoose = require('mongoose');

const buyerBookProductSchema = mongoose.Schema(
    {
        bookingId: {
            type: String,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
        },

        itemName: {
            type: String,
            trim: true,
        },

        price: {
            type: String,
            trim: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        productImage: {
            type: String,
            trim: true,
        },
        transactionId: {
            type: String,
            trim: true,
        },

        isSaleStatus: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const BuyerProductBook = mongoose.model(
    'BuyerProductBook',
    buyerBookProductSchema
);

module.exports = BuyerProductBook;
