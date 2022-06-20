const mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  md5 = require("md5"),
  fs = require("fs"),
  formidable = require("formidable"),
  pool = require("../bootstrap/dbConnection"),
  User = require("../models/User");
require("dotenv").config();

exports.register = function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let {
      username,
      role,
      first_name,
      last_name,
      gender,
      description,
      email,
      phonenumber,
      address,
      password,
    } = fields;
    let avatar =
      files.avatar && files.avatar.type.indexOf("image") > -1
        ? `data:${files.avatar.type};base64,` +
          Buffer.from(fs.readFileSync(files.avatar.path), "binary").toString(
            "base64"
          )
        : "";
    password = md5(password);

    var newUser = new User({
      username,
      role,
      first_name,
      last_name,
      gender,
      description,
      email,
      phonenumber,
      address,
      password: md5(password),
      avatar,
    });
    newUser.save(function (err, user) {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: err,
        });
      } else {
        user.hash_password = undefined;
        return res.json({ username, first_name, last_name, role });
      }
    });
  });
};

exports.sign_in = function (req, res) {
  //MONGO VERSION
  User.findOne(
    {
      username: req.body.username.toLowerCase(),
    },
    function (err, user) {
      if (err) throw err;
      if (!user || md5(req.body.password) !== user.password) {
        return res
          .status(401)
          .json({
            message: "Authentication failed. Invalid user or password.",
          });
      }
      user.password = "";
      return res.json({
        token: jwt.sign({ user_id: user._id }, process.env.SECRET),
        user: user,
      });
    }
  );
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
