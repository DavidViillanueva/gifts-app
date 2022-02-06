import React from 'react';
import ReactDOM from 'react-dom';
import GiftsApp from './GiftsApp';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'

import './configs/i18n';
import './styles/styles.scss'
import Background from './components/layout/Background';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

ReactDOM.render(
  <React.StrictMode>
      <ChakraProvider>
        <Background />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<GiftsApp />} />
            
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
