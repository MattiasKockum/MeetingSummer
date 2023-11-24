import React, { useState } from 'react';
import { ReactMic } from 'react-mic';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    // Do something with the recorded audio blob (e.g., save it to state or send it to the server).
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    // Do something with the final recorded audio blob (e.g., save it to state or send it to the server).
    console.log('recordedBlob is: ', recordedBlob);
  };

  return (
    <div>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
      <button onClick={startRecording} type="button">
        Start Recording
      </button>
      <button onClick={stopRecording} type="button">
        Stop Recording
      </button>
    </div>
  );
};

export default AudioRecorder;
