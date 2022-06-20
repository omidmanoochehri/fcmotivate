const Artwork = require("../models/Artwork");

exports.getArtwork = function (req, res, next) {
  let artwork_id = req.params.artwork_id || req.body.artwork_id;
  Artwork.findOne({ _id: artwork_id }).exec((err, artwork) => {
    if (err) {
      console.log(err);
      res.sendStatus(500).json({
        result: false,
        response: "Unknown Error",
      });
    } else {
      req.artwork = artwork;
      next();
    }
  });
};
