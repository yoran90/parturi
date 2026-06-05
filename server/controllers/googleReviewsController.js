import axios from 'axios';



/* export const getGoogleReviews = async (req, res) => {
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
    console.log("Fetched Google reviews:", reviews);
    console.log("Fetched Google rating:", rating);

    res.status(200).json({ reviews, rating });
  } catch (error) {
    console.error("Catch block:", error.response?.data || error.message);

    res.status(500).json({
      message: error.message,
      googleError: error.response?.data,
    });
  }
};  */

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

    console.log("Google response:", response.data);

    if (response.data.status !== "OK") {
      return res.status(400).json({
        error: response.data.status,
        message: response.data.error_message,
        full: response.data,
      });
    }

    const result = response.data.result || {};

    res.json({
      reviews: result.reviews || [],
      rating: result.rating || 0,
    });

  } catch (error) {
    console.error("Catch block:", error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
};
