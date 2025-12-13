import Media from "../models/MediaModel.js";
import Galleri from "../models/GalleriModel.js";
import cloudinary from "../config/cloudinary.js";


//! Upload Media
export const uploadMedia = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const mimeType = req.file.mimetype.split('/')[0]; 
    if (!['image', 'video'].includes(mimeType)) {
      return res.status(400).json({ success: false, message: "Invalid file type" });
    }

    const newMedia = new Media({
      type: mimeType,
      src: req.file.path,
      alt: req.body.alt || req.file.originalname,
      publicId: req.file.filename
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
    const { id } = req.params; // DELETE /delete/:id
    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.publicId, { resource_type: media.type });

    // Delete from MongoDB
    await media.deleteOne();

    res.status(200).json({ success: true, message: "Media deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* upload Galleri */
//! create galleria image
export const uploadGalleriImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const images = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));

    const gallery = new Galleri({ images });
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
    const limit = parseInt(req.query.limit) || 0;
    const galleriImages = await Galleri.find().sort({ createdAt: -1 }).limit(limit);
    res.status(201).json({ success: true, data: galleriImages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! delete galleri image by id 
export const deleteGalleryImage = async (req, res) => {
  const { galleryId, publicId } = req.body;

  try {
    const gallery = await Galleri.findById(galleryId);
    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery not found" });
    }

    const imageToDelete = gallery.images.find(image => image.publicId === publicId);
    if (!imageToDelete) {
      return res.status(404).json({ success: false, message: "Image not found in gallery" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    gallery.images = gallery.images.filter(image => image.publicId !== publicId);
    await gallery.save();

    res.status(200).json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
