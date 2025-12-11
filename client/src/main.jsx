import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js' 
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <div className='md:w-[80%] m-auto border-l border-r border-slate-100 shadow-lg'>

        <div className='w-fit' style={{zoom: '80%'}}>
          <ToastContainer autoClose={5000} theme="colored" position="top-center"   />
        </div>
        <App />
      </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
