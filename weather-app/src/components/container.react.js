import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyMedia from './media.react';
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

    const mean = this.state.mean;

    return (
      <Container fluid={true}>
        <Row>
          <Col xs="4">
            <MyMedia />
          </Col>
          <Col xs="8">
            <MyControls changeMean={this.changeMean} />
          </Col>
        </Row>
        <Row>
          <Col xs="1">
            <MyTemperature />
            <MyHumidity />
            <MyLuminosity />
          </Col>
          <Col xs="11">
            <MyChart mean={mean}/>
          </Col>
        </Row>
      </Container>
    );
  }
}
