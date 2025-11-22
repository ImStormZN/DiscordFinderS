import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Detalhes from './Detalhes.jsx'
import Tutorial from "./Tutorial.jsx";

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/detalhes/:id" element={<Detalhes />} />
      <Route path="/tutorial" element={<Tutorial />} />
    </Routes>
  </BrowserRouter>
)