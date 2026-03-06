import FeedBack from "../models/feedBackModel.js";



export const createFeedBack = async (req, res) => {
  try {
    const { rating } = req.body;

    if (rating === undefined || rating === null) {
      return res.status(400).json({ message: "Valitse emoji, joka on pakollinen" });
    }

    const feedBack = await FeedBack.create(req.body);
    res.status(201).json(feedBack);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}; 

export const getAllFeedBacks = async (req, res) => {
  try {
    const feedBack = await FeedBack.find().sort({ createdAt: -1 });
    res.status(200).json(feedBack);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getSingleFeedBack = async (req, res) => {
  try {
    const { id } = req.params;

    const feedBack = await FeedBack.findById(id);
    if (!feedBack) {
      return res.status(404).json({ message: "FeedBack not found" });
    }
    res.status(200).json(feedBack);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export const deleteSingleFeedBack = async (req, res) => {
  try {
    const { id } = req.params;

    const feedBack = await FeedBack.findByIdAndDelete(id);
    if (!feedBack) {
      return res.status(404).json({ message: "FeedBack not found" });
    }
    res.status(200).json({ message: "FeedBack deleted successfully", feedBack });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


export const deleteAllFeedBacks = async (req, res) => {
  try {
    await FeedBack.deleteMany({});
    res.status(200).json({ message: "All FeedBack deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}