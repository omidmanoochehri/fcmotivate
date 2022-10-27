const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = Mongoose.model("User", UserSchema);
