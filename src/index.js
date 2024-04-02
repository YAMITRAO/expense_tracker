import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataProvider from './store/DataProvider';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<DataProvider>
     <App />
</DataProvider>
</BrowserRouter>
);


