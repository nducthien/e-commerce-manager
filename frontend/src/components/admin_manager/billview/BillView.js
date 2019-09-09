import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import BillTable from "./BillTable";
import BillInformation from "./BillInformation";

class BillView extends Component {
  constructor(props) {
    super(props);
    this.location = "/adminmanager/bills/";
  }

  render() {
    return (
      <Switch>
        <Route exact path={this.location + ""} component={BillTable} />
        <Route exact path={this.location + ":id"} component={BillInformation} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

const NoMatch = () => (
  <h1 style={{ "text-align": "center", "margin-top": "100px" }}>
    404 NOT FOUND
  </h1>
);

export default BillView;
