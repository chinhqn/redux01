import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord : "",
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
        this.props.onSearch(this.state.keyWord);
        // this.props.onHandleSubmit(this.state.keyWord);
    }
    //test chery-pick-chinh
    render() {
        var { keyWord } = this.state;
        // var {keyWord} = this.props;
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <form onSubmit={this.onHandleSubmit} className="form-groupt">
                            <input
                                type="text"
                                className="form-control"
                                name="keyWord"
                                onChange={ this.onHandleChang }
                                value={ keyWord }
                            />
                            <span className="input-groupt-btn">
                                <button type="submit" className="btn btn-primary">
                                    <span className="fa fa-search mr-5"></span>Tìm kiếm
                                </button>
                            </span>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch : (keyWord) => {
            dispatch(actions.searchTask(keyWord));
        }
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(Search);
