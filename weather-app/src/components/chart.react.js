import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from "axios";

const config = require('../config');

export default class MyChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      points: []
    }
  }

  componentDidMount() {
    this.getPoints();
    setInterval(() => {
      this.getPoints();
    }, config.interval.query);
  };

  getPoints() {
    axios.get("http://" + config.server.host + ":" + config.server.port + "/history/" + this.props.mode + "/" + this.props.mean).then((response) => {
      this.setState({
        points: response.data
      });
    });
  };
  
  currentLineChart = () => {
    if (this.props.mode === 'inside') {
      return (
        <LineChart
          data={this.state.points}
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
          data={this.state.points}
          margin={{top: 10, right: 30, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="datetime"/>
          <YAxis yAxisId="degres" />
          <YAxis yAxisId="percents" orientation="right" />
          <Tooltip/>
          <Line yAxisId="degres" type='monotone' dataKey='temperature' stroke='#154360' />
          <Line yAxisId="percents" type='monotone' dataKey='humidity' stroke='#1e8449' />
          <Line yAxisId="percents" type='monotone' dataKey='luminosity' stroke='#d4ac0d' />
        </LineChart>
      );
    }
  }  

  render() {
  
    var lineChart = this.currentLineChart();
  
    return (
      <ResponsiveContainer width="100%" height={400}>
        {lineChart}
      </ResponsiveContainer>
    );
  };
};
