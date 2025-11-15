import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import UpdateProduct from './UpdateProduct';
import { toast } from 'react-toastify';



const DisplayProduct = () => {

  const [products, setProdects] = React.useState([]);
  const [openUpadetProductModel, setOpenUpadetProductModel] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(false);


  const truncateWord = (text, limit = 35) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  const truncateTitle = (text, limit = 20) => {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

 // get all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response  = await axios.get("http://localhost:8001/api/products/getAllProducts");      
      setProdects(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // delete product 
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8001/api/products/deleteProduct/${id}`);
      if (response.status === 200) {
        toast.success("Product deleted successfully.");
        setProdects(products.filter(item => item._id !== id));
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);


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
    <div className='mt-2'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h3>DisplayProduct </h3>
        <p className='text-slate-500 text-sm'>
          You can see all products here and handle all of them like update delete so on.
        </p>
      </div>
      {/* display all product */}
      {
        products.length === 0 && (
          <p className='text-red-600 text-lg text-center mt-12'>No product found</p>
        )
      }
      <div className='md:block hidden mt-6 px-2'>
        {
          products.length > 0 && (
            <div className='grid border border-slate-400 py-1.5 px-2 grid-cols-5 items-center justify-center gap-4' style={{ gridTemplateColumns: "0.5fr 2fr 1fr 2fr 1fr" }}>
              <p>Image</p>
              <p>Title</p>
              <p>Price</p>
              <p>Description</p>
              <p>Action</p>
            </div>
          )
        }
        {
          products.length > 0 && products.map((product) => (
            <div key={product._id}>
              <div className='grid grid-cols-5 border border-slate-400 py-1 px-2 items-center justify-center gap-4' style={{ gridTemplateColumns: "0.5fr 2fr 1fr 2fr 1fr" }}>
                <div className='w-[50px] h-[50px]'>
                  <img src={`http://localhost:8001/${product.images[0].replaceAll('\\', '/')}`} alt={`${product.title}`} className='w-full h-full object-cover' />
                </div>
                <div>
                  <p className='text-sm'>{truncateTitle(product.title)}</p>
                </div>
                <div>
                  {
                    product?.discount > 0 ? (
                      <div className='flex items-center justify-center gap-1 relative'>
                        <p className='text-slate-500 line-through'>{product?.price}€</p>
                        <p className=' text-red-600'>{(product?.price - (product?.price * product?.discount) / 100).toFixed(2)}€</p>
                      </div>
                    ) : (
                      <div>
                        <p className='text-red-600'>{product?.price}€</p>
                      </div>
                    )
                  }
                </div>
                <div className='text-black text-sm line-clamp-1' dangerouslySetInnerHTML={{__html: product.description}} />
                <div className='pl-6'>
                  <button onClick={() => {
                    setOpenUpadetProductModel(true); setSelectedProduct(product)
                  }} className='text-green-600 cursor-pointer'>
                    <FaEdit size={20} />
                  </button>
                  <button onClick={() => deleteProduct(product._id)} className='text-red-600 ml-3 cursor-pointer'>
                    <BsTrash3Fill size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* for mobile screen */}
      <div className='md:hidden block mt-6 px-2'>
        <div className='grid border text-sm border-slate-400 py-1.5 px-2 grid-cols-5 items-center justify-center gap-4' style={{ gridTemplateColumns: "0.5fr 1.5fr 1fr 1fr" }}>
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          {/* <p>Description</p> */}
          <p>Action</p>
        </div>
        {
          products.length > 0 && products.map((product) => (
            <div key={product._id}>
              <div className='grid grid-cols-4 border border-slate-400 py-1 px-2 items-center justify-center gap-4' style={{ gridTemplateColumns: "0.5fr 1.5fr 1fr 1fr" }}>
                <div className='w-[45px] h-[45px]'>
                  <img src={`http://localhost:8001/${product.images[0].replaceAll('\\', '/')}`} alt={`${product.title}`} className='w-full h-full object-cover' />
                </div>
                <div>
                  <p className='text-sm'>{truncateTitle(product.title)}</p>
                </div>
                <div>
                  {
                    product?.discount > 0 ? (
                      <div className='flex items-center justify-center gap-1 relative'>
                        <p className='text-slate-500 line-through'>{product?.price}€</p>
                        <p className=' text-red-600'>{(product?.price - (product?.price * product?.discount) / 100).toFixed(2)}€</p>
                      </div>
                    ) : (
                      <div>
                        <p className='text-red-600'>{product?.price}€</p>
                      </div>
                    )
                  }
                </div>
                <div className='pl-6 w-[100px]'>
                  <button onClick={() => {
                    setOpenUpadetProductModel(true); setSelectedProduct(product)
                  }} className='text-green-600 cursor-pointer'>
                    <FaEdit size={20} />
                  </button>
                  <button onClick={() => deleteProduct(product._id)} className='text-red-600 ml-3 cursor-pointer'>
                    <BsTrash3Fill size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {
        openUpadetProductModel && (
          <UpdateProduct closeModal={() => setOpenUpadetProductModel(false)} product={selectedProduct} refreshProducts={fetchProducts}  />
        )
      }
    </div>
  )
}

export default DisplayProduct

