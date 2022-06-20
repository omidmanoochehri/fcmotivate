var express = require("express");
var router = express.Router();
const PostCategory = require("../../models/PostCategory");
var authChecker = require("../../helpers/authChecker.js");

/* GET categories . */
router.get("/categories", function (req, res, next) {
  PostCategory.find({})
    .populate("author", "first_name last_name")
    .exec((err, categories) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          result: "Unknown Error! :(",
        });
      } else {
        res.json(categories);
      }
    });
});

/* GET a categories. */
router.get("/categories/:cat_id", function (req, res, next) {
  let { cat_id } = req.params;
  PostCategory.findOne({ _id: cat_id }).exec((err, category) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        result: "Unknown Error! :(",
      });
    } else {
      res.json(category);
    }
  });
});

/* add a category. */
router.post("/categories/add", authChecker, function (req, res, next) {
  let { name, slug, status } = req.body;
  let { currentUser } = req;

  new PostCategory({ name, slug, status, author: currentUser._id }).save(
    (err, category) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          result: "Unknown Error! :(",
        });
      } else {
        res.json(category);
      }
    }
  );
});

/*  update a category. */
router.put("/categories/update/:cat_id", function (req, res, next) {
  let { cat_id } = req.params;
  let { name, slug, status } = req.body;
  PostCategory.updateOne({ _id: cat_id }, { name, slug, status })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

/* delete a category. */
router.delete("/categories/delete/:cat_id", function (req, res, next) {
  const { cat_id } = req.params;
  PostCategory.findOne({ _id: cat_id })
    .remove()
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

module.exports = router;
