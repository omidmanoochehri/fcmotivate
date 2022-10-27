var express = require("express");
var router = express.Router();
var MembershipPlan = require("../models/MembershipPlan");

/* GET all plans. */
router.get("/", function (req, res, next) {
  MembershipPlan.find({}).exec((err, plans) => {
    if (err) {
      console.log(err);
      res.json({
        result: "Error!",
      });
    } else {
      res.json(plans);
    }
  });
});

/* GET a plan by id. */
router.get("/id/:_id", function (req, res, next) {
  let { _id } = req.params;
  MembershipPlan.findOne({ _id }).exec((err, plan) => {
    if (err) {
      console.log(err);
      res.json({
        result: "Error!",
      });
    } else {
      res.json(plan);
    }
  });
});

/* Add a plan */
router.post("/add", function (req, res, next) {
  let { name, type, monthlyFee, yearlyFee, image } = req.body;

  new MembershipPlan({
    name,
    author: req.current_user?.id,
    type,
    monthlyFee,
    yearlyFee,
    image,
    status: "published",
  }).save((err, plan) => {
    if (err) {
      console.log(err);
      res.json({
        result: "Error!",
      });
    } else {
      res.json(plan);
    }
  });
});

/* Update a plan */
router.put("/update", function (req, res, next) {
  let { _id, name, type, monthlyFee, yearlyFee, image } = req.body;

  MembershipPlan.findOneAndUpdate(
    { _id },
    {
      name,
      author: req.current_user?.id,
      type,
      monthlyFee,
      yearlyFee,
      image,
      status: "published",
    }
  ).exec((err, plan) => {
    if (err) {
      console.log(err);
      res.json({
        result: "Error!",
      });
    } else {
      res.json(plan);
    }
  });
});

/* Update a plan */
router.delete("/delete", function (req, res, next) {
  let { _id } = req.body;

  MembershipPlan.findOneAndUpdate(
    { _id },
    {
      status: "deleted",
    }
  ).exec((err, plan) => {
    if (err) {
      console.log(err);
      res.json({
        result: "Error!",
      });
    } else {
      res.json(plan);
    }
  });
});

module.exports = router;
