const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const MembershipPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    monthlyFee: {
      type: Number,
      required: false,
    },
    yearlyFee: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "published", "deleted"],
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = Mongoose.model("MembershipPlan", MembershipPlanSchema);
