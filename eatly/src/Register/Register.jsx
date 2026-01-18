import React from 'react';
import './Register.css';

function Register() {
  return (
    <div className='register'>
        <h2>Register</h2>
        <form>
            <label>First Name</label>
            <input type="text" placeholder='First Name'/>
            <label>Last Name</label>
            <input type="text" placeholder='Last Name'/>
            <label>Email</label>
            <input type="email" placeholder='Email'/>
            <label>Password</label>
            <input type="password" placeholder='Password'/>
        </form>
      
    </div>
  )
}

export default Register
