import React, { useState } from 'react'
import { RxBackpack } from "react-icons/rx";
import { MdDriveFolderUpload } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../../loading/Loading';
import JobSuccessMessage from './JobSuccessMessage';




const JobApplication = ({ close }) => {


  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectJob: '',
    month: '',
    day: '',
    year: '',
    resume: null,
    message: ''
  });

  const getStartDay = () => {
    const { day, month, year } = formData;
    if (!day || !month || !year) return '';
    
    const monthNumber = month.includes('-') ? month.split('-')[1] : month.padStart(2,'0');

    return `${year}-${monthNumber}-${day.padStart(2, '0')}`; // e.g., 2026-02-12
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }) );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = getStartDay();
    const { firstName, lastName, email, phone, selectJob, resume, message } = formData;

    if (!firstName || !lastName || !email || !phone || !selectJob || !startDate) {
      toast.error('Kaikki kentät ovat pakollisia, jos tahdel on *, se on pakollinen');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', firstName);
      formDataToSend.append('lastName', lastName);
      formDataToSend.append('email', email);
      formDataToSend.append('phone', phone);
      formDataToSend.append('selectJob', selectJob);
      formDataToSend.append('startDate', startDate);
      formDataToSend.append('message', message);
      if (resume) formDataToSend.append('resume', resume);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/job/apply-job`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response) {
        setSuccessMessage(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          selectJob: '',
          month: '',
          day: '',
          year: '',
          resume: null,
          message: ''
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      {!successMessage && (
        <div className='fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center z-50 bg-black/60'>
          <div className='w-full md:max-w-[70%] md:mx-0 mx-1 bg-white rounded shadow-lg md:px-12 md:py-12 py-8 md:mt-0 mt-8 px-3 md:h-auto md:mb-0 mb-12  relative'>
            <button className='absolute top-4 right-4 text-slate-500 text-xs cursor-pointer hover:text-slate-700' onClick={close}>❌</button>
            <div className='flex items-center md:justify-center md:ml-14 gap-4 mb-12 md:mt-0 mt-6'>
              <div>
                <RxBackpack size={46} className='text-slate-500'/>
              </div>
              <div className='flex flex-col'>
                <p className='text-slate-600 font-semibold'>Työhakemus</p>
                <p className='text-slate-900 text-sm'>Täytä alla oleva lomake hakeaksesi meille työpaikkaa.</p>
              </div>
            </div>
            {/* form */}
            <form onSubmit={handleSubmit} className='flex flex-col md:gap-7 gap-6 md:overflow-hidden overflow-y-scroll scrollbarStyle md:h-auto h-[70vh] md:pb-0 pb-12 md:pr-0 pr-4'>
              <div className='flex items-center'>
                <div className='md:flex hidden gap-1 w-1/3 items-center'>
                  <p>Koko nimi</p>
                  <small className='text-red-700'>*</small>
                </div>
                <div className='flex items-center gap-2 w-full text-sm'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="firstName">Etunimi <small className='text-red-700'>*</small></label>
                    <input type="text" id='firstName' name='firstName' value={formData.firstName || ''} onChange={handleChange} className='border border-slate-400 rounded outline-none py-1 px-3 w-full' placeholder='Anna etunimesi' />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="lastName">Sukunimi <small className='text-red-700'>*</small></label>
                    <input type="text" id='lastName' name='lastName' value={formData.lastName || ''} onChange={handleChange} className='border border-slate-400 rounded outline-none py-1 px-3 w-full' placeholder='Anna sukunimesi' />
                  </div>
                </div>
              </div>

              <div className='md:flex-row flex flex-col md:items-center'>
                <div className='flex gap-1 w-1/3 items-center'>
                  <p>Sähköpostiosoite</p>
                  <small className='text-red-700'>*</small>
                </div>
                <div className='flex items-center gap-1 w-full text-sm'>
                  <input type="text" id='email' name='email' value={formData.email || ''} onChange={handleChange} className='border border-slate-400 rounded outline-none py-1 px-3 w-full' placeholder='Anna sähköpostiosoite ... esim. 0v8o0@example.com' />
                </div>
              </div>

              <div className='md:flex-row flex flex-col md:items-center'>
                <div className='flex gap-1 w-1/3 items-center'>
                  <p>Puhelinnumero</p>
                  <small className='text-red-700'>*</small>
                </div>
                <div className='flex items-center gap-1 w-full text-sm'>
                  <input type="number" name='phone' value={formData.phone || ''} onChange={handleChange} className='border border-slate-400 rounded outline-none py-1 px-3 w-full' placeholder='Anna puhelinnumero ... esim. +358 123 456 789' />
                </div>
              </div>

              <div className='md:flex-row flex flex-col md:items-center'>
                <div className='flex gap-1 md:w-1/3 items-center'>
                  <p>Haen työsuhteeseen</p>
                  <small className='text-red-700'>*</small>
                </div>
                <div className='flex items-center gap-1 w-full text-sm'>
                  <select name="selectJob" value={formData.selectJob || ''} onChange={handleChange} className='border border-slate-400 rounded outline-none py-1 px-3 w-full'>
                    <option value="">Valitse työsuhteeseen...</option>
                    <option value="Kokoaikainen">Kokoaikainen</option>
                    <option value="Osa-aikainen">Osa-aikainen</option>
                    <option value="Kesätyö">Kesätyö</option>
                    <option value="Harjoittelu">Harjoittelu</option>
                  </select>
                </div>
              </div>

              <div className='md:flex-row flex flex-col md:items-center'>
                <div className='flex gap-1 w-1/3 items-center'>
                  <p>Aloituspäivämäärä</p>
                  <small className='text-red-700'>*</small>
                </div>
                <div className='flex items-center gap-2 w-full text-sm'>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="month">Kuukausi</label>
                    <input
                      id="month"
                      type="month"
                      name='month'
                      value={formData.month || ''}
                      onChange={handleChange}
                      placeholder='Kuukausi'
                      className='border border-slate-400 rounded outline-none py-1 px-3 w-full'
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="day">Päivä</label>
                    <input
                      id="day"
                      type="number"
                      min="1"
                      max="31"
                      name='day'
                      value={formData.day || ''}
                      onChange={handleChange}
                      className='border border-slate-400 rounded outline-none py-1 px-3 w-full'
                      placeholder='Päivä'
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label htmlFor="year">Vuosi</label>
                    <input
                      id="year"
                      type="number"
                      min="1900"
                      max="2100"
                      name='year'
                      value={formData.year || ''}
                      onChange={handleChange}
                      className='border border-slate-400 rounded outline-none py-1 px-3 w-full'
                      placeholder='Vuosi'
                    />
                  </div>
                </div>
              </div>

              <div className='md:flex-row flex flex-col'>
                <div className='flex gap-1 md:w-1/3'>
                  <p>Lähetä ansioluettelo</p>
                </div>
                <div className='w-full flex flex-col'>

                  <div className='flex items-center gap-1 w-full text-sm'>
                    <label htmlFor="cv" className='border border-dashed border-slate-400 rounded flex flex-col items-center justify-center outline-none py-2 px-4 w-full h-32 bg-slate-100 cursor-pointer hover:bg-slate-200'>
                      Valitse tiedosto
                      <MdDriveFolderUpload size={30} className='text-slate-400' />
                    </label>
                    <input type="file" hidden id='cv' name='resume'  onChange={handleChange}  />
                  </div>
                  <div className='mt-2 text-sm'>
                  
                  {formData.resume ? 
                    <div className='flex items-center gap-2.5'>
                      <h5 className='text-red-600'>Valittu tiedosto:</h5> 
                      <p className='text-blue-600'>{formData.resume.name}</p>
                    </div>  
                    :
                    <div>
                      <p className='text-slate-600'>Ei vielä tiedostoa valittu</p>
                    </div> 
                  }
                  
                </div>
                </div>
              </div>
              

              <div className='md:flex-row flex flex-col '>
                <div className='flex gap-1 w-1/3'>
                  <p>Motivaatiokirje</p>
                </div>
                <div className='flex items-center gap-1 w-full text-sm'>
                  <textarea name="message" value={formData.message || ''} onChange={handleChange} id="" rows="6" className='border border-slate-400 rounded outline-none py-2 px-3 w-full resize-none' placeholder='Kirjoita motivaatiokirjeesi tähän...'></textarea>
                </div>
              </div>

              <div className='md:w-[75%] md:ml-[25%] mt-2'>
                <button type='submit' className='bg-blue-600 text-white py-2 px-6 rounded text-sm w-full cursor-pointer hover:bg-blue-700 transition-colors'>
                  {loading ? (
                    <div className='flex items-center justify-center gap-2'>
                      <p>Lähettäminen</p>
                      <Loading width={18} height={18} border='3px' topBorder='3px' borderColor='white' borderTopColor='blue' />
                    </div>
                  ) : (
                    <div>Lähetä työhakemus</div>
                  )
                  }
                </button>
              </div>

            </form>
          </div>
          {/* sussecc message */}
        </div>
      )}
      {successMessage && <JobSuccessMessage closeSuccessMessage={() => { setSuccessMessage(false), close(); }} />}
    </>
  )
}

export default JobApplication