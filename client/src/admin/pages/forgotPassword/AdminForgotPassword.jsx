import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowSmLeft } from "react-icons/hi";
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../../loading/Loading'


const AdminForgotPassword = () => {

  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/admin-forget-password`,
        { email }
      );
      toast.success(response?.data?.message || "Password reset link sent to email");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='w-full flex flex-col justify-center h-screen bg-slate-800'>
      <div className='flex gap-2.5 flex-col md:w-[50%] w-[95%] m-auto text-white'>
        <div className='text-white flex items-center justify-center flex-col -mt-32'>
          <div>
            <img src="https://cdn-icons-png.flaticon.com/512/9710/9710382.png" className='w-42 h-42 rounded-full p-0' alt="" />
          </div>
          <div className='mt-4'>
            <h2 className='text-md font-bold text-center text-white mb-6'>Forgotten password</h2>
          </div>
          <div>
            <p className='text-xs'>
              This is the forgotten password page. Here you can enable the function to reset your password.          
            </p>
          </div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-1.5 text-sm mt-6'>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Enter your email <span className='text-red-600'>*</span></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2 border border-slate-300 text-white rounded outline-none' placeholder='Enter your email ...' />
          </div>
          <div className='mt-6'>
            <button type='submit' className='bg-red-700 hover:bg-red-800 p-2 w-full rounded cursor-pointer'>
              {
                loading ? (
                  <div className='flex items-center justify-center gap-1.5'>
                    <p>Sending</p>
                    <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                  </div>
                ) : (
                  "Send reset link"
                )
              }
            </button>
          </div>
        </form>
        <div className='flex justify-end mt-2 items-center gap-1'>
          <HiArrowSmLeft className='text-blue-400' />
          <Link to="/login" className='text-blue-400 text-sm cursor-pointer'>Back to login</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminForgotPassword
