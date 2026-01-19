import { useState } from 'react'
import './App.css'
import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from '../Landing/Landing';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Questions from '../Questions/Questions';
import Results from '../Results/Results'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path = '/' element={<Landing/>}/>
      <Route path = '/register' element={<Register/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/questions' element={<Questions/>}/>
      <Route path = '/results' element={<Results/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
