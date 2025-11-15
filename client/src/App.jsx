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
import Sidebar from './admin/sidebar'
import DisplayGalleryImage from './admin/pages/DisplayGalleryImage'
import AddProduct from './admin/pages/AddProduct'
import DisplayProduct from './admin/pages/DisplayProduct'
import AdminPageText from './admin/pages/AdminPageText'



const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Etusivut />}></Route>
        <Route path='/palvelut' element={<PalvelutHinta />}></Route>
        <Route path='/galaria' element={<Galleria />}></Route>
        <Route path='/tuotet' element={<Tuote />}></Route>
        <Route path='/tuote/:id' element={<TuoateSivu />}></Route>
        <Route path='/yhteystiedot' element={<Yhteystiedot />}></Route>

        <Route path='/admin' element={<Home />}>
          <Route path='/admin' element={<AdminPageText />}></Route>
          <Route path='sidebar' element={<Sidebar />}></Route>
          <Route path='addinformation' element={<AddInformation />}></Route>
          <Route path='imagevideo' element={<ImageVideo />}></Route>
          <Route path='imagevideoDisplay' element={<ImagevideoDisplay />}></Route>
          <Route path='addprice' element={<AddPrice />}></Route>
          <Route path='galleri' element={<AddGalleriImage />}></Route>
          <Route path='displayGalleri' element={<DisplayGalleryImage />}></Route>
          <Route path='addProduct' element={<AddProduct />}></Route>
          <Route path='displayProduct' element={<DisplayProduct />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App