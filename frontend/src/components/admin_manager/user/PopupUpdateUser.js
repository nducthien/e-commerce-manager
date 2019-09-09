import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
class PopupAddUser extends Component {
  constructor(props) {
    super(props);
  }
  user = {
    username: this.props.newUserUpdate.username,
    password: this.props.newUserUpdate.password,
    firstName: this.props.newUserUpdate.firstName,
    lastName: this.props.newUserUpdate.lastName,
    address: this.props.newUserUpdate.address
  };
  getUserName = event => {
    if (event.target.value != null) {
      document.getElementById("errUserU").style.display = "none";
    }
    this.user.username = event.target.value;
  };
  getPassword = event => {
    if (event.target.value != null) {
      document.getElementById("errPassU").style.display = "none";
    }
    this.user.password = event.target.value;
  };
  getFirstName = event => {
    if (event.target.value != null) {
      document.getElementById("errFirstNameU").style.display = "none";
    }
    this.user.firstName = event.target.value;
  };
  getLastName = event => {
    if (event.target.value != null) {
      document.getElementById("errLastNameU").style.display = "none";
    }
    this.user.lastName = event.target.value;
  };
  getAddress = event => {
    if (event.target.value != null) {
      document.getElementById("errAddressU").style.display = "none";
    }
    this.user.address = event.target.value;
  };
  checkValidate = () => {
    if (
      document.getElementById("passwordU").value == "" ||
      document.getElementById("passwordU").value.length < 8 ||
      document.getElementById("passwordU").value.length > 16
    ) {
      alert("Password must be not empty and from 8 to 16 characters");
      return false;
    }
    if (
      document.getElementById("firstNameU").value == "" ||
      document.getElementById("firstNameU").value.length > 30
    ) {
      alert("FirstName must be not empty and great than 30 characters");
      return false;
    }
    if (
      document.getElementById("lastNameU").value == "" ||
      document.getElementById("lastNameU").value.length > 30
    ) {
      alert("LastName must be not empty and great than 30 characters");
      return false;
    }
    if (
      document.getElementById("addressU").value == "" ||
      document.getElementById("addressU").value.length > 50
    ) {
      alert("Address must be not empty and great than 50 characters");
      return false;
    }
    return true;
  };
  resultAfterCallApi = resultU => {
    if (resultU == 200) {
      alert("Update Success !");
      this.props.resetList();
    }
    if (resultU == 401) {
      alert(" Expired, Please login again!");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      this.props.history.push("/login");
    }
  };
  forward = page => {
    localStorage.removeItem("token");
    this.props.history.push(page);
    window.location.reload();
  };
  resetForm = () => {
    document.getElementById("resultU").innerHTML = "";
    document.getElementById("userNameU").value = "";
    document.getElementById("errUserU").style.display = "none";
    document.getElementById("passwordU").value = "";
    document.getElementById("errPassU").style.display = "none";
    document.getElementById("firstNameU").value = "";
    document.getElementById("errFirstNameU").style.display = "none";
    document.getElementById("lastNameU").value = "";
    document.getElementById("errLastNameU").style.display = "none";
    document.getElementById("addressU").value = "";
    document.getElementById("errAddressU").style.display = "none";
  };
  callApiToUpdate = () => {
    if (!this.checkValidate()) return;
    axios({
      method: "put",
      url: "/users/" + this.props.newUserUpdate.id,
      headers: { token: localStorage.getItem("token") },
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
      <div className="modal fade" id="myModalUpdate">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h3 className="modal-title">Update User</h3>
            </div>
            <div className="modal-body">
              <form>
                <div className="">
                  <div
                    className="help-block with-errors"
                    id="resultU"
                    style={{ display: "none", color: "red" }}
                  />
                  <div className="form-group has-feedback">
                    <label className="control-label">Username</label>
                    <div className="input-group">
                      <span className="input-group-addon" />
                      <input
                        type="text"
                        onChange={this.getUserName}
                        maxlength="50"
                        class="form-control"
                        id="userNameU"
                        disabled="true"
                        placeholder={this.props.newUserUpdate.username}
                      />
                    </div>
                    <div
                      className="help-block with-errors"
                      id="errUserU"
                      style={{ display: "none", color: "red" }}
                      value={this.props.newUserUpdate.username}
                    >
                      User Name is not empty!
                    </div>
                  </div>
                </div>
                <div className="form-group has-feedback">
                  <label className="control-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-addon" />
                    <input
                      type="password"
                      onChange={this.getPassword}
                      maxlength="50"
                      class="form-control"
                      id="passwordU"
                      placeholder="*******"
                    />
                  </div>
                  <div
                    className="help-block with-errors"
                    id="errPassU"
                    style={{ display: "none", color: "red" }}
                  >
                    Password is not empty!!
                  </div>
                </div>
                <div className="form-group has-feedback">
                  <label className="control-label">First Name</label>
                  <div className="input-group">
                    <span className="input-group-addon" />
                    <input
                      type="text"
                      onChange={this.getFirstName}
                      maxlength="50"
                      class="form-control"
                      id="firstNameU"
                      placeholder={this.props.newUserUpdate.firstName}
                    />
                  </div>
                  <div
                    className="help-block with-errors"
                    id="errFirstNameU"
                    style={{ display: "none", color: "red" }}
                  >
                    Please enter your first name!
                  </div>
                </div>
                <div className="form-group has-feedback">
                  <label className="control-label">Last Name</label>
                  <div className="input-group">
                    <span className="input-group-addon" />
                    <input
                      type="text"
                      onChange={this.getLastName}
                      maxlength="50"
                      class="form-control"
                      id="lastNameU"
                      placeholder={this.props.newUserUpdate.lastName}
                    />
                  </div>
                  <div
                    className="help-block with-errors"
                    id="errLastNameU"
                    style={{ display: "none", color: "red" }}
                  >
                    Please enter your last name!
                  </div>
                </div>
                <div className="form-group has-feedback">
                  <label className="control-label">Address</label>
                  <div className="input-group">
                    <span className="input-group-addon" />
                    <input
                      type="text"
                      onChange={this.getAddress}
                      maxlength="50"
                      class="form-control"
                      id="addressU"
                      placeholder={this.props.newUserUpdate.address}
                    />
                  </div>
                  <div
                    className="help-block with-errors"
                    id="errAddressU"
                    style={{ display: "none", color: "red" }}
                  >
                    Please enter your addressU!
                  </div>
                </div>
                <div className="form-group">
                  <a onClick={this.callApiToUpdate} class="btn btn-primary">
                    Update
                  </a>
                  <button
                    type="button"
                    onClick={this.resetForm}
                    style={{ "margin-left": "10px" }}
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
