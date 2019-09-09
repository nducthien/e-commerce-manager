import React, { Component } from "react";

import Footer from "./Footer";
import ListProduct from "./ListProduct";
import InforProduct from "./InforProduct";
import Header from "./Header";
import { Switch, Route, withRouter } from "react-router-dom";
import Cart from "../cart/Cart";
import BillDetail from "./BillDetail";
import BillInformation from "./BillInfomation";

/*
 *   Create 29/5/2019 by anhnt2
 *   last update 31/5/2019 by anhnt2
 * */
class Home extends Component {
  constructor(props) {
    super(props);
    this.location = "/home/";
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/cartdetail" component={Cart} />
          <Route exact path="/" component={ListProduct} />
          <Route exact path="/bills" component={BillDetail} />
          <Route path="/bills/:id" component={BillInformation} />
          <Route path="/:id" component={InforProduct} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Home;
