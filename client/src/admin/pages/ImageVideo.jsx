import React from 'react'
import { FaUpload } from 'react-icons/fa'
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';
import axios from 'axios';

const ImageVideo = () => {

  const [file, setFile] = React.useState(null);
  const [type, setType] = React.useState('');
  const [alt, setAlt] = React.useState('');
  const [preview, setPreview] = React.useState(null);
  const [mediaList, setMediaList] = React.useState([]);
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingNetwork, setLoadingNetwork] = React.useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map(file => ({
      file,
      type,
      alt,
      preview: URL.createObjectURL(file)
    }));
    setMediaList(prev => [...prev, ...newMedia]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaList.length) {
      toast.error("Please select a file to upload.");
      return;
    }
    if (!type) {
      toast.error("Please select a media type.");
      return;
    }

    /* upload each file */
    try {
      setLoadingNetwork(true);
      setLoadingUpload(true);
      const uploadMedia = []
      for (const media of mediaList) {
        const formData = new FormData();
        formData.append("file", media.file);
        formData.append("type", media.type);
        formData.append("alt", media.alt || alt);

        const response = await axios.post("http://localhost:8001/api/media/upload", formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.success) {
          uploadMedia.push(response.data.data);
        }
      }
      setMediaList(uploadMedia)
      toast.success("Media uploaded successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoadingUpload(false);
      setLoadingNetwork(false); 
    }
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

     <div className="md:px-6 md:py-8 p-2 h-[93vh] overflow-y-scroll scrollbarStyle">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white md:shadow md:p-6 px-2 py-4 rounded md:border border-slate-200">
        <h2 className="text-lg font-semibold text-red-600 mb-4">📸 Add Media (Image / Video)</h2>
        {/* Select Type */}
        <div className="flex flex-col text-sm gap-1">
          <label>Select Media Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="border border-slate-300 p-2 rounded">
            <option value="">Choose Type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

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
            accept={type === "image" ? "image/*" : "video/*"}
            onChange={handleFileChange} 
            hidden 
          />
        </div>

        {/* Alt Text */}
        <div className="flex flex-col text-sm gap-1">
          <label>Description (alt text)</label>
          <input type="text" placeholder="Enter a short description" className="border border-slate-300 p-2 rounded" />
        </div>

        <button type="submit" className="bg-red-600 hover:bg-red-500 cursor-pointer text-white mt-6 mb-12 rounded py-2 px-6 text-sm font-semibold" >
          {
            loading ? (
              <div className='flex items-center justify-center gap-1.5'>
                Uploading
                <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
              </div>
            ) : (
              <div>
                Upload Media
              </div>
            )
          }
        </button>
      </form>
      {
        mediaList.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-8'>
            {
              mediaList.map((media, index) => (
                <div key={index}>
                  {media.type === "image" ? (
                    <img src={media.preview} alt={media.alt} className='w-32 h-32 object-cover rounded' />
                  ) : (
                    <video src={media.preview} controls className='w-32 h-32 object-cover rounded' />
                  )}
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

export default ImageVideo