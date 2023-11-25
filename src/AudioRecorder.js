import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { uploadData } from 'aws-amplify/storage';
import { getCurrentUser } from 'aws-amplify/auth';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = async (recordedBlob) => {
    // Upload the recorded audio to S3
    console.log('recordedBlob is: ', recordedBlob);

    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      const key = `${userId}` + new Date().toISOString() + '.webm';
      const result = await uploadData({
        key: key,
        data: recordedBlob.blob,
        options: {
          accessLevel: 'private',
          //onProgress // Optional progress callback.
        }
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
    }
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
