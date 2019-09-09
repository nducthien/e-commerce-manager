import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

const urlImg = "http://localhost:8080/products/images/";

class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: []
        };
    }

    componentDidMount() {
        axios
            .get("/products", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log(response);
                this.checkExpiredToken(response.status);
                this.setState({
                    listProduct: response.data.items
                });
            })
            .catch(error => {
                this.checkExpiredToken(error.response.status);
            });
    }

    toEdit = id => {
        this.props.history.push("/adminmanager/productview/" + id);
    };

    changeActive = (indexItem, product) => {
        var status = product.active == "enable" ? "disable" : "enable";
        if (!window.confirm("Do you want " + status)) return;
        var products = this.state.listProduct;
        var id = product.id;
        var url = "/products/" + status + "/" + id;
        axios({
            method: "put",
            url: url,
            headers: { token: localStorage.getItem("token") }
        })
            .then(res => {
                this.checkExpiredToken(res.status);
                products[indexItem].active = status;
                this.setState({ listProduct: products });
                this.setState({
                    listProduct: products
                });
            })
            .catch(res => {
                this.checkExpiredToken(res.response.status);
            });
    };

    checkExpiredToken = status => {
        if (status == 401) {
            alert("you need login again");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("username");
            this.props.history.push("/login");
        }
    };

    renderRow = (product, n) => {
        return (
            <tr>
                <td>{this.props.page.from + 1 + n}</td>
                <td>{product.name}</td>
                <td>
                    <img className="product-img" src={urlImg + product.image} />
                </td>
                <td>{product.cpu}</td>
                <td>{product.price}</td>
                <td>{product.active}</td>
                <td>
                    <th>
                        <button
                            onClick={() =>
                                this.changeActive(n + this.props.page.from, product)
                            }
                            type="button"
                            className="btn btn-danger"
                        >
                            {product.active == "enable" ? "disable" : "enable"}
                        </button>
                    </th>
                    <th>
                        <button
                            onClick={() => this.toEdit(product.id)}
                            type="button"
                            className="btn btn-success productStatus"
                        >
                            Xem chi tiết
                        </button>
                    </th>
                </td>
            </tr>
        );
    };

    loop = () => {
        var arr = new Array();
        for (var i = 0; i < this.state.listProduct.length / 5; i++) {
            arr.push(i);
        }
        return arr;
    };

    routerPage = () => {
        return (
            <ul className="router-page">
                {
                    this.loop().map(i => (
                        <li>
                            <button
                                onClick={() =>
                                    this.props.setPage({
                                        from: 5 * i,
                                        to: 5 * i + 5
                                    })
                                }
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}
            </ul>
        );
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="">
                            <button
                                onClick={() =>
                                    this.props.history.push(
                                        "/adminmanager/productview/addproduct"
                                    )
                                }
                                type="button"
                                className="btn btn-info"
                                data-toggle="modal"
                                data-target="#myModal"
                                style={{ 'margin-left': '90.5%', 'marginTop': '1em', 'margin-bottom': '10px' }}
                            >
                                Add Product
                            </button>
                        </div>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">List User</h3>
                            </div>
                            <div className="panel-body">
                                <table style={{ "color": "#000" }}
                                    className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <td>STT</td>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>CPU</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.listProduct
                                            .slice(this.props.page.from, this.props.page.to)
                                            .map((product, n) => this.renderRow(product, n))}
                                    </tbody>
                                </table>
                                {this.routerPage()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProductTable);
