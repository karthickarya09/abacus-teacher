import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

class CreateRubric extends Component {
  state = {
    generated: false,
    invalidRange: false
  };

  generateRubric = () => {
    let lowerBound = document.getElementById("lowerBound").value,
    upperBound = document.getElementById("upperBound").value;
    if (lowerBound > upperBound) {
      this.setState({ invalidRange: true });
      return;
    }
    this.setState({
      generated: true,
      title: document.getElementById("title").value,
      lowerBound: Number(lowerBound),
      upperBound: Number(upperBound)
    });
  };

  render() {
    return (
      <div style={{ margin: 20 }}>
        <h1>Create Rubric</h1>
        <TextField
          id="title"
          label="Title"
          helperText="Enter the Title of the Rubric"
          margin="normal"
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
            Generate template
          </Button>
        </div>
      </div>
    );
  }
}

export default CreateRubric;
