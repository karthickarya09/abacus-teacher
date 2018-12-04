import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import LineGraph from "./LineGraph";
import ChipsArray from "./Chip";

class Student extends Component {
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
    Object.keys(this.props.studentData.allCompetencies).forEach(competency => {
      competencies.push({ competency: competency, selected: false });
      Object.keys(this.props.studentData.competencies).forEach(year => {
        if (!years.includes(year)) {
          graphData.push({ name: year });
          years.push(year);
        }
        if (
          this.props.studentData.competencies[year].hasOwnProperty(competency)
        ) {
          let temp = lineData.hasOwnProperty(competency)
            ? lineData[competency]
            : {};
          lineData = {
            ...lineData,
            [competency]: {
              ...temp,
              [year]: this.props.studentData.competencies[year][competency]
            }
          };
        }
      });
    });
    this.setState({
      lineData,
      competencies,
      years,
      graphData
    });
  }

  render() {
    let student = this.props.studentData;
    return (
      <div
        style={{
          margin: 20
        }}
      >
        <h4>{student.Name}, {student.classId}</h4>
        <h4>{student.acdYear}</h4>

        {Object.keys(this.state.lineData).length > 0 && (
          <div>
            <ChipsArray
              selectChip={this.selectChip}
              chipData={this.state.competencies}
            />
            <div style={{ display:'flex', justifyContent:'center'}}>
              <LineGraph
                data={this.state.graphData}
                labels={this.state.selectedLabels}
              />
            </div>
          </div>
        )}
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
