import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";

class PopupFormPay extends React.Component {
  constructor(props) {
    super(props);
  }

  listProduct = [];

  componentDidUpdate() {}
  checkValidateFormPay = () => {
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;

    if (name == "") {
      alert("Tên không được để trống ");
      return false;
    }
    if (address == "") {
      alert("Địa chỉ không được để trống");
      return false;
    }
    if (phone == "") {
      alert("Số điện thoại không được để trống");
      return false;
    }

    if (isNaN(Number(phone))) {
      alert("Số điện thoại phải là ký tự số ");
      return false;
    }

    if (phone.length < 10 || phone.length > 11) {
      alert("Số điện thoại phải là 10 hoặc 11 ký tự");
      return false;
    }

    if (this.props.product.length <= 0) {
      alert("giỏ hàng của bạn không có sản phẩm nào");
      return false;
    }
    return true;
  };

  handlePay = () => {
    if (!this.checkValidateFormPay()) {
      return;
    }
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;

    var bill = {
      username: localStorage.getItem("username"),
      receiver: name,
      address: address,
      phoneNumber: phone,
      productList: this.props.product
    };
    console.log(JSON.stringify(bill));

    axios({
      method: "POST",
      url: "/bills",
      data: bill,
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        console.log(res);
        this.resultAfterPay(res.data.status);
      })
      .catch(error => {
        this.resultAfterPay(error.response.status);
      });
  };

  resultAfterPay = status => {
    if (status == 201) {
      this.removeAllCart();
      alert("Đặt hàng thành công");
      document.getElementById("cancel").click();
      this.props.history.push("/bills");
    }

    if (status == 403) {
      alert("Hết phiên làm việc, hãy đăng nhập lại!");
      this.history.push("/login");
    }
  };

  removeAllCart = () => {
    this.props.product.forEach(element => {
      axios({
        method: "DELETE",
        url: "/carts/" + element.cartId,
        headers: { token: localStorage.getItem("token") }
      })
        .then(res => {})
        .catch(res => {
          this.resultAfterRemoveCart(res.response.status);
          console.log(res);
        });
    });

    this.props.getAllCart();
  };

  resetForm = () => {
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
  };

  render() {
    return (
      <div class="modal fade" id="payModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Thông tin đặt hàng</h4>
            </div>
            <div class="modal-body">
              <form action="" method="POST" role="form">
                <div class="form-group">
                  <label for="">Tên người nhận</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Nguyễn văn A"
                  />
                </div>
                <div class="form-group">
                  <label for="">Địa chỉ</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    placeholder="Hà Nội"
                  />
                </div>
                <div class="form-group">
                  <label for="">Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    placeholder="03346161xxx  "
                  />
                </div>
                <div class="form-group">
                  <a
                    type=""
                    class="btn btn-primary form-control"
                    onClick={this.handlePay}
                  >
                    Xác nhận
                  </a>
                  <button
                    onClick={() => {
                      this.resetForm();
                    }}
                    id="cancel"
                    type="submit"
                    class="btn btn-default form-control"
                    data-dismiss="modal"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(PopupFormPay);
