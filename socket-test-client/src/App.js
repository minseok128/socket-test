import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';


const SERVER = 'http://localhost:4000';

function App() {
  const [serverMessage, setServerMessage] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
      const socket = io(SERVER);

      socket.on('time', (data) => {
          setCurrentTime(data.time);  // 서버로부터 받은 시간을 상태에 저장
      });

      socket.on('serverMessage', (message) => {
        setServerMessage(message);
      });

      return () => {
        socket.disconnect();
      };
  }, []);

  return (
    <div className="App">
        <h1>WebSocket Time Test</h1>
        <p>Current Time: {currentTime}</p>
        <h1>Server Message</h1>
        <p>{serverMessage}</p>
    </div>
  );
}

export default App;
