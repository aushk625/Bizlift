import Business from "../models/Business.model.js";

export const createBusiness = async (req, res) => {
  try {
    const business = await Business.create({
      userId: req.user.id,
      ...req.body
    });

    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getMyBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(businesses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBusiness = await Business.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // 👈 ownership check
      req.body,
      { new: true }
    );

    if (!updatedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.json(updatedBusiness);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBusiness = await Business.findOneAndDelete({
      _id: id,
      userId: req.user.id // 👈 ownership enforced
    });

    if (!deletedBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

    res.json({ message: "Business deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


