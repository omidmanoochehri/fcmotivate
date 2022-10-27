const express = require("express");
const formidable = require("formidable");
const router = express.Router();
const fs = require("fs");
const galleryPath = __dirname + "/../../media/gallery/";

router.get("/", (req, res) => {
  fs.readdir(galleryPath, (err, files) => {
    if (err) {
      throw err;
    }

    // files object contains all files names
    // log them on console
    res.send(files);
  });
});

router.post("/upload", function (req, res) {
  if (!fs.existsSync(galleryPath)) {
    fs.mkdirSync(galleryPath, { recursive: true });
  }

  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    fs.readFile(files.media.filepath, function (err, data) {
      let newPath = galleryPath + files.media.originalFilename;
      fs.writeFile(newPath, data, function (err) {
        console.log("Finished writing file..." + err);
        res.send("Finished!");
      });
    });
  });
});

router.delete("/remove", (req, res) => {
  let { filename } = req.body;
  let filePath = galleryPath + filename;

  fs.exists(filePath, function (exists) {
    if (exists) {
      //Show in green
      console.log("File exists. Deleting now ...");
      fs.unlinkSync(filePath);
      res.json({
        response: true,
        message: "OK",
      });
    } else {
      //Show in red
      console.log("File not found, so not deleting.");
      res.json({
        response: false,
        message: "Not Found!",
      });
    }
  });
});

module.exports = router;
