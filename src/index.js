import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import myReducers from './reducers/index';
import Login from './components/Login';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
var store = createStore(
        myReducers, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

ReactDOM.render(
    <Router>
    <Provider store={store}>
        <Login />
    </Provider></Router>,
    document.getElementById('root'));
registerServiceWorker();


