import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Table } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

class Templates extends Component {
  render() {
    return (
      <div style={{ padding: 10 }}>
        <h4>Select the template</h4>;
        {this.props.templates.length > 0 && (
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Competencies</th>
                  <th>Select Template</th>
                </tr>
              </thead>
              <tbody>
                {this.props.templates.map(template => {
                  return (
                    <tr key={template.id}>
                      <td>{template.Title}</td>
                      <td>{template.Author}</td>
                      <td>{Object.keys(template.competencies).toString()}</td>
                      <td>
                        <Link
                          to={{
                            pathname: "/enterStudentData",
                            state: template
                          }}
                        >
                          <IconButton>
                            <EditIcon button />
                          </IconButton>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            }
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    teacherData: state.firestore.ordered.teachers
      ? state.firestore.ordered.teachers[0]
      : {},
    templates: state.firestore.ordered.templates
      ? state.firestore.ordered.templates
      : []
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect(["templates", "teachers"])
)(Templates);
