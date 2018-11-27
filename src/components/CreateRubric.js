import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { Table } from "react-bootstrap";

class CreateRubric extends Component {
  state = {
    generated: false,
    invalidRange: false,
    competencies: [],
    labels: [],
    noTitle: false
  };
  style = {
    margin: 20
  };

  generateRubric = () => {
    let lowerBound = document.getElementById("lowerBound").value,
      upperBound = document.getElementById("upperBound").value;
    let labels = new Array(0);
    if(document.getElementById("title").value.length===0){
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
      labels: labels
    });
  };

  addCompetency = () => {
    let competency = { key: "", index : this.state.competencies.length};
    this.state.labels.map(label => {
      competency[label] = "";
    });
    this.setState({ competencies: [...this.state.competencies, competency] });
  };

  handleChange = (e, index) =>{
    let competencies = this.state.competencies;
    let element = e.target.id
    competencies[index][element] = e.target.value
    this.setState({competencies: competencies})
  }
  render() {
    return (
      <div style={this.style}>
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
                    return <th key={"label"+label}>{label}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {this.state.competencies.map(competency => {
                  return (
                    <tr>
                      <td>
                        <TextField
                          key={competency}
                          required
                          id="key"
                          label="Competency Name"
                          multiline
                          margin="normal"
                          value={competency.key}
                          onChange={e=>{
                            this.handleChange(e, competency.index)
                          }}
                        />
                      </td>
                      {this.state.labels.map(label => {
                        return (
                          <td>
                            <TextField
                              key={competency+label}
                              required
                              id={String(label)}
                              label="Meaning"
                              multiline
                              margin="normal"
                              value={competency.label}
                              onChange={e=>{
                                this.handleChange(e, competency.index)
                              }}
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
            <Button variant="outlined" style={{marginLeft: 10, background:"#4caf50"}}>
              Submit Template
            </Button>
            
          </div>
        )}
      </div>
    );
  }
}

export default CreateRubric;
