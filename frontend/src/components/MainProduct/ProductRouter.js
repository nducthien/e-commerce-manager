import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListProduct from "./ListProduct.js";
import Infor from "./InforProduct.js";

class ModalSwitch extends Component {
  ShowList = ({ match }) => {
    return <ListProduct id={match.params.id} />;
  };
  ShowInfor = ({ match }) => {
    return <Infor />;
  };
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path={"/"} component={this.ShowList} />
            <Route exact path={"/product/:id"} component={Infor} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
function NoMatch({ location }) {
  return (
    <div>
      <h1>404 not found</h1>
    </div>
  );
}
class ProductRouter extends Component {
  render() {
    return (
      <Router>
        <Route component={ModalSwitch} />
      </Router>
    );
  }
}
export default ProductRouter;
