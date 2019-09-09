import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLogOut: false
    };
  }

  componentWillMount() {
    if (
      localStorage.getItem("username") != null &&
      localStorage.getItem("role") != null
    ) {
      this.setState({
        isLogOut: true,
        username: localStorage.getItem("username")
      });
      console.log(this.state.username);
      return;
    }
  }
  handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    this.setState({
      isLogOut: false,
      username: localStorage.getItem("")
    });
    this.props.history.push("/");
  };

  changToLogOut = () => {
    if (!this.state.isLogOut) {
      return (
        <ul className="dropdown-menu drp-mnu">
          <li>
            <a
              onClick={() => {
                this.props.history.push("/login");
              }}
              href="#"
            >
              Login{" "}
            </a>
          </li>
          <li>
            <a href="#">Sign Up</a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="dropdown-menu drp-mnu">
        <li>
          <a onClick={this.handleLogOut} href="/">
            Log out
          </a>
        </li>
      </ul>
    );
  };

  changeIcon = () => {
    if (this.state.isLogOut) {
      return this.state.username;
    }
    return <i className="fa fa-user" aria-hidden="true" />;
  };

  render() {
    return (
      <div style={{ margin: "10px 10px 50px 10px" }}>
        <div className="agileits_header">
          <div
            className="product_list_header"
            style={{
              "margin-left": "70%",
              display: localStorage.getItem("token") ? "block" : "none"
            }}
          >
            <input
              style={{ float: "left" }}
              type="button"
              onClick={() => this.props.history.push("/bills")}
              value="Your Bills"
              className="button btn-view-bill"
            />

            <form className="last">
              <fieldset>
                <input
                  type="button"
                  onClick={() => this.props.history.push("/cartdetail")}
                  value="View your cart"
                  className="button"
                />
              </fieldset>
            </form>
          </div>
          <div
            className="w3l_header_right"
            style={{ float: "right", margin: "0px 30px 0px 0px" }}
          >
            <ul>
              <li className="dropdown profile_details_drop">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  {this.changeIcon()}
                  <span className="caret" />
                </a>
                <div className="mega-dropdown-menu">
                  <div className="w3ls_vegetables">{this.changToLogOut()}</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="clearfix" />
        </div>
        <div className="products-breadcrumb">
          <div className="container">
            <ul>
              <li>
                <i className="fa fa-home" aria-hidden="true" />
                <a href="/">Home</a>
                <span>|</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w3l_banner_nav_right_banner3">
          <image src="images/backgroud.png" width="100" height="100" />
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
