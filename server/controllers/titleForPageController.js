import TitleForPage from "../models/titleForPage.js";



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