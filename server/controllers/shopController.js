import Shop from "../models/shopModel.js";
import cloudinary from "../config/cloudinary.js";


//! create shop media
export const createShopMedia = async (req, res) => {
  try {
    const { title, description, existingMedia } = req.body; // existingMedia is array of publicId
    const files = req.files;

    let shop = await Shop.findOne();

    if (!shop) {
      shop = new Shop({ title: title || "", description: description || "", media: [] });
    }

    // Update title and description
    shop.title = title || "";
    shop.description = description || "";

    // Parse remaining publicIds from frontend
    const remainingPublicIds = existingMedia ? JSON.parse(existingMedia) : [];

    // Find media to delete
    const deletedMedia = shop.media.filter(
      (m) => !remainingPublicIds.includes(m.publicId)
    );

    // Delete from Cloudinary
    for (const media of deletedMedia) {
      try {
        await cloudinary.uploader.destroy(media.publicId, {
          resource_type: media.type === "video" ? "video" : "image",
        });
      } catch (err) {
        console.log("Cloudinary delete error:", err.message);
      }
    }

    // Keep only remaining media
    shop.media = shop.media.filter((m) => remainingPublicIds.includes(m.publicId));

    // Add new uploads
    if (files && files.length > 0) {
      const newUploads = files.map((file) => ({
        type: file.mimetype.startsWith("image") ? "image" : "video",
        src: file.path,
        publicId: file.filename, // CloudinaryStorage filename
      }));
      shop.media.push(...newUploads);
    }

    await shop.save();

    res.status(200).json({ message: "Shop media saved successfully", shop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



//! get shop
export const getShopMedia = async (req, res) => {
  try {
    const shop = await Shop.findOne();
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}