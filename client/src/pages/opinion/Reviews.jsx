import React, { useEffect, useRef, useState } from 'react'
import useReviews from '../../hooks/useReviews';
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import ReviewText from './ReviewText';
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaRegCommentDots, FaReply, FaTrash } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { IoMdImage } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsHandThumbsUp } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ReplyItem from './ReplyItem';










const Reviews = () => {

  const { user } = useSelector((state) => state.userAuth);
  const { getReviews, setGetReviews } = useReviews();

  const navigate = useNavigate();

  const [comment, setComment] = useState({});
  const [imageComment, setImageComment] = useState(null);
  const [showTheComment, setShowTheComment] = useState(false);
  const [showLiked, setShowLiked] = useState(false);
  const [openReplyInput, setOpenReplyInput] = useState({reviewId: null, commentId: null});
  const [reply, setReply] = useState({});
  const [imageReply, setImageReply] = useState({});

  /* Open comment */
  const handleToggleComment = (itemId) => {
    if (showTheComment === itemId) {
      setShowTheComment(null);
    } else {
      setShowTheComment(itemId);
    }
  }
  /* Toggle like */
  const handleToggleLike = (itemId) => {
    if (showLiked === itemId) {
      setShowLiked(null);
    } else {
      setShowLiked(itemId);
    }
  }

  /* open reply  */
  const handleOpenReply = (reviewId, commentId) => {
    if (openReplyInput.reviewId === reviewId && openReplyInput.commentId === commentId) {
      setOpenReplyInput({ reviewId: null, commentId: null });
    } else {
      setOpenReplyInput({ reviewId, commentId });
    }
  };
  
  
  /* Create comment  */
  const handleSubmit = async (reviewId) => {
    const text = comment[reviewId]; 

    if (!text || text.trim() === "") {
      toast.error("Please enter a comment.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("comment", text); 

      const thisImage = imageComment;

      if (thisImage) {
        formData.append("imageComment", thisImage);
      }

      const response = await axios.post(`http://localhost:8001/api/reviwes/${reviewId}/addComment`, formData,{ withCredentials: true });
      const updatedReviews = getReviews.map((review) =>
        review._id === reviewId
          ? { ...review, comments: response.data.comment }
          : review
      );

      setGetReviews(updatedReviews);
      setComment((prev) => ({ ...prev, [reviewId]: "" }));
      setImageComment((prev) => ({ ...prev, [reviewId]: null }));
      handleToggleComment(reviewId);

    } catch (error) {
      console.log(error);
    }
  };


  


  /* Create reply */
  const handleSubmitReply = async (reviewId, parentId, formData) => {

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:8001/api/reviwes/${reviewId}/comments/${parentId}/reply`, formData, { 
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
      toast.success("Reply added successfully.");

      // clear inputs
      const key = `${reviewId}-${parentId}`;
      setReply(prev => ({ ...prev, [key]: "" }));
      setImageReply(prev => ({ ...prev, [key]: null }));

      const updatedReview = response.data.review;

setGetReviews(prevReviews =>
  prevReviews.map(r =>
    r._id === updatedReview._id ? updatedReview : r
  )
);


    
      setGetReviews(updatedReviews);
    } catch (error) {
      console.log(error);
    }
  };


  /* Like Review */
  const handleClickLike = async (reviewId) => {
    if (!user) {
      toast.error("You must be logged in to like");
      navigate('/kirjaudu');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8001/api/reviwes/${reviewId}/like`, {}, { withCredentials: true });


      const updatedReviews = getReviews.map(review => {
        if (review._id === reviewId) {
          return { ...review, likes: response.data.likes };
        }
        return review;
      });

      setGetReviews(updatedReviews);

    } catch (error) {
      console.log(error);
    }
  };

  /* Remove comment image */
  const removeCommentImage = (reviewId) => {
    setImageComment((prev) => ({ ...prev, [reviewId]: null }));
  };




  return (
    <div>
      {/* reviews */}
      {
        getReviews?.length === 0 && (
          <div className='text-center text-slate-500 text-sm mt-12'>No Reviews yet</div>
        )
      }
      {
        getReviews?.map((item, index) => {
          return (
            <div key={index} className='border-t border-b border-slate-300 pt-5 pb-5'>
              <div className='flex justify-between gap-2'>
                <Link to={`/profile/${item?.userId}`} className='flex gap-2'>
                  {
                    item?.profileImage ? (
                      <img className='w-8.5 h-8.5 border border-slate-100 rounded-full' src={item?.profileImage} alt="" />
                    ) : (
                      item?.gender === 'men' ? (
                        <img className='w-8.5 h-8.5 rounded-full border border-slate-100 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                      ) : (
                        <img className='w-8.5 h-8.5  rounded-full border border-slate-100' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                      )
                    )
                  }
                  <div className='flex flex-col'>
                    <p className='text-slate-600 text-sm'>{item?.firstName} {item?.lastName}</p>
                    <small className="text-xs text-slate-500">
                      {new Date(item?.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </small>
                  </div>
                </Link>
                <div className='text-sm flex flex-col items-center'>
                  <div className='flex gap-0.5'>
                    {
                      [...Array(5)].map((_, index) => {
                        return (
                          index < item.rating ? 
                            <div key={index}>
                              <GoStarFill className='text-yellow-500' size={16} /> 
                            </div>
                          : 
                            <div key={index}>
                              <GoStar size={16}  className='text-slate-500' />
                            </div>
                        )
                      })
                    }
                  
                  </div>
                  <span className='text-slate-600'>{item?.rating} / 5</span>
                </div>
              </div>
              <div className='relative gap-2 text-justify'>
                <div className={`text-[13px] text-slate-700 mt-4`}>
                 <ReviewText text={item?.reviewText} />          
                </div>
              </div>
              {item?.image && (
                <img className='w-full h-72 object-fill border border-slate-300 rounded mt-2' src={item?.image?.url} alt="" />
              )
              }
              {/* like comments icon */}
              <hr className='text-slate-300 mb-3 mt-3' />
              <div className='flex items-center gap-[30%] relative'>
                <div className='flex items-center gap-1 cursor-pointer'>
                  <button type='button' onClick={() => handleClickLike(item._id)} className='cursor-pointer'>
                  {
                    item.likes.likedBy?.some(like => like.userId?.toString() === user?._id?.toString()) ? (
                      <GoHeartFill className='text-red-600' />
                    ) : (
                      <GoHeart className='text-slate-500' />
                    )
                  }
                  </button>
                  <button type='button' onClick={() => handleToggleLike(item._id)} className='text-xs text-slate-600 cursor-pointer' title='Katso kuka tykkäsi'>
                    {item?.likes?.count} Likes
                  </button>
                  {/* show who liked */}
                    {
                      showLiked === item._id && (
                        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black/70'>
                          <div className='bg-white relative flex flex-col shadow md:w-full w-[93%]  max-w-xl md:px-6 px-3 md:py-8 py-6 rounded'>
                            
                              <>
                              {
                                item?.likes?.likedBy?.length === 0 ? (
                                  <div className='text-center text-slate-500 text-sm'>
                                    <button className='top-3 right-3 absolute text-xs cursor-pointer' onClick={() => setShowLiked(false)}>❌</button>
                                    <h1 className='text-red-600'>Kukaan ei ole vielä tykännyt tästä arvostelusta</h1>
                                  </div>
                                ) : (
                                  <div>
                                    <button className='top-3 right-3 absolute text-xs cursor-pointer' onClick={() => setShowLiked(false)}>❌</button>
                                    <h1 className='text-sm mb-4'>Tykätty</h1>
                                  </div>
                                )
                              }
                              </>
                              <div className='h-[60vh] overflow-y-scroll scrollbarStyle pr-6'>
                                {
                                  item?.likes?.likedBy?.length > 0 && item?.likes?.likedBy?.map((like, index) => (
                                    <div key={index} className='flex items-center justify-between gap-3 border-b border-slate-100 py-2.5 last:border-b-0 '>
                                      <div className='flex items-center gap-3.5'>
                                        {
                                          like?.profileImage ? (
                                            <img className='w-10 h-10 border border-slate-500 rounded-full' src={like?.profileImage} alt="" />
                                          ) : (
                                            like?.gender === 'men' ? (
                                              <img className='w-10 h-10 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                                            ) : (
                                              <img className='w-10 h-10  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                                            )
                                          )
                                        }
                                        <div className='flex flex-col'>
                                          <h3 className='text-sm'>{like?.firstName} {like?.lastName}</h3>
                                          <small className='text-xs text-slate-500'>{new Date(like?.likedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</small>
                                        </div>
                                      </div>
                                      <div>
                                        <button type='button' onClick={() => navigate(`/profile/${like?.userId}`)} className='text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded cursor-pointer'>Näytä profiili</button>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                          </div>
                        </div>
                      )
                    }
                    
                </div>
                <div onClick={() => {
                  if (!user) {
                    toast.error("Sinun tulee kirjautua sisään, jotta voit commentoida");
                    navigate('/kirjaudu');
                    return
                  }
                  handleToggleComment(item._id);
                }} className='flex gap-1 cursor-pointer'>
                  <FaRegCommentDots className='text-slate-500' />
                  <span className='text-xs text-slate-600'>{item?.comments?.length} Comments</span>
                </div>
              </div>
              <hr className='text-slate-300 mb-3 mt-3' />

              {/* display comments and replay */}
              {
                showTheComment === item._id && (
                  <>
                  {
                      item?.comments?.length > 0 ? (
                        <div className='flex flex-col gap-3 mt-2 bg-slate-50 p-2 rounded'>
                          {
                            item?.comments?.map((comment) => (
                              <div key={comment._id} className='border-b last:border-b-0 border-slate-300 pt-2 pb-2'>
                                <Link to={`/profile/${comment?.userId}`} className='flex items-center gap-3'>
                                  {
                                    comment?.profileImage ? (
                                      <img className='w-7 h-7 border border-slate-500 rounded-full' src={comment?.profileImage} alt="" />
                                    ) : (
                                      comment?.gender === 'men' ? (
                                        <img className='w-7 h-7 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                                      ) : (
                                        <img className='w-7 h-7  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                                      )
                                    )
                                  }
                                  <div className='flex flex-col gap-0'>
                                    <p className='text-xs text-slate-700'>{comment?.firstName} {comment?.lastName}</p>
                                    <small className='text-[11px] text-slate-400'>{new Date(comment?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</small>
                                  </div>
                                </Link>
                                <p className='text-[13px] ml-10 mt-2'>{typeof comment?.comment === 'string' ? comment.comment : comment?.comment?.comment || ''}</p>
                                <div className='ml-10 overflow-hidden'>

                                {
                                  comment?.imageComment && (
                                    <img className='w-42 h-32 object-fill border border-slate-500 rounded mt-2' src={comment?.imageComment?.url} alt="" />
                                  )
                                }
                                </div>
                                {/* reply */}
                                <div className='flex gap-4 text-[12px] ml-10 mt-2.5'>
                                  {/* replya */}
                                  <button onClick={() => handleOpenReply(item._id, comment._id)} type='button' className='flex gap-1 text-blue-500 cursor-pointer'>
                                    {openReplyInput.reviewId === item._id && openReplyInput.commentId === comment._id ? (
                                      <IoIosArrowDown />
                                    ) : (
                                      <IoIosArrowUp />
                                    )
                                  }
                                  {comment?.replies?.length}
                                    <p>Reply</p>
                                    <FaReply />
                                  </button>
                                  {/* like comment */}
                                 {/*  <div className='flex gap-1 items-center text-blue-500'>
                                    <BsHandThumbsUp size={14} />
                                    <p>0 Likes</p>
                                  </div> */}
                                </div>
                                {/* Display reply comments */}
                                {comment?.replies?.length > 0 && openReplyInput.reviewId === item._id && openReplyInput.commentId === comment._id && (
                                  <div className='ml-10 mt-2.5'>
                                    {comment.replies.map((childReply, index) => (
                                      <ReplyItem
                                        key={`${reply?._id || 'parent'}-${childReply?._id || index}`}
                                        reply={childReply}
                                        reviewId={item._id}
                                        parentId={comment._id}
                                        onReply={handleSubmitReply}
                                      />
                                    ))}
                                  </div>
                                )}

                                {/* add replay comment */}
                                {
                                  openReplyInput.reviewId === item._id && openReplyInput.commentId === comment._id && (
                                    <div className='ml-10 mt-3'>
                                      <hr className='mb-3 text-slate-200' />
                                      {
                                        user && (
                                          <div className='flex items-center gap-1 cursor-pointer'>
                                            {
                                              user?.profileImage?.url ? (
                                                <img className='w-7 h-7 border border-slate-500 rounded-full' src={user?.profileImage?.url} alt="" />
                                              ) : (
                                                user?.gender === 'men' ? (
                                                  <img className='w-7 h-7 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                                                ) : (
                                                  <img className='w-7 h-7  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                                                )
                                              )
                                            }
                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                const key = `${item._id}-${comment._id}`;
                                                
                                                const formData = new FormData();
                                                formData.append("reply", reply[key] || "");
                                                if (imageReply[key]) formData.append("imageReply", imageReply[key]);

                                                handleSubmitReply(item._id, comment._id, formData);
                                              }} 
                                              className='w-full flex rounded-full text-[12px] px-3 py-1 border border-slate-300'
                                            >
                                              <input type="text" value={reply[`${item._id}-${comment._id}`] || ''} onChange={(e) => setReply({ ...reply, [`${item._id}-${comment._id}`]: e.target.value })} className='border-none w-full outline-none' placeholder='Kirjoittaa kommentti...'/>
                                              <label htmlFor={`imageReply-${item._id}-${comment._id}`} className='pl-4'>
                                                <IoMdImage size={15} className='text-slate-500 cursor-pointer' />
                                                <input type="file" id={`imageReply-${item._id}-${comment._id}`} onChange={(e) => setImageReply({ ...imageReply, [`${item._id}-${comment._id}`]: e.target.files[0], })} className='hidden' />
                                              </label>
                                            </form>
                                          </div>
                                        )
                                      }
                                    </div>
                                  )
                                }
                              </div>
                            ))
                          }
                        </div>
                      ) : (
                        <div className='flex flex-col items-center justify-center gap-2'>
                          <p className='text-sm text-red-500'>Ei kommentteja tällä sivulla</p>
                          <img className='w-12 h-12' src="https://preview.redd.it/how-do-i-get-a-comment-image-on-my-comment-v0-pwo3s672g6cf1.jpeg?auto=webp&s=619135a48c4e5cde6b5e49ff2a4becb9676e930b" alt="" />

                        </div>
                      )
                    }
                  </>
                )
              }
              
              <hr className='text-slate-300 mb-3 mt-3' />
              {/* add comment in input */}
              <div>
                {
                  user && (
                    <div className='flex items-center gap-1 cursor-pointer'>
                      {
                        user?.profileImage?.url ? (
                          <img className='w-7 h-7 border border-slate-500 rounded-full' src={user?.profileImage?.url} alt="" />
                        ) : (
                          user?.gender === 'men' ? (
                            <img className='w-7 h-7 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                          ) : (
                            <img className='w-7 h-7  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                          )
                        )
                      }
                      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(item._id) }} className='w-full flex rounded-full text-[12px] px-3 py-1 border border-slate-300'>
                        <input type="text" value={comment[item._id] || ''} onChange={(e) => setComment({ ...comment, [item._id]: e.target.value })} className='border-none w-full outline-none' placeholder='Kirjoittaa kommentti...'/>
                        <label htmlFor={`imageComment-${item._id}`} className='pl-4'>
                          <IoMdImage size={15} className='text-slate-500 cursor-pointer' />
                          <input type="file" id={`imageComment-${item._id}`} onChange={(e) => setImageComment({ ...imageComment, [item._id]: e.target.files[0] })} className='hidden' />
                        </label>
                      </form>
                    </div>
                  )
                }
              </div>
              <div className='flex flex-col mt-2'>
               
                {imageComment && imageComment[item._id] && (
                  <div className='flex flex-col px-4'>
                     <button onClick={() => removeCommentImage(item._id)} className='flex justify-end text-end mb-2'>
                      <FaTrash size={15} className='text-red-500 cursor-pointer' />
                    </button>
                    <img
                      src={URL.createObjectURL(imageComment[item._id])}
                      alt=""
                      className="w-full h-52 object-cover ml-2 rounded"
                      
                      />
                  </div>
                )}
              </div>
            </div>
          )
        })
      }
      {/* end reviews */}

    </div>
  )
}

export default Reviews

