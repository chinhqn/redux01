import * as types from './../constants/ActionTypes';
import App from './../App'; 
import {Route, Redirect} from 'react-router-dom';

var initialState = {
    username: "",
    password: "",
};

var data = JSON.parse(localStorage.getItem('login'));

var initialState = data ? data :[];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            let userName = action.login.username;
            let passWord = action.login.password;
            if (userName === 'admin' && passWord === 'admin') {
                var login = {
                    username: userName,
                    password: passWord,
                };
                state.push(login);
                localStorage.setItem('tasks', JSON.stringify(state));
                return [...state];
            }
        default:
            return state;
    }
}

export default myReducer;