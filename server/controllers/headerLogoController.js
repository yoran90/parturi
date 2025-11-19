import HeaderLogo from "../models/headerLogo.js";
import cloudinary from "../config/cloudinary.js";


//! add logo for header
export const addHeaderLogo = async (req, res) => {
  try {
    const { url, publicId } = req.body;

    const exsitingLogo = await HeaderLogo.findOne();

    let logoInfo;
    if (exsitingLogo) {
      logoInfo = await HeaderLogo.findByIdAndUpdate(exsitingLogo._id, { url, publicId }, { new: true });
    } else {
      logoInfo = await HeaderLogo.create({ url, publicId });
    }

    res.status(201).json({ message: "Header logo added successfully ✅", logoInfo });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}


