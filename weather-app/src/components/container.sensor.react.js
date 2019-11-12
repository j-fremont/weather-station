import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyTemperature from './temperature.react';
import MyHumidity from './humidity.react';
import MyLuminosity from './luminosity.react';
import MyChart from './chart.react';
import MyControls from './controls.react';
import io from "socket.io-client";

const config = require('../config');

const socket = io('ws://' + config.server.host + ':' + config.server.port);

export default class MyContainerSensor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mean: '30m', // Mean interval for InfluxDB readings.
      last: { // Last receives from web sockets.
        temperature: {
          inside: 0,
          outside:0
        },
        humidity: {
          inside: 0,
          outside:0
        },
        luminosity: {
          outside: 0
        }
      }
    }
  }

  /* The chart component only queries the last 48 values in InfluxDB with interval mean.
   * mean = '10s' : queries the last 8 minutes (useful for tests).
   * mean = '30m' : queries the last day.
   * mean = '1h' : queries the last two days.
   * mean = '3h' : queries the last six days.
   * mean = '15h' : queries the last 30 days.
   */

  componentDidMount() {

    socket.on('connect', () => {
      console.log("Connected to the server socket...");
    });

    socket.on('sock_temperature_inside', (payload) => {
      var state = this.state;
      state.last.temperature.inside=payload;
      this.setState({
        state
      });
    });
    
    socket.on('sock_temperature_outside', (payload) => {
      var state = this.state;
      state.last.temperature.outside=payload;
      this.setState({
        state
      });
    });
    
    socket.on('sock_humidity_inside', (payload) => {
      var state = this.state;
      state.last.humidity.inside=payload;
      this.setState({
        state
      });
    });
    
    socket.on('sock_humidity_outside', (payload) => {
      var state = this.state;
      state.last.humidity.outside=payload;
      this.setState({
        state
      });
    });    
    
    socket.on('sock_luminosity_outside', (payload) => {
      var state = this.state;
      state.last.luminosity.outside=payload;
      this.setState({
        state
      });
    });          
    
  };

  changeMean = mean => {
    this.setState({
      mean: mean
    });
  }

  currentSensors = () => {
    if (this.props.mode === 'inside') {
      return (
        <Col xs="1">
          <MyTemperature value={this.state.last.temperature.inside} />
          <MyHumidity value={this.state.last.humidity.inside} />
        </Col>
      );
    } else {
      return (
        <Col xs="1">
          <MyTemperature value={this.state.last.temperature.outside} />
          <MyHumidity value={this.state.last.humidity.outside} />
          <MyLuminosity value={this.state.last.luminosity.outside} />
        </Col>
      );
    }
  }

  render() {

    var sensors = this.currentSensors();

    return (
      <Container fluid={true}>
        <Row>
          {sensors}
          <Col xs="11">
            <Row>
              <MyChart
                mean={this.state.mean}
                mode={this.props.mode} />
            </Row>
            <Row className="d-flex justify-content-center">
              <MyControls changeMean={this.changeMean} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
