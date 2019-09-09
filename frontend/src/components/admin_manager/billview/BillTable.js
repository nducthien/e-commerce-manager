import React, { Component } from "react";
import "../../../assets/css/bill.css";
import axios from "axios";
import RowBill from "./RowBill";

class BillTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: { from: 0, to: 5 },
            listBill: [],
            username: "",
            dateFrom: "",
            dateTo: ""
        };
    }

    componentDidMount() {
        this.getAllBill();
    }

    getAllBill = () => {
        axios
            .get("/bills", {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            .then(response => {
                console.log(response);
                this.checkExpiredToken(response.status);
                this.setState({
                    listBill: response.data.items
                });
            })
            .catch(error => {
                this.checkExpiredToken(error.response.status);
            });
    };

    getBillByUserName = username => {
        if (username == "") {
            alert("Tên không được để trống !");
            return;
        }
        axios({
            method: "get",
            url: "/bills/search/" + username,
            headers: { token: localStorage.getItem("token") }
        })
            .then(res => {
                console.log(res);
                this.checkExpiredToken(res.status);
                this.setState({ listBill: res.data.items });
            })
            .catch(err => {
                this.checkExpiredToken(err.response.status);
            });
    };

    getBillByDay = (from, to) => {
        let dayFrom = new Date(from);
        let dayTo = new Date(to);

        let fromatDayFrom =
            dayFrom.getDate() +
            "-" +
            (dayFrom.getMonth() + 1) +
            "-" +
            dayFrom.getFullYear();
        let fromatDayTo =
            dayTo.getDate() +
            "-" +
            (dayTo.getMonth() + 1) +
            "-" +
            dayTo.getFullYear();

        axios({
            method: "get",
            url: "/bills/fields?fromTime=" + fromatDayFrom + "&toTime=" + fromatDayTo,
            headers: { token: localStorage.getItem("token") }
        })
            .then(res => {
                console.log(res);
                this.checkExpiredToken(res.status);
                if (res.status == 400) {
                    this.setState({ listBill: [] });
                    return;
                }
                this.setState({ listBill: res.data.items });
            })
            .catch(err => {
                this.checkExpiredToken(err.response.status);
                if (err.response.status == 400) {
                    alert("Thời gian kết thúc phải lớn hơn thời gian bắt đầu !");
                    return;
                }
            });
    };

    getBillbyDayAndUserName = (username, from, to) => {
        let dayFrom = new Date(from);
        let dayTo = new Date(to);

        let fromatDayFrom =
            dayFrom.getDate() +
            "-" +
            (dayFrom.getMonth() + 1) +
            "-" +
            dayFrom.getFullYear();
        let fromatDayTo =
            dayTo.getDate() +
            "-" +
            (dayTo.getMonth() + 1) +
            "-" +
            dayTo.getFullYear();

        axios({
            method: "get",
            url:
                "/bills/params?fromTime=" +
                fromatDayFrom +
                "&toTime=" +
                fromatDayTo +
                "&username=" +
                username,
            headers: { token: localStorage.getItem("token") }
        })
            .then(res => {
                console.log(res);
                this.checkExpiredToken(res.status);
                if (res.status == 400) {
                    this.setState({ listBill: [] });
                    return;
                }
                this.setState({ listBill: res.data.items });
            })
            .catch(err => {
                this.checkExpiredToken(err.response.status);
                if (err.response.status == 400) {
                    alert("Thời gian không hợp lệ!");
                    return;
                }
            });
    };

    checkSearch = () => {
        if (
            this.state.username == "" &&
            this.state.dateFrom != "" &&
            this.state.dateTo == ""
        )
            alert("Ngày kết thúc đang trống");

        if (
            this.state.username == "" &&
            this.state.dateFrom == "" &&
            this.state.dateTo != ""
        )
            alert("Ngày bắt đầu đang trống");

        if (
            this.state.username != "" &&
            this.state.dateFrom != "" &&
            this.state.dateTo == ""
        )
            alert("Ngày kết thúc đang trống");

        if (
            this.state.username != "" &&
            this.state.dateFrom == "" &&
            this.state.dateTo != ""
        )
            alert("Ngày bắt đầu đang trống");
    };

    searchBill = () => {
        this.checkSearch();

        if (
            this.state.username == "" &&
            this.state.dateFrom != "" &&
            this.state.dateTo != ""
        ) {
            this.getBillByDay(this.state.dateFrom, this.state.dateTo);
            return;
        }
        if (
            this.state.username != "" &&
            this.state.dateFrom == "" &&
            this.state.dateTo == ""
        ) {
            this.getBillByUserName(this.state.username);
            return;
        }
        if (
            this.state.username != "" &&
            this.state.dateFrom != "" &&
            this.state.dateTo != ""
        ) {
            this.getBillbyDayAndUserName(
                this.state.username,
                this.state.dateFrom,
                this.state.dateTo
            );
            return;
        }
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

    resetInput = () => {
        document.getElementById("search-name").value = "";
        this.setState({
            dateTo: "",
            dateFrom: ""
        });
    };

    checkDateFrom = e => {
        let dateFrom = new Date(e.target.value);
        let dateTo = new Date(this.state.dateTo);

        if (dateFrom > dateTo) {
            this.setState({
                dateTo: e.target.value,
                dateFrom: e.target.value
            });
            return;
        }
        this.setState({ dateFrom: e.target.value.trim() });
    };

    checkDateTo = e => {
        let dateFrom = new Date(this.state.dateTo);
        let dateTo = new Date(e.target.value);

        if (dateFrom > dateTo) {
            this.setState({
                dateTo: e.target.value,
                dateFrom: e.target.value
            });
            return;
        }
        this.setState({ dateTo: e.target.value.trim() });
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
            <div className="container" style={{ marginTop: "20px" }}>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="search">
                            <div className="findByName">
                                <input
                                    onChange={e => {
                                        this.setState({ username: e.target.value.trim() });
                                    }}
                                    type="text"
                                    placeholder="username"
                                    id="search-name"
                                />
                                Từ ngày{" "}
                                <input
                                    value={this.state.dateFrom}
                                    onChange={e => {
                                        this.checkDateFrom(e);
                                    }}
                                    type="date"
                                />
                                Đến ngày{" "}
                                <input
                                    value={this.state.dateTo}
                                    onChange={e => {
                                        this.checkDateTo(e);
                                    }}
                                    type="date"
                                />
                            </div>
                            <button
                                className="btn btn-search"
                                style={{ margin: "5px" }}
                                onClick={() => {
                                    if (
                                        this.state.dateTo == "" &&
                                        this.state.username == "" &&
                                        this.state.dateFrom == ""
                                    )
                                        return;
                                    this.searchBill();
                                }}
                            >
                                Tìm kiếm
              </button>
                            <button
                            className="btn btn-search"
                                style={{ float: "right", "margin-right": "20px" }}
                                onClick={() => {
                                    this.resetInput();
                                }}
                            >
                                Làm mới
              </button>
                        </div>
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Danh sách đơn hàng</h3>
                            </div>
                            <div className="panel-body">
                                <table
                                    style={{ color: "#000" }}
                                    className="bill-table table table-bordered table-hover"
                                >
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
                                            .map(bill => (
                                                <RowBill bill={bill} />
                                            ))}
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

export default BillTable;
