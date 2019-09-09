import React, { Component } from "react";
import axios from "axios";
import ItemsProduct from "./ItemsProduct";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      newsPerPage: 10,
      priceFrom: 0,
      priceEnd: 0,
      brand: "all",
      isFindPrice: false,
      labelPrice: ""
    };
    this.setPriceToFind = this.setPriceToFind.bind(this);
    this.setBrand = this.setBrand.bind(this);
  }

  async componentDidMount() {
    if (localStorage.getItem("token") == null) {
      this.props.history.push("/");
    }
    this.callApiGetAllProduct();
  }

  callApiGetAllProduct = () => {
    axios.get("/users/products").then(response => {
      this.setState({
        items: response.data.items
      });
    });
  };
  callApiFindProduct = (priceFrom, priceEnd) => {
    var priceF = priceFrom == null ? this.state.priceFrom : priceFrom;
    var priceE = priceEnd == null ? this.state.priceEnd : priceEnd;
    var brand = document.getElementById("brand").value;
    var url =
      "/users/products/field?priceFrom=" +
      priceF +
      "&priceEnd=" +
      priceE +
      "&brand=" +
      brand;
    console.log(url);
    axios
      .get(url)
      .then(response => {
        this.setState({
          items: response.data.items
        });
      })
      .catch(error => {});
  };
  chosePage = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };
  select = event => {
    this.setState({
      newsPerPage: event.target.value
    });
  };

  setPriceToFind(priceFrom, priceEnd, labelPrice) {
    this.setState({
      priceFrom: priceFrom,
      priceEnd: priceEnd,
      isFindPrice: true,
      labelPrice: labelPrice
    });
    this.callApiFindProduct(priceFrom, priceEnd);
  }

  setIsFindPrice = () => {
    this.setState({
      isFindPrice: false,
      priceFrom: 0,
      priceEnd: 0
    });
    this.callApiGetAllProduct();
  };

  setBrand() {
    this.setState({
      brand: document.getElementById("brand").value
    });
    console.log(document.getElementById("brand").value);
    this.callApiFindProduct();
  }

  setPriceUrl = (priceFrom, priceEnd) => {
    this.priceFrom = priceFrom;
    this.priceEnd = priceEnd;
  };
  styleFilter = {
    border: "1px solid",
    borderLeft: "0px",
    borderRight: "0px",
    borderColor: "Grey",
    height: "70px",
    lineHeight: "70px"
  };

  render() {
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = this.state.items.slice(
      indexOfFirstNews,
      indexOfLastNews
    );
    const renderTodos = currentTodos.map((product, index) => {
      return (
        <ItemsProduct
          id={product.id}
          name={product.name}
          price={product.price}
          imgage={product.image}
          cpu={product.cpu}
          screen={product.screen}
          pin={product.pin}
          memory={product.memory}
          brand={product.brand}
          describe={product.describe}
        />
      );
    });
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.items.length / newsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    return (
      <div style={{ margin: "0px 150px 0px 150px" }}>
        <div class="banner">
          <div class="">
            <div class="w3ls_w3l_banner_nav_right_grid">
              <div>
                <h3>LIST PRODUCTS</h3>
              </div>
              <div class="w3ls_w3l_banner_nav_right_grid1">
                <div class="row" style={this.styleFilter}>
                  <div class="col-sm-12">
                    <ul class="list-inline" id="sltPrice">
                      <li>
                        <p> Chọn mức giá: </p>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            this.setPriceToFind(0, 3000000, "Dưới 3 triệu");
                          }}
                        >
                          Dưới 3 triệu
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            this.setPriceToFind(
                              3000000,
                              7000000,
                              "Từ 3 - 7 triệu"
                            );
                          }}
                        >
                          Từ 3 - 7 triệu
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            this.setPriceToFind(
                              7000000,
                              12000000,
                              "Từ 7 - 12 triệu"
                            );
                          }}
                        >
                          Từ 7 - 12 triệu
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            this.setPriceToFind(
                              12000000,
                              18000000,
                              "Từ 12 - 18 triệu"
                            );
                          }}
                        >
                          Từ 12 - 18 triệu
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            this.setPriceToFind(18000000, 0, "Trên 18 triệu");
                          }}
                        >
                          Trên 18 triệu
                        </a>
                      </li>
                      <li>
                        <p> Chọn hãng: </p>{" "}
                      </li>
                      <li>
                        <select className="form-control" id="sel1" onChange={this.setBrand}>
                          <option value="all"> All</option>
                          <option value="SamSung"> SamSung</option>
                          <option value="Apple"> Apple</option>
                          <option value="Oppo"> Oppo</option>
                          <option value="Xiaomi"> Xiaomi</option>
                          <option value="Huawei"> Huawei</option>
                          <option value="Sony"> Sony</option>
                          <option value="lG"> lG</option>
                        </select>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  class="row"
                  style={{
                    display: this.state.isFindPrice ? "block" : "none"
                  }}
                >
                  <button type="label" class="btn btn-danger">
                    {" "}
                    {this.state.labelPrice}{" "}
                    <span class="badge" onClick={this.setIsFindPrice}>
                      x
                    </span>
                  </button>
                </div>
                {renderTodos}
                <div class="clearfix" />
              </div>
            </div>
          </div>
          <div class="clearfix" />
        </div>
        <div className="news-per-page">
          <select defaultValue="0" onChange={this.select}>
            <option value="0" disabled>
              Get by
            </option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="pagination-custom">
          <ul id="page-numbers">
            {pageNumbers.map(number => {
              if (this.state.currentPage === number) {
                return (
                  <li key={number} id={number} className="active">
                    {number}
                  </li>
                );
              } else {
                return (
                  <li key={number} id={number} onClick={this.chosePage}>
                    {number}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default ListProduct;
