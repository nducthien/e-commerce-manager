import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import axios, {post} from "axios";
import ImageLoad from "image-preview-react";

const urlImg = "http://localhost:8080/products/images/";

class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            product: false,
            file: null
        };
        this.refButton = React.createRef();
        this.refImage = React.createRef();
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        if (isNaN(Number(id))) return;
        this.callApiGetProduct();
    }

    callApiGetProduct = () => {
        axios({
            method: "get",
            url: "/products/" + this.props.match.params.id,
            headers: {token: localStorage.getItem("token")}
        })
            .then(res => {
                console.log(res);
                this.checkExpiredToken(res.status);
                this.setState({
                    product: res.data,
                    productUpdate: res.data
                });
            })
            .catch(err => {
                console.log(err);
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

    restInput = () => {
        document.getElementById("name").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("price").value = "";
        document.getElementById("cpu").value = "";
        document.getElementById("screen").value = "";
        document.getElementById("pin").value = "";
        document.getElementById("memory").value = "";
        document.getElementById("describe").value = "";
    };

    checkSpace = () => {
        let isOk = true;
        this.restBorderColor();
        if (
            document.getElementById("name").value.trim() == "" &&
            document.getElementById("name").value.length > 0
        ) {
            document.getElementById("name").style = "border-color: #ff0000";
            isOk = false;
        }
        if (
            document.getElementById("brand").value.trim() == "" &&
            document.getElementById("brand").value.length > 0
        ) {
            document.getElementById("brand").style = "border-color: #ff0000";
            isOk = false;
        }
        if (
            document.getElementById("price").value.trim() == "" &&
            document.getElementById("price").value.length > 0
        ) {
            document.getElementById("price").style = "border-color: #ff0000";
            isOk = false;
        }
        if (
            document.getElementById("cpu").value.trim() == "" &&
            document.getElementById("cpu").value.length > 0
        ) {
            document.getElementById("cpu").style = "border-color: #ff0000";
            isOk = false;
        }
        if (
            document.getElementById("screen").value.trim() == "" &&
            document.getElementById("screen").value.length > 0
        ) {
            document.getElementById("screen").style = "border-color: #ff0000";
            isOk = false;
        }
        if (
            document.getElementById("pin").value.trim() == "" &&
            document.getElementById("pin").value.length > 0
        ) {
            document.getElementById("pin").style = "border-color: #ff0000";
            isOk = false;
        }
        if (
            document.getElementById("memory").value.trim() == "" &&
            document.getElementById("memory").value.length > 0
        ) {
            document.getElementById("memory").style = "border-color: #ff0000";
            isOk = false;
        }
        if (
            document.getElementById("describe").value.trim() == "" &&
            document.getElementById("describe").value.length > 0
        ) {
            document.getElementById("describe").style = "border-color: #ff0000   ";
            isOk = false;
        }
        if (!isOk) alert("Do not enter a space");
        return isOk;
    };

    checkValidate = () => {
        if (isNaN(Number(document.getElementById("price").value))) {
            alert("price must be a number\n");
            document.getElementById("price").value = "";
            return false;
        }
        if (document.getElementById("describe").value.length > 500) {
            alert("Describe no more than 500 characters");
            return false;
        }
        return this.checkSpace();
    };

    getNewProduct = () => {
        let newProduct = this.state.product;

        let name = document.getElementById("name").value;
        let cpu = document.getElementById("cpu").value;
        let brand = document.getElementById("brand").value;
        let screen = document.getElementById("screen").value;
        let memory = document.getElementById("memory").value;
        let pin = document.getElementById("pin").value;
        let price = document.getElementById("price").value;
        let describe = document.getElementById("describe").value;

        if (name != "") newProduct.name = name;

        if (cpu != "") newProduct.cpu = cpu;

        if (brand != "") newProduct.brand = brand;

        if (screen != "") newProduct.screen = screen;

        if (memory != "") newProduct.memory = memory;

        if (pin != "") newProduct.pin = pin;

        if (price != "") newProduct.price = price;

        if (describe != "") newProduct.describe = describe;

        return newProduct;
    };

    updateProduct = () => {
        if (!this.checkValidate()) return;
        let productUpdate = this.getNewProduct();

        axios({
            method: "put",
            url: "/products/" + this.state.product.id,
            data: productUpdate,
            headers: {token: localStorage.getItem("token")}
        })
            .then(res => {
                console.log(res);
                this.resultAfterEditProduct(res);
                this.setState({prodcut: productUpdate});
                this.restInput();
            })
            .catch(err => {
                this.checkExpiredToken(err.response.status);
            });
    };

    resultAfterEditProduct = response => {
        if (response.status == 200) {
            this.callApiUploadImage();
            alert("Edit product success!");
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
        var file = event.target.files[0];
        var type = file.name.split(".")[file.name.split(".").length - 1];

        if (!this.checkTypeImg(type)) {
            document.getElementById("messageImg").innerText = "file is not image";
            document.getElementById("img").value = null;
            return;
        }
        if (Number(file.size) > 1000000) {
            alert(Number(file.size));
            document.getElementById("messageImg").innerText = "image so big";
            document.getElementById("img").value = null;
            return;
        }
        this.setState({file: event.target.files[0]});
    };

    callApiUploadImage() {
        const formData = new FormData();
        formData.append("image", this.state.file);
        axios({
            method: "post",
            url: "/products/" + this.state.product.id + "/images",
            data: formData,
            headers: {token: localStorage.getItem("token")}
        })
            .then(res => {
                console.log(res);
                this.checkExpiredToken(res.status);
                document.getElementById("img").value = null;
                let productnew = this.state.product;
                productnew.image = res.data.imageName;
                this.setState({product: productnew});
            })
            .catch(err => {
                this.checkExpiredToken(err.status);
                console.log(err);
            });
    }

    uploadImage = () => {
        if (this.state.file == null || this.state.file == undefined) {
            alert("please! choose your photo");
            return;
        }
        this.callApiUploadImage();
    };
    /*-------------------------------*/
    viewForm = () => {
        return (
            <div className="informationProduct">
                <h1 className="id-product">Product id: {this.state.product.id} </h1>
                <button
                    onClick={() => this.setState({isEdit: true})}
                    className="editProduct btn"
                >
                    Edit
                </button>
                <div className="infor">
                    <div className="propety">
                        <div className="c4">
                            <div className="cropmimg">
                                <img src={urlImg + this.state.product.image} alt=""/>
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
                        <p className="title-describle">Describe</p>
                        <p className="data">{this.state.product.describe}</p>
                    </div>
                </div>
            </div>
        );
    };
    editForm = () => {
        return (
            <div className="informationProduct">
                <h1 className="id-product">Product id: {this.state.product.id} </h1>
                <button
                    onClick={() => this.updateProduct()}
                    className="editProduct btn"
                >
                    Update
                </button>
                <button
                    onClick={() => this.setState({isEdit: false})}
                    className="cancelEdit btn"
                >
                    Cancel
                </button>
                <div className="infor">
                    <div className="propety">
                        <div className="c4">
                            <div className="cropmimg">
                                <img
                                    src={urlImg + this.state.product.image}
                                    alt=""
                                    ref={this.refImage}
                                />
                            </div>
                            <input
                                onChange={this.upload}
                                onClick={() =>
                                    ImageLoad({button: this.refButton, image: this.refImage})
                                }
                                className="addImage"
                                id="img"
                                type="file"
                                ref={this.refButton}
                            />
                            <p id="messageImg"/>
                            <button onClick={this.uploadImage} className="editProduct btn">
                                upLoad imgage
                            </button>
                        </div>
                        <div className="c6">
                            <div className="row">
                                <p className="title-infor">Name</p>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder={this.state.product.name}
                                />
                            </div>
                            <div className="row">
                                <p className="title-infor">Brand</p>
                                <input
                                    id="brand"
                                    type="text"
                                    placeholder={this.state.product.brand}
                                />
                            </div>
                            <div className="row">
                                <p className="title-infor">Price</p>
                                <input
                                    id="price"
                                    type="text"
                                    placeholder={this.state.product.price}
                                />
                            </div>
                            <div className="row">
                                <p className="title-infor">CPU</p>
                                <input
                                    id="cpu"
                                    type="text"
                                    placeholder={this.state.product.cpu}
                                />
                            </div>
                            <div className="row">
                                <p className="title-infor">Screen</p>
                                <input
                                    id="screen"
                                    type="text"
                                    placeholder={this.state.product.screen}
                                />
                            </div>
                            <div className="row">
                                <p className="title-infor">Pin</p>
                                <input
                                    id="pin"
                                    type="text"
                                    placeholder={this.state.product.pin}
                                />
                            </div>
                            <div className="row">
                                <p className="title-infor">Memory</p>
                                <input
                                    id="memory"
                                    type="text"
                                    placeholder={this.state.product.memory}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="clr"/>
                    <div className="describle">
                        <p className="title-describle">Describle</p>
                        <textarea
                            placeholder={this.state.product.describe}
                            id="describe"
                            type="text"
                        />
                    </div>
                </div>
            </div>
        );
    };
    notFound = () => <h1>Product does not exist</h1>;
    changeForm = () => {
        if (!this.state.product) return this.notFound();
        if (this.state.isEdit) return this.editForm();
        return this.viewForm();
    };

    render() {
        return this.changeForm();
    }
}

export default withRouter(EditProduct);
