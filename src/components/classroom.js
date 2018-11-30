import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Table } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import { InsertChartOutlined } from "@material-ui/icons";
import {Link} from 'react-router-dom'

class Classroom extends Component {
  
  render() {
    console.log("Props in render: ", this.props)
    return (
      <div
        style={{
          margin: 20
        }}
      >
        <h4>
          Classroom{" "}
          {this.props.classroomData.Grade +
            " " +
            this.props.classroomData.Section}
        </h4>
        <Table responsive>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>S.No</th>
              <th style={{ width: "20%" }}>Class ID</th>
              <th style={{ width: "20%" }}>Name</th>
              <th style={{ width: "20%" }}>Gender</th>
              <th style={{ width: "20%" }}>View Analysis</th>
            </tr>
          </thead>
          <tbody>
            {this.props.students.map((student, index) => {
              return (
                <tr key={student.id}>
                  <td style={{ width: "20%" }}>{index + 1}</td>
                  <td style={{ width: "20%" }}>{student.classId}</td>
                  <td style={{ width: "20%" }}>{student.Name}</td>
                  <td style={{ width: "20%" }}>{student.Gender}</td>
                  <td style={{ width: "20%" }}>
                    <Link to='/studentAnalysis'>
                      <IconButton>
                        <InsertChartOutlined />
                      </IconButton>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("Props in Map: ", ownProps, state)
  return {
    classroomData: ownProps.location.state,
    students: state.firestore.ordered.students
      ? state.firestore.ordered.students
      : []
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => {
    if (!props.classroomData.id) return [];
    return [
      {
        collection: "students",
        where: [["classId", "==", props.classroomData.id]]
      }
    ];
  })
)(Classroom);
