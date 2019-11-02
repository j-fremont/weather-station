import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyTemperature from './temperature.react';
import MyHumidity from './humidity.react';
import MyLuminosity from './luminosity.react';
import MyChart from './chart.react';
import MyControls from './controls.react';

export default class MyContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mean: '30m' // Mean interval for InfluxDB readings.
    }
  }
  
  /* The chart component only queries the last 48 values in InfluxDB with interval mean.
   * mean = '10s' : queries the last 8 minutes (useful for tests).
   * mean = '30m' : queries the last day.
   * mean = '1h' : queries the last two days.
   * mean = '3h' : queries the last six days.
   * mean = '15h' : queries the last 30 days.
   */
  
  changeMean = mean => {
    this.setState({
      mean: mean
    });
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="1">
            <MyTemperature />
            <MyHumidity />
            <MyLuminosity />
          </Col>
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
