import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CustomizedTable from "./List";
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from "react-router-dom";

class RubricsPage extends Component {
  handleClick = event => {
    this.setState({ anchorEl: !this.state.anchorEl });
  };
  state = {
    anchorEl: false,
    data: [
      {
        id: 1,
        name: "Rubrics 1",
        dateCreated: "11/09/2018",
        lastModified: "11/20/2018"
      },
      {
        id: 1,
        name: "Rubrics 1",
        dateCreated: "11/09/2018",
        lastModified: "11/20/2018"
      },
      {
        id: 1,
        name: "Rubrics 1",
        dateCreated: "11/09/2018",
        lastModified: "11/20/2018"
      }
    ]
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div style={{ padding: 10 }}>
        <CustomizedTable data={this.state.data} />
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
              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={this.handleClick}
              >
                Use Existing Template
              </Button>
              <Link to="/createRubric">
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  onClick={this.handleClick}
                  style={{ marginTop: 6 }}
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

export default RubricsPage;
