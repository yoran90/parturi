import Question from '../models/questionModel.js';


export const createQuestion = async (req, res) => {
  try {
    const { email, question } = req.body;
    console.log(req.body);

    if (!email) {
      return res.status(400).json({ message: "Sähköpostiosoitte on pakollinen" });
    }
    if (!question) {
      return res.status(400).json({ message: "Kysymys on pakollinen" });
    }

    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const getSingleQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json(question);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteSingleQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndDelete(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.status(200).json({ message: "Question deleted successfully", question });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllQuestions = async (req, res) => {
  try {
    const result = await Question.deleteMany({});
    res.status(200).json({ message: "All questions deleted successfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}