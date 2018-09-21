import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import App from './../App';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password: "",
        }
    }

    onHandleChang = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value,
        })
    };


    onHandleSubmit = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state);
        // this.props.onHandleSubmit(this.state.keyWord);
    }

    render() {
        var { username, password } = this.props.isLogin;
        console.log(this.props.isLogin);
        if (this.props.isLogin !== null) {
            <Redirect to="/App"/>
        }
        return (
            <Router>
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        
                        <form onSubmit={this.onHandleSubmit} >
                            <legend>LOGIN</legend>
                        
                            <div className="form-group">
                                <label for="">Username</label>
                                <input type="text" className="form-control" name='username' onChange={this.onHandleChang} id="" placeholder="Input field" />
                            </div>

                            <div className="form-group">
                                <label for="">Password</label>
                                <input type="password" className="form-control" name='password' onChange={this.onHandleChang} id="" placeholder="Input field" />
                            </div>
                           
                                <button type="submit" className="btn btn-primary">login</button>
                            
                        </form>
                    </div>
                </div>
            </Router> 
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.login,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogin : (login) => {
            dispatch(actions.login(login));
        }
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Login);
