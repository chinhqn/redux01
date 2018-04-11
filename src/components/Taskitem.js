import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
class Taskitem extends Component {

    onUpdateStatus = (id) => {
        // console.log(this.props.task.id);
        this.props.onUpdateStatus(this.props.task.id);
    };
    
    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
    };

    onUpdate = () => {
        // this.props.onUpdate(this.props.task.id);
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    };
    
    render() {
        var { task, index } = this.props;
        // console.log(task.status);
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{ task.name }</td>
                <td className="text-center cusor">
                        <span   onClick={this.onUpdateStatus} 
                                className={task.status === true ? 'label label-danger' : 'label label-success'}>
                                { task.status === true ? 'Kich hoat' : 'An' }
                        </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate} >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button onClick={this.onDelete} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5" ></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    }
};

const mapDispatchToprops = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onOpenForm: () => {
            dispatch(actions.opentForm());
        },
        onEditTask: (state) => {
            dispatch(actions.editTask(state));    
        }
    };
};
export default connect(mapStateToProps, mapDispatchToprops)(Taskitem);
