import React, { Component } from "react";
import LoginForByProduct from "./LoginForByProduct";
import axios, { post } from "axios";

const urlImg = "http://localhost:8080/products/images/";

class InforProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      product: [],
      isLogin: false
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.setState({ popupAdded: "#myModal" });
    }
    var id = this.state.id;
    if (isNaN(Number(id))) return;
    this.callApiGetProduct();
    this.cart = {
      username: localStorage.getItem("username"),
      productId: this.props.match.params.id,
      quantity: 1
    };
  }

  cart = {
    username: localStorage.getItem("username"),
    productId: this.props.match.params.id,
    quantity: 1
  };

  callApiGetProduct = () => {
    axios({
      method: "get",
      url: "/users/products/" + this.state.id
    })
      .then(res => {
        console.log("this is status code", res.status);
        console.log("this data server throw", res.data);
        this.setState({
          product: res.data
        });
      })
      .catch(err => {
        console.log(err.status);
      });
  };

  checkIsLoginAndAddToCart = () => {
    if (localStorage.getItem("token") == null) {
      alert("Please Login !");
      this.setState({
        isLogin: true
      });
      return;
    }
    axios({
      method: "post",
      url: "/carts",
      data: this.cart,
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
      this.showPopupAdded();
    }

    if (status == 401) {
      alert("Expired !");
      this.setState({
        isLogin: true
      });
    }
  };

  setIsLogin = () => {
    this.setState({
      isLogin: false
    });
    this.cart = {
      username: localStorage.getItem("username"),
      productId: this.props.match.params.id,
      quantity: 1
    };
    this.checkIsLoginAndAddToCart();
  };

  showPopupAdded = () => {
    document.getElementById("addCart").click();
  };

  render() {
    if (this.state.isLogin == false) {
      return (
        <div className="informationProduct">
          <h3 className="id-product editProduct">
            Điện thoại {this.state.product.name}
          </h3>
          {/* <button onClick={() => this.setState({ isEdit: true })}
                      className="editProduct btn">
                      Edit
                  </button> */}
          <div className="infor">
            <div className="propety">
              <div className="c4">
                <div className="cropmimg">
                  <img src={urlImg + this.state.product.image} alt="" />
                </div>
              </div>
              <div className="c6">
                <div className="row">
                  <p className="title-infor">Name</p>
                  <p className="data">{this.state.product.name}</p>
                </div>
                <div className="row">
                  <p className="title-infor">Brand</p>
                  <p className="data">{this.state.product.brand}</p>
                </div>
                <div className="row">
                  <p className="title-infor">Price</p>
                  <p className="data">{this.state.product.price}</p>
                </div>
                <div className="row">
                  <p className="title-infor">CPU</p>
                  <p className="data">{this.state.product.cpu}</p>
                </div>
                <div className="row">
                  <p className="title-infor">Screen</p>
                  <p className="data">{this.state.product.screen}</p>
                </div>
                <div className="row">
                  <p className="title-infor">Pin</p>
                  <p className="data">{this.state.product.pin}</p>
                </div>
                <div className="row">
                  <p className="title-infor">Memory</p>
                  <p className="data">{this.state.product.memory}</p>
                </div>
              </div>
            </div>
            <div className="describle">
              <p className="title-describle">Describle</p>
              <p className="data">{this.state.product.describe}</p>
            </div>
            <div className="describle">
              <button
                id="bynow"
                type="button"
                class="btn btn-success btn-lg btn-block"
                onClick={this.checkIsLoginAndAddToCart}
              >
                Thêm vào giỏ
              </button>
              <button
                id="addCart"
                type="button"
                class="btn btn-secondary btn-lg btn-block"
                data-toggle="modal"
                data-target="#myModal"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="close"
                    onClick={() => window.location.reload()}
                  >
                    &times;
                  </button>
                  <h4 class="modal-title">Added to cart!</h4>
                </div>
                <div class="modal-body">
                  <p>
                    <a href="/cartdetail">Go to your cart</a>
                  </p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.isLogin == true) {
      return (
        <LoginForByProduct
          setIsLogin={this.setIsLogin}
          openPopupAdded={this.showPopupAdded}
        />
      );
    }
  }
}
function Infor({ match }) {
  let productId = match.params.id;
  return <InforProduct idProduct={productId} />;
}

export default InforProduct;
