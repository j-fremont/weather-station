import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyTemperature from './temperature.react';
import MyHumidity from './humidity.react';
import MyLuminosity from './luminosity.react';
import MyChart from './chart.react';
import MyControls from './controls.react';
import io from "socket.io-client";
import axios from "axios";

const config = require('../config');

const socket = io('ws://' + config.server.host + ':' + config.server.port);

export default class MyContainerSensor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mean: '30m', // Mean interval for InfluxDB readings.
      last: { // Last receives from web sockets.
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

/*
    axios.get("http://" + config.server.host + ":" + config.server.port + "/last/" + this.props.mode).then((response) => {
      this.setState({
        points: response.data
      });
    });
*/

    socket.on('connect', () => {
      console.log("Connected to the server socket...");
    });

    socket.on('sock_temperature_inside', (payload) => {
      if (this.props.mode==='inside') {
        var state = this.state;
        state.last.temperature=payload;
        this.setState({
          state
        });
      }
    });

    socket.on('sock_temperature_outside', (payload) => {
      if (this.props.mode==='outside') {
        var state = this.state;
        state.last.temperature=payload;
        this.setState({
          state
        });
      }
    });

    socket.on('sock_humidity_inside', (payload) => {
      if (this.props.mode==='inside') {
        var state = this.state;
        state.last.humidity=payload;
        this.setState({
          state
        });
      }
    });

    socket.on('sock_humidity_outside', (payload) => {
      if (this.props.mode==='outside') {
        var state = this.state;
        state.last.humidity=payload;
        this.setState({
          state
        });
      }
    });

    socket.on('sock_luminosity_outside', (payload) => {
      if (this.props.mode==='outside') {
        var state = this.state;
        state.last.luminosity=payload;
        this.setState({
          state
        });
      }
    });

    currentPoints();

    lastSensors();

    setInterval(() => {
      currentPoints();
    }, config.interval.query);


  };

  changeMean = mean => {
    this.setState({
      mean: mean
    });
  }

  currentPoints = () => {
    axios.get("http://" + config.server.host + ":" + config.server.port + "/history/" + this.props.mode + "/" + this.state.mean).then((response) => {
      var state = this.state;
      state.points = response.data;
      this.setState({
        state
      });
    });
  }

  lastSensors = () => {
    axios.get("http://" + config.server.host + ":" + config.server.port + "/last/" + this.props.mode).then((response) => {
      var state = this.state;
      state.last = response.data;
      this.setState({
        state
      });
    });
  }

  currentSensors = () => {
    if (this.props.mode === 'inside') {
      return (
        <Col xs="1">
          <MyTemperature value={this.state.last.temperature} />
          <MyHumidity value={this.state.last.humidity} />
        </Col>
      );
    } else {
      return (
        <Col xs="1">
          <MyTemperature value={this.state.last.temperature} />
          <MyHumidity value={this.state.last.humidity} />
          <MyLuminosity value={this.state.last.luminosity} />
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
              <MyChart points={this.state.points} />
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
