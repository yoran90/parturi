import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';

const GetSingleQuestion = () => {

  const {id } = useParams();

  const [singleQuestion, setSingleQuestion] = React.useState(null);
  const [loadingForSingleQuestion, setLoadingForSingleQuestion] = React.useState(false);

  useEffect(() => {
    const fetchSingleQuestion = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/questions/getSingleQuestion/${id}`);
      setSingleQuestion(response.data);
    }
    fetchSingleQuestion();
  }, [id]);

  const deleteSingleQuestion = async (id) => {
    try {
      setLoadingForSingleQuestion(true);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/questions/deleteSingleQuestion/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
      setSetQuestions(singleQuestion.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForSingleQuestion(false);
    }
  }
  
  return (
    <div>
      {singleQuestion && (
        <div>
          <div className='flex items-center justify-between px-2 py-1 w-full mt-2 mb-4'>
            <h2 className='text-lg font-semibold text-slate-600 text-center'>Question Details</h2>
            <button className='bg-red-700 text-sm text-white px-2 py-1.5 cursor-pointer rounded ml-2 mb-2 flex items-center gap-1' onClick={() => deleteSingleQuestion(id)}>
              {loadingForSingleQuestion ? (
                <div className='flex items-center justify-center gap-1'>
                  <p>Deleting Question</p>
                  <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                </div>
                ) : (
                  <div className='flex items-center justify-center gap-1'>
                    <p>Delete Question</p>
                    <BsFillTrash3Fill />
                  </div>
                )
              }
            </button>
          </div>
          <div className='flex gap-1 px-2 py-1 w-full'>
            <p className='text-sm font-semibold text-slate-700'>Email:</p>
            <p className='text-sm text-red-700'>{singleQuestion.email}</p>
          </div>
          <div className='flex flex-col gap-1 px-2 py-1 w-full'>
            <p className='text-sm font-semibold text-slate-700'>Question:</p>
            <p className='text-sm text-red-700'>{singleQuestion.question}</p>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default GetSingleQuestion