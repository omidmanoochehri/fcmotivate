var express = require("express");
var router = express.Router();
var { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const authChecker = require("../../helpers/authChecker");

// var adminCategoriesRouter = require("./categories");
// var adminTagsRouter = require("./tags");
var adminUsersRouter = require("./users");
var quotesRouter = require("./quotes");
var motivateMeRouter = require("./motivate_me");
var recoverMeRouter = require("./recover_me");
var mentalTrainingRouter = require("./mental_training");
var trainMeRouter = require("./train_me");
var getMeFitRouter = require("./get_me_fit");
var newsUsersRouter = require("./news");
var categoriesUsersRouter = require("./categories");
var tagsUsersRouter = require("./tags");
const { getAllTutorials } = require("../../helpers/dbQueris");
const Post = require("../../models/Post");

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("admin/pages/login", {
    ...ROUTE_CONFIG,
    page: "login",
    title: "داشبورد",
  });
});

router.use(authChecker);
router.use("/users", adminUsersRouter);
router.use("/quotes", quotesRouter);
router.use("/motivate_me", motivateMeRouter);
router.use("/recover_me", recoverMeRouter);
router.use("/mental_training", mentalTrainingRouter);
router.use("/train_me", trainMeRouter);
router.use("/get_me_fit", getMeFitRouter);
router.use("/news", newsUsersRouter);
router.use("/categories", categoriesUsersRouter);
router.use("/tags", tagsUsersRouter);

/* GET Gallery page. */
router.get("/gallery", function (req, res) {
  let { currentUser } = req;
  res.render("admin/containers/index", {
    ...ROUTE_CONFIG,
    page: "Gallery",
    title: "Gallery",
    currentUser,
  });
});

/* GET dashboard page. */
router.get("/", function (req, res) {
  let { currentUser } = req;

  Post.find({}).exec((err, posts) => {
    if (err) {
      console.log(err);
      res.json({
        result: "Error!",
      });
    } else {
      res.render("admin/containers/index", {
        ...ROUTE_CONFIG,
        page: "dashboard",
        title: "Dashboard",
        posts,
        currentUser,
      });
    }
  });
});

module.exports = router;
