import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GiRazor } from "react-icons/gi";

const Calendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selectDate, setSelectDate] = useState(null);
  


  useEffect(() => {

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];


    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }


    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());

  }, [currentDate]);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1, 1)));
  }
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1, 1)));
  }

  return (
    <div className='fixed bottom-16 right-6 flex flex-col z-50'>
      <div className='w-full max-w-md bg-white shadow border border-slate-300 rounded-xl overflow-hidden'>

        <div className='flex flex-col gap-2 items-center justify-between py-3.5 bg-red-700 px-4 text-white w-full'>
          <div className='flex items-center justify-between text-xs w-full'>
            <button onClick={prevMonth} className='border-2  rounded-full p-0.5'>
              <IoIosArrowBack />
            </button>
            <div className='flex items-center gap-1.5'>
              <span className='font-medium text-xs'>{currentDate.toLocaleString('default', { month: 'long' })}</span>
              <GiRazor className='razorSidebar text-black' />
              <span className='font-medium text-xs'>{currentDate.getFullYear()}</span>
            </div>
            <button onClick={nextMonth} className='border-2 text-xs rounded-full p-0.5'>
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        <div className='w-full mt-4 mb-6 px-1'>
          <div className='grid grid-cols-7 gap-2'>
            {dayNames.map((day, index) => (
              <div key={index} className='text-center text-xs font-semibold text-red-600'>{day}</div>
            ))}
          </div>
        </div>

        <div className='w-full'>
          <div className='grid grid-cols-7 gap-2 mb-4'>
            {[...Array(startDay).keys()].map((index) => (
              <div key={index} className='text-center text-xs font-semibold'></div>
            ))}
            {daysInMonth.map((day, index) => {
              const isToday = day.toDateString() === new Date().toDateString();
              const isSelected = selectDate?.toDateString() === day.toDateString();
              return (
                <div key={index} className={`${isSelected ? 'bg-red-500 rounded-6ull p-1 items-center text-center text-[10px] w-6 h-6 text-white' : isToday ? 'bg-red-600 rounded-full p-1 items-center text-[10px] w-6 h-6 text-center text-white' : 'hover:bg-gray-200'} text-center flex items-center justify-center text-red-800 text-xs font-semibold cursor-pointer`} onClick={() => setSelectDate(day)}>
                  {day.getDate()}
                </div> 
              )
            })}
          </div>
        </div>
        <div>
          <small></small>
        </div>
      </div>
    </div>
  )
}

export default Calendar