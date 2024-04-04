import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataProvider from './store/DataProvider';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import CentralStore from './store/redux-data';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={CentralStore}>
<BrowserRouter>
<DataProvider>
     <App />
</DataProvider>
</BrowserRouter>
</Provider>
);


