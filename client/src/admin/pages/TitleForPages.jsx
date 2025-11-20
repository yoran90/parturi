import React, { useEffect } from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { BsTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addInformationFiled } from '../../store/admin-auth';
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';



const TitleForPages = () => {


  const [loadingForButton, setLoadingForButton] = React.useState(false);
  const [serviceTitle, setServiceTitle] = React.useState('');
  const [serviceDescription, setServiceDescription] = React.useState('');
  const [galleriTitle, setGalleriTitle] = React.useState('');
  const [galleriDescription, setGalleriDescription] = React.useState('');
  const [productTitle, setProductTitle] = React.useState('');
  const [productDescription, setProductDescription] = React.useState('');
  const [footerTitle, setFooterTitle] = React.useState('');
  const [footerDescription, setFooterDescription] = React.useState('');
  const [footerFooter, setFooterFooter] = React.useState('');
  const [connectionTitle, setConnectionTitle] = React.useState('');
  const [connectionDescription, setConnectionDescription] = React.useState('');

  const [loading, setLoading] = React.useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingForButton(true);
    try {

    } catch (error) {
      console.log(error);
      
    } finally {
      setLoadingForButton(false);
    }
  } 




  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan odota...</p>
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
    <div className='md:px-6 px-2 h-[95vh] w-full overflow-scroll pb-12 scrollbarstyle'>
      {/* form */}
      <form onSubmit={handleSubmit} className='md:py-12 md:px-4 p-2 flex flex-col gap-4.5 bg-white md:shadow rounded md:border border-slate-200 mt-4'>
        <div className='flex flex-col items-center justify-center'>
          <h3 className='text-red-600'>Add Title and Decription For All Pages In Here</h3>
          <p className='text-sm text-red-700'>Here you can handle and add title and description for all pages in here and what evere you want.</p>
        </div>
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">Service Title</label>
          <input type="text" className='border border-slate-300 p-1.5 px-3 rounded' placeholder='example@example.com'/>
        </div>
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">➕ Add opening hours</label>
          <ReactQuill theme="snow" className="h-40 rounded-lg text-sm" placeholder="Example: <b>Ma–Pe</b> (10:00 - 19:00) <br/> La–Su (10:00 - 18:00)" />
        </div>
       
   
  
        <div className='flex justify-end mt-6'>
          <button className='bg-red-500 text-white py-1.5 px-14 rounded-full text-sm cursor-pointer hover:bg-red-400 flex items-center gap-2'>
            {
              loadingForButton ? <div className='flex items-center justify-center gap-2'>
                <p>Adding</p>
                <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
              </div>  
              : 'Add Save'

            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default TitleForPages




 

