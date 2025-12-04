import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileUserById } from '../store/user-auth';
import Information from '../components/up-header/Information';
import HolyDay from '../components/holy-day/HolyDay';
import Header from '../components/header/Header';
import { FaRegUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa6";
import { FaPeopleArrows } from "react-icons/fa";
import { RiTimeZoneFill } from "react-icons/ri";
import { FaCity } from "react-icons/fa6";
import Footer from '../components/footer/Footer';


const UserProfile = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { userProfile, loading } = useSelector((state) => state.userAuth);

  console.log(userProfile);
  

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
      <div className='md:flex py-4 md:px-8 px-2 gap-5 w-full mb-10'>
        <div className='flex flex-col md:w-[30%] gap-2'>
          {
            userProfile?.favoriteName ? (
              <div className='flex items-center gap-1.5'>
                <FaRegUserCircle className='text-slate-800' />
                <h1 className='text-xl text-slate-800'>{userProfile?.favoriteName} </h1>
              </div>

            ) : (
              <div className='flex items-center gap-1.5'>
                <FaRegUserCircle className='text-slate-800' />
                <h1 className='text-xl text-slate-800'>Ei lempinimi</h1>
              </div>
            )
          }
          {
            userProfile?.profileImage?.url ? (
              <img className='md:w-72 h-80 border border-slate-400 rounded' src={userProfile?.profileImage?.url} alt="" />
            ) : (
              userProfile?.gender === 'men' ? (
                <img className='md:w-72 h-80 border border-slate-400 rounded ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
              ) : (
                <img className='md:w-72 h-80 border border-slate-400 rounded' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
              )
            )
          }
          <div className='flex flex-col gap-2.5'>
            <div className='flex items-center justify-between pr-4'>
              <div className='flex items-center gap-1.5'>
                <FaUser className='text-slate-600' />
                <h1 className='text-lg'>{userProfile?.firstName} {userProfile?.lastName}</h1>
              </div>
              <div className='flex items-center gap-1.5'>
                <FaPeopleArrows  className='text-slate-600' />
                <h1 className='text-lg'>{userProfile?.gender}</h1>
              </div>
            </div>
            <hr className='text-slate-300 mt-2 mb-2' />
            <div className='flex items-center gap-1.5'>
              <MdOutlineAttachEmail className='text-slate-800' />
              <p className='text-sm'>{userProfile?.email}</p>
            </div>
            <div className='flex items-center gap-1.5'>
              <FaPhone className='text-slate-800' />
              <p className='text-sm'>{userProfile?.phoneNumber}</p>
            </div>
            <div className='flex items-center justify-between pr-4'>
              <div className='flex items-center gap-1.5'>
                <FaMapMarkerAlt  className='text-slate-800' />
                <p className='text-sm'>{userProfile?.addressOne}</p>
              </div>
              <div className='flex items-center gap-1.5'>
                <p className='text-sm'>{userProfile?.postalCode}</p>
              </div>
            </div>
            <div className='flex items-center gap-1.5'>
              <FaCity    className='text-slate-800' />
              <p className='text-sm'>{userProfile?.timezone}</p>
            </div>
            <div className='flex items-center gap-1.5'>
              <RiTimeZoneFill   className='text-slate-800' />
              <p className='text-sm'>{userProfile?.country}</p>
            </div>
            <div className='flex items-center gap-1.5'>
              <FaMapPin  className='text-slate-800' />
              <p className='text-sm'>{userProfile?.addressTwo}</p>
            </div>
            <div className='flex items-center gap-1.5'>
              <FaPhone className='text-slate-800' />
              <p className='text-sm'>{userProfile?.phoneNumber}</p>
            </div>
          </div>
        </div>
        <div className='md:w-[70%] mt-10'>
          <p>{userProfile?.bio}</p>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default UserProfile;
