import React, { Component } from "react";
import {LineChart, CartesianGrid, XAxis, YAxis, Legend, Line, Tooltip} from 'recharts'

class LineGraph extends Component {
  
  colors=['#8884d8', "#82ca9d", "#BBB56d", "#A2252a", "#FC322B"] 
  
  render() {
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
