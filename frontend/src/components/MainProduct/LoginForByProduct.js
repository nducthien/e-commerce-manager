import React, { Component } from "react";
import axios from "axios";
import { statusResponse } from "../../library/handleStatusCode";
import { withRouter } from "react-router-dom";

class LoginForByProduct extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  user = {
    username: "",
    password: ""
  };
  getUsername = event => {
    this.user.username = event.target.value;
  };
  getPassword = event => {
    this.user.password = event.target.value;
  };
  checkValidate = () => {
    if (this.user.username == "") {
      document.getElementById("message").innerHTML = "Enter your username";
      return false;
    }
    if (this.user.password == "") {
      document.getElementById("message").innerHTML = "Enter your password";
      return false;
    }
    return true;
  };

  forwardToPage = (key, role) => {
    if (key == 200 && role == 1) {
      this.props.history.push("/adminmanager");
    }
    if (key == 200 && role == 0) {
      this.props.setIsLogin();
    }
    if (key == 403) {
      document.getElementById("message").style.display = "block";
    }
  };

  checkLogin = () => {
    if (!this.checkValidate()) return;
    axios({
      method: "post",
      url: `/users/login`,
      data: this.user
    })
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.headers.token);
        localStorage.setItem("username", this.user.username);
        localStorage.setItem("role", res.data.role);
        this.forwardToPage(res.status, res.data.role);
      })
      .catch(res => {
        console.log(res);
        this.forwardToPage(res.response.status);
      });
  };

  render() {
    return (
      <div id="content" class="">
        <p id="message" style={{ display: "none" }}>
          Incorrect username or password
        </p>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input
              class="form-control"
              aria-describedby="emailHelp"
              onChange={this.getUsername}
              type="text"
              placeholder="username"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              class="form-control"
              onChange={this.getPassword}
              type="password"
              placeholder="password"
            />
          </div>

          <a onClick={this.checkLogin} id="login" class="btn btn-primary">
            Login
          </a>
        </form>
      </div>
    );
  }
}
export default withRouter(LoginForByProduct);
