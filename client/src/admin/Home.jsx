import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Sidebar from './Sidebar'


const Home = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
       
      <div style={{ flex: 1 }}>
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main>        
          <Outlet />
        </main>
      </div>
      
    </div>
  )
}

export default Home