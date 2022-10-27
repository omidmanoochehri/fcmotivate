var express = require("express");
var router = express.Router();
var formidable = require("formidable");
var fs = require("fs");
const Post = require("../../models/Post");
const { ROUTE_CONFIG } = require("../../helpers/routesConfig");
const {
  getAllMotivateMe,
  uploadFiles,
  getAllPostCategories,
  getAllPostTags,
} = require("../../helpers/dbQueris");

/* GET add motivate_me page. */
router.get(
  "/add",
  getAllMotivateMe,
  getAllPostCategories,
  getAllPostTags,
  function (req, res, next) {
    let { motivate_me_list, categories, tags } = req;
    res.render("admin/containers/index", {
      ...ROUTE_CONFIG,
      page: "addMotivateMe",
      title: "Add New",
      action: "add",
      motivate_me: motivate_me_list,
      categories,
      tags,
      currentUser: req.currentUser,
    });
  }
);

/* GET edit motivate_me page. */
router.get(
  "/edit/:motivate_me_id",
  getAllMotivateMe,
  getAllPostCategories,
  getAllPostTags,
  function (req, res, next) {
    let { motivate_me_list, categories, tags } = req;
    let { motivate_me_id } = req.params;

    res.render("admin/containers/index", {
      ...ROUTE_CONFIG,
      page: "addMotivateMe",
      title: "Edit",
      action: "edit",
      motivate_me: motivate_me_list.filter((row) => row._id == motivate_me_id)[0],
      motivate_me_list,
      categories,
      tags,
      currentUser: req.currentUser,
    });
  }
);

router.post("/", function (req, res, next) {
  let { currentUser } = req;
  let { _id, action } = req.body;
  if (action === "delete") {
    Post.find({ _id }).remove((err, result) => {
      Post.find({ type: "motivate_me" })
        .populate("author", "_id first_name last_name")
        .exec((error, motivate_me) => {
          error
            ? console.log(error)
            : res.render("admin/containers/index", {
                ...ROUTE_CONFIG,
                page: "motivate_me",
                title: "Motivate Me List",
                motivate_me,
                response: { result: result ? result : error },
                currentUser,
              });
        });
    });
  } else {
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      let { _id, action, title, content, categories, tags, author } = fields;
      uploadFiles(files, (imagesUploadResult) => {
        if (imagesUploadResult) {
          action === "edit"
            ? Post.updateOne(
                { _id },
                {
                  _id,
                  type: "motivate_me",
                  title,
                  content,
                  categories: categories == [""] ? null : categories,
                  tags: tags == [""] ? null : tags,
                  author,
                  image: files["cover"].name ? files["cover"].name : "",
                },
                function (error, result) {
                  error
                    ? console.log(error)
                    : Post.find({ type: "motivate_me" })
                        .populate("author", "_id first_name last_name")
                        .exec((err, motivate_me) => {
                          err
                            ? console.log(err)
                            : res.render("admin/containers/index", {
                                ...ROUTE_CONFIG,
                                page: "motivate_me",
                                title: "MotivateMes List",
                                motivate_me,
                                response: { result },
                                currentUser,
                              });
                        });
                }
              )
            : new Post({
                type: "motivate_me",
                title,
                content,
                categories: categories == [""] ? null : categories,
                tags: tags == [""] ? null : tags,
                author: currentUser._id,
                image: files["cover"].name ? files["cover"].name : "",
                status:"published"
              }).save(function (error, result) {
                error
                  ? console.log(error)
                  : Post.find({ type: "motivate_me" })
                      .populate("author", "_id first_name last_name")
                      .exec((err, motivate_me) => {
                        err
                          ? console.log(err)
                          : res.render("admin/containers/index", {
                              ...ROUTE_CONFIG,
                              page: "motivate_me",
                              title: "MotivateMes List",
                              motivate_me,
                              response: { result },
                              currentUser,
                            });
                      });
              });
        }
      });
    });
  }
});

/* GET motivate_me list page. */
router.get("/", getAllMotivateMe, function (req, res, next) {
  let { currentUser, motivate_me_list } = req;

  res.render("admin/containers/index", {
    ...ROUTE_CONFIG,
    page: "motivate_me",
    title: "MotivateMes List",
    motivate_me:motivate_me_list,
    response: null,
    currentUser,
  });
});

module.exports = router;
