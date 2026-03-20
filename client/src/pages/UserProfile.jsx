import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileUserById } from '../store/user-auth';
import Information from '../components/up-header/Information';
import HolyDay from '../components/holy-day/HolyDay';
import Header from '../components/header/Header';
import { PiGenderTransgenderBold } from "react-icons/pi";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa6";
import { FaRegCommentDots } from "react-icons/fa6";
import { RiTimeZoneFill } from "react-icons/ri";
import { FaCity } from "react-icons/fa6";
import Footer from '../components/footer/Footer';
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
import { BsPersonWorkspace } from "react-icons/bs";
import { getUserReviewsForProfileUser } from '../hooks/useReviews';
import { MdOutlineReplyAll } from "react-icons/md";

const UserProfile = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.userAuth);
  const { getReviewForProfile } = getUserReviewsForProfileUser(id);
  const [activeTab, setActiveTab] = React.useState("information");

 


  
  
  

  useEffect(() => {
    if (id) {
      dispatch(getProfileUserById(id));
    }
  }, [id, dispatch]);



  return (
    <div>
      <Information />
      <HolyDay /> 
      <Header />
      <div className='flex flex-col pb-2 gap-5 w-full mb-10'>

        <div className='relative'>
            <div className='w-full h-42 bg-slate-900 '></div>
            <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/3'>
              <div className='flex flex-col items-center gap-1 '>
                <div className=''>

                  {
                    userProfile?.profileImage?.url ? (
                      <img className='w-32 h-32 border-4 border-white rounded-full' src={userProfile?.profileImage?.url} alt="" />
                    ) : (
                      userProfile?.gender === 'men' ? (
                        <img className='w-32 h-32 border-4 border-white rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                      ) : (
                        <img className='w-32 h-32 border-4 border-white rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                      )
                    )
                  }
                </div>
                <div className='flex items-center gap-1.5'>
                  <h1 className='text-lg'>{userProfile?.firstName} {userProfile?.lastName}</h1>
                </div>
                <div>
                  {
                    userProfile?.favoriteName && userProfile?.favoriteName?.trim() !== "" ? (
                      <div className='flex items-center gap-1.5'>
                        <h1 className='text-slate-800'>
                          {userProfile.favoriteName}
                        </h1>
                      </div>
                    ) : (
                      <div className='flex items-center gap-1.5'>
                        <h1 className='text-slate-800'>Ei lempinimi</h1>
                      </div>
                    )
                  }
                </div>
            </div>
          </div>
        </div>

        <div className='flex gap-4 mt-32 px-2'>
          <button onClick={() => setActiveTab('information')} className={`${activeTab === "information" ? "border-b-2 border-blue-600 text-blue-600 font-medium " : ""} cursor-pointer text-sm`}>Tiedot</button>
          <button onClick={() => setActiveTab('kuva')} className={`${activeTab === "kuva" ? "border-b-2 border-blue-600 text-blue-600 font-medium " : ""} cursor-pointer text-sm`}>Kuva</button>
          <button onClick={() => setActiveTab('all')} className={`${activeTab === "all" ? "border-b-2 border-blue-600 text-blue-600 font-medium" : ""} cursor-pointer text-sm`}>Kaikki (⭐)</button>
        </div>
          
        <div className='md:flex md:gap-0 gap-[20%] w-full px-2'>
          
          <div className='w-full'> 
            <div className='w-full'>
              {activeTab === "information" && (
                <div className='flex flex-col gap-3.5 w-full'>
                  <div className='mb-2'>
                    <h4 className='text-sm font-semibold text-slate-600'>Henkilökohtaiset tiedot</h4>
                  </div>
                
                  
                  <div className='flex items-center gap-5.5'>
                    <PiGenderTransgenderBold size={22}  className='text-slate-600' />
                    <h1 className='text-sm'>{userProfile?.gender}</h1>
                  </div>
                
                  <div className='flex items-center gap-7'>
                    <FaPhone size={15} className='text-slate-800' />
                    <p className='text-sm'>{userProfile?.phoneNumber}</p>
                  </div>

                  
                  <div className='flex items-center gap-7'>
                    <FaMapMarkerAlt  className='text-slate-800' />
                    <p className='text-sm'>{userProfile?.addressOne}</p>
                  </div>
                  <div className='flex items-center gap-7'>
                    <PiMapPinSimpleAreaBold size={18} className='text-slate-800' />
                    <p className='text-sm'>{userProfile?.postalCode}</p>
                  </div>
                
                  <div className='flex items-center gap-7'>
                    <FaCity    className='text-slate-800' />
                    <p className='text-sm'>{userProfile?.timezone}</p>
                  </div>
                  <div className='flex items-center gap-7'>
                    <RiTimeZoneFill   className='text-slate-800' />
                    <p className='text-sm'>{userProfile?.country}</p>
                  </div>
                  <div className='flex items-center gap-7'>
                    <FaMapPin  className='text-slate-800' />
                    <p className='text-sm'>{userProfile?.addressTwo}</p>
                  </div>
                </div>
                )
              }
            </div>

            <div>
              {activeTab === "all" && (
                <div className='flex flex-col gap-2.5'>
                  {getReviewForProfile?.length > 0 ? (
                      <div className='flex items-center gap-1.5'>
                        <h5 className='text-sm font-semibold text-slate-600'>Kaikki arvostelut ({getReviewForProfile?.length})</h5>
                      </div>
                    ) : (
                      <div className='flex items-center text-center justify-center mt-12 mb-12 gap-1.5'>
                        <h5 className='text-sm font-semibold text-center justify-center items-center flex text-red-600'>Ei arvosteluja</h5>
                      </div>

                    )

                  }
                  {getReviewForProfile?.map((review, index) => (
                      <div key={index} className='flex flex-col border border-slate-200 shadow rounded-md overflow-hidden'>
                        <div className='flex items-center justify-between p-2'>
                          <div className='flex items-center gap-1'>
                            <p className='text-sm border border-slate-300 p-1 rounded'>
                              {review?.rating} ⭐
                            </p>
                            <p className='text-sm border border-slate-300 p-1 rounded'>
                              {review?.likes.count} 🩷
                            </p>
                            <p className='text-sm flex items-center gap-1.5 border border-slate-300 p-1 rounded'>
                              {review?.comments.length} <FaRegCommentDots className='text-slate-600' />
                            </p>
                            <p className='text-sm flex items-center gap-1 border border-slate-300 p-1 rounded'>
                              {review?.comments?.[0]?.replies?.length || 0} <MdOutlineReplyAll className='text-slate-600' />
                            </p>
                          </div>
                          <small className='text-xs text-slate-700 border border-slate-200 bg-white shadow p-2 rounded'>{new Date(review?.createdAt).toLocaleString("fi", { dateStyle: "medium", timeStyle: "short" })}</small>
                        </div>
                        <div className='flex flex-col pb-2'>
                          <p className='text-slate-700 text-sm p-2'>
                            {review?.reviewText}
                          </p>
                        </div>
                          
                        <div className='flex w-full'>
                          {review?.mediaReview && (
                            review.mediaReview.type === 'image' ? (
                              <div>
                                <img
                                  className='w-full h-72 object-cover  mt-2'
                                  src={review.mediaReview.url}
                                  alt="review"
                                />
                                
                              </div>
                            ) : (
                              <div >
                                
                                <video
                                  className='w-full h-72 object-cover mt-2'
                                  controls
                                  autoPlay={false}
                                  >
                                  <source src={review.mediaReview.url} type="video/mp4" />
                                </video>
                                
                              </div>
                            )
                          )}
                        </div>
                        
                      </div>
                    
                    ))

                  }
                  
                  
                </div>
                )
              }
            </div>

            <div className='w-full'>
              {activeTab === "kuva" && (
                  <div className='w-full'>
                    {
                      userProfile?.profileImage?.url ? (
                        <img className='w-full md:h-[60vh] h-96 border border-slate-200 rounded' src={userProfile?.profileImage?.url} alt="" />
                      ) : (
                        userProfile?.gender === 'men' ? (
                          <img className='w-full md:h-[60vh] h-96 border border-slate-200 rounded' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                        ) : (
                          <img className='w-full md:h-[60vh] h-96 border border-slate-200 rounded' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                        )
                      )
                    }
                  </div>
                
                )
              }
            </div>
          </div>

          <hr className={`${activeTab === "all" || activeTab === "kuva" ? "hidden" : ""} text-slate-200 md:hidden mt-6 mb-6`} />

          <div className={`${activeTab === "all" || activeTab === "kuva" ? "hidden" : ""} flex flex-col w-full md:pr-4`}>
            <h4 className='text-sm font-semibold text-slate-600 flex items-center gap-2 mb-4'><BsPersonWorkspace size={20}  className='font-bold' />My bio :</h4>
            <div className='flex flex-col gap-3.5 mt-2'>
              <p className='text-slate-600 font-semibold text-sm'>
                {userProfile?.titleBio}
              </p>
              <p className='flex text-justify text-sm'>{userProfile?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default UserProfile;
