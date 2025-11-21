import React from 'react';
import { FaUpload } from 'react-icons/fa';
import Loading from '../../loading/Loading';
import { toast } from 'react-toastify';
import axios from 'axios';
import useHeaderLogo from '../../hooks/useHeaderLogo';

const AddHeaderLogo = () => {
  const [loadingUpload, setLoadingUpload] = React.useState(false);
  const [selectFile, setSelectFile] = React.useState(null);

  const { headerLogo, setHeaderLogo } = useHeaderLogo();

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectFile({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  // Upload header logo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectFile) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      setLoadingUpload(true);

      const formData = new FormData();
      formData.append('image', selectFile.file);

      const { data } = await axios.post('http://localhost:8001/api/header-logo/logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

        toast.success('Header logo uploaded successfully!');
        setSelectFile(null); 
        setHeaderLogo(data.logo);

    } catch (error) {
      console.error(error);
      toast.error('Failed to upload header logo.');
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div className="md:px-6 md:py-8 p-2 h-[93vh] overflow-y-scroll scrollbarStyle">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white md:shadow md:p-6 px-2 py-4 rounded md:border border-slate-200"
      >
        <h2 className="text-lg font-semibold text-red-600 mb-4">
          📸 Add Header Logo (Image)
        </h2>

        {/* File Input */}
        <div className="flex flex-col text-sm gap-1">
          <div>Upload File</div>
          <label htmlFor="imageVideo">
            <div className="border border-slate-300 p-2 rounded cursor-pointer text-center bg-slate-100 hover:bg-slate-200 h-40 flex flex-col items-center justify-center">
              {loadingUpload ? (
                <Loading
                  width={50}
                  height={50}
                  border="4px"
                  topBorder="4px"
                  borderColor="white"
                  borderTopColor="red"
                />
              ) : (
                <>
                  <FaUpload className="mb-6 text-slate-400" size={40} />
                  Choose File
                </>
              )}
            </div>
          </label>
          <input
            type="file"
            id="imageVideo"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 cursor-pointer text-white mt-6 mb-12 rounded py-2 px-6 text-sm font-semibold flex items-center justify-center gap-2"
          disabled={loadingUpload}
        >
          {loadingUpload ? (
            <>
              Uploading
              <Loading
                width={20}
                height={20}
                border="3px"
                topBorder="3px"
                borderColor="white"
                borderTopColor="red"
              />
            </>
          ) : (
            'Upload Header Logo'
          )}
        </button>
      </form>

      {/* Preview Section */}
      <div className="flex mt-6 w-full items-center justify-center">
        {selectFile ? (
          <div className="relative w-full">
            <img
              src={selectFile.preview}
              alt="Preview"
              className="w-full h-[50vh] object-cover rounded"
            />
          </div>
        ) : headerLogo ? (
          <div className="relative w-full">
            <img
              src={headerLogo.url}
              alt="Header Logo"
              className="w-full h-[50vh] object-cover rounded"
            />
          </div>
        ) : (
          <div className="text-gray-400">No header logo available</div>
        )}
      </div>
    </div>
  );
};

export default AddHeaderLogo;
