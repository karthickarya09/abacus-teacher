import React from "react";
import { scaleLinear } from "d3-scale";
import { XYPlot, XAxis, YAxis, HeatmapSeries, LabelSeries } from "react-vis";

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const data = alphabet.reduce((acc, letter1, idx) => {
  return acc.concat(
    alphabet.map((letter2, jdx) => ({
      x: `${letter1}1`,
      y: `${letter2}2`,
      color: (idx + jdx) % Math.floor(jdx / idx) || idx
    }))
  );
}, []);
const { min, max } = data.reduce(
  (acc, row) => ({
    min: Math.min(acc.min, row.color),
    max: Math.max(acc.max, row.color)
  }),
  { min: Infinity, max: -Infinity }
);
export default function LabeledHeatmap(heatMapData, competencies, students) {
    
  const exampleColorScale = scaleLinear()
    .domain([0, 2, 5])
    .range(['#cc3232', '#e7b416', '#2dc937']);
  return (
    <XYPlot
      xType="ordinal"
      xDomain={competencies.map(letter => letter)}
      yType="ordinal"
      yDomain={students}
      margin={50}
      width={1000}
      height={600}
    >
      <XAxis orientation="top" />
      <YAxis />
      <HeatmapSeries
        colorType="literal"
        getColor={d => exampleColorScale(d.color)}
        style={{
          stroke: "white",
          strokeWidth: "2px",
          rectStyle: {
            rx: 10,
            ry: 10
          }
        }}
        className="heatmap-series-example"
        data={heatMapData}
      />
      <LabelSeries
        data={heatMapData}
        labelAnchorX="middle"
        labelAnchorY="baseline"
        getLabel={d => `${d.color}`}
      />
    </XYPlot>
  );
}
