import React from 'react'
import { Link } from 'react-router-dom'
import { HiArrowSmLeft } from "react-icons/hi";
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../loading/Loading'


const ForgotPassword = () => {

  const [email, setEmail] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post("http://localhost:8001/api/user/forgetPassword", { 
        email: email
       });
      toast.success(response?.message || "Password reset link sent to email");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full flex flex-col justify-center h-screen bg-slate-800'>
      <div className='flex gap-2.5 flex-col md:w-[46%] w-[95%] m-auto text-white'>
        <div className='text-white flex items-center justify-center flex-col -mt-32'>
          <div>
            <img src="https://cdn-icons-png.freepik.com/512/11135/11135314.png" className='w-42 h-42 rounded-full p-0' alt="" />
          </div>
          <div className='mt-4'>
            <h2 className='text-md font-bold text-center text-white mb-6'>Unohtunut salasana</h2>
          </div>
          <div>
            <p className='text-xs'>
              Tämä on unohtuneen salasanan sivu. Täällä voit ottaa käyttöön toiminnon salasanan palauttamiseksi.            
            </p>
          </div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-1.5 text-sm mt-6'>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="">Sähköpostiosoitteesi <span className='text-red-600'>*</span></label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-2 border border-slate-300 text-white rounded outline-none' placeholder='Kirjoita sähköpostiosoitteesi' />
          </div>
          <div className='mt-6'>
            <button type='submit' className='bg-red-700 hover:bg-red-800 p-2 w-full rounded cursor-pointer'>
              {
                loading ? (
                  <div className='flex items-center justify-center gap-1.5'>
                    <p>lähettäminen</p>
                    <Loading width={20} height={20} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                  </div>
                ) : (
                  "Lähetä nollauslinkki"
                )
              }
            </button>
          </div>
        </form>
        <div className='flex justify-end mt-2 items-center gap-1'>
          <HiArrowSmLeft className='text-blue-400' />
          <Link to="/kirjaudu" className='text-blue-400 text-sm cursor-pointer'>Takaisin kirjautumissivulle</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword