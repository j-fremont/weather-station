import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyTemperature from './sensors/temperature.react';
import MyHumidity from './sensors/humidity.react';
import MyLuminosity from './sensors/luminosity.react';
import MyPressure from './sensors/pressure.react';
import MyChart from './chart.react';
import MyControls from './controls.react';

export default class MyContainerSensor extends React.Component {

  currentSensors = () => {

    if (['inside','bathroom'].includes(this.props.mode)) {
      return (
        <Col xs="1">
          <MyTemperature value={this.props.last.temperature} />
          <MyHumidity value={this.props.last.humidity} />
        </Col>
      );
    } else {
      return (
        <Col xs="1">
          <MyTemperature value={this.props.last.temperature} />
          <MyLuminosity value={this.props.last.luminosity} />
          <MyPressure value={this.props.last.pressure} />
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
                mode={this.props.mode}
                points={this.props.points} />
            </Row>
            <Row className="d-flex justify-content-center">
              <MyControls changeMean={this.props.changeMean} />
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
