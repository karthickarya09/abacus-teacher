import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import { compose, bindActionCreators } from "redux";
import { getStudents, updateStudentRubrics } from "../actions/studentActions";
import { Table } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class GradeStudents extends Component {
  state = {
    classID: "Lol",
    studentData: [],
    studentRubricData: {},
    dataError: false,
  };

  handleChange = e => {
    this.setState({ classID: e.target.value });
    this.props.getStudents(e.target.value);
  };

  handleScoreChanges = e => {
    let studentID = e.target.name.split(",")[0];
    let competency = e.target.name.split(",")[1];
    let score = e.target.value;
    this.setState({
      studentRubricData: {
        ...this.state.studentRubricData,
        [studentID]: {
          ...this.state.studentRubricData[studentID],
          [competency]: score
        }
      }
    });
  };

  handleSubmit = () => {
    let errors = false;
    this.props.studentData.forEach(student => {
      Object.keys(this.props.rubricData.competencies).forEach(competency => {
        if (!this.state.studentRubricData.hasOwnProperty(student.id)) {
          errors = true;
        } else if (
          !this.state.studentRubricData[student.id].hasOwnProperty(competency)
        ) {
          errors = true;
        }
      });
    });
    if (errors) {
      this.setState({
        dataError: true
      });
      return;
    }
    this.setState({
      dataError: false
    });
    this.props.updateStudentRubrics(
      document.getElementById('title').value,
      this.state.studentRubricData,
      this.props,
      this.state.classID
    );
    this.props.history.push('/Rubrics')
  };

  render() {
    let scales = [];
    if (
      this.props.rubricData.competencies &&
      this.props.studentData.length > 0
    ) {
      let temp = {};
      this.props.studentData.map(student => {
        temp[student.id] = { competencies: this.props.rubricData.competencies };
      });
      scales = Object.keys(
        this.props.rubricData.competencies[
          Object.keys(this.props.rubricData.competencies)[0]
        ]
      );
    }
    return (
      <div style={{ margin: 20 }}>
        <h4>Select Classroom</h4>
        <div>
          <FormControl>
            <InputLabel htmlFor="age-helper">Classroom</InputLabel>
            <Select
              value={this.state.classID}
              input={<Input name="age" id="age-helper" />}
              onChange={this.handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.props.classRoomData.map(classroom => {
                return this.props.teacherData.classrooms.includes(
                  classroom.id
                ) ? (
                  <MenuItem value={classroom.id}>
                    {classroom.Grade + classroom.Section}
                  </MenuItem>
                ) : (
                  ""
                );
              })}
            </Select>
            <FormHelperText>
              Select the classroom to fill the rubrics
            </FormHelperText>
          </FormControl>
          {this.props.studentData.length > 0 &&
            this.props.rubricData.competencies && (
              <div style={{ marginTop: 20 }}>
                {this.state.dataError && (
                  <div style={{ color: "red" }}>
                    Make Sure you have filled data for all students and
                    competencies
                  </div>
                )}
                <TextField
                  required
                  id="title"
                  label="Title"
                  helperText="Enter the Title of the Assessment"
                  margin="normal"
                />
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      {Object.keys(this.props.rubricData.competencies).map(
                        competency => {
                          return <th>{competency}</th>;
                        }
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.studentData.map(student => {
                      return (
                        <tr key={student.id}>
                          <td>{student.Name}</td>
                          {Object.keys(this.props.rubricData.competencies).map(
                            competency => {
                              return (
                                <td>
                                  <FormControl>
                                    <Select
                                      competency={competency.key}
                                      onChange={this.handleScoreChanges}
                                      value={
                                        this.state.studentRubricData[student.id]
                                          ? this.state.studentRubricData[
                                              student.id
                                            ][competency]
                                          : ""
                                      }
                                      input={
                                        <Input
                                          name={student.id + "," + competency}
                                          id="name-error"
                                        />
                                      }
                                    >
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      {scales.map(scale => {
                                        return (
                                          <MenuItem value={parseInt(scale)}>
                                            {scale}
                                          </MenuItem>
                                        );
                                      })}
                                    </Select>
                                  </FormControl>
                                </td>
                              );
                            }
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Button
                  variant="outlined"
                  style={{ marginLeft: 10, background: "#4caf50" }}
                  onClick={this.handleSubmit}
                >
                  Submit Template
                </Button>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    rubricData: ownProps.location.state,
    classRoomData: state.firestore.ordered.classrooms
      ? state.firestore.ordered.classrooms
      : [],
    teacherData: state.firestore.ordered.teachers
      ? state.firestore.ordered.teachers[0]
      : {},
    studentData: state.studentData.studentData
      ? state.studentData.studentData
      : [],
    rubricData: state.firestore.ordered.templates
      ? state.firestore.ordered.templates[0]
      : {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudents: bindActionCreators(getStudents, dispatch),
    updateStudentRubrics: bindActionCreators(updateStudentRubrics, dispatch)
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(["teachers", "classrooms", "templates"])
)(GradeStudents);
