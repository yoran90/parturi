import React, { useEffect } from 'react'
import '../../style/clock.css'

const Clock = () => {

  const [time, setTime] = React.useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const finlandTime = new Date().toLocaleString('en-US', { timeZone: 'Europe/Helsinki' });
      setTime(new Date(finlandTime))
    }, 1000);

    return () => clearInterval(interval);
  });

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = (seconds / 60) * 360 + 90
  const minuteDeg = (minutes / 60) * 360 + 90
  const hourDeg = (hours / 12) * 360 + 90
  

  return (
    <div>
      <div className="clock">
        <div className="digits">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="digit" style={{ transform: `rotate(${i * 30}deg)` }}>
              <span style={{ transform: `rotate(-${i * 30}deg)` }}>
                {i === 0 ? 12 : i}
              </span>
            </div>
          ))}
        </div>

        <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
        <div className="hand minute" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
        <div className="hand second" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
        <div className="center-dot" />
      </div>
    </div>
  )
}

export default Clock