import React, { Component } from "react";
import { BrowserRouter, withRouter, Route } from "react-router-dom";
import Login from "../../login/Login";
import axios from "axios";

const imgAddress =
  "https://previews.123rf.com/images/rikkyal/rikkyal1712/rikkyal171200017/90908359-bearded-man-s-face-hipster-character-fashion-silhouette-avata.jpg";

class InformationAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTextBox: false,
      admin: {},
      adminUpdate: {}
    };
  }

  componentDidMount() {
    const adminName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "/users/admin",
      headers: {
        token: token,
        adminName: adminName
      }
    })
      .then(res => {
        console.log(res);
        this.checkToken(res.active);
        this.setState({ admin: res.data });
      })
      .catch(err => {
        console.log(err);
        this.checkToken(err.response.active);
      });
  }

  checkConfirmPassword = () => {
    const pass = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (pass != confirmPassword) return false;
    return true;
  };
  checkToken = status => {
    if (status == 401) {
      alert("login expired, please login again!");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userName");
      this.props.history.push("/login");
    }
  };
  checkAdminUpdate = () => {
    const username = document.getElementById("username").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("password").value;
    if (username != undefined && username != "")
      this.state.adminUpdate.username = username;
    else this.state.adminUpdate.username = this.state.admin.username;
    if (firstName != undefined && firstName != "")
      this.state.adminUpdate.firstName = firstName;
    else this.state.adminUpdate.firstName = this.state.admin.firstName;
    if (lastName != undefined && lastName != "")
      this.state.adminUpdate.lastName = lastName;
    else this.state.adminUpdate.lastName = this.state.admin.lastName;
    if (address != undefined && address != "")
      this.state.adminUpdate.address = address;
    else this.state.adminUpdate.address = this.state.admin.address;

    if (password != undefined) this.state.adminUpdate.password = password;
  };
  checkUpdate = () => {
    if (this.state.adminUpdate.username != this.state.admin.username)
      return false;
    if (this.state.adminUpdate.firstName != this.state.admin.firstName)
      return false;
    if (this.state.adminUpdate.lastName != this.state.admin.lastName)
      return false;
    if (this.state.adminUpdate.address != this.state.admin.address)
      return false;
    if (this.state.adminUpdate.password != "") return false;
    return true;
  };
  callApiUpdateAdmin = () => {
    const token = localStorage.getItem("token");
    this.checkAdminUpdate();
    if (this.checkUpdate()) return;
    axios({
      method: "put",
      url: "/users/admin/" + this.state.admin.id,
      headers: { token: token },
      data: this.state.adminUpdate
    })
      .then(res => {
        console.log(res);
        this.checkToken(res.active);
        this.setState({ admin: this.state.adminUpdate });
      })
      .catch(err => {
        console.log(err);
        this.checkToken(err.response.active);
      });
  };

  changeIsTextBox = () => {
    if (this.state.isTextBox) {
      if (!this.checkConfirmPassword()) {
        alert("Comfim your password");
        return;
      }
      this.callApiUpdateAdmin();
      this.setState({ isTextBox: !this.state.isTextBox });
    }
    this.setState({ isTextBox: !this.state.isTextBox });
  };
  viewFrom = () => {
    return (
      <div className="c6">
        <div className="row">
          <p className="title-infor">User name</p>
          <p className="data">{this.state.admin.username}</p>
        </div>
        <div className="row">
          <p className="title-infor">First name</p>
          <p className="data">{this.state.admin.firstName}</p>
        </div>
        <div className="row">
          <p className="title-infor">Last name</p>
          <p className="data">{this.state.admin.lastName}</p>
        </div>
        <div className="row">
          <p className="title-infor">Address</p>
          <p className="data">{this.state.admin.address}</p>
        </div>
      </div>
    );
  };
  editForm = () => {
    return (
      <div className="c6">
        <div className="row">
          <p className="title-infor">User name</p>
          <input
            id="username"
            type="text"
            placeholder={this.state.admin.username}
          />
        </div>
        <div className="row">
          <p className="title-infor">First name</p>
          <input
            id="firstName"
            type="text"
            placeholder={this.state.admin.firstName}
          />
        </div>
        <div className="row">
          <p className="title-infor">Last name</p>
          <input
            id="lastName"
            type="text"
            placeholder={this.state.admin.lastName}
          />
        </div>
        <div className="row">
          <p className="title-infor">Address</p>
          <input
            id="address"
            type="text"
            placeholder={this.state.admin.address}
          />
        </div>
        <div className="row">
          <p className="title-infor">Password</p>
          <input id="password" id="password" type="password" />
        </div>
        <div className="row">
          <p className="title-infor">Confim Password</p>
          <input id="confirmPassword" type="password" />
        </div>
      </div>
    );
  };
  changeFrom = () => {
    if (this.state.isTextBox) return this.editForm();
    return this.viewFrom();
  };

  render() {
    return (
      <div className="informationProduct">
        <div className="infor">
          <div className="c4">
            <div className="cropmimg">
              <img src={imgAddress} alt="" />
            </div>
            <div className="btnControl">
              <button onClick={this.changeIsTextBox}>
                {this.state.isTextBox ? "Update" : "Edit"}
              </button>
            </div>
          </div>
          {this.changeFrom()}
        </div>
      </div>
    );
  }
}

export default withRouter(InformationAdmin);
