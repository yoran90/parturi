import About from "../models/aboutUsModel.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";




//! create about us
export const addAboutUs = async (req, res) => {
  try {
    const { imageTitles, sections } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "paturi",
    });


    const paresImageTitles = typeof imageTitles === "string" ? JSON.parse(imageTitles) : imageTitles || [];
    const parsedSections = typeof sections === "string" ? JSON.parse(sections) : sections || [];

    const about = new About({
      image: result.secure_url,
      imageTitles: paresImageTitles,
      sections: parsedSections,
    });

    await about.save();

    res.status(201).json({ message: "About us added successfully", about });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! get about us
export const getAboutUs = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About us not found" });
    }
    res.status(200).json(about);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! update about us
export const updateAboutUs = async (req, res) => {
  try {
    const { imageTitles, sections } = req.body;

    let about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About us not found" });
    }

    if (req.file) {
      if (about.image) {
        const segments = about.image.split("/");
        const filename = segments.pop(); 
        const folder = segments.pop();   
        const publicId = `${folder}/${filename.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "paturi",
      });
      about.image = result.secure_url;
    }

    
    if (imageTitles) {
      about.imageTitles = typeof imageTitles === "string" ? JSON.parse(imageTitles) : imageTitles || [];
    }

    if (sections) {
      about.sections = typeof sections === "string" ? JSON.parse(sections) : sections || [];
    }

    await about.save();

    res.status(200).json({ message: "About us updated successfully", about });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}