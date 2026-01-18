import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className='login'>
        <label>Username or Email</label>
      <input type="text" placeholder='Username or Email' />
    <label>Password</label>
    <input type="password" placeholder='Password'/>
    <button className='sign-in-button'>Sign In</button>
    </div>
  )
}

export default Login
