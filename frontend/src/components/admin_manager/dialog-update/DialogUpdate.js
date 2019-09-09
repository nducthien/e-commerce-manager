import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class DialogUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      address: this.props.address,
      id: this.props.id,
      username: this.props.username,
      password: this.props.password,
      isopen: this.props.isOpen
    };
  }

  getFirstNameDialog = event => {
    if (event.target.value != "") {
      this.setState({
        firstName: event.target.value
      });
    }
  };

  getLastNameDialog = event => {
    if (event.target.value != "") {
      this.setState({
        lastName: event.target.value
      });
    }
  };

  getAddressDialog = event => {
    if (event.target.value != "") {
      this.setState({
        address: event.target.value
      });
    }
  };

  getPasswordDialog = event => {
    if (event.target.value != "") {
      this.setState({
        password: event.target.value
      });
    }
  };

  handleSubmit = event => {
    let userUpdate = {
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address
    };
    const token = localStorage.getItem("token");
    const url = "/users/" + this.state.id;
    this.props.reset;
    axios({
      method: "put",
      url: url,
      data: userUpdate,
      headers: { token: token }
    })
      .then(res => {
        this.props.reset();
        alert("update success");
      })
      .catch(error => {
        this.statusAfterCallApi(error.response.active);
      });
  };

  statusAfterCallApi = status => {
    alert("Login expired, please login again!");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    this.forward("/");
  };

  forward = location => {
    localStorage.removeItem("token");
    this.props.history.push(location);
  };

  render() {
    let dialog = (
      <div className="dialogStyles">
        <button
          className="dialogCloseButtonStyles"
          onClick={this.props.onClose}
        >
          x
        </button>
        <h1>Update user</h1>
        <form className="formDialogUpdate">
          <div class="form-group">
            <label for="usr">First Name</label>
            <input
              type="text"
              onChange={this.getFirstNameDialog}
              placeholder={this.state.firstName}
              class="form-control"
              id="fname"
            />
          </div>
          <div class="form-group">
            <label for="usr">Last Name</label>
            <input
              type="text"
              onChange={this.getLastNameDialog}
              placeholder={this.state.lastName}
              class="form-control"
              id="lname"
            />
          </div>
          <div class="form-group">
            <label for="usr">Address</label>
            <input
              type="text"
              onChange={this.getAddressDialog}
              placeholder={this.state.address}
              class="form-control"
              id="address"
            />
          </div>
          <div class="form-group">
            <label for="usr">Password</label>
            <input
              type="password"
              onChange={this.getAddressDialog}
              placeholder="password"
              class="form-control"
              id="address"
            />
          </div>
          <button
            type="button"
            onClick={this.handleSubmit}
            class="btn btn-primary btn-block"
          >
            OK
          </button>
          <button type="button" class="btn btn-default btn-block">
            Clear all
          </button>
        </form>
        <div>{this.props.children}</div>
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div className="diaLogUpdate">{dialog}</div>;
  }
}

export default withRouter(DialogUpdate);
