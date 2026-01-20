import { useState } from 'react'
import './App.css'
import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './Landing/Landing.jsx';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import Questions from './Questions/Questions.jsx';
// import Results from './Results/Results.jsx'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path = '/' element={<Landing/>}/>
      <Route path = '/register' element={<Register/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/questions' element={<Questions/>}/>
      {/* <Route path = '/results' element={<Results/>}/> */}
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
