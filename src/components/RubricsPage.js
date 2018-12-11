import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Table } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

class RubricsPage extends Component {
  handleClick = event => {
    this.setState({ anchorEl: !this.state.anchorEl });
  };
  state = {
    anchorEl: false
  };

  render() {
      
    const { anchorEl } = this.state;
    return (
      <div style={{ padding: 10 }}>
        {this.props.assessments.length > 0 && (
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Class ID</th>
                <th>Academic Year</th>
                <th>Date Created</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              {this.props.assessments.map(assessment => {
                return (
                  <tr key={assessment.id}>
                    <td>{assessment.title}</td>
                    <td>{assessment.classID}</td>
                    <td>{assessment.acdYear}</td>
                    <td>
                      {assessment.lastSubmitted.substr(0, 10) +
                        ",   " +
                        assessment.lastSubmitted.substr(16, 5)}
                    </td>
                    <td>
                      {assessment.lastSubmitted.substr(0, 10) +
                        ", " +
                        assessment.lastSubmitted.substr(16, 5)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <div
          className="buttonContainer"
          style={{
            float: "right",
            padding: 10,
            paddingTop: 20,
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse"
          }}
        >
          <Tooltip title="Create Rubrics" placement="bottom">
            <Button
              variant="fab"
              style={{ background: "#2196f3", color: "#ffffff" }}
              aria-label="Add"
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <AddIcon />
            </Button>
          </Tooltip>
          {anchorEl && (
            <div
              id="simple-menu"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 5
              }}
            >
              <Link to="/selectTemplate">
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={this.handleClick}
                >
                  Use Existing Template
                </Button>
              </Link>
              <Link to="/createRubric">
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={this.handleClick}
                  style={{ margin: 10 }}
                >
                  Create New Template
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    teacherData: state.firestore.ordered.teachers
      ? state.firestore.ordered.teachers[0]
      : {},
    assessments: state.firestore.ordered.assessments
      ? state.firestore.ordered.assessments
      : []
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(["assessments", "teachers"])
)(RubricsPage);
