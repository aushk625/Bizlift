import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      unique: true,
    },

    uuid: {
      type: String,
      required: true,
      unique: true,
    },

    layoutId: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Website =
  mongoose.models.Website ||
  mongoose.model("Website", websiteSchema);

export default Website;