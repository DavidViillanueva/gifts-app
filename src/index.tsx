import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'

import './configs/i18n';
import './styles/styles.scss'
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppRouter from './routes/AppRouter';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
            <AppRouter />
        </ChakraProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
