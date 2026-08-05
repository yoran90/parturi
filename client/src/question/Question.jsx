import React, { useState } from 'react'
import { GiRazor } from "react-icons/gi";
import { toast } from 'react-toastify';
import axios from 'axios';
import QuestionSuccessMessage from './QuestionSuccessMessage';

const Question = ({ onClose }) => {


  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Sähköpostiosoitteesi on pakollinen");
      return;
    }
    if (!question) {
      toast.error("Kysymyksesi on pakollinen");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/questions/addQuestion`, { email, question });

      if (response.status === 201) {
        setSuccessMessage(true);
      } else {
        toast.error("Tapahtui virhe");
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='fixed left-0 right-0 top-0 bottom-0 bg-black/70 flex justify-center items-center z-50'>
      <div className='bg-white shadow xl:w-[60%] md:w-[80%] w-[95%] relative py-6 px-4 rounded'>
         <div className="flex flex-col gap-3">
          <button onClick={onClose} className="text-xs absolute top-3 right-3 cursor-pointer">❌</button>
          <p className="flex gap-1 text-red-600"> Razor <GiRazor className='razorSidebar' /> Parturi</p>

          <h2 className='text-slate-700 mt-2'>Kuinka voimme auttaa?</h2>

          <p className="text-sm text-slate-700">
            Kysy mitä tahansa miesten partureista. Voimme auttaa sinua löytämään
            sopivan parturin, vertailemaan palveluita, tarkistamaan hinnat tai
            vastaamaan hiustenleikkauksiin ja parranhoitoon liittyviin kysymyksiin.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-2.5">
              <div className='flex flex-col gap-1 w-full text-sm'>
                <p className='text-slate-700'>📧 Sähköpostiosoitteesi</p>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border p-2 rounded outline-none text-sm'  placeholder='Esim. "R2Y5B@example.com"' required />
              </div>
              <div className='flex flex-col gap-1 w-full text-sm'>
                <p className='text-slate-700 '>❓ Kysymys</p>
                <textarea name="question" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} className='border p-2 rounded outline-none text-sm'
                  rows={4}
                  placeholder='Esim. "Etsin parturia, joka tekee hyviä fade-leikkauksia."'
                />
              </div>
              <button type="submit" className="bg-red-700 py-2 px-3 text-white rounded hover:bg-red-600 cursor-pointer text-sm">Lähetä kysymys</button>
            </div>
          </form>


          <div className="suggestions">
            <p className='text-slate-700 mt-4 mb-2'>Suosittuja kysymyksiä</p>
            <div className='text-slate-700 text-sm flex flex-col gap-1.5 items-start'>
              <button>💈 Etsi parturi läheltäni</button>
              <button>✂️ Haluan fade-leikkauksen</button>
              <button>🧔 Missä saa hyvän parran siistimisen?</button>
              <button>⭐ Näytä parhaat parturit</button>
              <button>💲 Mitä hiustenleikkaus maksaa?</button>
              <button>📍 Mitkä parturit ovat auki nyt?</button>
            </div>
          </div>
        </div>
      </div>
      {successMessage && <QuestionSuccessMessage onClose={onClose} closeMessage={() => setSuccessMessage(false)} />

      }
    </div>
  )
}

export default Question