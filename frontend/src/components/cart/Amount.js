import React, { Component } from "react";

class Amount extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td colSpan="3" />
        <td>
          <h4>
            <strong>
              <i class="fas fa-tombstone-alt" />
            </strong>
          </h4>
        </td>
        <td>
          <h4>
            <strong>{this.props.amount}</strong>
          </h4>
        </td>
        <td colSpan="3">
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light"
          >
            Complete
          </button>
        </td>
      </tr>
    );
  }
}
export default Amount;
