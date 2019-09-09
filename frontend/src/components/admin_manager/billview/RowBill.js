import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class RowBill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bill: this.props.bill,
      status: this.props.bill.status
    };
  }

  handelStatus = e => {
    this.setState({ status: e.target.value });
  };

  changeStatus = () => {
    if (this.state.bill.status == this.state.status) return;
    if (!window.confirm("Bạn có chắc không ?")) return;
    this.CallApiToChangeStatus();
  };

  CallApiToChangeStatus = () => {
    axios({
      method: "put",
      url: "/bills/" + this.state.bill.id,
      headers: { token: localStorage.getItem("token") },
      data: { status: this.state.status }
    })
      .then(res => {
        console.log(res);
        this.checkExpiredToken(res.status);
        let newBill = this.state.bill;
        newBill.status = this.state.status;
        this.setState({ bill: newBill });
      })
      .catch(err => {
        this.checkExpiredToken(err.response.status);
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

  detailProducts = e => {
    var nameProduct = " ";
    if (e.length == 1) {
      nameProduct = e[0].name;
    } else {
      nameProduct = e[0].name + ", ...";
    }
    return nameProduct;
  };

  transfromDate = date => {
    let day = new Date(date);
    return day.getDate() + "/" + day.getMonth() + "/" + day.getFullYear();
  };

  totalPrice = e => {
    var totalPrice = 0;
    e.forEach(function(element) {
      totalPrice += element.price * element.quantity;
    });
    return totalPrice;
  };

  render() {
    return (
      <tr>
        <td>{this.props.bill.id}</td>
        <td>{this.props.bill.username}</td>
        <td>{this.transfromDate(this.props.bill.createdTime)}</td>
        <td>{this.detailProducts(this.props.bill.productList)}</td>
        <td>
          {new Intl.NumberFormat().format(
            this.totalPrice(this.state.bill.productList)
          ) + " VNĐ"}
        </td>
        <td>{this.props.bill.address}</td>
        <td>
          <select id="mySelect" onChange={this.handelStatus}>
            <option
              selected={this.props.bill.status == "do" ? "selectd" : ""}
              value="do"
            >
              Chờ xác nhận
            </option>
            <option
              selected={this.props.bill.status == "doing" ? "selected" : ""}
              value="doing"
            >
              Đang vận chuyển
            </option>
            <option
              selected={this.props.bill.status == "done" ? "selected" : ""}
              value="done"
            >
              Đã nhận hàng
            </option>
          </select>
        </td>
        <td>
          <th>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.changeStatus}
            >
              Đổi trạng thái
            </button>
          </th>
          <th>
            <button
              onClick={() => {
                this.props.history.push(
                  "/adminmanager/bills/" + this.state.bill.id
                );
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
  }
}

export default withRouter(RowBill);
