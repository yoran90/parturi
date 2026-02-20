import React, { useEffect, useState } from 'react'
import '../../style/analogClock.css'

const AnalogClock = () => {

  const getFinlandTime = () => {
    const finlandTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Helsinki" });
    return new Date(finlandTime);
  }

  const [time, setTime] = useState(getFinlandTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFinlandTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className='clock'>

      {/* {[...Array(60)].map((_, index) => (
        <div
          key={index}
          className="tick"
          style={{ transform: `translate(-50%, -100%) rotate(${index * 6}deg)` }}
        />
      ))} */}

      <div className='dot'></div>
      <div className='hour twelve'>12</div>
      <div className='hour one'>1</div>
      <div className='hour two'>2</div>
      <div className='hour three'>3</div>
      <div className='hour four'>4</div>
      <div className='hour five'>5</div>
      <div className='hour six'>6</div>
      <div className='hour seven'>7</div>
      <div className='hour eight'>8</div>
      <div className='hour nine'>9</div>
      <div className='hour ten'>10</div>
      <div className='hour eleven'>11</div>

      <div className='hour-hand' style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}></div>
      <div className='minute-hand' style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}></div>
      <div className='second-hand' style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }}></div>

    </div>
  )
}
  
export default AnalogClock