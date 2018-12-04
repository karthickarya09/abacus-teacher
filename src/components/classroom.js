import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Table } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import { InsertChartOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import LineGraph from "./LineGraph";
import ChipsArray from "./Chip";

class Classroom extends Component {
  state = {
    lineData: {},
    competencies: [],
    years: [],
    graphData: [],
    selectedLabels: []
  };
  selectChip = data => () => {
    let graphData = this.state.graphData;
    const chipData = [...this.state.competencies];
    const chipToHighlight = chipData.indexOf(data);
    let selectedLabels = this.state.selectedLabels;

    let temp = this.state.lineData[data.competency];
    if (chipData[chipToHighlight].selected)
      selectedLabels.splice(selectedLabels.indexOf(data.competency), 1);
    Object.keys(temp).forEach(year => {
      if (chipData[chipToHighlight].selected) {
        delete graphData[this.state.years.indexOf(year)][data.competency];
        console.log(selectedLabels);
      } else {
        if (!selectedLabels.includes(data.competency))
          selectedLabels.push(data.competency);
        graphData[this.state.years.indexOf(year)] = {
          ...graphData[this.state.years.indexOf(year)],
          [data.competency]: this.state.lineData[data.competency][year].score
        };
      }
    });
    chipData[chipToHighlight].selected = !chipData[chipToHighlight].selected;
    this.setState({
      ...this.state,
      competencies: chipData,
      graphData,
      selectedLabels
    });
  };
  componentDidMount() {
    let lineData = {};
    let competencies = new Array();
    let years = new Array(0);
    let graphData = [];
    Object.keys(this.props.classroomData.allCompetencies).forEach(
      competency => {
        competencies.push({ competency: competency, selected: false });
        Object.keys(this.props.classroomData.competencies).forEach(year => {
          if (!years.includes(year)) {
            graphData.push({ name: year });
            years.push(year);
          }
          if (
            this.props.classroomData.competencies[year].hasOwnProperty(
              competency
            )
          ) {
            let temp = lineData.hasOwnProperty(competency)
              ? lineData[competency]
              : {};
            lineData = {
              ...lineData,
              [competency]: {
                ...temp,
                [year]: this.props.classroomData.competencies[year][competency]
              }
            };
          }
        });
      }
    );
    this.setState({
      lineData,
      competencies,
      years,
      graphData
    });
  }
  render() {
    let loading = true;
    if (this.props.students.length > 0) {
      loading = false;
    }
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
        {loading && <Loading />}
        {!loading && (
          <div>
            <ChipsArray
              selectChip={this.selectChip}
              chipData={this.state.competencies}
            />
            <div style={{ display:'flex', justifyContent:'center', flexShrink: 1, flexWrap: 'wrap'}}>
              <LineGraph
                data={this.state.graphData}
                labels={this.state.selectedLabels}
                color={this.makeColor}
              />
            </div>

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
                        <Link
                          to={{ pathname: "/studentAnalysis", state: student }}
                        >
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
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
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
