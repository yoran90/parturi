import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

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

  const dayNames = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  }
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  }

  return (
    <div className='fixed bottom-20 w-[50%] left-1/2 -translate-x-1/2 flex flex-col z-50'>
      <div className='w-full max-w-3xl bg-white shadow border border-slate-300'>

        <div className='flex items-center justify-between py-4 '>
          <button onClick={prevMonth}>
            <IoIosArrowBack />
          </button>
          <div>
            <span>{currentDate.toLocaleString('default', { month: 'long' })}</span>
            <span>{currentDate.getFullYear()}</span>
          </div>
          <button onClick={nextMonth}>
            <IoIosArrowForward />
          </button>
        </div>

      </div>
    </div>
  )
}

export default Calendar