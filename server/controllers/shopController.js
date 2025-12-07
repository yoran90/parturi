import Shop from "../models/shopModel.js";
import cloudinary from "../config/cloudinary.js";

export const createShopMedia = async (req, res) => {
  try {
    const { title, description } = req.body;
    const files = req.files;

    let mediaUploads = [];

    if (files && files.length > 0) {
      mediaUploads = files.map((file) => ({
        type: file.mimetype.startsWith("image") ? "image" : "video",
        src: file.path,          
        publicId: file.filename, 
      }));
    }

    let shop = await Shop.findOne();

    if (shop) {
      if (mediaUploads.length > 0) {
        const existingPublicIds = shop.media.map((m) => m.publicId);
        const newMedia = mediaUploads.filter(
          (m) => !existingPublicIds.includes(m.publicId)
        );

        shop.media.push(...newMedia);
      }

      if (title) shop.title = title;
      if (description) shop.description = description;
    } else {
      shop = new Shop({
        title: title || undefined,
        description: description || undefined,
        media: mediaUploads,
      });
    }

    await shop.save();

    res.status(200).json({ message: "Shop media updated", shop });
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