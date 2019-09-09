import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../assets/css/bill.css";
import axios from "axios";
import "../../assets/css/style.css";

class BillDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: { from: 0, to: 5 },
      listBill: [],
      productList: []
    };
  }

  componentWillMount() {
    if (localStorage.getItem("token") == null) {
      this.props.history.push("/");
    }
  }

  componentDidMount() {
    this.getListBillUser();
  }

  getListBillUser = () => {
    axios({
      method: "get",
      url: "/bills/search/" + localStorage.getItem("username"),
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        // this.checkExpiredToken(res.status);
        this.setState({
          listBill: res.data.items,
          productList: res.data.items.productList
        });
      })
      .catch(err => {
        console.log(err);
        // this.checkExpiredToken(err.response.status);
      });
  };

  getStatusBill = status => {
    if (status == "do") return "Chờ xác nhận";
    if (status == "doing") return "Đang vận chuyển";
    if (status == "done") return "Đã nhận hàng";
  };

  renderRow = (bill, index) => {
    return (
      <tr>
        <td>{bill.id}</td>
        <td>{bill.receiver}</td>
        <td>{bill.createdTime}</td>

        <td>{this.detailProducts(bill.productList)}</td>
        <td>
          {new Intl.NumberFormat().format(this.totalPrice(bill.productList)) +
            " VNĐ"}
        </td>

        <td>{bill.address}</td>
        <td>{this.getStatusBill(bill.status)}</td>
        <td>
          <th>
            <button
              onClick={() => {
                this.props.history.push("/bills/" + bill.id);
              }}
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
  detailProducts = e => {
    var nameProduct = " ";
    if (e.length == 1) {
      nameProduct = e[0].name;
    } else {
      nameProduct = e[0].name + "...";
    }
  };

  componentDidMount() {
    console.log("/bills/search/" + localStorage.getItem("username"));
    axios({
      method: "get",
      url: "/bills/search/" + localStorage.getItem("username"),
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        // this.checkExpiredToken(res.status);
        this.setState({
          listBill: res.data.items,
          productList: res.data.items.productList
        });
      })
      .catch(err => {
        console.log(err);
        // this.checkExpiredToken(err.response.status);
      });
  }

  getStatusBill = status => {
    if (status == "do") return "Chờ xác nhận";
    if (status == "doing") return "Đang vận chuyển";
    if (status == "done") return "Đã nhận hàng";
  };
  renderRow = (bill, index) => {
    return (
      <tr>
        <td>{bill.id}</td>
        <td>{bill.username}</td>
        <td>{bill.createdTime}</td>
        <td>{this.detailProducts(bill.productList)}</td>
        <td>
          {new Intl.NumberFormat().format(this.totalPrice(bill.productList)) +
            " VNĐ"}
        </td>
        <td>{bill.address}</td>
        <td>{this.getStatusBill(bill.status)}</td>
        <td>
          <th>
            <button
              onClick={() => {
                this.props.history.push("/bills/" + bill.id);
              }}
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
  detailProducts = e => {
    var nameProduct = " ";
    if (e.length == 1) {
      nameProduct = e[0].name;
    } else {
      nameProduct = e[0].name + "...";
    }
    return nameProduct;
  };
  totalPrice = e => {
    var totalPrice = 0;
    e.forEach(function(element) {
      totalPrice += element.price * element.quantity;
    });
    return totalPrice;
  };
  loop = () => {
    var arr = new Array();
    for (var i = 1; i < this.state.listBill.length / 5; i++) {
      arr.push(i);
    }
    return arr;
  };
  routerPage = () => {
    return (
      <ul className="router-page">
        <li>
          <button
            onClick={() =>
              this.setState({
                page: {
                  from: 0,
                  to: 5
                }
              })
            }
          >
            1
          </button>
        </li>
        {this.loop().map(i => (
          <li>
            <button
              onClick={() =>
                this.setState({
                  page: {
                    from: 5 * i,
                    to: 5 * i + 5
                  }
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
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Danh sách đơn hàng</h3>
              </div>
              <div className="panel-body">
                <table className="bill-table table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Tên tài khoản</th>
                      <th>Ngày đặt hàng</th>
                      <th>Sản phẩm đã đặt</th>
                      <th>Tổng giá</th>
                      <th>Địa chỉ</th>
                      <th>Trạng thái</th>
                      <th id="control-btn">Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listBill
                      .slice(this.state.page.from, this.state.page.to)
                      .map((bill, index) => this.renderRow(bill, index))}
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

export default withRouter(BillDetail);
