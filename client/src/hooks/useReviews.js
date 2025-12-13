import axios from "axios";
import { useEffect, useState } from "react";

export default function useReviews() {

  const [getReviews, setGetReviews] = useState(null);

  const fetchReviwes = async () => {
    const response = await axios.get("http://localhost:8001/api/reviwes/getReviews");
    setGetReviews(response.data);
  }

  useEffect(() => {
    fetchReviwes();
  }, []);

  return { getReviews, setGetReviews, fetchReviwes };
}

export function useReviewById(id) {

  if (!id) return;

  const [getReview, setGetReview] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchReviweById  = async () => {
      const response = await axios.get(`http://localhost:8001/api/auth/getReview/${id}`, { withCredentials: true });
      setGetReview(response.data);
    }
    fetchReviweById();
  }, [id]);

  return { getReview, setGetReview };
}
//! admin delete user review post by id
export function useDeleteReviewById(id) {
  const [deleteReview, setDeleteReview] = useState(null);
  const [loadingForButton, setLoadingForButton] = useState(false);


    const deleteReviewHnadler  = async () => {
      try {
        setLoadingForButton(true);
        const response = await axios.delete(`http://localhost:8001/api/auth/deleteReview/${id}`, { withCredentials: true });
        setDeleteReview(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingForButton(false);
      }
    }


  return { deleteReview, deleteReviewHnadler, loadingForButton };
}

//! user delete own review post by id
export function useDeleteReviewByUser() {


  const [userDeleteOwnReview, setUserDeleteOwnReview] = useState(null);
  const [loadingForDeleteUserReview, setLoadingForDeleteUserReview] = useState(false);
 

  const userDeleteOwnreviewPost = async (id) => {
    try {
      setLoadingForDeleteUserReview(true);
      const response = await axios.delete(`http://localhost:8001/api/reviwes/deleteReview/${id}`, { withCredentials: true });
      setUserDeleteOwnReview(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForDeleteUserReview(false);
    }
  }


  return { userDeleteOwnReview, userDeleteOwnreviewPost, loadingForDeleteUserReview };

};