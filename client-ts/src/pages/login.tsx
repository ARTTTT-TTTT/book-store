import React, { useState } from 'react';

function Login() {
  // Define state variables for inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event handler for login button
  const handleLogin = () => {
    // Your login logic here
    console.log('Logging in...');
  };

  // Event handler for register button
  const handleRegister = () => {
    // Your registration logic here
    console.log('Registering...');
  };

  return (
    <div id="content_container">
      <div id="form_container">
        <div id="form_header_container">
          <h2 id="form_header"> Login + Firebase Database </h2>
        </div>

        <div id="form_content_container">
          <div id="form_content_inner_container">
            {/* Use controlled components for inputs */}
            <input
              type="text"
              id="full_name"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div id="button_container">
              {/* Attach event handlers directly */}
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;