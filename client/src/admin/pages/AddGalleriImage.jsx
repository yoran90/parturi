import React from 'react'
import { FaUpload } from 'react-icons/fa';
import Loading from '../../loading/Loading';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddGalleriImage = () => {


  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectFile, setSelectFile] = React.useState([]);
  const [loadingNetwork, setLoadingNetwork] = React.useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const fileWithPreview = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setSelectFile(fileWithPreview);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectFile.length === 0) {
      toast.error('Please select at least one file to upload');
    }

    try {
      setLoadingNetwork(true);
      setLoadingUpload(true);
      const formData = new FormData();
      selectFile.forEach(item => {
        formData.append('images', item.file);
      });

      const response = await axios.post('http://localhost:8001/api/media/gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Gallery images uploaded successfully');
      setLoadingUpload(false);

    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpload(false);
      setLoadingNetwork(false);
    }
    
  }

  const removeImage = (index) => {
    const newImage = selectFile.filter((_, i) => i !== index);
    setSelectFile(newImage);
  }
 

  return (
    <div className='relative'>
      {
        loadingNetwork && (
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
      <div className="md:px-6 md:py-8 p-2 h-[93vh] overflow-y-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white md:shadow md:p-6 px-2 py-4 rounded md:border border-slate-200">
          <h2 className="text-lg font-semibold text-red-600 mb-4">📸 Add Galleri (Image)</h2>

          {/* File Input */}
          <div className="flex flex-col text-sm gap-1">
            <div>Upload File</div>
            <label htmlFor="imageVideo">
              <div className="border border-slate-300 p-2 rounded cursor-pointer text-center bg-slate-100 hover:bg-slate-200 h-40 flex flex-col items-center justify-center">
                {
                  loadingUpload ? (
                    <div className='flex items-center justify-center'>
                      <Loading width={50} height={50} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                    </div>
                  ) : (
                    <>
                      <FaUpload className="mb-6 text-slate-400" size={40} />
                      Choose File
                    </>
                  )
                }
              </div>
            </label>
            <input type="file" id='imageVideo' 
              accept="image/*"
              multiple
              hidden 
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="bg-red-600 hover:bg-red-500 cursor-pointer text-white mt-6 mb-12 rounded py-2 px-6 text-sm font-semibold" >
            {
              loading ? (
                <div className='flex items-center justify-center gap-1.5 '>
                  Uploading
                  <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                </div>
              ) : (
                <div>
                  Upload Image
                </div>
              )
            }
          </button>
        </form>
        {
          selectFile.length > 0 && (
            <div className='flex flex-wrap gap-4 mt-8'>
              {
                selectFile.map((media, index) => (
                  <div key={index} className='relative'>
                    <img src={media.preview} alt='' className='w-32 h-32 object-cover rounded' />
                    <button type='button' onClick={() => removeImage(index)} className='absolute top-0 right-0 cursor-pointer'>❎</button>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default AddGalleriImage