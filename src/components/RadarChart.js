import React, { Component } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

class Radarchart extends Component {
  colors = ["#8884d8", "#82ca9d", "#BBB56d", "#A2252a", "#FC322B"];
  

  render() {
    const data = [
        { competency: 'Math', score: 120 },
        { competency: 'Chinese', score: 98 },
        { competency: 'English', score: 86},
        
    ];
    return (
      <div>
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={600}
          height={500}
          data={this.props.data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="competency" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="score"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </div>
    );
  }
}

export default Radarchart;
