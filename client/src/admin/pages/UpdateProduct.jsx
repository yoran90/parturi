import React from 'react'
import Loading from '../../loading/Loading';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { useEffect } from 'react';

const UpdateProduct = ({ closeModal, product, refreshProducts }) => {

  const [loadingForButton, setLoadingForButton] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [discount, setDiscount] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [images, setImages] = React.useState([]);

  const [loadingUpload, setLoadingUpload] = React.useState(false);

  const  handleSubmit = async (e) => {
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

    const formData  = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('discount', discount);
    formData.append('description', description);
    
   
    images.forEach(image => {
      if (image instanceof File) {
        formData.append('images', image);
      }
    });

    const existingImages = images.filter(img => typeof img === 'string');
    formData.append('existingImages', JSON.stringify(existingImages));

    try {
      setLoadingForButton(true);
      const response = await axios.put(`http://localhost:8001/api/products/updateProduct/${product._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        toast.success('Product updated successfully ✅');
        refreshProducts();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForButton(false);
    }
  }

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDiscount(product.discount);
      setDescription(product.description);

      setImages(product.images.map(img => (typeof img === 'string' ? img : img.url || img)));
    }
  }, [product])

  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img instanceof File) URL.revokeObjectURL(img);
      });
    }
  }, [images]);




  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    
  }

  return (
     <div className='md:px-6 px-2 w-full pb-12  fixed top-0 left-0 bottom-0 right-0 bg-black/80 bg-opacity-70 z-50 flex items-center justify-center'>
      {/* form */}
      <form onSubmit={handleSubmit} className='md:py-12 relative md:w-[80%] md:h-[87vh] h-screen overflow-y-scroll scrollbarStyle md:px-12 px-4 py-8 flex flex-col gap-4.5 bg-white md:shadow rounded md:border border-slate-200 mt-4'>
        <button onClick={closeModal} className='flex text-sm absolute right-2 md:top-3 cursor-pointer'>
          ❌
        </button>
        <div className='flex flex-col items-center justify-center'>
          <h3 className='text-red-600'>Update Products</h3>
          <p className='text-sm text-red-700'>Here you can update products and their information</p>
        </div>

         <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">Update Product Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Enter Product Title'/>
        </div>

         <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">Update Product Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}  className='border border-slate-300 p-1.5 px-3 rounded' placeholder='00.00€'/>
        </div>

         <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">Update Product Discount Price</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='25% Discount'/>
        </div>

        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">Update Product Description</label>
          <ReactQuill theme="snow" value={description} onChange={(value) => setDescription(value)} className="h-40 rounded-lg text-sm" placeholder="Enter Product Description" />
        </div>
        
        <div className='flex flex-col mt-12 text-sm gap-1'>
          <p>Update Product Image</p>
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
            images.length > 0 && images.map((image, index) => (
              <div key={index} className='flex w-[70px] h-[70px] border border-slate-300 items-center gap-1 mt-3 relative'>
                <img src={typeof image === 'string' ? image : URL.createObjectURL(image)}  alt="image" className='w-full h-full object-cover' />
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
              : 'Update Product'
            }
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct