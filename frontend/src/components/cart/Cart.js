import React, { Component } from "react";
import ProductList from "./ProductList";
import Product from "./Product";
import axios from "axios";
import PopupFormPay from "./PopupFormPay";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getAllProductOnCart();
    if (localStorage.getItem("token") == null) {
      this.props.history.push("/");
    }
  }

  getAllProductOnCart = () => {
    axios

      .get("/carts/" + localStorage.getItem("username"), {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({
          products: response.data.items
        });
      })
      .catch(error => {
        this.checkExpiredToken(error.response.status);
      });
  };

  checkExpiredToken = status => {
    if (status == 401) {
      alert(" Expired, Please login again!");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      this.props.history.push("/login");
    }
  };

  onDecreateQuantity() {}

  onIncreateQuantity() {}

  onDeleteProductFromCart() {}
  getTotal = status => {
    this.getAllProductOnCart();

    var total = 0;
    {
      this.state.products.map(
        product => (total += product.price * product.quantity)
      );
    }
    return total;
  };
  remomveAllCart = () => {};

  render() {
    return (
      <div>
        <ProductList total={this.getTotal}>
          {this.state.products.map(product => (
            <Product
              getAllCart={this.getAllProductOnCart}
              cartId={product.cartId}
              productId={product.productId}
              totalPrice={e => this.getTotalPrice}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              onDecreateQuantity={this.onDecreateQuantity()}
              onIncreateQuantity={this.onIncreateQuantity()}
              onDeleteProductFromCart={this.onDeleteProductFromCart()}
              total={this.getTotal}
            />
          ))}
        </ProductList>
        <PopupFormPay
          getAllCart={this.getAllProductOnCart}
          product={this.state.products}
          remomveAllCart={this.remomveAllCart}
        />
      </div>
    );
  }
}

export default Cart;
