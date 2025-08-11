import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css'; 
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './page/ScrollToTop';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop/>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);