import TitleForPage from "../models/titleForPage.js";


//! add title for page
export const addTitleForPage = async (req, res) => {
  try {
    const {
      serviceTitle,
      serviceDescription,
      galleriTitle,
      galleriDescription,
      productTitle,
      productDescription,
      footerTitle,
      footerDescription,
      footerFooter,
      connectionTitle,
      connectionDescription
    } = req.body;

    const titleForPage = await TitleForPage.create({
      serviceTitle,
      serviceDescription,
      galleriTitle,
      galleriDescription,
      productTitle,
      productDescription,
      footerTitle,
      footerDescription,
      footerFooter,
      connectionTitle,
      connectionDescription
    });

    const saveTitleForPage = await titleForPage.save();
    res.status(201).json({ message: "Title for page added successfully", saveTitleForPage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//! get title for page 
export const getTitleForPage = async (req, res) => {
  try {
    const titleForPage = await TitleForPage.findOne();

    if (!titleForPage) {
      return res.status(404).json({ message: "Title for page not found" });
    }
    res.status(200).json({ titleForPage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

//! update title for page
export const updateTitleForPage = async (req, res) => {
  try {
    const {
      serviceTitle,
      serviceDescription,
      galleriTitle,
      galleriDescription,
      productTitle,
      productDescription,
      footerTitle,
      footerDescription,
      footerFooter,
      connectionTitle,
      connectionDescription
    } = req.body;

    const titleForPage = await TitleForPage.findOne();

    if (!titleForPage) {
      return res.status(404).json({ message: "Title for page not found" });
    }

    titleForPage.serviceTitle = serviceTitle || titleForPage.serviceTitle;
    titleForPage.serviceDescription = serviceDescription || titleForPage.serviceDescription;
    titleForPage.galleriTitle = galleriTitle || titleForPage.galleriTitle;
    titleForPage.galleriDescription = galleriDescription || titleForPage.galleriDescription;
    titleForPage.productTitle = productTitle || titleForPage.productTitle;
    titleForPage.productDescription = productDescription || titleForPage.productDescription;
    titleForPage.footerTitle = footerTitle || titleForPage.footerTitle;
    titleForPage.footerDescription = footerDescription || titleForPage.footerDescription;
    titleForPage.footerFooter = footerFooter || titleForPage.footerFooter;
    titleForPage.connectionTitle = connectionTitle || titleForPage.connectionTitle;
    titleForPage.connectionDescription = connectionDescription || titleForPage.connectionDescription;

    const updatedTitleForPage = await titleForPage.save();
    res.status(200).json({ message: "Updated successfully ✅", updatedTitleForPage });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}