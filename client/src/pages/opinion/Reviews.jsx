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
import { BsThreeDots } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import ReplyItem from './ReplyItem';
import { BsTrash3Fill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import Loading from '../../loading/Loading';
import EditReview from './EditReview';
import ConfirmDelete from '../../admin/pages/ConfirmDelete';
import { RiSendPlaneFill } from "react-icons/ri";



const Reviews = () => {

  const { user } = useSelector((state) => state.userAuth);
  const { getReviews, setGetReviews, fetchReviwes } = useReviews();

  const navigate = useNavigate();
  const location = useLocation();

  const [comment, setComment] = useState({});
  const [imageComment, setImageComment] = useState({});
  const [showTheComment, setShowTheComment] = useState(false);
  const [showLiked, setShowLiked] = useState(false);
  const [openReplyInput, setOpenReplyInput] = useState({reviewId: null, commentId: null});
  const [reply, setReply] = useState({});
  const [imageReply, setImageReply] = useState({});
  const [loadingUserDeleteReview, setLoadingUserDeleteReview] = useState(false);
  const [confirmuserDeleteReview, setConfirmuserDeleteReview] = useState(null);
  const [loadinComment, setLoadingComment] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);
  const [openReviewModel, setOpenReviewModel] = useState(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);


  const handleToggleOpenUserMenu = (reviewId) => {
    setOpenUserMenu(prev => prev === reviewId ? null : reviewId);
  }
  
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutsite = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(null);
      }
    }
    document.addEventListener("click", handleClickOutsite);
    return () => {
      document.removeEventListener("click", handleClickOutsite);
    }
  }, [openUserMenu]);

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
      setLoadingComment((prev) => ({ ...prev, [reviewId]: true }));
      const formData = new FormData();
      formData.append("comment", text); 

      const thisImage = imageComment?.[reviewId];

      if (thisImage) {
        formData.append("imageComment", thisImage);
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviwes/${reviewId}/addComment`, formData,{ withCredentials: true });
      /* const token = localStorage.getItem("token"); // add instaed cookies
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviwes/${reviewId}/addComment`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); */
      
      const updatedReviews = getReviews.map((review) =>
        review._id === reviewId
          ? { ...review, comments: response.data.comment }
          : review
      );

      setGetReviews(updatedReviews);
      setComment((prev) => ({ ...prev, [reviewId]: "" }));
      setImageComment((prev) => ({ ...prev, [reviewId]: null }));
      setShowTheComment(reviewId);
      setOpenUserMenu(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingComment(false);
    }
  };


  


  /* Create reply */
  const handleSubmitReply = async (reviewId, parentId, formData) => {

    try {
      setLoadingReply(true);
      const token = localStorage.getItem("userToken"); // add instaed cookies
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviwes/${reviewId}/comments/${parentId}/reply`, formData, { 
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
      setOpenUserMenu(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReply(false);
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
      setLoadingLike(reviewId);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviwes/${reviewId}/like`, {}, { withCredentials: true });
        /* const token = localStorage.getItem("token"); // add instaed cookies
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/reviwes/${reviewId}/like`, {}, { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); */
      const updatedReviews = getReviews.map(review => {
        if (review._id === reviewId) {
          return { ...review, likes: response.data.likes };
        }
        return review;
      });
      setGetReviews(updatedReviews);
      setOpenUserMenu(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLike(false);
    }
  };

  
  /* remove user own review */
  const handleDeleteConfirmReviewByUser = async (reviewId) => {
    try {
      setLoadingUserDeleteReview(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/reviwes/deleteReview/${reviewId}`, { withCredentials: true });
      /* const token = localStorage.getItem("token"); // add instaed cookies
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/reviwes/deleteReview/${reviewId}`, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); */
      const updatedReviews = getReviews.filter(review => review._id !== reviewId);
      setGetReviews(updatedReviews);
      setOpenUserMenu(null);
      toast.success("Review deleted successfully.");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUserDeleteReview(false);
    }
  }

  /* Remove comment image */
  const removeCommentImage = (reviewId) => {
    setImageComment((prev) => ({ ...prev, [reviewId]: null }));
  };


  const handleRemoveImageReply = (reviewId, parentId) => {
    const key = `${reviewId}-${parentId}`;
    setImageReply(prev => ({ ...prev, [key]: null }));
  }



  useEffect(() => {
    if (!getReviews || getReviews.length === 0) return;

    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");
    if (!scrollTo) return;

    const reviewWithComment = getReviews.find(r =>
      r.comments?.some(c => c._id === scrollTo || c.replies?.some(rep => rep._id === scrollTo))
    );

    if (reviewWithComment) {
      setShowTheComment(reviewWithComment._id);

      const parentComment = reviewWithComment.comments.find(c =>
        c._id === scrollTo || c.replies?.some(rep => rep._id === scrollTo)
      );

      if (parentComment?.replies?.some(rep => rep._id === scrollTo)) {
        setOpenReplyInput({ reviewId: reviewWithComment._id, commentId: parentComment._id });
      }
    }

    const interval = setInterval(() => {
      const element =
        document.getElementById(`review-${scrollTo}`) ||
        document.getElementById(`comment-${scrollTo}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.style.backgroundColor = "#fff3cd";
        setTimeout(() => (element.style.backgroundColor = ""), 10000);
        clearInterval(interval);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [location, getReviews]);


  

  return (
    <div>
      {/* reviews */}
      {
        getReviews?.length === 0 && (
          <div className='text-center text-slate-500 text-sm mt-12'>Ei vielä arvosteluja</div>
        )
      }
      {
        getReviews?.map((item, index) => {
          return (
            <div id={`review-${item._id}`} key={index} className='border-t border-b border-slate-300 pt-5 pb-5'>
               {item?.userId === user?.id && (
                
                <div className='flex items-end justify-end mb-2 -mt-4 relative'>
                   <button type='button' aria-label="Review menu" className='cursor-pointer' onClick={() => handleToggleOpenUserMenu(item?._id)}>
                    <BsThreeDots size={18} />
                  </button>
                  {
                    openUserMenu === item?._id && (
                      <div className='bg-white shadow w-[30%] border border-slate-200 rounded p-4 absolute top-5 z-50'>
                        <div className='flex flex-col items-start gap-2'>
                          <button onClick={() => {setConfirmuserDeleteReview(item?._id); setOpenUserMenu(null)}} className='text-red-600 text-sm flex items-center gap-2.5 cursor-pointer' >
                            <IoTrashOutline />
                            <p>Remove</p>
                          </button>
                          <button onClick={() => {setOpenReviewModel(item?._id); setOpenUserMenu(null)}} className='text-green-500 text-sm flex items-center gap-2.5 cursor-pointer'>
                            <MdModeEdit />
                            Edit
                          </button>
                        </div>
                      </div>
                    )
                  }
                </div>
                )}
                {/* OPEN CONFIRM DELETE  REVIEW */}
                {
                  confirmuserDeleteReview === item?._id && (
                    <ConfirmDelete 
                      closeModel={() => setConfirmuserDeleteReview(false)}
                      headerTitle="Remove Review"
                      headerDescription="Are you sure you want to remove this review?"
                      warningMessage="This action cannot be undone."
                      cacelButton="Cancel"
                      confirmButton="Remove"
                      onConfirm={() => handleDeleteConfirmReviewByUser(item?._id)}
                      loading={loadingUserDeleteReview}
                       
                    />
                  )
                }
                {/* OPEN EDIT MODEL REVIEW */}
                {
                  openReviewModel === item?._id && (
                    <EditReview item={item} closeModel={() => setOpenReviewModel(false)} fetchReviwes={fetchReviwes}  />
                  )
                }
              <div className='flex justify-between gap-2 relative'>
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
                    <p className=' text-sm'>{item?.firstName} {item?.lastName}</p>
                    <small className="text-xs">
                      {new Date(item?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
                  <span>{item?.rating} / 5</span>
                </div>
                
              </div>
              <div className='relative gap-2 text-justify'>
                <div className={`text-[13px] mt-4`}>
                 <ReviewText text={item?.reviewText} />          
                </div>
              </div>
              {item?.mediaReview && (item.mediaReview.type === 'image' ? (
                  <img
                    className='w-full h-74 border border-slate-300 rounded mt-2'
                    src={item.mediaReview.url}
                    alt="review"
                  />
                ) : (
                  <video
                    className='w-full h-74 border border-slate-300 rounded mt-2'
                    controls
                    autoPlay={false}
                  >
                    <source src={item.mediaReview.url} type="video/mp4" />
                  </video>
                )
              )}
              {/* like comments icon */}
              <hr className='text-slate-300 mb-3 mt-3' />
              <div className='flex items-center gap-[30%] relative'>
                <div className='flex items-center gap-1 cursor-pointer'>
                  <button
                    id={`like-${item._id}`} 
                    type="button"
                    onClick={() => handleClickLike(item._id)}
                    className="cursor-pointer"
                  >
                    {
                      loadingLike === item._id ? (
                        <Loading width={15} height={15} border='3px' topBorder='3px' borderColor='red' borderTopColor='white' />

                      ) : (
                        <>
                          {
                            item?.likes?.likedBy?.some(
                              like => String(like.userId) === String(user?.id)
                            ) ? (
                              <GoHeartFill className="text-red-600 pointer-events-none" />
                            ) : (
                              <GoHeart className="pointer-events-none" />
                            )
                          }
                        </>
                      )
                    }
                  </button>

                  <button type='button' onClick={() => handleToggleLike(item._id)} className='text-xs cursor-pointer flex items-center ml-1' title='Katso kuka tykkäsi'>
                    <span className='flex font-bold text-slate-600'>{item?.likes?.count} </span>Tykätty
                  </button>
                  {/* show who liked */}
                    {
                      showLiked === item._id && (
                        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50 bg-black/70'>
                          <div className='bg-white text-black dark:border relative flex flex-col shadow md:w-full w-[93%]  max-w-xl md:px-6 px-3 md:py-8 py-6 rounded'>
                            
                              <>
                              {
                                item?.likes?.likedBy?.length === 0 ? (
                                  <div className='text-center text-sm'>
                                    <button className='top-3 right-3 absolute text-xs cursor-pointer' onClick={() => setShowLiked(false)}>❌</button>
                                    <h1 className='text-red-600'>Kukaan ei ole vielä tykännyt tästä arvostelusta</h1>
                                  </div>
                                ) : (
                                  <div>
                                    <button className='top-3 right-3 absolute text-xs cursor-pointer' onClick={() => setShowLiked(false)}>❌</button>
                                    <h1 data-testid="liked-modal-title" className="text-sm mb-4">
                                      Tykätty
                                    </h1>

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
                                          <small className='text-xs'>{new Date(like?.likedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</small>
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
                  handleToggleComment(item._id);
                }} className='flex gap-1 cursor-pointer'>
                  <FaRegCommentDots />
                  <span className='text-xs'>{item?.comments?.length} Kommentit</span>
                </div>
              </div>
              <hr className='text-slate-300 mb-3 mt-3' />

              {/* display comments and replay */}
              {
                showTheComment === item._id && (
                  <>
                  {
                      item?.comments?.length > 0 ? (
                        <div className='flex flex-col gap-3 mt-2 bg-slate-50  text-black p-2 rounded'>
                          {
                            item?.comments?.map((comment) => (
                              <div id={`comment-${comment._id}`} key={comment._id} className='border-b last:border-b-0 border-slate-300 pt-2 pb-2'>
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
                                    <p className='text-xs'>{comment?.firstName} {comment?.lastName}</p>
                                    <small className='text-[11px]'>{new Date(comment?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</small>
                                  </div>
                                </Link>
                                <p className='text-[13px] ml-10 mt-2' data-testid="comment-text">{typeof comment?.comment === 'string' ? comment.comment : comment?.comment?.comment || ''}</p>
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
                                  <button aria-label="Näytä vastaus" onClick={() => handleOpenReply(item._id, comment._id)} type='button' className='flex gap-1 text-blue-500 cursor-pointer'>
                                    {openReplyInput.reviewId === item._id && openReplyInput.commentId === comment._id ? (
                                      <IoIosArrowDown />
                                    ) : (
                                      <IoIosArrowUp />
                                    )
                                  }
                                  {comment?.replies?.length}
                                    <p>Näytä vastaus</p>
                                    <FaReply  className='text-[8px]'/>
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
                                        key={childReply._id || `temp-${index}`}
                                        reply={childReply}
                                        reviewId={item._id}
                                        parentId={comment._id}
                                        onReply={handleSubmitReply}
                                         openReply={openReplyInput.reviewId === item._id && openReplyInput.commentId === comment._id}
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
                                          <div className='flex flex-col items-center gap-1 cursor-pointer'>
                                            <div className='flex items-center gap-1.5 w-full'>
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
                                                  {
                                                    loadingReply ? (
                                                      <div>
                                                        <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='red' borderTopColor='white' />
                                                      </div>
                                                    ) : (
                                                      <IoMdImage size={15} className=' cursor-pointer' />
                                                    )
                                                  }
                                                  <input type="file" id={`imageReply-${item._id}-${comment._id}`} onChange={(e) => setImageReply({ ...imageReply, [`${item._id}-${comment._id}`]: e.target.files[0], })} className='hidden' />
                                                </label>
                                                <button type='submit'>
                                                  <RiSendPlaneFill className='-mt-0.5 ml-1 mr-1' size={15} />
                                                </button>
                                              </form>
                                            </div>
                                            <div className='w-full relative overflow-hidden'>
                                              {
                                                imageReply[`${item._id}-${comment._id}`] && (
                                                 <button type='button' onClick={() => handleRemoveImageReply(item._id, comment._id)} className='bg-red-500 text-white p-1 absolute top-0 right-0 mt-2 cursor-pointer'>
                                                    <BsTrash3Fill />
                                                 </button>
                                                )
                                              }
                                              {
                                                imageReply[`${item._id}-${comment._id}`] && (
                                                  <img className='w-full mt-2 h-42 border border-slate-500 rounded overflow-hidden' src={URL.createObjectURL(imageReply[`${item._id}-${comment._id}`])} alt="" />
                                                )
                                              }
                                            </div>
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
                  user ? (
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
                          {
                            loadinComment[item._id] ? (
                              <div>
                                <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='red' borderTopColor='white' />
                              </div>
                            ) : (
                              <IoMdImage size={15} className=' cursor-pointer' />
                            )
                          }
                          <input type="file" id={`imageComment-${item._id}`} onChange={(e) => setImageComment({ ...imageComment, [item._id]: e.target.files[0] })} className='hidden' />
                        </label>
                        <button type='submit'>
                          <RiSendPlaneFill className='-mt-0.5 ml-1 mr-1' size={15} />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div onClick={() => {navigate('/kirjaudu'); toast.error('Jos haluat kommentoida, kirjaudu sisään täältä. tai rekisteröidy')}} className='w-full flex justify-between rounded-full text-[12px] px-3 py-1 border border-slate-300'>
                      <p>Kirjaudu sisään kommentoidaksesi ...</p>
                      <label className='pl-4'>
                        {
                          loadinComment ? (
                            <div>
                              <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='red' borderTopColor='white' />
                            </div>
                          ) : (
                            <IoMdImage size={15} className='cursor-pointer' />
                          )
                        }
                      </label>
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
                      className="w-full h-52 object-cover border border-slate-300 ml-2 rounded"
                      
                      />
                  </div>
                )}
              </div>
            </div>
          )
        })
      }
      {/* end reviews */}
      <div className='mb-12'></div>
    </div>
  )
}

export default Reviews

