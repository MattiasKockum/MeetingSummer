import './App.css';
import React from 'react';
import SignIn from './SignIn';
import AudioRecorder from './AudioRecorder';

function App() {
  return (
    <div>
      <h1>Meeting Summer</h1>
      <SignIn />
      <AudioRecorder />
    </div>
  );
}

export default App;
