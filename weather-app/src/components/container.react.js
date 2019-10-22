import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyMedia from './media.react';
import MyDropdown from './dropdown.react';
import MyContainerSensor from './container.sensor.react';
import MyContainerCommand from './container.command.react';

export default class MyContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inside'
    }
  }

  changeMode = mode => {
    this.setState({
      mode: mode
    });
  }

  currentContainer = () => {
    console.log(this.state.mode)
    if (this.state.mode === 'inside' || this.state.mode === 'outside') {
      return (
        <MyContainerSensor
          mode={this.state.mode}
          changeMode={this.changeMode} />
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
