import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js' 
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'
import axios from 'axios'
import BackToTop from './Scroll-to-top/BackToTop.jsx'
import CookieBanner from './cookie-banner/CookieBanner.jsx'


// ✅ Configure axios globally for Safari compatibility
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  const token = localStorage.getItem('userToken');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
)
export function Root() {
  const [bgColor, setBgColor] = useState('#ffffff')
  

  return (
    <>
    <CookieBanner />
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
              {/* back to top */}
              <div>
                <BackToTop />
              </div>
              
            </div>
          </BrowserRouter>
        </Provider>
      </StrictMode>
    </>
  )
}

createRoot(document.getElementById('root')).render(<Root />)

