import React, { useState } from 'react';
import { BsHandThumbsUp } from 'react-icons/bs';
import { FaReply } from 'react-icons/fa6';
import { IoIosArrowDown, IoIosArrowUp, IoMdImage } from "react-icons/io";
import { Link } from 'react-router-dom';

const ReplyItem = ({ reply, reviewId, parentId, onReply }) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState(null);

  const handleSend = () => {
    if (!replyText.trim() && !replyImage) return;

    const formData = new FormData();
    formData.append("reply", replyText);
    if (replyImage) {
      formData.append("imageReply", replyImage);
    } 

    // Send reply to PARENT ID (reply._id)
    onReply(reviewId, parentId, formData);
    setReplyText("");
    setReplyImage(null);
    setShowReplyBox(false);
  };

  return (
    <div className="mt-2">
      <div className="p-1 rounded-md">

        {/* Reply User Info */}
        <Link to={`/profile/${reply?.userId}`} className="flex items-center gap-3 mb-2">
          <img className="w-7 h-7 rounded-full border border-slate-500"src={reply?.profileImage?.url ||
            (reply?.gender === "men"
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s"
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s")
            }
          />
          <div className='flex flex-col'>
            <p className="text-[12px]">{reply?.firstName} {reply?.lastName}</p>
            <small className='text-[11px] text-slate-400'>
              {reply?.createdAt
                ? new Date(reply.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Just now"}
            </small>

          </div>
        </Link>

        {/* Reply Text */}
        <p className="text-[13px] ml-8">{reply?.reply || ""}</p>

        {/* Reply Image */}
        {reply?.imageReply?.url && (
          <img
            src={reply?.imageReply?.url}
            className="w-32 h-28 ml-8 mt-2 rounded-md object-cover"
          />
        )}

        {/* Reply Button */}
        <div className='flex gap-4 text-[12px] ml-8 mt-2.5'>
          {/* replya */}
          <button onClick={() => setShowReplyBox(!showReplyBox)} type='button' className='flex gap-1 text-blue-500 cursor-pointer'>
            {showReplyBox ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowUp />
            )
          }
            <p>Reply</p>
            <FaReply />
          </button>
          {/* like comment */}
          {/* <div className='flex gap-1 items-center text-blue-500'>
            <BsHandThumbsUp size={14} />
            <p>0 Likes</p>
          </div> */}
        </div>
        {/* Reply Input Box */}
        {showReplyBox && (
          <div className="md:ml-8 mt-3 flex items-center gap-2">
            <img className="w-6 h-6 rounded-full border border-slate-500"src={reply?.profileImage?.url ||
              (reply?.gender === "men"
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s")
              }
            />
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className='flex items-center justify-between w-full border border-slate-300 px-2 py-1 rounded-full'>
              <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full outline-none text-xs" placeholder="Kirjoita vastaus..."/>
              <label>
                <IoMdImage size={14} className="text-slate-600 cursor-pointer" />
                <input type="file" className="hidden" onChange={(e) => setReplyImage(e.target.files[0])} />
              </label>
            </form>
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
