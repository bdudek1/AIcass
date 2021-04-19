import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";

import './index.css';

import Spinner from './components/UI/Spinner/Spinner'
import App from './App';


const app = (
    <BrowserRouter>
        <App />
        <Spinner />
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();