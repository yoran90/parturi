import React from 'react'
import { useEffect } from 'react';
import { BsFillTrash3Fill } from "react-icons/bs";
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdDeleteSweep } from "react-icons/md";
import Loading from '../../loading/Loading';

const DisplayQuestions = () => {

  const [questions, setQuestions] = React.useState([]);
  const [loadingForSingleQuestion, setLoadingForSingleQuestion] = React.useState(false);
  const [loadingForAllQuestions, setLoadingForAllQuestions] = React.useState(false);


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/getAllQuestions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  
  const deleteQuestion = async (id) => {
    try {
      setLoadingForSingleQuestion(id);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/questions/deleteSingleQuestion/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
      setQuestions(questions.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForSingleQuestion(null);
    }
  }


  const deleteAllQuestions = async () => {
    try {
      setLoadingForAllQuestions(true);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/questions/deleteAllQuestions`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
      setQuestions([]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForAllQuestions(false);
    }
  };

  return (
    <>
        <div className='flex flex-col gap-0.5 mb-4 items-center justify-center'>
          <h3 className='text-sm text-slate-700'>User Questions</h3>
          <p className='text-sm text-slate-700'>Here are the user questions you have received</p>
        </div>
      <div className='px-1 py-2 h-[85vh] overflow-y-scroll scrollbarStyle pr-2'>

        {questions.length === 0 && (
            <div className='flex items-center justify-center mt-62 pb-62'>
              <p className='text-sm text-red-700'>No FeedBacks</p>
            </div>
          )
        }
        {questions.length > 1 && (
            <div className='flex items-center justify-end w-full mb-2'>
            <button onClick={deleteAllQuestions} className='bg-red-600 flex rounded px-2 cursor-pointer text-sm items-center  gap-1 text-white py-1 mb-2'>
              {loadingForAllQuestions ? (
                <div className='flex items-center justify-center gap-2'>
                  <p>Deleting All Questions</p>
                  <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                </div>

                ) : (
                  <div className='flex items-center justify-center gap-1'>
                    <p>Delete All Questions</p>
                    <MdDeleteSweep className='text-xl' />
                  </div>
                )

              }
            </button>
          </div>
          )
        }
        <div className='flex flex-col gap-2'>
          {questions?.map((question, index) => (
            <div key={index} className='flex flex-col relative items-start overflow-hidden justify-start border border-slate-300 rounded'>
              <Link to={`/admin/question/${question._id}`} className='w-full'>
                <div className='flex flex-col gap-1 px-2 py-1 w-full'>
                  <div className='text-sm flex gap-1.5'>
                    <p className='text-sm text-slate-700'>Sended time:</p>
                    <p className='text-sm text-red-600'>{new Date(question.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className='text-sm flex gap-1.5'>
                    <p className='text-sm text-slate-700'>Email:</p>
                    <p className='text-sm text-red-600'>{question.email}</p>
                  </div>
                  <hr className='text-slate-300 w-full' />
                  <div className='text-sm flex flex-col'>
                    <p className='text-sm text-slate-600 font-bold'>Question:</p>
                    <p className='text-sm text-red-800'>{question.question}</p>
                  </div>
                </div>
              </Link>
              <div className='absolute right-0 top-0'>
                <button onClick={() => deleteQuestion(question._id)} className='bg-red-600 cursor-pointer flex text-xs  gap-1 text-white px-1 py-1'>
                  {loadingForSingleQuestion === question._id ? (
                    <div className='flex items-center justify-center gap-1'>
                        <p>Deleting</p>
                        <Loading width={16} height={16} border='3px' topBorder='3px' borderColor='white' borderTopColor='red' />
                      </div>

                      ) : (
                      <div className='flex items-center justify-center gap-1'>
                        <p>Delete</p>
                        <BsFillTrash3Fill />  
                      </div>
                    )

                  }
                </button>
              </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default DisplayQuestions