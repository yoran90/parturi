import HeaderLogo from "../models/headerLogo.js";
import cloudinary from "../config/cloudinary.js";

export const addHeaderLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Logo image is required" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "paturi",
      overwrite: true,  
      invalidate: true,  
    });

    const newUrl = result.secure_url;
    const newPublicId = result.public_id;

    const existingLogo = await HeaderLogo.findOne();

    if (existingLogo) {
      if (existingLogo.publicId) {
        await cloudinary.uploader.destroy(existingLogo.publicId, { invalidate: true });
      }

      existingLogo.url = newUrl;
      existingLogo.publicId = newPublicId;
      await existingLogo.save();
      return res.status(200).json({
        message: "Header logo updated successfully",
        logo: existingLogo,
      });
    } else {
      const createLogo = await HeaderLogo.create({
        url: newUrl,
        publicId: newPublicId,
      });

      return res.status(201).json({
        message: "Header logo added successfully",
        logo: createLogo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


//! get logo for header
export const getHeaderLogo = async (req, res) => {
  try {
    const logo = await HeaderLogo.findOne();
    if (!logo) {
      return res.status(404).json({ message: "Header logo not found" });
    }
    res.status(200).json(logo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
