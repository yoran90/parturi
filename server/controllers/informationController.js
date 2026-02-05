import Information from "../models/InformationModel.js";



//! Save information or create information
export const saveInformation = async (req, res) => {
  try {
    const data = req.body;
     console.log("REQ BODY FULL 👉", req.body);
    console.log("HEADER TEXT 👉", req.body.headerText);

    const existingInformation = await Information.findOne();
    let info;

    if (existingInformation) {
      info = await Information.findByIdAndUpdate(existingInformation._id, data, { new: true });
    } else {
      info = await Information.create(data);
    }

    res.status(200).json({ message: "Information saved successfully ✅", info });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

//! Get information
export const getInformation = async (req, res) => {
  try {
    const info = await Information.findOne();
    res.status(200).json(info);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}