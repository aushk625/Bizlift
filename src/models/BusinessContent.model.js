import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    category: String,

    image: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    content: {
  type: mongoose.Schema.Types.Mixed,
  default: {},
},

    aiGenerated: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const businessContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      unique: true,
    },

    items: [itemSchema],
  },
  { timestamps: true }
);

businessContentSchema.index({ businessId: 1 });

export default mongoose.model("BusinessContent", businessContentSchema);
