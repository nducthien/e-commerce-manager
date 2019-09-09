import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

/*

@author duy
@since 05/06/2019
*/
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user: {},
      isUpdateUser: this.props.isUpdate
    };
  }

  async componentDidMount() {
    this.callApiGetList();
  }

  async componentDidMount() {
    this.callApiGetList();
  }

  callApiGetList = () => {
    axios
      .get("/users", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data.items);
        this.setState({
          items: response.data.items
        });
      })
      .catch(error => {
        this.checkExpiredToken(error.response.status);
      });
  };

  callBack = () => {
    this.callApiGetList();
  };

  callBack = () => {
    this.callApiGetList();
  };
  checkExpiredToken = status => {
    if (status == 401) {
      alert(" Expired, Please login again!");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      this.props.history.push("/login");
    }
  };

  callApiToDelete = id => {
    var onDelete = window.confirm("Are you sure?");
    if (onDelete == false) {
      return;
    }
    const token = localStorage.getItem("token");
    axios({
      method: "delete",
      url: "../users/" + id,
      headers: { token: token }
    })
      .then(res => {
        this.resultAfterDelete(res.data.status);
      })
      .catch(res => {
        this.resultAfterDelete(res.response.status);
        return;
      });
  };

  resultAfterDelete = status => {
    if (status == 200) {
      this.callBack();
    }
    if (status === 401) {
      alert("Expired, Please login again !");
      window.location("/");
    }
  };

  passUserUpdate = user => {
    this.props.setNewUser(user);
  };

  resetList = () => {
    this.callApiGetList();
    this.props.stopResetList();
  };

  render() {
    var index = 1;
    return (
      <tbody>
        {this.state.items.map(user => (
          <tr>
            <div id="listen" style={{ display: "none" }}>
              {this.props.isUpdate == true ? this.resetList() : ""}
            </div>
            <td className="item-index">{index++}</td>

            <td className="item-username">{user.username}</td>

            <td className="item-firstName">{user.firstName}</td>

            <td className="item-lastName">{user.lastName}</td>

            <td className="item-address">{user.address}</td>
            <td>
              <button
                onClick={this.passUserUpdate.bind(this, user)}
                style={{ "margin-left": "20px" }}
                type="button"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#myModalUpdate"
              >
                Edit
              </button>

              <button
                type="button"
                style={{ "margin-left": "20px" }}
                className="btn btn-danger"
                onClick={this.callApiToDelete.bind(this, user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default withRouter(ListItem);
