import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Etusivut from './pages/Etusivut'
import PalvelutHinta from './pages/PalvelutHinta'
import Galleria from './pages/Galleria'
import Tuote from './pages/Tuote'
import Yhteystiedot from './pages/Yhteystiedot'
import TuoateSivu from './pages/TuoateSivu'
import Home from './admin/Home'
import ImageVideo from './admin/pages/ImageVideo'
import AddInformation from './admin/pages/AddInformation'
import ImagevideoDisplay from './admin/pages/ImagevideoDisplay'
import AddPrice from './admin/pages/AddPrice'
import AddGalleriImage from './admin/pages/AddGalleriImage'
import Sidebar from './admin/Sidebar'
import DisplayGalleryImage from './admin/pages/DisplayGalleryImage'
import AddProduct from './admin/pages/AddProduct'
import DisplayProduct from './admin/pages/DisplayProduct'
import AdminPageText from './admin/pages/AdminPageText'
import Meistä from './pages/Meistä'
import Login from './admin/pages/Login'
import ProtectRoute from './admin/ProtectRoute'
import NoFoundPage from './NoFound/NoFoundPage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAdminAuth } from './store/admin-auth'
import UnAuthPage from './unauth-page/UnAuthPage'
import AddHeaderLogo from './admin/pages/AddHeaderLogo'
import AddAboutUs from './admin/pages/AddAboutUs'
import TitleForPages from './admin/pages/TitleForPages'
import Kirjaudu from './pages/user-login/Kirjaudu'
import Register from './pages/user-login/Register'
import MyAccount from './admin/pages/MyAccount'
import AllUsers from './admin/pages/AllUsers'
import EditUser from './admin/pages/EditUser'
import { userMiddleware } from './store/user-auth'
import ProfileUser from './pages/ProfileUser'
import ProtectUserRoute from './pages/protectUser/ProtectUserRoute'
import OpinionUser from './pages/opinion/OpinionUser'
import UserProfile from './pages/UserProfile'
import AllReviews from './admin/pages/AllReviews'
import SingleReview from './admin/pages/SingleReview'
import AddReview from './admin/pages/AddReview'
import ResetPassword from './pages/forgot-password/ResetPassword'
import ForgotPassword from './pages/forgot-password/ForgotPassword'
import VerifyEmail from './pages/verifyEmail/VerifyEmail'
import AdminForgotPassword from './admin/pages/forgotPassword/AdminForgotPassword'
import AdminResetPasssword from './admin/pages/forgotPassword/AdminResetPasssword'
import AdminVerifyEmail from './admin/pages/verifyEmail/AdminVerifyEmail'
import UserLayout from './User-Layouts/UserLayout'
import AdminLayout from './Admin-Layouts/AdminLayout'
import AuthLayout from './User-Layouts/Register-Login/AuthLayout'


import razorLogo from './assets/Razor.png'
import ScrollToTop from './Scroll-to-top/ScrollToTop'
import FeedBack from './feedBack/FeedBack'
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";






