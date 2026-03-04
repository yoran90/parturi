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
import { MdOutlineMessage } from "react-icons/md";
import FeedBack from './feedBack/FeedBack.jsx'


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
);
export function Root() {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [openFeedBack, setOpenFeedBack] = useState(false);

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
            {/* back to top */}
            <div>
              <BackToTop />
            </div>
            {/* feed back */}
            <div className={`fixed bottom-4 left-4 border-2 border-amber-600 bg-amber-400 text-white rounded-full cursor-pointer p-2 ${openFeedBack ? 'hidden' : 'block'}`}>
              <MdOutlineMessage onClick={() => setOpenFeedBack(true)}  size={22} className={`text-white z-50`}/>
            </div>
            {openFeedBack && (
                <FeedBack onClose={() => setOpenFeedBack(false)} /> 
              )  
            }
          </div>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />);

