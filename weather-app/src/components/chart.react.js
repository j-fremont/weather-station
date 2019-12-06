import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class MyChart extends React.Component {

  currentLineChart = () => {

    if (['inside','bathroom'].includes(this.props.mode)) {
      return (
        <LineChart
          data={this.props.points}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="datetime"/>
          <YAxis yAxisId="degres" />
          <YAxis yAxisId="percents" orientation="right" />
          <Tooltip/>
          <Line yAxisId="degres" type='monotone' dataKey='temperature' stroke='#154360' />
          <Line yAxisId="percents" type='monotone' dataKey='humidity' stroke='#1e8449' />
        </LineChart>
      );
    } else {
      return (
        <LineChart
          data={this.props.points}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="datetime"/>
          <YAxis yAxisId="degres" />
          <YAxis yAxisId="percents" orientation="right" />
          <Tooltip/>
          <Line yAxisId="degres" type='monotone' dataKey='temperature' stroke='#154360' />
          <Line yAxisId="percents" type='monotone' dataKey='luminosity' stroke='#d4ac0d' />
        </LineChart>
      );
    }
  }

// <Line yAxisId="hpa" type='monotone' dataKey='pressure' stroke='#a93226' />

  render() {

    var lineChart = this.currentLineChart();

    return (
      <ResponsiveContainer width="100%" height={400}>
        {lineChart}
      </ResponsiveContainer>
    );
  };
};
