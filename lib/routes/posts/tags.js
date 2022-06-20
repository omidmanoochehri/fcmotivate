var express = require('express');
var router = express.Router();
const PostTag = require("../../models/PostTag");
var authChecker = require('../../helpers/authChecker.js');

/* GET tags. */
router.get('/tags', function (req, res, next) {
  PostTag.find({})
    .populate("author", "first_name last_name")
    .exec((err, tags) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          result: "Unknown Error! :("
        })
      }
      else {
        res.json(tags);
      }
    })
});

/* get a tag. */
router.get('/tags/:tag_id', function (req, res, next) {
  let { tag_id } = req.params;
  PostTag.findOne({ _id: tag_id }).exec((err, tag) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        result: "Unknown Error! :("
      })
    }
    else {
      res.json(tag);
    }
  })
});

/* add a tag. */
router.post('/tags/add',
  authChecker,
  function (req, res, next) {

    let { name, slug, status } = req.body;
    let { currentUser } = req;

    new PostTag({ name, slug, status, author: currentUser._id }).save((err, tag) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          result: "Unknown Error! :("
        })
      }
      else {
        res.json(tag);
      }
    })
  });

/* update a tag. */
router.put('/tags/update/:tag_id', function (req, res, next) {
  let { tag_id } = req.params;
  let { name, slug, status } = req.body;
  PostTag.updateOne({ _id: tag_id }, { name, slug, status }).exec().then(result => {
    res.json(result);
  }).catch(error => {
    console.log(error)
    res.status(400).json(error);
  })
});

/* delete a tag . */
router.delete('/tags/delete/:tag_id', function (req, res, next) {
  const { tag_id } = req.params;
  PostTag.findOne({ _id: tag_id }).remove().exec().then(result => {
    res.json(result);
  }).catch(error => {
    console.log(error)
    res.status(400).json(error);
  })
});

  module.exports = router;
