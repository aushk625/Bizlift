import { v4 as uuidv4 } from "uuid";

import Website from "../models/website.model.js";
import Business from "../models/Business.model.js";
import BusinessContent from "../models/BusinessContent.model.js";

export const createWebsite = async (req, res) => {
  try {
    const { businessId, layoutId } = req.body;

    if (!businessId || !layoutId) {
      return res.status(400).json({
        success: false,
        message: "businessId and layoutId are required",
      });
    }

    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    const existingWebsite = await Website.findOne({
      businessId,
    });

    if (existingWebsite) {
      return res.status(409).json({
        success: false,
        message: "Website already exists for this business",
      });
    }

    const website = await Website.create({
      businessId,
      layoutId,
      uuid: uuidv4(),
    });

    return res.status(201).json({
      success: true,
      message: "Website created successfully",
      data: website,
      publicUrl: `/site/${website.uuid}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPublicWebsite = async (req, res) => {
  try {
    const { uuid } = req.params;

    const website = await Website.findOne({
      uuid,
      isPublished: true,
    });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found",
      });
    }

    const business = await Business.findById(
      website.businessId
    );

    const content = await BusinessContent.findOne({
      businessId: website.businessId,
    });

    return res.status(200).json({
      success: true,
      data: {
        website,
        business,
        content,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLayout = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { layoutId } = req.body;

    const website = await Website.findOneAndUpdate(
      { uuid },
      { layoutId },
      { new: true }
    );

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: website,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWebsiteByBusinessId = async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!businessId) {
      return res.status(400).json({
        success: false,
        message: "businessId is required",
      });
    }

    const website = await Website.findOne({ businessId });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "No website available",
      });
    }

    const business = await Business.findById(website.businessId);

    const content = await BusinessContent.findOne({
      businessId: website.businessId,
    });

    return res.status(200).json({
      success: true,
      data: {
        website,
        business,
        content,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};