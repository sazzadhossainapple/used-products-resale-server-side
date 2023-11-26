const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo) => {
    const payload = {
        UserName: userInfo.UserName,
        email: userInfo.email,
        userImage: userInfo.userImage,
        role: userInfo.role,
        isVerifed: userInfo.isVerifed,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    return token;
};
