import React, { Component } from "react";
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalBarSeries,
  RadarChart
} from "react-vis";

class StackedBarGraph extends Component {
  render() {
    return (
      <XYPlot stackBy="y" xDomain={[0, 8]} yDomain={[0, 50]}>
        <VerticalBarSeries
          cluster="stack 1"
          data={[
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 9.073434275269125
            },
            {
              x: 2,
              y: 10.729278525942364
            },
            {
              x: 3,
              y: 9.58370085814329
            },
            {
              x: 4,
              y: 9.680755164648644
            },
            {
              x: 5,
              y: 11.457737642229626
            },
            {
              x: 6,
              y: 9.187162784802437
            },
            {
              x: 7,
              y: 7.885935033689703
            },
            {
              x: 8,
              y: 7.8690384879457405
            }
          ]}
          style={{}}
        />
        <VerticalBarSeries
          cluster="stack 1"
          data={[
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 10.107522631577238
            },
            {
              x: 2,
              y: 10.869502683574556
            },
            {
              x: 3,
              y: 9.930228937978127
            },
            {
              x: 4,
              y: 8.99979440075197
            },
            {
              x: 5,
              y: 7.868627095771605
            },
            {
              x: 6,
              y: 7.438879848707589
            },
            {
              x: 7,
              y: 7.8451386751930485
            },
            {
              x: 8,
              y: 7.396840046301457
            }
          ]}
          style={{}}
        />
        <VerticalBarSeries
          cluster="stack 1"
          data={[
            {
              x: 0,
              y: 10
            },
            {
              x: 1,
              y: 7.8335797690300915
            },
            {
              x: 2,
              y: 8.506928444643084
            },
            {
              x: 3,
              y: 8.473899326732935
            },
            {
              x: 4,
              y: 10.561262219183273
            },
            {
              x: 5,
              y: 10.85016803573836
            },
            {
              x: 6,
              y: 10.63864180200365
            },
            {
              x: 7,
              y: 11.921257950288563
            },
            {
              x: 8,
              y: 13.391933938955008
            }
          ]}
          style={{}}
        />
      </XYPlot>
    );
  }
}

export default StackedBarGraph