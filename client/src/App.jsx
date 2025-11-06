import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Information from './components/up-header/information'
import Header from './components/header/Header'
import Etusivut from './pages/Etusivut'
import PalvelutHinta from './pages/PalvelutHinta'
import Galleria from './pages/Galleria'
import Tuote from './pages/Tuote'
import Yhteystiedot from './pages/Yhteystiedot'
import TuoateSivu from './pages/TuoateSivu'



const App = () => {
  return (
    <div>
      <Information />
      <Header />
      <Routes>
        <Route path='/' element={<Etusivut />}></Route>
        <Route path='/palvelut' element={<PalvelutHinta />}></Route>
        <Route path='/galaria' element={<Galleria />}></Route>
        <Route path='/tuotet' element={<Tuote />}></Route>
        <Route path='/tuote/:id' element={<TuoateSivu />}></Route>
        <Route path='/yhteystiedot' element={<Yhteystiedot />}></Route>
      </Routes>
    </div>
  )
}

export default App