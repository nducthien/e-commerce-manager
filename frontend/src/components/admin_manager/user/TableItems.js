import React, { Component } from "react";
import ListItem from "./ListItem";
import PopupUpdate from "./PopupUpdateUser";
import PopupAddUser from "./PopupAddUser";

class TableItems extends Component {
    constructor(props) {
        super(props);
        console.log(this.state.isUpdate)
    }

    resetList = () => {
        this.setState({
            isUpdate: true
        });
    }
    stopResetList = () => {
        this.setState({
            isUpdate: false
        });
    }
    state = {
        user: {
            id: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        },
        isUpdate: false,
    }

    componentDidMount() {

    }

    setNewUser = (newUser) => {
        this.setState({
            user: {
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                address: newUser.address,
                id: newUser.id
            }
        });
        console.log(this.state.user)
    }

    render() {
        return (
            <div>
                <div className="container">
                    <PopupAddUser resetList={this.resetList} />
                    <PopupUpdate resetList={this.resetList} newUserUpdate={this.state.user} />
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="">
                                <button type="button" className="btn btn-info" data-toggle="modal"
                                    data-target="#myModal"
                                    style={{ 'margin-left': '92.5%', 'marginTop': '1em', 'margin-bottom': '10px' }}>
                                    Add User
                                </button>
                            </div>
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">List User</h3>
                                </div>
                                <div className="panel-body">
                                    <table className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>User Name</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Address</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <ListItem isUpdate={this.state.isUpdate} stopResetList={this.stopResetList}
                                            setNewUser={this.setNewUser} />
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default TableItems;
