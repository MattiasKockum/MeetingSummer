import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Amplify } from 'aws-amplify'; // Import Amplify directly
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
