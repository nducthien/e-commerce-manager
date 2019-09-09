import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import ProductTable from "./ProductTable";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import NoMatch from "./NoMatch";

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: {from: 0, to: 5}
        };
        this.location = "/adminmanager/productview/";
    }

    setPage = newPage => {
        this.setState({page: newPage});
    };

    routerProductTable = () => (
        <ProductTable page={this.state.page} setPage={this.setPage}/>
    );
    routerAddProduct = () => <AddProduct/>;
    routerEditProduct = () => <EditProduct/>;

    render() {
        return (
            <Switch>
                <Route path={this.location + "/"} component={this.routerProductTable}/>
                <Route path={this.location + "addproduct"} component={this.routerAddProduct}/>
                <Route exact path={this.location + ":id"} component={this.routerEditProduct}/>
                <Route component={NoMatch}/>
            </Switch>
        );
    }
}

export default ProductView;
