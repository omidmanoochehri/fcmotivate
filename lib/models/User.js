const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema(
  {
    user: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "artist", "curator", "user"],
      default: "artist",// should be changed to "user"
      required: true,
    },
    account: {
      type: String,
      unique: true,
      required: true,
    },
    fullname: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    someOfArtworks: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    created_by: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    behance: {
      type: String,
      required: false,
    },
    discord: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    youtube: {
      type: String,
      required: false,
    },
    tiktok: {
      type: String,
      required: false,
    },
    snapchat: {
      type: String,
      required: false,
    },
    whatsApp: {
      type: String,
      required: false,
    },
    openSea: {
      type: String,
      required: false,
    },
    ipfs: {
      type: String,
      required: false,
    },
    etherscan: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = Mongoose.model("User", UserSchema);
