import React, { useEffect, useState } from 'react';
import { MdAttachMoney } from "react-icons/md";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import { PiBookOpenTextBold } from "react-icons/pi";
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import Loading from '../../loading/Loading';


const AddPrice = () => {
  const [title, setTitle] = useState(['']);
  const [service, setService] = useState(['']); 
  const [priceId, setPriceId] = useState(['']);
  const [loadingForButton, setLoadingForButton] = React.useState(false);
  const [loading, setLoading] = useState(false);


  const handleTitleChange = (value, index) => {
    const newTitle = [...title];
    newTitle[index] = value;
    setTitle(newTitle);
  }

  const handlePriceChange = (value, index) => {
    setService(prev => {
      const newServices = [...prev];
      if (newServices[index] !== value) {
        newServices[index] = value;
      }
      return newServices;
    });
  };


  const addAnother = () => {
    setTitle([...title, ""]);
    setService([...service, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceObjects = title.map((t, index) => ({
      _id: priceId[index] || null,
      title: t,
      service: service[index],
    }));

    if (priceObjects.some(p => !p.title.trim() || !p.service.trim())) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoadingForButton(true);
        await axios.post("http://localhost:8001/api/price/addprice", { prices: priceObjects });
        toast.success("Prices added successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error saving prices");
      } finally {
        setLoadingForButton(false);
      }
    };


    //! geting exsisting prices to edit them
    useEffect(() => {
      const fetchPrice = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:8001/api/price/getprices");
          const pricesData = response.data;
          if (pricesData && pricesData.length > 0) {
            setTitle(pricesData.map(price => price.title));
            setService(pricesData.map(price => price.service));
            setPriceId(pricesData.map(price => price._id));
          }
        } catch (error) {
         console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetchPrice();
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

  
    const removePrice = async (index) => {

      if (priceId[index]) {
        try {
          await axios.delete(`http://localhost:8001/api/price/deleteprice/${priceId[index]}`);
          toast.success("Price deleted successfully");
        } catch (error) {
          console.log(error);
          toast.error("Error deleting price");
          return;
        }
      }

      const newTitle = title.filter((_, i) => i !== index);
      const newService = service.filter((_, i) => i !== index);
      const newId = priceId.filter((_, i) => i !== index);
      setTitle(newTitle);
      setService(newService);
      setPriceId(newId);

    }
 

  return (
    <div className='w-full h-[94vh] bg-white overflow-y-scroll scrollbarStyle pb-12'>
      <div className='w-[95%] m-auto bg-white shadow mt-4 py-8 border border-slate-200 rounded'>

      <div className='flex flex-col items-center gap-1.5 mt-2 justify-center'>
        <h3 className='font-semibold text-slate-600'>Add Price for Services</h3>
        <p className='text-sm text-slate-500 text-center'>
          Here you can add prices for your services. Please ensure that the prices are accurate and up-to-date.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='py-4 md:px-8 px-3 flex flex-col gap-4 mt-6'>
        
        {service.map((price, index) => (
          <div key={index} className='flex flex-col gap-2 mb-14 relative'>
            <hr />
            <div className='text-sm flex flex-col gap-2'>
              <label className='flex items-center gap-2'><PiBookOpenTextBold /> Give a title for your services</label>
              <input type="text" value={title[index] || ""} onChange={(e) => handleTitleChange(e.target.value, index)} className='w-full border border-slate-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:border-slate-500' placeholder='e.g., Haircut Prices' />
            </div>
            <div className='flex flex-col gap-2 mt-2'>

              <label className='text-sm flex items-center gap-1 font-medium text-slate-600'>
                <MdAttachMoney /> Add Price (Number - {index + 1})
              </label>
              <ReactQuill
                theme="snow"
                className="h-40 rounded-lg text-sm"
                value={service[index] || ""}
                onChange={(value) => handlePriceChange(value, index)}
                placeholder="Add Title with price like 'Parturileikkaus – 33 €'"
              />
            </div>
            <div className='top-4 absolute right-0'>
              <button className='cursor-pointer' onClick={() =>removePrice(index)} type='button'>
                <FaTrash className='text-red-500' />
              </button>
            </div>
            
          </div>
        ))}
        <div className='flex flex-col gap-0.5'>
          <button type='button' onClick={addAnother} className="bg-black hover:bg-black/80 w-fit cursor-pointer text-white mt-4 px-10 py-2 text-sm rounded">
            Add Another
          </button>
          <small className='text-slate-500'>You can add as many prices as you want for your services</small>
        </div>
        <div>
          <button type='submit' className='bg-red-600 hover:bg-red-500 w-full cursor-pointer text-white mt-4 px-10 py-2 text-sm rounded'>
            {
              loadingForButton ? (
                <div className='flex items-center justify-center   gap-2'>
                  Saving
                  <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                </div>
              ) : (
                <div>
                  Save Change
                </div>
              )
            }
          </button>
        </div>
      </form>
                </div>
    </div>
  );
};

export default AddPrice;
