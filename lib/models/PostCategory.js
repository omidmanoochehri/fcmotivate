const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PostCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ["pending", "published", "deleted"],
        required: true,
        default: "pending",
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

module.exports = Mongoose.model("PostCategory", PostCategorySchema);