import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Menu extends Component {
  logOutEvent = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    this.props.history.push("/login");
  };

  handleChoosePage = page => {
    if (page == 4) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      this.props.history.push("/login");
      return;
    }
    document.getElementById(page).style.backgroundColor = "#605757";
    document.getElementById(page).style.color = "#f7f7f7";
    if (page == 1) {
      this.props.history.push("/adminmanager/user");
      this.resetStyleTab(page);
    }
    if (page == 2) {
      this.props.history.push("/adminmanager/productview/");
      this.resetStyleTab(page);
    }
    if (page == 3) {
      this.props.history.push("/adminmanager/bills");
      this.resetStyleTab(page);
    }
  };
  resetStyleTab = page => {
    if (page == 1) {
      document.getElementById(2).style.backgroundColor = "#c7cec5a9";
      document.getElementById(2).style.color = "#726d6d";
      document.getElementById(3).style.backgroundColor = "#c7cec5a9";
      document.getElementById(3).style.color = "#726d6d";
    }
    if (page == 2) {
      document.getElementById(1).style.backgroundColor = "#c7cec5a9";
      document.getElementById(1).style.color = "#726d6d";
      document.getElementById(3).style.backgroundColor = "#c7cec5a9";
      document.getElementById(3).style.color = "#726d6d";
    }
    if (page == 3) {
      document.getElementById(1).style.backgroundColor = "#c7cec5a9";
      document.getElementById(1).style.color = "#726d6d";
      document.getElementById(2).style.backgroundColor = "#c7cec5a9";
      document.getElementById(2).style.color = "#726d6d";
    }
  };

  render() {
    const styleLogout = { float: "right", "margin-right": "30px" };
    return (
      <div id="wrapper">
        <div id="title"> Trang quản lý</div>
        <div id="logout" onClick={() => this.handleChoosePage(4)}>
          {" "}
          Đăng xuất
        </div>
        <div id="menu">
          <ul>
            <li
              id="1"
              onClick={() => {
                this.handleChoosePage(1);
              }}
            >
              {" "}
              Quản lý tài khoản
            </li>
            <li
              id="2"
              onClick={() => {
                this.handleChoosePage(2);
              }}
            >
              {" "}
              Quản lý sản phẩm
            </li>
            <li
              id="3"
              onClick={() => {
                this.handleChoosePage(3);
              }}
            >
              {" "}
              Quản lý đơn hàng
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
