import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import 'react-datetime/css/react-datetime.css';

ReactDOM.render(
  <Router basename="/"> 
    <App />
  </Router>,
  document.getElementById('root')
);



