import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../loading/Loading';
import { HiArrowSmLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import axios from 'axios';




const AdminResetPasssword = () => {

  const { token } = useParams();
  
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);


  const  handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:8001/api/auth/admin-reset-password/${token}`, {
        password,
        confirmPassword
      });
      toast.success(response?.data?.message || "Password reset successful ✅ Please login with your new password");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  };


  return (
     <div className='w-full flex flex-col justify-center h-screen bg-slate-800'>
      <div className='flex gap-2.5 flex-col md:w-[50%] w-[95%] m-auto text-white'>
        <div className='text-white flex items-center justify-center flex-col md:-mt-16'>
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/9710/9710382.png" className='w-42 h-42 rounded-full p-0' alt="" />
          </div>
          <div className='mt-4'>
            <h2 className='text-md font-bold text-center text-white mb-6'>Password Reset</h2>
          </div>
          <div>
            <p className='text-xs'>
              you can easily get a new password you can easily get a new password. Enter your new password in the field below.          
            </p>
          </div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4.5 text-sm mt-6'>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">🔑 New password <span className='text-red-600'>*</span></label>
            <div className='border border-slate-300 flex items-center justify-between py-2 px-3 rounded'>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className='w-full  border-none outline-none' placeholder='type your password' />
              {
                showPassword ? (
                  <BsFillEyeSlashFill onClick={() => setShowPassword(false)} size={18} className='cursor-pointer' />
                ) : (
                  <BsFillEyeFill onClick={() => setShowPassword(true)}  size={18} className='cursor-pointer' />
                )
              }
            </div>
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">🔑 Confirm new password <span className='text-red-600'>*</span></label>
            <div className='border border-slate-300 flex items-center justify-between py-2 px-3 rounded'>
              <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='w-full border-none outline-none' placeholder='type your confirm new password' />
              {
                showConfirmPassword ? (
                  <BsFillEyeSlashFill onClick={() => setShowConfirmPassword(false)} size={18} className='cursor-pointer' />
                ) : (
                  <BsFillEyeFill onClick={() => setShowConfirmPassword(true)}  size={18} className='cursor-pointer' />
                )
              }
            </div>
          </div>
          <div className='mt-6'>
            <button type='submit' className='bg-red-700 hover:bg-red-800 p-2 w-full rounded cursor-pointer'>
              {
                loading ? (
                  <div className='flex items-center justify-center gap-1.5'>
                    <p>Resetting</p>
                    <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                  </div>
                ) : (
                  "Change Password"
                )
              }
            </button>
          </div>
        </form>
        <div className='flex justify-end mt-2 items-center gap-1'>
          <HiArrowSmLeft className='text-blue-400' />
          <Link to="/admin-forgot-password" className='text-blue-400 text-sm cursor-pointer'>Back</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminResetPasssword