import React from 'react'
import { Route, Routes } from 'react-router-dom'
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
import Kirjaudu from './pages/Kirjaudu'
import Register from './pages/Register'
import MyAccount from './admin/pages/MyAccount'
import AllUsers from './admin/pages/AllUsers'
import EditUser from './admin/pages/EditUser'
import { userMiddleware } from './store/user-auth'
import ProfileUser from './pages/ProfileUser'
import ProtectUserRoute from './pages/protectUser/ProtectUserRoute'
import OpinionUser from './pages/opinion/OpinionUser'





const App = () => {

  const { isAuthenticated, loading, admin } = useSelector((state) => state.adminAuth);
  const { isAuthenticated: userIsAuthenticated, user } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkAdminAuth());
  }, [dispatch]);


  useEffect(() => {
    dispatch(userMiddleware());
  }, [dispatch]);
  

  if (loading) {
    return (
      <div className='flex flex-col gap-2 items-center justify-center h-screen w-full'>
        <div className='loader'></div>
        <style>{`
          .loader {
            border: 4px solid #ddd;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <p>Pleass wait...</p>
      </div>
    )
  }



  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Etusivut />}></Route>
        <Route path='/meistä' element={<Meistä />}></Route>
        <Route path='/palvelut' element={<PalvelutHinta />}></Route>
        <Route path='/galleria' element={<Galleria />}></Route>
        <Route path='/tuotet' element={<Tuote />}></Route>
        <Route path='/tuote/:id' element={<TuoateSivu />}></Route>
        <Route path='/yhteystiedot' element={<Yhteystiedot />}></Route>
        <Route path='/kirjaudu' element={<Kirjaudu />}></Route>
        <Route path='/register' element={<Register />}></Route>


        <Route path='/profile' element={
          <ProtectUserRoute isAuthenticated={userIsAuthenticated} user={user} loading={loading}>
            <ProfileUser />
          </ProtectUserRoute>
        }>
        </Route>
   
        <Route path='/opinion' element={<OpinionUser />}></Route>
        <Route path='/opinion' element={<Kirjaudu />}></Route>
     
        

        <Route path='/admin' element={
          <ProtectRoute isAuthenticated={isAuthenticated} admin={admin} loading={loading}>
            <Home />
          </ProtectRoute>
        }>
          <Route index element={<AdminPageText />}></Route>
          <Route path='sidebar' element={<Sidebar />}></Route>
          <Route path='myaccount' element={<MyAccount />}></Route>
          <Route path='allusers' element={<AllUsers />}></Route>
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
        </Route>

        <Route path='/login' element={<Login />}></Route>
        {/* No Found Page */}
        <Route path='*' element={<NoFoundPage />}></Route>
        {/* Unauth Page */}
        <Route path='/unauth-page' element={<UnAuthPage />} />
      </Routes>
    </div>
  )
}

export default App