import axios from 'axios';


export const getGoogleReviews = async (req, res) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: process.env.GOOGLE_REVIEWS_PLACE_ID,
          fields: "reviews,rating",
          key: process.env.GOOGLE_REVIEWS_API_KEY,
        },
      }
    );
    const { reviews, rating } = response.data.result;
    
    res.status(200).json({ reviews, rating });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch Google reviews" });
  }
};