var express = require('express');
var router = express.Router();
var { ROUTE_CONFIG } = require("../../helpers/routesConfig")
const authChecker = require("../../helpers/authChecker");

// var adminCategoriesRouter = require("./categories");
// var adminTagsRouter = require("./tags");
var adminUsersRouter = require("./users");
var tutorialsUsersRouter = require("./tutorials");
var newsUsersRouter = require("./news");
var categoriesUsersRouter = require("./categories");
var tagsUsersRouter = require("./tags");
const { getAllPodcasts, getAllPerformances, getAllPremiers, getAllTutorials } = require('../../helpers/dbQueris');

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('admin/pages/login', {...ROUTE_CONFIG,
        page: "login",
        title: 'داشبورد'
    });
});

router.use(authChecker);
// router.use('/categories', adminCategoriesRouter);
// router.use('/tags', adminTagsRouter);
router.use("/users", adminUsersRouter);
router.use("/tutorials", tutorialsUsersRouter);
router.use("/news", newsUsersRouter);
router.use("/categories", categoriesUsersRouter);
router.use("/tags", tagsUsersRouter);

/* GET dashboard page. */
router.get('/',  getAllTutorials, function(req, res) {
    let {
        currentUser,
        podcasts,
        performances,
        premiers,
        tutorials
    } = req;
    res.render('admin/containers/index', {...ROUTE_CONFIG,
        page: "dashboard",
        title: 'داشبورد',
        podcastsCount: podcasts.length,
        performancesCount: performances.length,
        premiersCount: premiers.length,
        tutorialsCount: tutorials.length,
        currentUser
    });
});








module.exports = router;