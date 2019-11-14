import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import MyForm from './form.react';
import MyAlerts from './alerts.react';

export default class MyContainerCommand extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gate: true,
      water: false,
      treshold: 50
    }
  }

  toggleGate = () => {
    this.setState({
      ...this.state,
      gate: !this.state.gate
    });
  }

  toggleWater = () => {
    this.setState({
      ...this.state,
      water: !this.state.water
    });
  }

  changeTreshold = (event) => {
    this.setState({
      ...this.state,
      treshold: event.target.value
    });
  }

  gateAlerts = () => {
    if (this.state.gate) {
      return {
        color: "danger",
        message: "Porte ouverte"
      };
    } else {
      return {
        color: "success",
        message: "Porte fermée"
      };
    }
  }

  waterAlerts = () => {
    if (this.state.water) {
      return {
        color: "danger",
        message: "Arrosage activé"
      };
    } else {
      return {
        color: "success",
        message: "Arrosage desactivé"
      };
    }
  }

  render() {

    const gate = this.gateAlerts();
    const water = this.waterAlerts();

    return (
      <Container fluid={true}>
        <Row>
          <Col xs="3">
            <MyForm
              gate={this.state.gate}
              water={this.state.water}
              treshold={this.state.treshold}
              toggleGate={this.toggleGate}
              toggleWater={this.toggleWater}
              changeTreshold={this.changeTreshold} />
          </Col>
          <Col xs="3">
            <MyAlerts
              gate={gate}
              water={water} />
          </Col>
          <Col xs="6" />
        </Row>
      </Container>
    );
  }
}
