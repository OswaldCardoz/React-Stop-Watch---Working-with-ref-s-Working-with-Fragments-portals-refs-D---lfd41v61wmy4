'use client'
import React, { useRef, useState } from 'react';

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const lapIndex = useRef(1);

  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const formatTime = (time) => {
    const formattedTime = (time / 1000).toFixed(3);
    return formattedTime;
  };

  const startTimer = () => {
    startTime.current = Date.now() - currentTime;
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now() - startTime.current);
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const lapTimer = () => {
    const lapTime = currentTime;
    setLaps((prevLaps) => [...prevLaps, lapTime]);
    lapIndex.current += 1;
  };

  const resetTimer = () => {
    stopTimer();
    setCurrentTime(0);
    setLaps([]);
    lapIndex.current = 1;
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{formatTime(currentTime)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startTimer}>
            START
          </button>
          <button className="stop-btn" onClick={stopTimer}>
            STOP
          </button>
          <button className="lap-btn" onClick={lapTimer}>
            LAP
          </button>
          <button className="reset-btn" onClick={resetTimer}>
            RESET
          </button>
        </section>
      </section>
      <section className={laps.length > 0 ? 'lap-section' : 'lap-section hidden'}>
        <h2>Laps</h2>
        <section className='laps'>
          {laps.map((lap, index) => (
            <p key={index}>{formatTime(lap)}</p>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Home;
