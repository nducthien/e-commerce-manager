import React, { Component } from "react";
import "../../../assets/css/bill.css";
import axios from "axios";

const urlImg = "http://localhost:8080/products/images/";

class BillInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: null,
      productList: []
    };
  }

  componentWillMount() {
    let id = this.props.match.params.id;
    console.log(id);
    if (isNaN(Number(id))) return;
  }

  componentDidMount() {
    axios({
      method: "get",

      url: "/bills/" + this.props.match.params.id,
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        this.checkExpiredToken(res.status);
        this.setState({
          bill: res.data,
          productList: res.data.productList
        });
      })
      .catch(err => {
        console.log(err);
        this.checkExpiredToken(err.response.status);
      });
  }

  countPrice = () => {
    let price = 0;
    this.state.productList.forEach(function(element) {
      price += element.price * element.quantity;
    });
    return price;
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
  renderRowProduct = product => {
    return (
      <tr>
        <td>
          <img src={urlImg + product.image} />
        </td>
        <td>{product.name}</td>
        <td>{product.quantity}</td>
        <td>
          {new Intl.NumberFormat().format(product.quantity * product.price) +
            " VNĐ"}
        </td>
      </tr>
    );
  };

  showStatus = status => {
    if (status == "do") return "Chờ xác nhận";
    if (status == "doing") return "Đang vận chuyển";
    if (status == "done") return "Đã nhận hàng";
  };

  render() {
    if (this.state.bill == null)
      return (
        <h1 style={{ "text-align": "center", "margin-top": "100px" }}>
          404 NOT FOUND
        </h1>
      );
    return (
      <div className="billInformation">
        <div className="information">
          <div className="information-left">
            <h1 className="information-left-idBill">
              Mã đơn: {this.props.match.params.id}
            </h1>
            <p className="information-left-user">
              Tên tài khoản: <strong>{this.state.bill.username}</strong>
            </p>
          </div>
          <div className="information-right">
            <ul>
              <li>
                Địa chỉ: <strong>{this.state.bill.address}</strong>
              </li>
              <li>
                Người nhận: <strong>{this.state.bill.receiver}</strong>
              </li>
              <li>
                Số điện thoại: <strong>{this.state.bill.phoneNumber}</strong>
              </li>
              <li>
                Ngày đặt: <strong>{this.state.bill.createdTime}</strong>
              </li>
              <li>
                Trạng thái:{}
                <strong>{this.showStatus(this.state.bill.status)}</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="bill-product-table">
          <div className="table-product panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Hóa đơn</h3>
            </div>
            <div className="panel-body">
              <table
                style={{ color: "#000" }}
                className="table table-bordered table-hover"
              >
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.productList.map(product =>
                    this.renderRowProduct(product)
                  )}

                  <tr>
                    <th />
                    <th />
                    <th>Tổng tiền</th>
                    <th>
                      {new Intl.NumberFormat().format(this.countPrice()) +
                        " VNĐ"}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BillInformation;
