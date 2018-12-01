import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Student extends Component {
  render() {
    let student = this.props.studentData;
    return (
      <div
        style={{
          margin: 20
        }}
      >
        <h4>{student.Name}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    studentData: ownProps.location.state
  };
};

export default connect(mapStateToProps)(Student);
