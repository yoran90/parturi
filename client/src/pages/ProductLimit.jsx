import React from 'react'

import axios from 'axios';
import YksiTuoate from './YksiTuoate';
import { useEffect } from 'react';

const ProductLimit = () => {

  const [loadingProduct, setLoadingProduct] = React.useState(true);
  const [products, setProdects] = React.useState([]);
  

  /* products */  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProduct(true);
        const response  = await axios.get("http://localhost:8001/api/products/getAllProducts?limit=4");
        setProdects(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProduct(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="w-[95%] m-auto">
      {loadingProduct ? (
        <p>Ladataan tuotteita...</p>
      ) : (
        <div className='grid md:grid-cols-4 grid-cols-2 gap-4'>
          {products.map(product => (
            <YksiTuoate key={product._id} id={product._id} images={product.images} title={product.title} price={product.price} discount={product.discount} description={product.description}  />
          ))}
        </div>
      )}
      
    </div>
  )
}

export default ProductLimit