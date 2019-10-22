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
      mean: '10s'
    }
  }

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
