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
import { FaPeopleArrows } from "react-icons/fa";
import { RiTimeZoneFill } from "react-icons/ri";
import { FaCity } from "react-icons/fa6";
import Footer from '../components/footer/Footer';
import { PiMapPinSimpleAreaBold } from "react-icons/pi";
import { BsPersonWorkspace } from "react-icons/bs";
import useReviews from '../hooks/useReviews';


const UserProfile = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { userProfile } = useSelector((state) => state.userAuth);
  const { getReview } = useReviews();
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
      <div className='flex flex-col py-4  px-4 gap-5 w-full mb-10'>

        <div className='relative mb-16'>
          <div className='w-full h-52 bg-slate-100 rounded'></div>
            <div className='absolute top-1/2.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <div className='flex flex-col items-center gap-1'>

                <div>

                  {
                    userProfile?.profileImage?.url ? (
                      <img className='w-32 h-32 border-4 border-slate-200 rounded-full' src={userProfile?.profileImage?.url} alt="" />
                    ) : (
                      userProfile?.gender === 'men' ? (
                        <img className='w-32 h-32 border-4 border-slate-200 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                      ) : (
                        <img className='w-32 h-32 border-4 border-slate-200 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
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

        <div className='flex gap-5 mt-12'>
          <button onClick={() => setActiveTab('information')} className={`${activeTab === "information" ? "border-b-2 border-blue-600 text-blue-600 font-medium " : ""} cursor-pointer text-sm`}>Tiedot</button>
          <button onClick={() => setActiveTab('all')} className={`${activeTab === "all" ? "border-b-2 border-blue-600 text-blue-600 font-medium" : ""} cursor-pointer text-sm`}>kaikki ⭐</button>
        </div>
          
        <div className='md:flex gap-[20%]'>
          
          <div>
            <div>
              {activeTab === "information" && (
                <div className='flex flex-col gap-3.5'>
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
                <div className='flex flex-col gap-3.5'>
                  
                </div>
                )
              }
            </div>
          </div>

          <hr className={`${activeTab === "all" ? "hidden" : ""} text-slate-200 md:hidden mt-6 mb-6`} />

          <div className={`${activeTab === "all" ? "hidden" : ""} flex flex-col md:mt-10`}>
            <h4 className='text-sm font-semibold text-slate-600 flex items-center gap-2 mb-4'><BsPersonWorkspace size={20}  className='font-bold' />My bio :</h4>
            <p>{userProfile?.bio}</p>
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default UserProfile;
