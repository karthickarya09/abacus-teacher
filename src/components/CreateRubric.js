import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { Table } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import addTemplate from '../actions/rubricActions'

class CreateRubric extends Component {
  state = {
    generated: false,
    invalidRange: false,
    competencies: [],
    labels: [],
    noTitle: false,
    teacherData : this.props.teacherData,
    title: ''
  };

  generateRubric = () => {
    let lowerBound = document.getElementById("lowerBound").value,
      upperBound = document.getElementById("upperBound").value,
      title = document.getElementById("title").value;
    let labels = new Array(0);
    if (title.length === 0) {
      this.setState({ noTitle: true });
      return;
    }
    this.setState({ noTitle: false });
    if (lowerBound > upperBound) {
      this.setState({ invalidRange: true });
      return;
    }
    this.setState({ invalidRange: false });
    for (let i = lowerBound; i <= upperBound; i++) {
      labels.push(i);
    }
    this.setState({
      generated: true,
      title: document.getElementById("title").value,
      lowerBound: Number(lowerBound),
      upperBound: Number(upperBound),
      labels: labels,
      title
    });
  };

  addCompetency = () => {
    let competency = { key: "", index: this.state.competencies.length };
    this.state.labels.map(label => {
      competency[label] = "";
    });
    this.setState({ competencies: [...this.state.competencies, competency] });
  };

  handleChange = (e, index) => {
    let competencies = this.state.competencies;
    let element = e.target.id;
    competencies[index][element] = e.target.value;
    this.setState({ competencies: competencies });
  };

  handleSubmit = () => {
    let competencies = this.state.competencies
    this.state.competencies.map((competency, index)=>{
      this.state.labels.map(label=>{
        competencies[index][label] = document.getElementById(String(competency.key+label)).value
      })
    })
    this.setState({
      ...this.state,
      competencies
    })
    this.props.addTemplate(this.state)
    this.props.history.push({
      pathname:'/enterStudentData',
      state: this.state
    })
  }
  render() {
    return (
      <div
        style={{
          margin: 20
        }}
      >
        <h1>Create Rubric</h1>
        <TextField
          required
          id="title"
          label="Title"
          helperText="Enter the Title of the Rubric"
          margin="normal"
          error={this.state.noTitle}
        />
        <p>
          {" "}
          Select Range of scale{" "}
          {this.state.invalidRange ? (
            <div style={{ color: "red" }}>
              Lower Bound should be less than Upper Bound
            </div>
          ) : (
            ""
          )}
        </p>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 15 }}>
            <TextField
              required
              error={this.state.invalidRange}
              id="lowerBound"
              label="Lower Bound"
              value={this.state.age}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <FormHelperText>Lower Bound of the Scale</FormHelperText>
          </div>
          <div style={{ marginRight: 15 }}>
            <TextField
              required
              error={this.state.invalidRange}
              id="upperBound"
              label="Upper Bound"
              value={this.state.age}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <FormHelperText>Upper Bound of the Scale</FormHelperText>
          </div>
        </div>
        <div>
          <Button
            variant="contained"
            style={{ marginTop: 20, background: "#2196f3", color: "#ffffff" }}
            onClick={this.generateRubric}
          >
            {this.state.generated ? "Regenerate Template" : "Generate template"}
          </Button>
        </div>
        {this.state.generated && (
          <div style={{ marginTop: 10 }}>
            <Table responsive>
              <thead>
                <tr>
                  <th key="competencyLabel">Competencies</th>
                  {this.state.labels.map(label => {
                    return <th key={"label" + label}>{label}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {this.state.competencies.map(competency => {
                  return (
                    <tr key={competency}>
                      <td>
                        <TextField
                          required
                          id="key"
                          label="Competency Name"
                          multiline
                          margin="normal"
                          value={competency.key}
                          onChange={e => {
                            this.handleChange(e, competency.index);
                          }}
                        />
                      </td>
                      {this.state.labels.map(label => {
                        return (
                          <td>
                            <TextField
                              key={competency.key + label}
                              required
                              id={String(competency.key+label)}
                              label="Meaning"
                              multiline
                              margin="normal"
                              
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button variant="outlined" onClick={this.addCompetency}>
              Add Competency
            </Button>
            <Button
              variant="outlined"
              style={{ marginLeft: 10, background: "#4caf50" }}
              onClick={this.handleSubmit}
            >
              Submit Assessment
            </Button>
          </div>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    addTemplate: bindActionCreators(addTemplate, dispatch)
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    teacherData: state.firestore.ordered.teachers? state.firestore.ordered.teachers[0]:{}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRubric);