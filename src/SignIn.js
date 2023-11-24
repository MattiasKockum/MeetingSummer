import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';

const SignIn = () => {
  return (
    <Authenticator>
      <div>
        <h2>Custom Sign In Page</h2>
        {/* Your custom sign-in UI can go here */}
      </div>
    </Authenticator>
  );
};

export default SignIn;
