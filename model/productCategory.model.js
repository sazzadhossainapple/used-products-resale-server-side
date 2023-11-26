const mongoose = require('mongoose');

const productCategorySchema = mongoose.Schema(
    {
        catagoryName: {
            type: String,
            trim: true,
        },
        slug: {
            type: String,
            trim: true,
        },

        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProductCategory = mongoose.model(
    'ProductCategory',
    productCategorySchema
);

module.exports = ProductCategory;
