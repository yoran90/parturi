import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js' 
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'




function Root() {

  const [bgColor, setBgColor] = useState('#ffffff')

  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <div className='top-0 items-center left-0 fixed z-50 md:flex hidden'>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-8 rounded-lg cursor-pointer" />
            </div>
            <div id='appBackground' style={{ backgroundColor: bgColor, minHeight: "100vh"}}>
              <div className='w-fit' style={{zoom: '80%'}}>
                <ToastContainer autoClose={5000} theme="colored" position="top-center"   />
              </div>
              <App />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)

