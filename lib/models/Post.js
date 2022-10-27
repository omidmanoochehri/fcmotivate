const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PostSchema = new Schema(
  {
    author: {
      type: Mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "quote",
        "motivate_me",
        "recover_me",
        "mental_training",
        "train_me",
        "get_me_fit",
      ],
      required: true,
      default: "quote",
    },
    content: {
      type: String,
      required: false,
    },
    categories: {
      type: [Mongoose.Types.ObjectId],
      ref: "PostCategory",
      required: false,
    },
    tags: {
      type: [Mongoose.Types.ObjectId],
      ref: "PostTag",
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    images: {
      type: Array,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
    membership_plans:{
      type: [Mongoose.Types.ObjectId],
      ref: "MembershipPlan",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "draft",
      enum: [
        "draft",
        "published",
        "deleted",
      ],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = Mongoose.model("Post", PostSchema);
