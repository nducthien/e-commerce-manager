import React, {Component} from "react";
import axios from "axios";
import "../../assets/css/login.css";
import {statusResponse} from "../../library/handleStatusCode";

/*
 *   Create 29/5/2019 by anhnt2
 *   last update 31/5/2019 by anhnt2
 * */
class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (localStorage.getItem("role") == null) return;
        if (localStorage.getItem("username") == null) return;
        if (localStorage.getItem("token") == null) return;

        if (localStorage.getItem("role") == 1) this.props.history.push("/adminmanager/");
        if (localStorage.getItem("role") == 0) window.location.href = "/";
    }

    user = {
        username: "",
        password: ""
    };
    getUsername = event => {
        this.user.username = event.target.value;
    };
    getPassword = event => {
        this.user.password = event.target.value;
    };
    checkValidate = () => {
        if (this.user.username == "") {
            document.getElementById("message").innerHTML = "Enter your username";
            return false;
        }
        if (this.user.password == "") {
            document.getElementById("message").innerHTML = "Enter your password";
            return false;
        }
        return true;
    };
    forwardToPage = (key, role) => {
        if (key == 403 || key == 404) {
            document.getElementById("message").innerHTML = statusResponse[key];
            return;
        }
        if (key == 200 && role == 1) {
            this.props.history.push("/adminmanager");
        }
        if (key == 200 && role == 0) {
            window.location.href = "/";
        }
    };
    checkLogin = () => {
        if (!this.checkValidate()) return;
        axios({
            method: "post",
            url: `/users/login`,
            data: this.user
        })
            .then(res => {
                console.log(res);
                localStorage.setItem("token", res.headers.token);
                localStorage.setItem("username", this.user.username);
                localStorage.setItem("role", res.data.role);
                this.forwardToPage(res.status, res.data.role);
            })
            .catch(res => {
                document.getElementById("message").innerHTML = statusResponse[403];
            });
    };

    render() {
        return (
            <div className="mainLogin">
                <p id="message"/>
                <form className="registrationFrom">
                    <div className="title">Login</div>
                    <div className="row">
                        <input
                            onChange={this.getUsername}
                            type="text"
                            placeholder="username"
                        />
                    </div>
                    <div className="row">
                        <input
                            onChange={this.getPassword}
                            type="password"
                            placeholder="password"
                        />
                    </div>
                    <div className="contror">
                        <div>
                            <a onClick={this.checkLogin} id="login">
                                Login
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
