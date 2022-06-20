const JWT = require('jsonwebtoken');
const User = require("../models/User");
require("dotenv").config();

module.exports = (req, res, next) => {
    const Token = req.get("token") || req.cookies.token;

    if (!Token) {
        return res.status(401).json({
            status: 'error',
            message: 'Please send Token in header.'
        });
    } else
        try {
            const { user_id } = JWT.verify(Token, process.env.SECRET);
            req.user_id = user_id;
            !user_id ?
                res.status(403).redirect('/admin/login') :
                User.findOne({ _id: user_id }).exec((err, currentUser) => {
                    if (err) console.log(err);
                    req.currentUser = currentUser;
                    next();
                })
        } catch (err) {
            res.status(403).redirect('/admin/login')
        }
};