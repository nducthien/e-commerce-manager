import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./user/Menu";
import TableItems from "./user/TableItems";
import axios from "axios";
import { withRouter } from "react-router-dom";
import ProductView from "./productview/ProductView";
import BillView from "../admin_manager/billview/BillView";

class AdminManager extends Component {
  constructor(props) {
    super(props);
    this.location = "/adminmanager/";
  }

  location;

  componentDidMount() {
    if (localStorage.getItem("token") == null)
      this.props.history.push("/login");
    if (localStorage.getItem("role") != 1) this.props.history.push("/login");
    if (localStorage.getItem("username") != "admin")
      this.props.history.push("/login");

    axios({
      method: "get",
      url: "/users/secured",
      headers: { token: localStorage.getItem("token") }
    })
      .then(response => {
        if (response.data.active == 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("username");
          this.props.history.push("/login");
        }
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        this.props.history.push("/login");
      });
  }

  forward = location => {
    localStorage.removeItem("token");
    this.props.history.push(location);
  };

  render() {
    return (
      <div>
        <Menu />
        <Switch>
          */}
          <Route path={this.location + "user"} component={TableItems} />
          <Route path={this.location + "productview"} component={ProductView} />
          <Route path={this.location + "bills"} component={BillView} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminManager);
