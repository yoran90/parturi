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
        <div style={{zoom: '80%'}}>
          <ToastContainer autoClose={3000} theme="colored" position="top-center" />
        </div>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
