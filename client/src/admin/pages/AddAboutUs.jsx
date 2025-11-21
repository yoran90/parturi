import React, { useEffect, useState } from 'react'
import Loading from '../../loading/Loading';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { PiBookOpenTextBold } from 'react-icons/pi';
import { MdOutlineDescription } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaUpload } from 'react-icons/fa';
import useAboutUs from '../../hooks/useAboutUs';




const AddAboutUs = () => {


  const {getAboutUs, setGetAboutUs} = useAboutUs();

  const [titleExtra, setTitleExtra] = useState([""]);
  const [imageTitleExtra, setImageTitleExtra] = useState([""]);
  const [service, setService] = useState([""]); 
  const [loadingForButton, setLoadingForButton] = React.useState(false);
  const [loading, setLoading] = useState(false);


  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [image, setImage] = useState('');
  const [imageTitles, setImageTitles] = useState([]);


  


  const addAnother = () => {
    setTitleExtra([...titleExtra, ""]);
    setService([...service, ""]);
  }

  const addAnotherImageTitle = () => {
    setImageTitleExtra([...imageTitleExtra, ""]);
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (title.length === 0 || title.some(t => t.trim() === "")) {
    toast.error('Please add a title for all sections');
    return;
  }

  if (description.length === 0 || description.some(d => d.trim() === "")) {
    toast.error('Please add a description for all sections');
    return;
  }

  if (imageTitles.length === 0 || imageTitles.some(it => it.trim() === "")) {
    toast.error('Please add at least one image title');
    return;
  }

  if (!image) {
    toast.error('Please add at least one image');
    return;
  }

  
    const formData = new FormData();
    formData.append('image', image[0]); 
    formData.append('imageTitles', JSON.stringify(imageTitles));
    formData.append('sections', JSON.stringify(
      title.map((t, i) => ({
        title: t,
        description: description[i],
      }))
    ));
  try {
    
    setLoadingForButton(true);

    let response;
    if (getAboutUs) {
      response = await axios.put(`http://localhost:8001/api/about-us/aboutUs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('About us updated successfully!');
    } else {
      response = await axios.post(`http://localhost:8001/api/about-us/aboutUs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('About us added successfully!');
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!');
  } finally {
    setLoadingForButton(false);
  }
};

  const removeExtra = (index) => {
    const newTitle = titleExtra.filter((item, i) => i !== index)
    const newService = service.filter((item, i) => i !== index)
    setTitleExtra(newTitle);
    setService(newService);
  }

  const removeImageTitle = (index) => {
    const newImageTitle = imageTitleExtra.filter((item, i) => i !== index)
    setImageTitleExtra(newImageTitle);
  }

  useEffect(() => {
    if (!getAboutUs) return;

    // Set image titles
    setImageTitles(getAboutUs.imageTitles.map(it => it));
    setImageTitleExtra(Array(getAboutUs.imageTitles.length).fill(""));

    // Set sections
    setTitle(getAboutUs.sections.map(s => s.title));
    setDescription(getAboutUs.sections.map(s => s.description[0] || ""));

    setTitleExtra(Array(getAboutUs.sections.length).fill(""));
    setService(Array(getAboutUs.sections.length).fill(""));

  }, [getAboutUs]);

  


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
    <div className='w-full h-[94vh] overflow-y-scroll scrollbarStyle pb-12'>
      <div className='flex flex-col items-center gap-1.5 mt-2 justify-center'>
        <h3 className='font-semibold text-slate-600'>Add Description or Title for your About Us</h3>
        <p className='text-sm text-slate-500 text-center'>
          Here you can add description or title for your About Us page and also what ever you want.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='py-4 md:px-8 px-3 flex flex-col gap-4 mt-6'>
        <hr />

        {
          imageTitleExtra.map((item, index) => (
            <div key={index} className='flex flex-col gap-2 relative'>
              <div className='text-sm flex flex-col gap-2'>
                <label className='flex items-center gap-2'><PiBookOpenTextBold /> Give a title for your (Image)</label>
                <input type="text" value={imageTitles[index] || ''} 
                  onChange ={ (e) => {
                    const newTitle = [...imageTitles];
                    newTitle[index] = e.target.value;
                    setImageTitles(newTitle);
                  }}
                  className='w-full border border-slate-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:border-slate-500' placeholder='We make your hair look good...' 
                />
              </div>
              <div className='flex flex-col gap-1'>
                <small className='text-red-600'>You can add multiple image title</small>
                <button type='button' onClick={addAnotherImageTitle} className='bg-red-600 w-fit text-white text-xs py-2 px-4 rounded cursor-pointer'>
                  Add Another Image Title
                </button>
              </div>
              <button type='button'>
                <FaTrash className='absolute top-2 right-2 text-red-600 cursor-pointer' onClick={() => removeImageTitle(index)} />
              </button>
            </div>
          ))
        }
        <div className='flex flex-col gap-2 relative'>
          <div className='text-sm flex flex-col gap-2'>
            <p className='flex items-center gap-2'>📸 Choose Image </p>
            
            <label htmlFor="imageId" className='flex flex-col items-center justify-center gap-2.5 cursor-pointer hover:bg-slate-100 text-slate-400 border-dashed border-2 border-slate-300 rounded overflow-hidden h-42'>
              {
              image ? (
                <img src={image ? URL.createObjectURL(image[0]) : ''} alt="" className='w-full h-full' />
              ) : (
                <>
                  <FaUpload size={60} />
                  <p>Upload Image</p>
                </>
              )
            }
            </label>
            <input type='file' id='imageId' onChange={(e) => setImage(e.target.files)} className='hidden'  accept='image/*' />
          </div>
        </div>
        <div>
          {getAboutUs?.image && (
            <img 
              src={getAboutUs.image} 
              alt="Current" 
              className="w-full h-72 object-cover rounded border"
            />
          )}

        </div>
        
        {service.map((item, index) => (
          <div key={index} className='flex flex-col gap-2 mb-14 relative'>
            <hr />
            <div className='text-sm flex flex-col gap-2'>
              <label className='flex items-center gap-2'><PiBookOpenTextBold /> Give a title for your services</label>
              <input type="text" value={title[index] || ''} 
                onChange={(e) => {
                  const newTitle = [...title]
                  newTitle[index] = e.target.value
                  setTitle(newTitle)
                }
                } 
                className='w-full border border-slate-300 rounded px-3 py-2 mt-1 text-sm focus:outline-none focus:border-slate-500' placeholder='We are here to make your hair look good...' 
              />
            </div>
            <div className='flex flex-col gap-2 mt-2'>

              <label className='text-sm flex items-center gap-1 font-medium text-slate-600'>
                <MdOutlineDescription /> Add Description
              </label>
              <ReactQuill
                theme="snow"
                className="h-40 rounded-lg text-sm"
                value={description[index] || ""}
                onChange={(value) => {
                  const newDescription = [...description];
                  newDescription[index] = value;
                  setDescription(newDescription);
                }}
                placeholder="Our barber shope can make you feel good..."
              />
            </div>
            <div className='top-4 absolute right-0'>
              <button className='cursor-pointer' onClick={() => removeExtra(index)} type='button'>
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
  )
}

export default AddAboutUs