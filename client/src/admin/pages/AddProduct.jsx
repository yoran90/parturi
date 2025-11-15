import React from 'react'
import Loading from '../../loading/Loading';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FaTrash, FaUpload } from 'react-icons/fa';






const AddProduct = () => {

  const [loadingForButton, setLoadingForButton] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [discount, setDiscount] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [loadingUpload, setLoadingUpload] = React.useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Please add a title');
      return;
    }
    if (!price) {
      toast.error('Please add a price');
      return;
    }

    if (!description) {
      toast.error('Please add a description');
      return;
    }
    if (images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    try {
      setLoading(true);
      setLoadingForButton(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('discount', Number(discount));
      formData.append('description', description);

      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      const response = await axios.post("http://localhost:8001/api/products/addproduct", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      
      toast.success(response.data.message);
      setTitle('');
      setPrice('');
      setDiscount('');
      setDescription('');
      setImages([]);
    } catch (error) {
      console.log(error); 
    } finally {
      setLoadingForButton(false);
      setLoading(false);
    }
  }

  const handleRemoveImage = (index) => {
    const newImage = images.filter((_, i) => i !== index);
    setImages(newImage);
  }


  


  return (
    <div className='relative'>
      {
        loading && (
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
        )
      }
      <div className='md:px-6 px-2 h-[95vh] w-full overflow-scroll pb-12 scrollbarstyle'>
        {/* form */}
        <form onSubmit={handleSubmit} className='md:py-12 md:px-4 p-2 flex flex-col gap-4.5 bg-white md:shadow rounded md:border border-slate-200 mt-4'>
          <div className='flex flex-col items-center justify-center'>
            <h3 className='text-red-600'>Add New Products</h3>
            <p className='text-sm text-red-700'>Here you can add products and their information</p>
          </div>

          <div className='flex flex-col text-sm gap-1'>
            <label htmlFor="">Add Product Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Enter Product Title'/>
          </div>

          <div className='flex flex-col text-sm gap-1'>
            <label htmlFor="">Add Product Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}  className='border border-slate-300 p-1.5 px-3 rounded' placeholder='00.00€'/>
          </div>

          <div className='flex flex-col text-sm gap-1'>
            <label htmlFor="">Add Product Discount Price</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='25% Discount'/>
          </div>

          <div className='flex flex-col text-sm gap-1'>
            <label htmlFor="">Add Product Description</label>
            <ReactQuill theme="snow" value={description} onChange={(value) => setDescription(value)} className="h-40 rounded-lg text-sm" placeholder="Enter Product Description" />
          </div>
          
          <div className='flex flex-col mt-12 text-sm gap-1'>
            <p>Add Product Image</p>
            <label htmlFor="image" className='flex flex-col items-center hover:bg-slate-200 justify-center gap-3 border border-slate-300 rounded h-42 cursor-pointer'>
              {
                loadingUpload ? (
                  <div className='flex items-center justify-center'>
                    <Loading width={50} height={50} border='6px' topBorder='6px' borderColor='red' borderTopColor='white' />
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <FaUpload size={40} className='text-slate-400' />
                    <p className='text-slate-400'>Upload Image</p>
                  </div>
                )
              }
            </label>
            <input type="file" hidden id='image' onChange={(e) => {
              const files = Array.from(e.target.files); setImages(files)
            }} 
            multiple 
            />
            <p className='text-slate-400 text-sm'>choose image from your device.</p>
          </div>
          <div className='flex flex-wrap gap-2'>
            {
              images.length > 0 && images?.map((image, index) => (
                <div key={index} className='flex w-[120px] h-[120px] items-center gap-2 mt-3 relative'>
                  <img src={URL.createObjectURL(image)} alt="image" className='w-full h-full object-cover' />
                  <button type='button' onClick={() => handleRemoveImage(index)} className='bg-red-500 p-1 text-white text-sm absolute top-0 right-0 cursor-pointer'>
                    <FaTrash />
                  </button>
                </div>
              ))
            }
          </div>

          <div className='flex justify-end mt-6'>
            <button className='bg-red-500 text-white py-1.5 px-14 rounded-full text-sm cursor-pointer hover:bg-red-400 flex items-center gap-2'>
              {
                loadingForButton ? <div className='flex items-center justify-center gap-2'>
                  <p>Adding</p>
                  <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                </div>  
                : 'Add Product'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct