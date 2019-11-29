import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyCommandWater from './commands/water.react';
import MyCommandDryer from './commands/dryer.react';
import MyCommandGate from './commands/gate.react';

export default class MyContainerCommand extends React.Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="2">
            <MyCommandWater />
          </Col>
          <Col xs="2">
            <MyCommandDryer />
          </Col>
          <Col xs="2">
            <MyCommandGate />
          </Col>
        </Row>
      </Container>
    );
  }
}
