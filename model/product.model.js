const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        catagory_slug: {
            type: String,
            trim: true,
        },
        productName: {
            type: String,
            trim: true,
        },

        product_slug: {
            type: String,
            trim: true,
        },

        resalePrice: {
            type: String,
            trim: true,
        },

        orginalPrice: {
            type: String,
            trim: true,
        },

        useYear: {
            type: String,
            trim: true,
        },

        location: {
            type: String,
            trim: true,
        },

        phoneNumber: {
            type: String,
            trim: true,
        },

        productImage: {
            type: String,
            trim: true,
        },

        condition: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        sellerName: {
            type: String,
            trim: true,
            required: true,
        },

        email: {
            type: String,
            trim: true,
            required: true,
        },

        sellerImage: {
            type: String,
            trim: true,
        },
        transactionId: {
            type: String,
            trim: true,
        },

        reported: {
            type: Boolean,
            default: false,
        },
        isAdvertisement: {
            type: Boolean,
            default: false,
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
