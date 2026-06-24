import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Identity
    businessName: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    establishedYear: {
      type: Number
    },

    // Contact
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    whatsappNumber: {
      type: String
    },

    // Location
    address: {
      type: String,
      required: true
    },
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: "India"
    },

    // Branding
    logo: {
      type: String   // store image URL
    },
    themeColor: {
      type: String,
      default: "#000000"
    },

    // Social Links
    socialLinks: {
      facebook: String,
      instagram: String,
      youtube: String
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", businessSchema);
export default Business;
