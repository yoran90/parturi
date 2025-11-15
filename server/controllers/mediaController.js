import Media from "../models/Media.js";
import fs from "fs";
import path from "path";
import Galleri from "../models/Galleri.js";


//! Upload Media
export const uploadMedia = async (req, res) => {
  try {
    const { type, alt } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const newMedia = new Media({
      type,
      src: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
      alt,
    });

    await newMedia.save();
    res.status(201).json({ success: true, data: newMedia });


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! get Media List
export const getMediaList = async (req, res) => {
  try {
    const mediaList =  await Media.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: mediaList });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! delete media by id
export const deleteMediaById = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }
    // get the file path from the src URL
    const filePath = path.join(process.cwd(), 'uploads', path.basename(media.src));

    // delete the file from the uploads folder
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
    await Media.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Media deleted successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* upload Galleri */
//! create galleria image
export const uploadGalleriImage = async (req, res) => {
  try {
    const imagePths = req.files.map(file=> file.path);

    const gallery = new Galleri({images: imagePths});
    await gallery.save();
    res.status(201).json({ success: true, data: gallery });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! get galleri images
export const getGalleriImages = async (req, res) => {
  try {
    const galleriImages = await Galleri.find().sort({ createdAt: -1 });
    res.status(201).json({ success: true, data: galleriImages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! delete galleri image by id 
export const deleteGalleryImage = async (req, res) => {
  const { galleryId, imagePath } = req.body;

  try {
    const gallery = await Galleri.findById(galleryId);
    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery not found" });
    }

    // Remove image from DB
    gallery.images = gallery.images.filter(image => image !== imagePath);
    await gallery.save();

    // Delete file from uploads folder
    const fullPath = path.join(process.cwd(), imagePath);
    fs.unlink(fullPath, err => {
      if (err) {
        console.error("Error deleting file:", err.message);
      } 
    });

    res.status(200).json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
