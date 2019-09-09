import React, { Component } from "react";

class ItemsDetailProduct extends Component {
  render() {
    return (
      <div className="informationProduct">
        <h4 className="id-product">Product id</h4>
        <button className="editProduct btn">Edit</button>
        <div className="infor">
          <div className="propety">
            <div className="c4">
              <div className="cropmimg">
                <img src="images/5.png" alt="" />
              </div>
            </div>
            <div className="c6">
              <div className="row">
                <p className="title-infor">Name</p>
                <p className="data">Soccer</p>
              </div>
              <div className="row">
                <p className="title-infor">Price</p>
                <p className="data">Soccer</p>
              </div>
            </div>
          </div>
          <div className="describle">
            <p className="title-describle">Describle</p>
            <p className="data">asdasdasdasdasdasd</p>
          </div>
        </div>
      </div>
    );
  }
}
export default ItemsDetailProduct;
