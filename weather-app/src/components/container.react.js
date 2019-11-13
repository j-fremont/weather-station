import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyMedia from './media.react';
import MyDropdown from './dropdown.react';
import MyContainerSensor from './container.sensor.react';
import MyContainerCommand from './container.command.react';
import axios from "axios";
import io from "socket.io-client";

const config = require('../config');

const socket = io('ws://' + config.server.host + ':' + config.server.port);

export default class MyContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inside',
      mean: '30m',
      last: {
        temperature: 0,
        humidity: 0,
        luminosity: 0
      },
      points: [] // Points for the chart.
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

    this.updateSensors();
    this.updateCharts();

    socket.on('connect', () => {
      console.log("Connected to the server socket...");
    });

    socket.on('sock_temperature', (payload) => { // Subscribe to realtime temperature on web socket.
      if (this.state.mode===payload.sensor) {
        var last = this.state.last;
        last.temperature = payload.value;
        this.setState({
          ...this.state,
          last
        });
      }
    });

    socket.on('sock_humidity', (payload) => {  // Subscribe to realtime humidity on web socket.
      if (this.state.mode===payload.sensor) {
        var last = this.state.last;
        last.humidity = payload.value;
        this.setState({
          ...this.state,
          last
        });
      }
    });

    socket.on('sock_luminosity', (payload) => {  // Subscribe to realtime luminosity on web socket.
      if (this.state.mode===payload.sensor) {
        var last = this.state.last;
        last.luminosity = payload.value;
        this.setState({
          ...this.state,
          last
        });
      }
    });
  }

  changeMode = mode => {
    this.setState({
      ...this.state,
      mode: mode
    }, () => {
      this.updateSensors();
      this.updateCharts();
    });

  }

  changeMean = mean => {
    this.setState({
      ...this.state,
      mean: mean
    }, () => {
      this.updateCharts();
    });

  }

  updateSensors = () => {
    axios.get("http://" + config.server.host + ":" + config.server.port + "/last/" + this.state.mode).then((response) => {
      this.setState({
        ...this.state,
        last: response.data[0]
      });
    });
  }

  updateCharts = () => {
    axios.get("http://" + config.server.host + ":" + config.server.port + "/history/" + this.state.mode + "/" + this.state.mean).then((response) => {
      this.setState({
        ...this.state,
        points: response.data
      });
    });
  }

  currentContainer = () => {
    if (this.state.mode === 'inside' || this.state.mode === 'outside') {
      return (
        <MyContainerSensor
          mode={this.state.mode}
          last={this.state.last}
          points={this.state.points}
          changeMean={this.changeMean} />
        );
    } else {
      return (
        <MyContainerCommand />
      );
    }
  }

  render() {

    var container = this.currentContainer();

    return (
      <Container fluid={true}>
        <Row>
          <Col xs="4">
            <MyMedia mode={this.state.mode}/>
          </Col>
          <Col xs="8">
            <MyDropdown changeMode={this.changeMode} />
          </Col>
        </Row>
        {container}
      </Container>
    );
  }
}
