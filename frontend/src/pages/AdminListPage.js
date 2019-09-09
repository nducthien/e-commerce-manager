import React, { Component } from "react";
import AdminList from "../components/admin_manager/AminList";
import AdminItem from "../components/admin_manager/user/AdminItem";

class AdminListPage extends Component {
  render() {
    var admins = [];
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <button type="button" className="btn btn-info" />

        <AdminList>{this.showAdmins(admins)}</AdminList>
      </div>
    );
  }

  showAdmins(admins) {
    var result = null;
    if (admins.length > 0) {
      result = admins.map((admin, index) => {
        return <AdminItem key={index} admin={admin} index={index} />;
      });
    }
    return result;
  }
}
export default AdminListPage;
