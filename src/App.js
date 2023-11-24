import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import AudioRecordingPage from './AudioRecordingPage';
import SignIn from './SignIn';

function App() {
  return (
    <div>
      <h1>Meeting Summer</h1>
      <AudioRecordingPage /> {/* Audio recording page */}
      <SignIn /> {/* Sign-in page */}
    </div>
  );
}

export default withAuthenticator(App);
