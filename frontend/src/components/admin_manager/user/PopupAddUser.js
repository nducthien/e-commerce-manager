import React, {Component} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

class PopupAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: ""
        };
    }

    user = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        address: ""
    };
    getUserName = event => {
        if (event.target.value != null) {
            document.getElementById("errUser").style.display = "none";
        }
        this.user.username = event.target.value;
    };
    getPassword = event => {
        if (event.target.value != null) {
            document.getElementById("errPass").style.display = "none";
        }
        this.user.password = event.target.value;
    };
    getFirstName = event => {
        if (event.target.value != null) {
            document.getElementById("errFirstName").style.display = "none";
        }
        this.user.firstName = event.target.value;
    };
    getLastName = event => {
        if (event.target.value != null) {
            document.getElementById("errLastName").style.display = "none";
        }
        this.user.lastName = event.target.value;
    };
    getAddress = event => {
        if (event.target.value != null) {
            document.getElementById("errAddress").style.display = "none";
        }
        this.user.address = event.target.value;
    };
    checkValidate = () => {
        var patt1 = /\s/g;
        if (
            document.getElementById("userName").value == "" ||
            document.getElementById("userName").value.match(patt1)
        ) {
            alert("Username cannot be empty or must be not contain space");
            return false;
        }
        if (document.getElementById("password").value == "") {
            document.getElementById("errPass").style.display = "block";
            return false;
        }
        if (document.getElementById("firstName").value == "") {
            document.getElementById("errFirstName").style.display = "block";
            return false;
        }
        if (document.getElementById("lastName").value == "") {
            document.getElementById("errLastName").style.display = "block";
            return false;
        }
        if (document.getElementById("address").value == "") {
            document.getElementById("errAddress").style.display = "block";
            return false;
        }
        return true;
    };
    resultAfterCallApi = result => {
        if (result == 201) {
            this.setState({
                isActive: "modal"
            });
            this.resetForm();
            this.setState({
                isActive: ""
            });
            alert("Add Success !");
            this.props.resetList();
        } else if (result == 401) {
            alert(" Expired, Please login again!");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            this.props.history.push("/login");
        } else if (result == 409) {
            document.getElementById("result").innerHTML = "User Name is Exist !";
            document.getElementById("result").style.display = "block";
        }
    };
    forward = page => {
        localStorage.removeItem("token");
        this.props.history.push(page);
        window.location.reload();
    };
    resetForm = () => {
        document.getElementById("result").innerHTML = "";
        document.getElementById("userName").value = "";
        document.getElementById("errUser").style.display = "none";
        document.getElementById("password").value = "";
        document.getElementById("errPass").style.display = "none";
        document.getElementById("firstName").value = "";
        document.getElementById("errFirstName").style.display = "none";
        document.getElementById("lastName").value = "";
        document.getElementById("errLastName").style.display = "none";
        document.getElementById("address").value = "";
        document.getElementById("errAddress").style.display = "none";
    };
    callApiToAddUser = () => {
        if (!this.checkValidate()) return;
        axios({
            method: "post",
            url: "../users",
            headers: {token: localStorage.getItem("token")},
            data: this.user
        })
            .then(res => {
                this.resultAfterCallApi(res.data.status);
                return;
            })
            .catch(res => {
                this.resultAfterCallApi(res.response.status);
                return;
            });
    };

    render() {
        return (
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">
                                &times;
                            </button>
                            <h3 className="modal-title">Add New User </h3>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="">
                                    <div
                                        className="help-block with-errors"
                                        id="result"
                                        style={{display: "none", color: "red"}}
                                    />
                                    <div className="form-group has-feedback">
                                        <label className="control-label">User name</label>
                                        <div className="input-group">
                                            <span className="input-group-addon"/>
                                            <input
                                                type="text"
                                                onChange={this.getUserName}
                                                maxlength="50"
                                                class="form-control"
                                                id="userName"
                                                placeholder="Enter your user name"
                                            />
                                        </div>
                                        <div
                                            className="help-block with-errors"
                                            id="errUser"
                                            style={{display: "none", color: "red"}}
                                        >
                                            User Name is not empty!
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group has-feedback">
                                    <label className="control-label">Pass word</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"/>
                                        <input
                                            type="password"
                                            onChange={this.getPassword}
                                            maxlength="50"
                                            class="form-control"
                                            id="password"
                                            placeholder="Enter your pass word"
                                        />
                                    </div>
                                    <div
                                        className="help-block with-errors"
                                        id="errPass"
                                        style={{display: "none", color: "red"}}
                                    >
                                        Pass Word is not empty!!
                                    </div>
                                </div>
                                <div className="form-group has-feedback">
                                    <label className="control-label">First Name</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"/>
                                        <input
                                            type="text"
                                            onChange={this.getFirstName}
                                            maxlength="50"
                                            class="form-control"
                                            id="firstName"
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div
                                        className="help-block with-errors"
                                        id="errFirstName"
                                        style={{display: "none", color: "red"}}
                                    >
                                        Please enter your first name!
                                    </div>
                                </div>
                                <div className="form-group has-feedback">
                                    <label className="control-label">Last Name</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"/>
                                        <input
                                            type="text"
                                            onChange={this.getLastName}
                                            maxlength="50"
                                            class="form-control"
                                            id="lastName"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                    <div
                                        className="help-block with-errors"
                                        id="errLastName"
                                        style={{display: "none", color: "red"}}
                                    >
                                        Please enter your last name!
                                    </div>
                                </div>
                                <div className="form-group has-feedback">
                                    <label className="control-label">Address</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"/>
                                        <input
                                            type="text"
                                            onChange={this.getAddress}
                                            maxlength="50"
                                            class="form-control"
                                            id="address"
                                            placeholder="Enter your address"
                                        />
                                    </div>
                                    <div
                                        className="help-block with-errors"
                                        id="errAddress"
                                        style={{display: "none", color: "red"}}
                                    >
                                        Please enter your address!
                                    </div>
                                </div>
                                <div className="form-group">
                                    <a
                                        onClick={this.callApiToAddUser}
                                        data-dismiss={this.state.isActive}
                                        class="btn btn-primary"
                                    >
                                        Add
                                    </a>
                                    <button
                                        type="button"
                                        onClick={this.resetForm}
                                        style={{"margin-left": "10px"}}
                                        className="btn btn-default"
                                        data-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PopupAddUser);
