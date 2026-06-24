import BusinessContent from "../models/BusinessContent.model.js";
import Business from "../models/Business.model.js";

export const addItem = async (req, res) => {
  try {
    const { businessId } = req.params;
    const itemData = req.body;

    const business = await Business.findOne({
      _id: businessId,
      userId: req.user.id,
    });

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    let contentDoc = await BusinessContent.findOne({ businessId });

    if (!contentDoc) {
      contentDoc = await BusinessContent.create({
        userId: req.user.id,
        businessId,
        items: [],
      });
    }

    contentDoc.items.push(itemData);
    await contentDoc.save();

    res.status(201).json(contentDoc.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getItems = async (req, res) => {
  try {
    const { businessId } = req.params;

    const contentDoc = await BusinessContent.findOne({
      businessId,
      userId: req.user.id,
    });

    if (!contentDoc) {
      return res.json([]);
    }

    res.json(contentDoc.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateItem = async (req, res) => {
  try {
    const { businessId, itemId } = req.params;

    const contentDoc = await BusinessContent.findOne({
      businessId,
      userId: req.user.id,
    });

    if (!contentDoc) {
      return res.status(404).json({ message: "Content not found" });
    }

    const item = contentDoc.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    Object.assign(item, req.body);
    await contentDoc.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const { businessId, itemId } = req.params;

    const contentDoc = await BusinessContent.findOne({
      businessId,
      userId: req.user.id,
    });

    if (!contentDoc) {
      return res.status(404).json({ message: "Content not found" });
    }

    contentDoc.items.id(itemId).deleteOne();
    await contentDoc.save();

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
