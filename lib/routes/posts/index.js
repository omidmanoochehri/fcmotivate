var express = require('express');
var router = express.Router();

var postsRouter = require("./posts");
var categoriesRouter = require("./categories");
var tagsRouter = require("./tags");

router.use("/", postsRouter);
router.use("/categories", categoriesRouter);
router.use("/tags", tagsRouter);

module.exports = router;
