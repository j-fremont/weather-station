import React from 'react';
import { Container, Row, Col, Form, FormGroup, Label, CustomInput, Button } from 'reactstrap';

export default class MyContainerConfig extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dryer: {
        temperature: 20,
        period1: {
          activated: true,
          temperature: 25,
          start: "06:00",
          end: "07:30"
        },
        period2: {
          activted: false,
          temperature: undefined,
          start: undefined,
          end: undefined
        }
      },
      door: {
        luminosity: 50
      }
    }
  }

  changeDryerTemperature = (event) => {
    var state = this.state;
    state.dryer.temperature = event.target.value;
    this.setState({
      state
    });
  }

  changeDoorLuminosity = (event) => {
    var state = this.state;
    state.door.luminosity = event.target.value;
    this.setState({
      state
    });
  }

  togglePeriod1 = () => {
    var state = this.state;
    state.dryer.period1.activated = !this.state.dryer.period1.activated;
    this.setState({
      state
    });
  }

  togglePeriod2 = () => {
    var state = this.state;
    state.dryer.period2.activated = !this.state.dryer.period2.activated;
    this.setState({
      state
    });
  }

  onFormSubmit = () => {

  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs="4">
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup>
                <Label for="slider_dryer_temperature">Température activation sèche-serviette (hors périodes) : {this.state.dryer.temperature}°</Label>
                <CustomInput type="range" id="slider_dryer_temperature" name="customRange" min={[15]} max={[35]} value={this.state.dryer.temperature} onChange={this.changeDryerTemperature} />
              </FormGroup>
              <FormGroup inline>
                <CustomInput type="switch" id="checkbox_dryer_period1" name="customSwitch" checked={this.state.dryer.period1.activated} onClick={this.togglePeriod1} label="Période 1" />
              </FormGroup>
              <FormGroup inline>
                <CustomInput type="switch" id="checkbox_dryer_period2" name="customSwitch" checked={this.state.dryer.period2.activated} onClick={this.togglePeriod2} label="Période 2" />
              </FormGroup>
              <FormGroup>
                <Label for="slider_door_luminosity">Luminosité fermeture porte : {this.state.door.luminosity}%</Label>
                <CustomInput type="range" id="slider_door_luminosity" name="customRange" min={[0]} max={[100]} value={this.state.door.luminosity} onChange={this.changeDoorLuminosity} />
              </FormGroup>
              <Button type="submit">Envoyer</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
