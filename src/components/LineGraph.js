import React, { Component } from "react";
import {LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip} from 'recharts'

class LineGraph extends Component {
  
  colors=['#8884d8', "#82ca9d", "#BBB56d", "#A2252a", "#FC322B"] 
  
  render() {
    const data = [
        {name: 'Page A', uv: 4000, pv: 2400},
        {name: 'Page B', uv: 3000, pv: 1398},
        {name: 'Page C', uv: 2000, pv: 9800},
        {name: 'Page D', uv: 2780, pv: 3908},
        {name: 'Page E', uv: 1890, pv: 4800},
        {name: 'Page F', uv: 2390, pv: 3800},
        {name: 'Page G',  pv: 4300}
    ];
    let lines=[]
    lines = this.props.labels.map((label, index)=>{
      return (<Line type="monotone" dataKey={label} stroke={this.colors[index]} />)
    })
    return (
      <LineChart
        width={730}
        height={250}
        data={this.props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 6]} />
        <Tooltip />
        <Legend />
        {lines}
      </LineChart>
    );
  }
}

export default LineGraph;
