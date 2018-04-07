import React, { Component } from 'react';
import './App.css';
import Taskform from "./components/Taskform";
import Control from "./components/Control";
import Tasklist from "./components/Tasklist";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            isTaskUpdate : null,
            filter : {
                name : '',
                status : -1
            },
            keyWord : '',
            sortBy : '',
            sortValue : 1,
        };
    };

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks,
            })
        }

    };

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(20).substring(1);
    };

    generateID() {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    };

    chang = () => {
        if (this.state.isDisplayForm && this.state.isTaskUpdate !== null) {
            this.setState({
                isDisplayForm : true,
                isTaskUpdate: null
            });
        } else {
            this.setState({
                isDisplayForm : !this.isDisplayForm,
                isTaskUpdate: null
            });
        }
    };

    onCloseForm = () => {
       
        this.setState({
            isDisplayForm:false
        });
    };

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    };

    onResubmit = (data) => {
        var { tasks } = this.state;
        if (data.id === "") {
            data.id = this.generateID();
            tasks.push(data);
        } else {
            var index = this.findIndex(data.id);
            tasks[index] = data;  
        }
        this.setState({
            tasks : tasks,
            isTaskUpdate : null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

    };

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    };

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    };

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    };

    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var isTaskUpdate = tasks[index];
        this.setState({
            isTaskUpdate : isTaskUpdate,
        });
        this.onShowForm();
    };

    onFilter = (filterName, filterStatus) => {
        var filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name : filterName,
                status: filterStatus
            }
        });
    };

    onHandleSubmit = (keyWord) => {
        this.setState({
            keyWord : keyWord,
        });
    };

    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy : sortBy,
            sortValue : sortValue,
        });
    };

    render() {
        var { tasks, isDisplayForm, isTaskUpdate, filter, keyWord, sortBy, sortValue } = this.state;// var tasks = this.state.tasks
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                });
            };
            tasks = tasks.filter((task) => {
                if(filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false); 
                }
            });
        };
        if (keyWord) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyWord) !== -1;
            });
        }
        if (sortBy === 'name') {
            tasks = tasks.sort((a, b)=>{
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
                else return 0;
            });
        } else {
            tasks = tasks.sort((a, b)=>{
                if(a.status > b.status) return sortValue;
                else if(a.status < b.status) return -sortValue;
                else return 0;
            });
        }
        var elmTaskForm = isDisplayForm ?  <Taskform onCloseForm={this.onCloseForm} onResubmit={this.onResubmit} task={isTaskUpdate}/> : '';
        var changColLg = isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
        var changColSm = isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={changColSm}>
                        {elmTaskForm}
                    </div>
                    <div className={changColLg}>
                        <button type="button" className="btn btn-primary" onClick={this.chang}>
                            <span className="fa fa-plus  mr-5"></span> Thêm Công Việc
                        </button>
                        <Control onHandleSubmit={this.onHandleSubmit} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Tasklist tasks={tasks} 
                                    onUpdateStatus={this.onUpdateStatus} 
                                    onDelete={this.onDelete} 
                                    onUpdate={this.onUpdate}   
                                    onFilter={this.onFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
