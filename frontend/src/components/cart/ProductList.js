import React from "react";

const ProductList = props => {
  return (
    <div style={{ margin: "0px 15px 0px 15px" }}>
      <h2>Giỏ hàng của bạn !</h2>
      <section className="section">
        <div className="table-responsive">
          <table className="table product-table">
            <thead>
              <tr style={{ fontSize: "25px", color: "#000000" }}>
                <th />
                <th style={{ color: "#000000" }}>Sản Phẩm</th>
                <th style={{ color: "#000000" }}>Giá</th>
                <th style={{ color: "#000000" }}>Số Lượng</th>
                <th style={{ color: "#000000" }}>Tổng Cộng</th>
                <th />
              </tr>
              <tr />
            </thead>
            <tbody>{props.children}</tbody>
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td
                style={{
                  fontWeight: "bold",
                  color: "#c10017"
                }}
              >
                <span style={{ color: "#000000" }}>Thành tiền : </span>{" "}
                <span id="total">
                  {new Intl.NumberFormat().format(props.total()) + "₫"}
                </span>
              </td>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td
                style={{
                  fontWeight: "bold",
                  color: "#c10017"
                }}
              >
                <button
                  data-toggle="modal"
                  data-target="#payModal"
                  id="pay"
                  type="button"
                  class="btn btn-info"
                  style={{ float: "right" }}
                >
                  Đặt hàng
                </button>
              </td>
            </tr>
          </table>
        </div>
      </section>
    </div>
  );
};
const getTotalPrice = props => {
  return props.total();
};
export default ProductList;
