import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const config = require('../config');

const Influx = require('influx');

const influx = new Influx.InfluxDB({ // InfluxDB schema
  host: config.influxdb.host,
  database: 'homedb',
  schema: [{
    measurement: 'weather',
    fields: {
       temperature: Influx.FieldType.FLOAT,
       humidity: Influx.FieldType.FLOAT,
       luminosity: Influx.FieldType.FLOAT
    },
    tags: ['sensor']
  }]
});

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
    var points = [];
    influx.query("select mean(temperature) as temperature, mean(humidity) as humidity, mean(luminosity) as luminosity from weather where sensor='" + this.props.mode + "' group by time(" + this.props.mean + ") fill(0) order by desc limit 48").then(results => {
      results.reverse().map(result => {
        points = [...points,
          {
            temperature: result.temperature,
            humidity: result.humidity,
            luminosity: result.luminosity,
            datetime: result.time.toString().split(' GMT')[0]
          }
        ]
      });
      this.setState({
        points: points
      });
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
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
      </ResponsiveContainer>
    );
  };
};
