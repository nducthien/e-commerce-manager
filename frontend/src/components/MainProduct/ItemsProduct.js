import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

const urlImg = "http://localhost:8080/products/images/";
class ItemsProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCart: "none"
    };
  }
  // handleProductClick = () =>{
  //     this.props.history.push("/adminmanager/productview/" + this.props.id);
  // }
  async componentDidMount() {
    if (localStorage.getItem("token") != null) {
      this.setState({
        displayCart: "block"
      });
    }
  }

  cart = {
    username: localStorage.getItem("username"),
    productId: this.props.id,
    quantity: 1
  };

  resultAfterAddToCart = status => {
    if (status == 201) {
      alert("Added to cart !");
      return;
    }
    alert("Sorry, have error !");
  };

  render() {
    var name = this.props.name;
    // console.log(name + "      " + this.props.imgage);
    return (
      <div
        class="col-md-3 w3ls_w3l_banner_left"
        style={{ width: "20%", marginTop: "20px" }}
      >
        <div class="hover14 column">
          <div
            class="agile_top_brand_left_grid w3l_agile_top_brand_left_grid"
            style={{ height: "22em", width: "100%" }}
            onClick={this.handleProductClick}
          >
            <div class="agile_top_brand_left_grid_pos" />
            <Link
              to={{
                pathname: `/${this.props.id}`
              }}
            >
              <img
                src={urlImg + this.props.imgage}
                alt=" "
                class="img-responsive"
                style={{ height: "12em", width: "100%" }}
              />
            </Link>
            <div class="agile_top_brand_left_grid1" style={{ border: "0px" }}>
              <figure style={{ height: "10em", width: "100%" }}>
                <div class="snipcart-item block">
                  <div class="snipcart-details" style={{ height: "12em" }}>
                    <div>
                      <p>
                        {name.length > 15
                          ? name.substring(0, 12) + "..."
                          : name}
                      </p>

                      <h4 style={{ color: "red" }}>
                        {new Intl.NumberFormat().format(this.props.price) +
                          " VNĐ"}
                      </h4>
                    </div>
                    <div
                      id="cart"
                      style={{
                        display: localStorage.getItem("token")
                          ? "block"
                          : "none",
                        cursor: "pointer"
                      }}
                    />
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ItemsProduct;
