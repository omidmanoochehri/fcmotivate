var fs = require("fs");
const util = require("util");
const fileRename = util.promisify(fs.rename);

module.exports = async (file, name, path, callback) => {
  var imageTempPath = file.filepath;
  var imagesPath = __dirname + `/../media/${path}/` + name;
  if (file) {
    await fileRename(imageTempPath, imagesPath)
      .then(function (uploadResult) {
        return callback(true);
      })
      .catch(function (err) {
        console.log("err",err);
        return callback(false);
      });
  } else {
    return callback(false);
  }
};
