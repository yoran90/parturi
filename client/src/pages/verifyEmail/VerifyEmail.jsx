import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';

const VerifyEmail = () => {
  const { token } = useParams();

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(`http://localhost:8001/api/user/verify-email/${token}`);
      toast.success(response.data.message);
      navigate("/kirjaudu");
    } catch (error) {
      console.log(error);
      // Safe error handling to prevent issues when error.response is undefined
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className='bg-blue-500 w-full h-screen flex flex-col items-center justify-center'>
      <div className='bg-white md:w-[550px] w-[98%] m-auto rounded py-12 md:px-14 flex flex-col items-center justify-center p-4'>
        <div>
          <img src="https://static.vecteezy.com/system/resources/previews/022/459/086/original/green-check-mark-icon-in-a-circle-green-tick-icon-vector.jpg" className='w-32 h-32' alt="" />
        </div>
        <div className='flex flex-col items-center justify-center text-center gap-1.5 mt-6'>
          <h2 className='font-semibold text-green-600 text-lg'>Verify your email</h2>
          <p className='text-green-600'>You can now verify your email to start using our services ✅</p>
          <small className='text-green-600'>If you did not create an account, you can ignore this email</small>
        </div>
        <div className='mt-6 w-full'>
          <button onClick={handleVerifyEmail}
            className='bg-green-600 text-white hover:bg-green-700 w-full rounded cursor-pointer text-sm py-2'
            disabled={loading}
          >
            {loading ? <div className='flex items-center justify-center gap-2' >
                <p>Verifying</p>
                <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
              </div>   : 'Verify Email'}
          </button>

        </div>
        <div className='mt-2'>
          <p className='text-red-600 text-sm'>Verify email expires in 30 minutes </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail