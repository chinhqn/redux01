import React, { Component } from 'react';
import Search from "./Search";
import Soft from "./Sort";

class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                <Search onHandleSubmit={this.props.onHandleSubmit} />
                <Soft onSort={this.props.onSort} sortBy={this.props.sortBy} sortValue={this.props.sortValue}/>
            </div>
        );
    }
}

export default Control;
