import HeaderPages from "../models/headerPagesModel.js";

//! craete header Pages
export const createHeaderPages = async (req, res) => {
  const { name, path } = req.body;

  try {
    if (!name?.trim() || !path?.trim()) {
      return res.status(400).json({ message: "Name and path are required" });
    }

    let page = await HeaderPages.findOne({ path: path.trim() });

    if (page) {
      page.name = name.trim();
      page.path = path.trim();
      const updatePage = await page.save();
      res.status(200).json({ message: "Page updated successfully ✅", updatePage });
    } else {
      const newPage = await HeaderPages.create({ 
        name: name.trim(), 
        path: path.trim() 
      });
      res.status(200).json({ message: "Page created successfully ✅", newPage });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! get header pages
export const getHeaderPages = async (req, res) => {
  try {
    const headerPages = await HeaderPages.find();
    res.status(200).json(headerPages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! update header Pages
export const updateHeaderPages = async (req, res) => {
  try {
    const { name, path } = req.body;

    if (!name?.trim() || !path?.trim()) {
      return res.status(400).json({ message: "Name and path are required" });
    }

    const page = await HeaderPages.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    page.name = name.trim();
    page.path = path.trim();
    const updatedPage = await page.save();

    res.status(200).json({ message: "Page updated successfully ✅", updatedPage }); 

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};