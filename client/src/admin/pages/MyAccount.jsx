import React from 'react'
import { FaUpload } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { MdAdminPanelSettings } from "react-icons/md";

const MyAccount = () => {

  const { admin, loading } = useSelector((state) => state.adminAuth);
  
  if (loading || !admin) {
    return (
      <div className='flex flex-col items-center justify-center mt-4 mb-12'>
        <div className='loader'></div>
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

  return (
    <div className='flex flex-col items-center justify-center mt-4 mb-12'>
      <div className='flex flex-col items-center justify-center gap-1.5'>
        {
          admin?.profileImage?.url ? (
            <img className='w-28 h-28 border rounded-full' src={admin?.profileImage} alt="" />
          ) : (
            admin?.gender === 'men' ? (
              <img className='w-28 h-28 rounded-full border ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
            ) : (
              <img className='w-28 h-28  rounded-full border' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
            )
          )
        }
        <div className='mt-2'>
          <label htmlFor="imageId" className='flex items-center justify-center border border-slate-400 px-4 py-1 rounded-full text-xs cursor-pointer'>
            <input type="file" id='imageId' className='hidden' />
            <FaUpload />
            <span className='btn btn-primary'>Upload</span>

          </label>
        </div>
        <h3 className='text-slate-600'>{admin?.firstName} {admin?.lastName}</h3>
        <p className='text-sm text-slate-400'>{admin?.email}</p>
        <button className='bg-green-600 text-white text-sm rounded px-4 py-1 flex gap-1'>
          <MdAdminPanelSettings />
          {admin?.role}
        </button>
      </div>

      <form className='mt-4 w-full md:px-26 px-4 flex flex-col gap-3.5' style={{zoom: '98%'}}>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">First Name</label>
          <input type="text" placeholder='First name' className='border border-slate-400 rounded outline-none focus:none py-1.5 px-3' />
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">Last Name</label>
          <input type="text" placeholder='First name' className='border border-slate-400 rounded outline-none focus:none py-1.5 px-3' />
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">Gender</label>
          <select className='border border-slate-400 rounded py-2 px-3'>
            <option value="">Select Gender</option>
            <option value="men">Male</option>
            <option value="women">Female</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">Email</label>
          <input type="email" placeholder='Email' className='border border-slate-400 rounded outline-none focus:none py-1.5 px-3' />
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">Password</label>
          <input type="password" placeholder='Password' className='border border-slate-400 rounded outline-none focus:none py-1.5 px-3' />
        </div>
        <button className='bg-red-500 py-1.5 tex-sm rounded mt-4 text-white'>Save Changes</button>
      </form>
      <p>
        
      </p>
    </div>
  )
}

export default MyAccount