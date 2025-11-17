import React from 'react';
import { FaFacebook, FaMapMarkerAlt, FaSnapchat, FaTiktok } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";
import Footer from '../components/footer/Footer';
import { CgInstagram } from 'react-icons/cg';
import Information from '../components/up-header/information';
import Header from '../components/header/Header';
import useInformation from '../hooks/useInformation';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../loading/Loading';
import SuccessMessage from './SuccessMessage';


const Yhteystiedot = () => {

  const { getInformation, loading } = useInformation();
  const [loadingButton, setLoadingButton] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return phoneRegex.test(phone);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast.error('Please enter your name');
      return;
    }
    if (!formData.phone) {
      toast.error('Please enter your phone number');
      return;
    }
    if (formData.name.length < 3) {
      toast.error('Name must be at least 3 characters');
      return;
    }
    if (formData.name.length > 20) {
      toast.error('Name must be less than 20 characters');
      return;
    }
    if (formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (formData.phone.length > 14) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (!formData.email) {
      toast.error('Please enter your email');
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }
    if (!formData.message) {
      toast.error('Please enter a message');
      return;
    }

    try {
      setLoadingButton(true);
      const response = await axios.post("http://localhost:8001/api/email/send-email", formData);
      
        setSuccessMessage(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
        });
    
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoadingButton(false);
    }

  }


  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan yhteystietoja...</p>
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
      </div>
    );
  }


  return (
    <div className='flex flex-col relative'>
      <Information />
      <Header />
      <div className='flex flex-col items-center text-center gap-2.5 mt-6'>
        <h1>Yhteystiedot & Otetaan yhteyttä</h1>
        <div className='flex items-center gap-5.5'>
            {
              getInformation?.socialMedia?.map((sm, index) => (
                <a key={index} href={sm?.url} target='_blank' rel="noopener noreferrer" className='cursor-pointer'>
                  {sm.platform === "facebook" && <FaFacebook size={16} />}
                  {sm.platform === "instagram" && <CgInstagram size={16} />}
                  {sm.platform === "tiktok" && <FaTiktok size={16} />}
                  {sm.platform === "snapchat" && <FaSnapchat size={16} />}
                  {sm.platform === "twitter" && <FaTwitter size={16} />}
                  {sm.platform === "youtube" && <FaYoutube size={16} />}
                </a>
              ))
            }
          </div>
        <div className='md:flex items-center justify-between gap-16 mt-8'>
          <div className='flex flex-col items-center justify-center md:mb-0 mb-8'>
            <FaMapMarkerAlt size={25} className='text-slate-600' />
            <h3 className='text-sm font-semibold text-slate-500 mt-2 mb-4'>OSOITE</h3>
            <p className='text-slate-500 text-sm'>{getInformation?.address}</p>
          </div>
          <div className='flex flex-col items-center justify-center md:mb-0 mb-8'>
            <FaPhone size={25} className='text-slate-600' />
            <h3 className='text-sm font-semibold text-slate-500 mt-2 mb-4'>PUHELIN</h3>
            <a className='text-slate-500 text-sm' href={`tel:${getInformation?.phone}`}>{getInformation?.phone}</a>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <MdAttachEmail size={25} className='text-slate-600' />
            <h3 className='text-sm font-semibold text-slate-500 mt-2 mb-4'>SAHKOPOSTI</h3>
            <a className='text-slate-500 text-sm' href='mailto:Ow6Xl@example.com'>{getInformation?.email}</a>
          </div>
          
        </div>
      </div>
      {/* contact form */}
      <div className='md:flex w-full gap-4 mt-16 md:px-8 px-4 mb-12'>
        {/* form */}
        <div className='md:w-[50%]'>
          <h3>Ota yhteyttä meihin</h3>
          <p>Saatavilla 24 tuntia vuorokaudessa!</p>
          <form onSubmit={handleSubmit} className='mt-6 flex flex-col gap-4 bg-white shadow border border-slate-100 rounded py-10 px-6'>
            
            <div className='text-sm flex flex-col gap-1'>
              <label htmlFor="">👤 Nimi <span className='text-red-600 font-semibold'>*</span></label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value })} placeholder='nimesi' className='border border-slate-200 rounded p-1.5' />
            </div>
            <div className='text-sm flex flex-col gap-1'>
              <label htmlFor="">📞 Puhelin <span className='text-red-600 font-semibold'>*</span></label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value })} placeholder='+35812345678' className='border border-slate-200 rounded p-1.5' />
            </div>
            <div className='text-sm flex flex-col gap-1'>
              <label htmlFor="">📧 Sähköposti <span className='text-red-600 font-semibold'>*</span></label>
              <input type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value })} placeholder='example@example.com' className='border border-slate-200 rounded p-1.5' />
            </div>
            <div className='text-sm flex flex-col gap-1'>
              <label htmlFor="">💬 Viesti <span className='text-red-600 font-semibold'>*</span></label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value })} cols="30" rows="10" placeholder='Kirjoita viesti...' className='border border-slate-200 rounded resize-none p-1.5'></textarea>
            </div>
            <div className='float-right flex justify-end'>
              <button type='submit' className='bg-blue-600 text-white py-1 px-3 rounded cursor-pointer'>
                {
                  loadingButton ? (
                    <div className='flex items-center justify-center gap-2'>
                      lähettäminen
                      <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='black' />
                    </div>
                  ) : (
                    <div>
                      lähetä viesti
                    </div>
                  )
                }
              </button>
            </div>
          </form>
        </div>
        {/* map */}
        <div className='md:w-[50%] md:mt-0 mt-8'>
          <div className='flex flex-col gap-1 mb-6'>
            <h3>Olemme Täällä</h3>
            <p>{getInformation?.address}</p>
          </div>
          <iframe 
              src={getInformation?.addressUrlForMap} 
              width="100%" 
              height="585px" 
              style={{ border: '0' }}
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>
      {/* succes message */}
      {
        successMessage && (
          <SuccessMessage close={() => setSuccessMessage(false)} />
        )
      }
      
      {/* footer */}
      <Footer />
    </div>
  )
}

export default Yhteystiedot