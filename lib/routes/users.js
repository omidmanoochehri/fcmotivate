var express = require('express');
var router = express.Router();
var md5 = require("md5");
var fs = require('fs');
var formidable = require('formidable');
var userHandlers = require('../helpers/userController.js');
var authChecker = require('../helpers/authChecker.js');
const User = require("../models/User");

/* GET users by role. */
router.get('/:role',
    // uthChecker,
    function(req, res) {
        let { role } = req.params;
        let query = role == "other" ? { $or: [{ role: "admin" }, { role: "secretary" }] } : { role }
        User.find(query).exec((err, users) => {
            if (err) {
                console.log(err)
                return res.status(400).send({
                    result: "Unknown error! :("
                });
            } else {
                return res.json(users);
            }
        })
    });

/* GET a user. */
router.get('/:username', authChecker, function(req, res) {
    let { username } = req.params;
    User.findOne({ username }).exec((err, users) => {
        if (err) {
            console.log(err)
            return res.status(400).send({
                result: "Unknown error! :("
            });
        } else {
            return res.json(users);
        }
    })
});

/* GET users listing. */
router.get('/',
    // authChecker, 
    function(req, res) {

        User.find().sort({ created_at: -1 }).exec((err, users) => {
            if (err) {
                console.log(err)
                return res.status(400).send({
                    result: "Unknown error! :("
                });
            } else {
                return res.json(users);
            }
        })
    });

// smsConfig.sendSMS("09125490797");

router.get('/profile', userHandlers.loginRequired, userHandlers.profile);
router.post('/add', userHandlers.register);
router.post('/login', userHandlers.sign_in);


/* delete a user. */
router.delete('/remove/:_id',
    authChecker,
    function(req, res) {
        const { _id } = req.params;
        const { currentUser } = req;
        currentUser.role == "admin" || currentUser.role === "secretary" ?
            User.findOne({ _id }).remove().exec().then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error)
                res.send(error);
            }) :
            res.status(403).json({
                status: "error",
                message: "Access denied!"
            })
    });

/* update a user. */
router.put('/update/:username',
    // authChecker,
    function(req, res, next) {
        const { username } = req.params;

        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            const { first_name, last_name, gender, email, home_phonenumber, work_phonenumber, marriage, address, password } = fields;
            let avatar = files.avatar && files.avatar.type.indexOf("image") > -1 ? `data:${files.avatar.type};base64,` + Buffer.from(fs.readFileSync(files.avatar.path), 'binary').toString('base64') : "";

            User.updateOne({ username }, { first_name, last_name, gender, email, home_phonenumber, work_phonenumber, marriage, address, password: md5(password), avatar }).exec().then(result => {
                res.send(result);
            }).catch(error => {
                console.log(error)
                res.send(error);
            })

        });

    });


module.exports = router;