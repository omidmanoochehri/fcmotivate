"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "rixo.shetabanhost.com",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@mintii.io",
    pass: "(]lo4i1J2Avi", 
  },
});

exports.transporter = transporter;