const App = () => {

  const { isAuthenticated, loading, admin } = useSelector((state) => state.adminAuth);
  const { isAuthenticated: userIsAuthenticated, user } = useSelector((state) => state.userAuth);
  const [firstHitLoading, setFirstHitLoading] = useState(true);  //! this tiny trick if backen slow to load


  const location = useLocation();

  const [openFeedBack, setOpenFeedBack] = useState(false);

  const feedBackRoutes = [
    "/",
    "/meistä",
    "/palvelut",
    "/galleria",
    "/opinion",
    "/tuotet",
    "/tuote/:id",
    "/yhteystiedot"
  ];

  const showFeedBack = feedBackRoutes.some((route) => route === location.pathname);


  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkAdminAuth());
  }, [dispatch]);


  useEffect(() => {
    dispatch(userMiddleware());
  }, [dispatch]);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstHitLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || firstHitLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="loader">
          <img
            src={razorLogo}
            alt="header logo"
            className="w-full h-full p-1 rounded-full"
          />
        </div>

        <style>{`
          .loader {
            position: relative;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            overflow: hidden;
          }

          .loader::before {
            content: "";
            position: absolute;
            inset: 0;
            border: 4px solid #bfbfbf;
            border-top: 4px solid #0080ff;
            border-left: 4px solid #0080ff;
            border-right: 4px solid #0080ff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            overflow: hidden;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }



  return (
    <>
      <ScrollToTop />
      <Routes>

        {/* USER SIDE */}

          <Route element={<UserLayout />}>
            <Route path='/' element={<Etusivut />}></Route>
            <Route path='/meistä' element={<Meistä />}></Route>
            <Route path='/palvelut' element={<PalvelutHinta />}></Route>
            <Route path='/galleria' element={<Galleria />}></Route>
            <Route path='/tuotet' element={<Tuote />}></Route>
            <Route path='/tuote/:id' element={<TuoateSivu />}></Route>
            <Route path='/yhteystiedot' element={<Yhteystiedot />}></Route>

            //! USER FORGOT PASSWORD
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/reset-password/:token' element={<ResetPassword />}></Route>
            //! USER VERIFY EMAIL
            <Route path='/verify-email/:token' element={<VerifyEmail />}></Route>
            <Route path='/profile' element={
              <ProtectUserRoute isAuthenticated={userIsAuthenticated} user={user} loading={loading}>
                <ProfileUser />
              </ProtectUserRoute>
            }>
            </Route>
            <Route path='/opinion' element={<OpinionUser />}></Route>
            <Route path='/profile/:id' element={<UserProfile />}></Route>
          </Route>
        
          {/* USER LOGIN REGISTER */}
          <Route element={<AuthLayout />}>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/kirjaudu' element={<Kirjaudu />}></Route>
          </Route>

        {/* END USER SIDE */}


        {/* ADMIN SIDE */}

          <Route element={<AdminLayout />}>
            <Route path='/admin' element={
              <ProtectRoute isAuthenticated={isAuthenticated} admin={admin} loading={loading}>
                <Home />
              </ProtectRoute>
            }>
              <Route index element={<AdminPageText />}></Route>
              <Route path='sidebar' element={<Sidebar />}></Route>
              <Route path='myaccount' element={<MyAccount />}></Route>
              <Route path='allusers' element={<AllUsers />}></Route>
              <Route path='allreviews' element={<AllReviews />}></Route>
              <Route path='addreviews' element={<AddReview />}></Route>
              <Route path='addinformation' element={<AddInformation />}></Route>
              <Route path='imagevideo' element={<ImageVideo />}></Route>
              <Route path='imagevideoDisplay' element={<ImagevideoDisplay />}></Route>
              <Route path='addprice' element={<AddPrice />}></Route>
              <Route path='galleri' element={<AddGalleriImage />}></Route>
              <Route path='displayGalleri' element={<DisplayGalleryImage />}></Route>
              <Route path='addProduct' element={<AddProduct />}></Route>
              <Route path='displayProduct' element={<DisplayProduct />}></Route>
              <Route path='addheaderlogo' element={<AddHeaderLogo />}></Route>
              <Route path='addaboutus' element={<AddAboutUs />}></Route>
              <Route path='titleforPages' element={<TitleForPages />}></Route>
              <Route path='edit-user/:id' element={<EditUser />}></Route>
              <Route path="review/:id" element={<SingleReview />}></Route>
            </Route>

            <Route path='/login' element={<Login />}></Route>
            //! ADMIN FORGOT PASSWORD
            <Route path='/admin-forgot-password' element={<AdminForgotPassword />}></Route>
            <Route path='/admin-reset-password/:token' element={<AdminResetPasssword />}></Route>
            //! ADMIN VERIFY EMAIL
            <Route path='/admin-verify-email/:token' element={<AdminVerifyEmail />}></Route>
          </Route>

        {/* END ADMIN SIDE */}

    
        {/* No Found Page */}
          <Route path='*' element={<NoFoundPage />}></Route>
        
        {/* Unauth Page */}
          <Route path='/unauth-page' element={<UnAuthPage />} />

      </Routes>
      {/* feed back */}
      {showFeedBack && (
          <>
            <button type='button' onClick={() => setOpenFeedBack(true)} className={`fixed bottom-4 left-4 border-2 border-amber-700 bg-amber-400 text-white rounded-full cursor-pointer p-2 ${openFeedBack ? 'hidden' : 'block'}`}>
              <IoChatbubbleEllipsesSharp  size={22} className={`text-white z-50`}/>
            </button>
            {openFeedBack && (
                <FeedBack onClose={() => setOpenFeedBack(false)} /> 
              )  
            }
          </>
        )
      }
    </>
  )
}

export default App