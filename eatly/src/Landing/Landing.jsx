import React from 'react';
import './Landing.css';
import {Link} from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';

function Landing() {
  return (
    <div>
      <h1>This is the landing page.</h1>
      <button><Link to="/login">Login</Link></button>
      <button><Link to="/register">Register</Link></button>
    </div>
  )
}

export default Landing
