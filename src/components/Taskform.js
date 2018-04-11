import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class Taskform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    };

    onCloseForm = () => {
        this.props.onCloseForm();
    };

    onHanleChang = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({ [name]: value })
    };

    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    };

    // onClear = () => {
    //     this.setState({ name: '', status: false })
    // };

    componentWillMount() {
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState(
                {
                    id: this.props.itemEditing.id,
                    name: this.props.itemEditing.name,
                    status: this.props.itemEditing.status
                }
            );
        } else {
            this.onClear();
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState(
                {
                    id: nextProps.itemEditing.id,
                    name: nextProps.itemEditing.name,
                    status: nextProps.itemEditing.status
                }
            );
        } else {
            this.onClear();
        }
    };

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        });
    };

    render() {
        var { id } = this.state;
        if (!this.props.isDisplayForm) { return null }
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== ''
                            ? 'Cập nhật công việc'
                            : 'Thêm Công Việc'}
                    </h3>
                    <span className="fa fa-times-circle text-right" onClick={this.onCloseForm}></span>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onHanleChang} />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onHanleChang}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Lưu lại</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Taskform);
