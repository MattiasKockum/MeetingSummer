import React from 'react';
import AudioRecorder from './AudioRecorder';
import { withAuthenticator } from '@aws-amplify/ui-react';

const AudioRecordingPage = () => {
  return (
    <div>
      <h2>Audio Recording Page</h2>
      <h3>Please press record button</h3>
      <AudioRecorder />
    </div>
  );
};

export default withAuthenticator(AudioRecordingPage);
