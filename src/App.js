import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  const [click, setClick] = useState(0);
  const [selectedTime, setSelectedTime] = useState(5);
  const [time, setTime] = useState(selectedTime * 1000);
  const [result, setResult] = useState(null);
  const [startCountdown, setStartCountdown] = useState(false);

  const handleButtonClick = () => {
    setClick((prevCount) => prevCount + 1);
    setStartCountdown(true);
  };

  const handleReset = () => {
    setClick(0);
    setTime(selectedTime * 1000);
    setResult(null);
    setStartCountdown(false);
  };

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value, 10);
    setSelectedTime(newTime);
    setTime(newTime * 1000);
    setResult(null);
    setStartCountdown(false);
  };

  useEffect(() => {
    let timer;

    if (startCountdown && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 10 : prevTime));
      }, 1);
    } else if (startCountdown && time === 0) {
      setResult(click / (selectedTime));
    }

    return () => clearInterval(timer);
  }, [time, selectedTime, startCountdown, click]);

  const displayTime = () => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    return `${seconds}.${milliseconds} s`;
  };

  return(
  <div className="clicker-app">
  <h1 className="result">
    {result !== null && `${result.toFixed(2)} кликов в секунду.`}
  </h1>
  <label>Выберите время:</label>
  <input type="number" value={selectedTime} onChange={handleTimeChange} />
  <h1 className='lok'>{click}</h1>
  <p className={`timer${time<= 3000 && 'timer-warning'}`}>
    {displayTime()} времени осталось.
  </p>
  <button
    className="click-button"
    onClick={handleButtonClick}
    disabled={time === 0}>Нажать.</button>
  <button className="reset-button" onClick={handleReset}>Сбросить.</button>
</div>
);

};

export default App;