import React from 'react'
import useReviews from '../../hooks/useReviews';
import { GoStar, GoStarFill } from 'react-icons/go';
import { Link } from 'react-router-dom';


const AllReviews = () => {

  const { getReviews } = useReviews();
  

  return (
    <div className='mt-4 px-2'>
      
      {
        getReviews?.length === 0 ? (
          <div className='h-[81vh] flex justify-center items-center'>
            <h1 className='text-2xl font-medium text-red-500'>No reviews found ⛔</h1>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center mb-6'>
            <h1 className='text-lg font-semibold'>All Reviews</h1>
            <p>Here you can see all the reviews</p>
          </div>
        )
      }
      <div className='h-[81vh] overflow-y-scroll scrollbarStyle'>
        {
          getReviews?.map((review) => {
            return (
              <Link to={`/admin/review/${review._id}`} key={review._id} className='p-2 flex justify-between items-center border-slate-300 border mt-4 mr-2 cursor-pointer'>
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-2 py-2'>
                    {
                      review?.profileImage ? (
                        <img className='w-10 h-10 border border-slate-500 rounded-full' src={review?.profileImage} alt="" />
                      ) : (
                        review?.gender === 'men' ? (
                          <img className='w-10 h-10 border border-slate-500 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                        ) : (
                          <img className='w-10 h-10 border border-slate-500 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                        )
                      )
                    }
                    <div className='md:flex-row flex flex-col md:gap-0 gap-1.5'>
                      <div className='flex flex-col'>
                        <h3 className='text-sm text-slate-900'>{review?.firstName} {review?.lastName}</h3>
                        <p className='text-xs'>{review?.email}</p>
                      </div>
                      <div>
                        <p className='text-xs ml-2 md:mt-0 mt-2'>{review?.gender}</p>
                      </div>
                      <div>
                        <p className='text-xs ml-2'>{new Date(review?.createdAt).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" })}</p>
                      </div>
                      <div>
                        <p className='text-xs ml-2'>{review?.likes.count} Likes</p>
                      </div>
                      <div>
                        <p className='text-xs ml-2'>{review?.comments.length} Comments</p>
                      </div>
                      <div className='flex flex-col items-center justify-center gap-1 ml-4'>
                        <div className='flex gap-1.5'>
                          {
                            [...Array(5)].map((_, index) => {
                              return (
                                index < review.rating ? 
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
                        <div className='text-xs'>{review?.rating} / 5</div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col w-full gap-2'> 
                    <div className='flex w-full'>
                      {review?.mediaReview && (
                        review.mediaReview.type === 'image' ? (
                          <img
                            className='w-full h-72 object-cover border border-slate-300 rounded mt-2'
                            src={review.mediaReview.url}
                            alt="review"
                          />
                        ) : (
                          <video
                            className='w-full h-72 object-cover border border-slate-300 rounded mt-2'
                            controls
                            autoPlay={false}
                          >
                            <source src={review.mediaReview.url} type="video/mp4" />
                          </video>
                        )
                      )}
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                      <p className='text-sm line-clamp-3'>{review?.reviewText}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        }

      </div>
    </div>
  )
}

export default AllReviews