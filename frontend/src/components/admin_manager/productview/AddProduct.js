import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../../assets/css/adminmanager.css";
import axios from "axios";
import ImageLoad from "image-preview-react";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      product: null
    };
    this.refButton = React.createRef();
    this.refImage = React.createRef();
  }

  componentDidMount() {
    ImageLoad({ button: this.refButton, image: this.refImage });
  }

  restBorderColor = () => {
    document.getElementById("name").style = "border-color: #ccc";
    document.getElementById("brand").style = "border-color: #ccc";
    document.getElementById("price").style = "border-color: #ccc";
    document.getElementById("cpu").style = "border-color: #ccc";
    document.getElementById("screen").style = "border-color: #ccc";
    document.getElementById("pin").style = "border-color: #ccc";
    document.getElementById("memory").style = "border-color: #ccc";
    document.getElementById("describe").style = "border-color: #ccc";
  };
  checkValidate = () => {
    let message = "";
    let isOk = true;
    this.restBorderColor();
    if (document.getElementById("name").value == "") {
      document.getElementById("name").style = "border-color: #ff0000";
      isOk = false;
    }
    if (document.getElementById("brand").value == "") {
      document.getElementById("brand").style = "border-color: #ff0000";
      isOk = false;
    }
    if (document.getElementById("price").value == "") {
      document.getElementById("price").style = "border-color: #ff0000";
      isOk = false;
    } else {
      if (isNaN(Number(document.getElementById("price").value))) {
        alert("price must be a number\n");
        document.getElementById("price").style = "border-color: #ff0000";
        isOk = false;
      }
    }
    if (document.getElementById("cpu").value == "") {
      document.getElementById("cpu").style = "border-color: #ff0000";
      isOk = false;
    }
    if (document.getElementById("screen").value == "") {
      document.getElementById("screen").style = "border-color: #ff0000";
      isOk = false;
    }
    if (document.getElementById("pin").value == "") {
      document.getElementById("pin").style = "border-color: #ff0000";
      isOk = false;
    }
    if (document.getElementById("memory").value == "") {
      document.getElementById("memory").style = "border-color: #ff0000";
      isOk = false;
    }
    if (document.getElementById("describe").value == "") {
      document.getElementById("describe").style = "border-color: #ff0000   ";
      isOk = false;
    }

    if (message != "") alert(message);
    return isOk;
  };

  getNewProduct = () => {
    return {
      name: document.getElementById("name").value,
      cpu: document.getElementById("cpu").value,
      brand: document.getElementById("brand").value,
      screen: document.getElementById("screen").value,
      memory: document.getElementById("memory").value,
      pin: document.getElementById("pin").value,
      price: document.getElementById("price").value,
      describe: document.getElementById("describe").value
    };
  };

  addNewProduct = () => {
    if (!this.checkValidate()) return;
    let newProduct = this.getNewProduct();
    axios({
      method: "post",
      url: "/products",
      data: newProduct,
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        this.resultAfterAddNewProduct(res.data.status, res);
      })
      .catch(err => {
        console.log("not ok" + err);
        this.checkExpiredToken(err.response.status);
      });
  };

  resultAfterAddNewProduct = (status, res) => {
    if (status == 201) {
      this.setState({ product: res.data.items });
      this.callApiUploadImage();
      alert("upload new product ok");
    }
  };

  checkExpiredToken = status => {
    if (status == 401) {
      alert("please! login again");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      this.props.history.push("/login");
    }
  };
  /*-------------------------------*/
  checkTypeImg = type => {
    var listType = ["GIF", "PNG", "JPG"];
    for (var i = 0; i < listType.length; i++) {
      if (listType[i].toLowerCase() == type.toLowerCase()) return true;
    }
    return false;
  };

  upload = event => {
    document.getElementById("messageImg").innerText = "";
    var file = event.target.files[0];
    var type = file.name.split(".")[file.name.split(".").length - 1];
    if (!this.checkTypeImg(type)) {
      document.getElementById("messageImg").innerText = "file is not image";
      document.getElementById("img").value = null;
      return;
    }
    if (Number(file.size) > 200000000) {
      document.getElementById("messageImg").innerText = "image so big";
      document.getElementById("img").value = null;
      return;
    }
    this.setState({ file: event.target.files[0] });
  };

  callApiUploadImage() {
    const formData = new FormData();
    formData.append("image", this.state.file);
    console.log(this.state.file);
    axios({
      method: "post",
      url: "/products/" + this.state.product.id + "/images",
      data: formData,
      headers: { token: localStorage.getItem("token") }
    })
      .then(res => {
        console.log(res);
        this.checkExpiredToken(res.status);
        this.props.history.push(
          "/adminmanager/productview/" + this.state.product.id
        );
      })
      .catch(err => {
        this.checkExpiredToken(err.response.status);
        console.log(err);
      });
  }

  uploadImage = () => {
    if (this.state.product == null) {
      alert("please! add new product");
      return;
    }
    if (this.state.file == null || this.state.file == undefined) {
      alert("please! choose your photo");
      return;
    }
    this.callApiUploadImage();
  };

  /*-------------------------------*/
  render() {
    return (
      <div className="informationProduct">
        <div className="infor">
          <div className="propety">
            <div className="c4">
              <div className="cropmimg">
                <img
                  id="preViewImage"
                  src="/icon/addFile.png"
                  ref={this.refImage}
                />
              </div>
              <input
                onChange={this.upload}
                className="addImage"
                id="img"
                type="file"
                ref={this.refButton}
              />
              <p id="messageImg" />
            </div>
            <div className="c6">
              <div className="row">
                <p className="title-infor">Name</p>
                <input id="name" type="text" />
              </div>
              <div className="row">
                <p className="title-infor">Brand</p>
                <input id="brand" type="text" />
              </div>
              <div className="row">
                <p className="title-infor">Price</p>
                <input id="price" type="text" />
              </div>
              <div className="row">
                <p className="title-infor">CPU</p>
                <input id="cpu" type="text" />
              </div>
              <div className="row">
                <p className="title-infor">Screen</p>
                <input id="screen" type="text" />
              </div>
              <div className="row">
                <p className="title-infor">Pin</p>
                <input id="pin" type="text" />
              </div>
              <div className="row">
                <p className="title-infor">Memory</p>
                <input id="memory" type="text" />
              </div>
            </div>
          </div>
          <div className="describle">
            <p className="title-describle">Describle</p>
            <textarea id="describe" type="text" />
          </div>
          <button onClick={this.addNewProduct} className="editProduct btn">
            Add new Product
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(AddProduct);
