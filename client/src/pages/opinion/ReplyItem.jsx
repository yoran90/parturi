import React, { useState } from 'react';
import { FaReply } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp, IoMdImage } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { BsTrash3Fill } from "react-icons/bs";
import Loading from '../../loading/Loading';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ReplyItem = ({ reply, reviewId, parentId, onReply, openReply  }) => {
  const [showReplyBox, setShowReplyBox] = useState(openReply || false);
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.userAuth);

  const navigate = useNavigate();

  const handleSend = () => {
    if (!replyText.trim() && !replyImage) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("reply", replyText);
      if (replyImage) {
        formData.append("imageReply", replyImage);
      } 

      onReply(reviewId, parentId, formData);
      setReplyText("");
      setReplyImage(null);
      setShowReplyBox(false);
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemobe = () => {
    setReplyImage(null);
  }
  
 

useEffect(() => {
  setShowReplyBox(openReply);
}, [openReply]);

  return (
    <div id={`reply-${reply._id}`} className="mt-2" data-review-id={reviewId} data-parent-comment-id={parentId}>
      <div className="p-1 rounded-md">

        {/* Reply User Info */}
        <Link to={`/profile/${reply?.userId}`} className="flex items-center gap-3 mb-2">
          {
            reply?.profileImage?.url ? (
              <img className='w-7 h-7 border border-slate-500 rounded-full' src={reply?.profileImage?.url} alt="reply" />
            ) : (
              reply?.gender === 'men' ? (
                <img className='w-7 h-7 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="reply" />
              ) : reply?.gender === 'women' ? (
                <img className='w-7 h-7  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="reply" />
              ) : (
                <img className='w-7 h-7 border border-slate-500 rounded-full' src={reply?.profileImage} alt="reply" />
              )
            )
          }
          <div className='flex flex-col'>
            <p className="text-[12px]">{reply?.firstName} {reply?.lastName}</p>
            <small className='text-[11px] text-slate-900'>
              {reply?.createdAt ? new Date(reply.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
            </small>
          </div>
        </Link>

        {/* Reply Text */}
        <p className="text-[13px] ml-8" data-testid="reply-text">{reply?.reply || ""}</p>


        {/* Reply Image */}
        {reply?.imageReply?.url && (
          <img
            src={reply?.imageReply?.url}
            className="w-42 h-32 ml-8 mt-2 rounded-md object-cover"
            alt="reply-img"
          />
        )}

        {/* Reply Button */}
        <div className='flex gap-4 text-[12px] ml-8 mt-2.5'>
          {/* replya */}
          <button type='button' aria-label="Toggle reply" onClick={() => setShowReplyBox(!showReplyBox)} className='flex gap-1 text-blue-500 cursor-pointer'>
            {showReplyBox ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowUp />
            )
          }
            <p>Näytä vastaus</p>
            <FaReply className='text-[8px]' />
          </button>
          {/* like comment */}
          {/* <div className='flex gap-1 items-center text-blue-500'>
            <BsHandThumbsUp size={14} />
            <p>0 Likes</p>
          </div> */}
        </div>
        {/* Reply Input Box */}
        {user ? (
          <>
            {showReplyBox && (
          <div className="md:ml-8 mt-3 flex flex-col items-center gap-2">
            <div className='flex items-center gap-1.5 w-full'>
              {
                reply?.profileImage?.url ? (
                  <img className='w-7 h-7 border border-slate-500 rounded-full' src={reply?.profileImage?.url}  alt="reply-image" />
                ) : (
                  reply?.gender === 'men' ? (
                    <img className='w-7 h-7 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s"  alt="reply-image" />
                  ) : reply?.gender === 'women' ? (
                    <img className='w-7 h-7  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                  ) : (
                    <img className='w-7 h-7 border border-slate-500 rounded-full' src={reply?.profileImage}  alt="reply-image" />
                  )
                )
              }
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className='flex items-center justify-between w-full border border-slate-300 px-2 py-1 rounded-full'>
                <input type="text" data-testid="reply-input" value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full outline-none text-xs" placeholder="Kirjoita vastaus..."/>
                <label>
                  {
                    loading ? (
                      <>
                        <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='red' borderTopColor='white' />
                      </>
                    ) : (
                      <>
                        <IoMdImage size={14} className="cursor-pointer" />
                      </>
                    )
                  }
                  <input type="file" data-testid="reply-file-input" className="hidden" onChange={(e) => setReplyImage(e.target.files[0])} />
                </label>
                <button type='submit'>
                  <RiSendPlaneFill className='ml-1 mr-1' size={15} />
                </button>
              </form>
            </div>
            <div className='w-full relative'>
              {
                replyImage && (
                  <button type='button' data-testid="remove-image-btn" onClick={handleImageRemobe} className='text-md cursor-pointer absolute top-0 right-0 bg-red-400 text-white py-1 px-1 '>
                    <BsTrash3Fill  />
                  </button>
                )
              }
              {replyImage && (
                <img
                src={URL.createObjectURL(replyImage)}
                alt="preview"
                className="w-full h-42 border border-slate-300 rounded-md object-cover"
                />
              )}
            </div>
          </div>
        )}
          </>
        ) : (
          <div className='mt-3 ml-8'> 
          <div onClick={() => {navigate('/kirjaudu'); toast.error('Jos haluat kommentoida, kirjaudu sisään täältä. tai rekisteröidy')}} className='w-full flex justify-between rounded-full text-[12px] px-3 py-1 border border-slate-300'>
            <p>Kirjaudu sisään kommentoidaksesi ...</p>
          </div>
          </div>
        )}
      </div>

      {/* Recursive Rendering */}
      {reply?.replies?.length > 0 &&
        reply.replies.map((childReply) => (
          <ReplyItem
            key={childReply._id}
            reply={childReply}
            reviewId={reviewId}
            parentId={reply._id} // reply becomes parent
            onReply={onReply}
          />
        ))}
    </div>
  );
};

export default ReplyItem;
