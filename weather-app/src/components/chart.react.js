import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import io from "socket.io-client";

const Influx = require('influx');

const socket = io('localhost:9000');

/*
 * Schémas InfluxDB
 *
 */

const influx = new Influx.InfluxDB({
  host: 'localhost',
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
  
    setInterval(() => {
      var points = [];
      influx.query("select mean(temperature) as temperature, mean(humidity) as humidity, mean(luminosity) as luminosity from weather where sensor='room1' group by time(" + this.props.mean + ") fill(0) order by desc limit 48").then(results => {
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
    
    //}, 600000); // 10 minutes
    }, 10000); // 10 secondes
  
/*
    var temperature, humidity, luminosity;

    socket.on('connect', () => {
      console.log("Connected to the server socket...");

      setInterval(() => {
        var points = [...this.state.points,
          {
            temperature: Number(temperature),
            humidity: Number(humidity),
            luminosity: Number(luminosity),
            datetime: new Date().toLocaleString()
          }];
          
        if (points.length > 144) { // Points 10 minutes sur 24 heures
          points.shift();
        }
        
        this.setState({
          points: points
        });        
        
      //}, 600000); // 10 minutes
      }, 10000); // 10 secondes

    });

    socket.on('sock_temperature', (payload) => {
      temperature=payload;
    });
    socket.on('sock_humidity', (payload) => {
      humidity=payload;
    });
    socket.on('sock_luminosity', (payload) => {
      luminosity=payload;
    });
*/

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
