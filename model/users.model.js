const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema(
    {
        UserName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            validate: [validator.isEmail, 'Provide a valid Email'],
            trim: true,
            unique: true,
            required: [true, 'Email address is required'],
        },
        userImage: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ['Buyer', 'Seller', 'Admin'],
            default: 'Buyer',
        },

        isVerifed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
