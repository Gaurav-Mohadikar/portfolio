import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Portfolio from './component/Portfolio.jsx';
import { ParallaxProvider } from 'react-scroll-parallax';

function App() {
  

  return (
    <>
     <ParallaxProvider>

      <Portfolio />
     </ParallaxProvider>
    </>
  )
}

export default App
