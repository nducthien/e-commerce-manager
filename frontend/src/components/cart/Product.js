import React, { Component } from "react";
import axios, { post } from "axios";
import "../../assets/css/cart.css";

const url = "http://localhost:8080/products/images/";
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.quantity
    };
  }

  increateQuantity = () => {
    this.setState({
      quantity: this.state.quantity + 1
    });

    this.updateQuantity(1);
    this.props.total(true);
    localStorage.setItem("quantity", this.state.quantity);
  };

  decreateQuantity = () => {
    if (this.state.quantity <= 1) {
      alert("Quantity must great than zero!");
      return;
    }
    this.setState({
      quantity: this.state.quantity - 1
    });

    this.updateQuantity(-1);
    this.props.total(true);
    console.log(this.state.quantity - 1);
  };

  updateQuantity = type => {
    var cart = {
      username: localStorage.getItem("username"),
      productId: this.props.productId,
      quantity: type
    };
    axios({
      method: "post",
      url: "/carts",
      data: cart,
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        this.resultAfterAddToCart(res.data.status);
      })
      .catch(res => {
        this.resultAfterAddToCart(res.response.status);
      });
  };

  resultAfterAddToCart = status => {
    if (status == 201) {
    }
    if (status == 401) {
      alert("Expired !");
    }
  };

  handleRemoveCart = () => {
    axios({
      method: "DELETE",
      url: "/carts/" + this.props.cartId,
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        this.resultAfterRemoveCart(res.data.status);
        console.log(res.data);
      })
      .catch(res => {
        this.resultAfterRemoveCart(res.response.status);
        console.log(res);
      });
  };

  resultAfterRemoveCart = status => {
    if (status == 200) {
      this.props.getAllCart();
    }
    if (status == 401) {
      alert("Expired !");
      this.props.history.push("/login");
    }
  };

  render() {
    return (
      <tr>
        <th scope="row">
          <img src={url + this.props.image} width="75" height="75" />
        </th>
        <td>
          <h5>
            <strong style={{ fontWeight: "bold", color: "#000000" }}>
              {this.props.name}
            </strong>
          </h5>
        </td>
        <td style={{ fontWeight: "bold", color: "#c10017" }}>
          {new Intl.NumberFormat().format(this.props.price) + "₫"}
        </td>
        <td className="center-on-small-only">
          <span
            style={{ fontSize: "15px", color: "#000000" }}
            className="qty"
          />
          <div
            className="btn-group radio-group cart-quantity"
            style={{ width: "100%" }}
            data-toggle="buttons"
          >
            <label
              onClick={this.decreateQuantity}
              className="btn btn-sm btn-info btn-rounded waves-effect waves-light"
            >
              <a>-</a>
            </label>
            {this.props.quantity}
            <label
              style={{ float: "right" }}
              onClick={this.increateQuantity}
              className="btn btn-sm btn-info btn-rounded waves-effect waves-light"
            >
              <a>+</a>
            </label>
          </div>
        </td>
        <td style={{ fontWeight: "bold", color: "#c10017" }}>
          {new Intl.NumberFormat().format(
            this.props.quantity * this.props.price
          ) + "₫"}
        </td>
        <td>
          <button
            id="removeCart"
            type="button"
            className="btn btn-sm btn-danger waves-effect waves-light"
            onClick={this.handleRemoveCart}
          >
            X
          </button>
        </td>
      </tr>
    );
  }
}

export default Product;
