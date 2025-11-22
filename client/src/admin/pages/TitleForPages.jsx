import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import useTitleForPage from '../../hooks/useTitleForPage';



const TitleForPages = () => {


  const { getTitleForPage } = useTitleForPage();

  const [loadingForButton, setLoadingForButton] = useState(false);
  
  
  const [formData, setFormData] = useState({
    serviceTitle: "",
    serviceDescription: "",
    galleriTitle: "",
    galleriDescription: "",
    productTitle: "",
    productDescription: "",
    footerTitle: "",
    footerDescription: "",
    footerFooter: "",
    connectionTitle: "",
    connectionDescription: ""
  });
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

   useEffect(() => {

    if (!getTitleForPage) return;
    if (!getTitleForPage.titleForPage) return;
    if (isInitialized) return;

    setFormData({
      serviceTitle: getTitleForPage.titleForPage.serviceTitle || "",
      serviceDescription: getTitleForPage.titleForPage.serviceDescription || "",
      galleriTitle: getTitleForPage.titleForPage.galleriTitle || "",
      galleriDescription: getTitleForPage.titleForPage.galleriDescription || "",
      productTitle: getTitleForPage.titleForPage.productTitle || "",
      productDescription: getTitleForPage.titleForPage.productDescription || "",
      footerTitle: getTitleForPage.titleForPage.footerTitle || "",
      footerDescription: getTitleForPage.titleForPage.footerDescription || "",
      footerFooter: getTitleForPage.titleForPage.footerFooter || "",
      connectionTitle: getTitleForPage.titleForPage.connectionTitle || "",
      connectionDescription: getTitleForPage.titleForPage.connectionDescription || "",
    });

    setIsInitialized(true);

  }, [getTitleForPage, isInitialized]);

   if (!getTitleForPage || !isInitialized) {
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



  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingForButton(true);
    try {

      if (getTitleForPage?.titleForPage) {
        const response = await axios.put("http://localhost:8001/api/titleForPages/updateT-Dforpage", formData);
        toast.success(response.data.message);
      } else {
        const response = await axios.post("http://localhost:8001/api/titleForPages/addT-Dforpage", formData);
        toast.success(response.data.message);
      }

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
    <div className='md:px-6 px-2 h-[95vh] w-full overflow-scroll pb-12 scrollbarStyle'>
      {/* form */}
      <form onSubmit={handleSubmit} className='md:py-12 md:px-4 p-2 flex flex-col gap-4.5 bg-white md:shadow rounded md:border border-slate-200 mt-4'>
        <div className='flex flex-col items-center justify-center'>
          <h3 className='text-red-600'>Add Title and Decription For All Pages In Here</h3>
          <p className='text-sm text-red-700'>Here you can handle and add title and description for all pages in here and what evere you want.</p>
        </div>

        <div className='flex flex-col gap-16'>
          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Service Title</label>
              <input type="text" name='serviceTitle' value={formData.serviceTitle || ''} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Enter your service title'/>
            </div>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Service Description</label>
              <ReactQuill theme="snow" name='serviceDescription' value={formData.serviceDescription || ''} onChange={(value) => setFormData({ ...formData, serviceDescription: value }) } className="h-40 rounded-lg text-sm" placeholder="Enter your service description" />
            </div>
          </div>
            
          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Gallery Title</label>
              <input type="text" name='galleriTitle' value={formData.galleriTitle || ''} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Eneter your gallery title'/>
            </div>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Gallery Description</label>
              <ReactQuill theme="snow" name='galleriDescription' value={formData.galleriDescription || ''} onChange={(value) => setFormData({ ...formData, galleriDescription: value }) } className="h-40 rounded-lg text-sm" placeholder="Enter your gallery description" />
            </div>
          </div>  
            
          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Product Title</label>
              <input type="text" name='productTitle' value={formData.productTitle || ''} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Enter your product title'/>
            </div>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Product Description</label>
              <ReactQuill theme="snow" name='productDescription' value={formData.productDescription || ''} onChange={(value) => setFormData({ ...formData, productDescription: value }) } className="h-40 rounded-lg text-sm" placeholder="Enter your product description" />
            </div>
          </div>  

          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Footer Title</label>
              <input type="text" name='footerTitle' value={formData.footerTitle || ''} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Enter your footer title'/>
            </div>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Footer Description</label>
              <ReactQuill theme="snow" name='footerDescription' value={formData.footerDescription || ''} onChange={(value) => setFormData({ ...formData, footerDescription: value }) } className="h-40 rounded-lg text-sm" placeholder="Enter your footer description" />
            </div>
            <div className='flex flex-col text-sm gap-1 mt-12'>
              <label htmlFor="">Footer (Footer) - Description</label>
              <ReactQuill theme="snow" name='footerFooter' value={formData.footerFooter || ''} onChange={(value) => setFormData({ ...formData, footerFooter: value }) } className="h-40 rounded-lg text-sm" placeholder="Enter your footer (footer) description" />
            </div>
          </div>  

          <div className='flex flex-col gap-2.5'>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Connection Title</label>
              <input type="text" name='connectionTitle' value={formData.connectionTitle || ''} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value})} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Enter your connection title'/>
            </div>
            <div className='flex flex-col text-sm gap-1'>
              <label htmlFor="">Connection Description</label>
              <ReactQuill theme="snow" name='connectionDescription' value={formData.connectionDescription || ''} onChange={(value) => setFormData({ ...formData, connectionDescription: value }) } className="h-40 rounded-lg text-sm" placeholder="Enter your connection description" />
            </div>
          </div>  

        </div>
       
   
  
        <div className='flex justify-end mt-12'>
          <button className='bg-red-500 text-white py-1.5 px-14 rounded-full text-sm cursor-pointer hover:bg-red-400 flex items-center gap-2'>
            {
              loadingForButton ? <div className='flex items-center justify-center gap-2'>
                <p>Saving</p>
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




 

