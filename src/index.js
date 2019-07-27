import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import { Provider } from 'react-redux';

import Store from './store';

import App from './app';

import './assets/styles/main.scss';

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
