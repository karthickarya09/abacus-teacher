import React, { Component } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip
} from "recharts";

class Radarchart extends Component {
  colors = ["#8884d8", "#82ca9d", "#BBB56d", "#A2252a", "#FC322B"];
  

  render() {
    return (
      <div>
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={800}
          height={600}
          data={this.props.data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="competency" />
          <PolarRadiusAxis />
          <Radar
            dataKey="score"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </div>
    );
  }
}

export default Radarchart;
