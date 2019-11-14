import React from 'react';
import { Button, CustomInput, Form, FormGroup, Label } from 'reactstrap';

export default class MyForm extends React.Component {
  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
  }

  render() {

    return (
      <Form onSubmit={this.onFormSubmit}>
        <FormGroup>
          <Label for="checkboxes">Commandes</Label>
          <div>
            <CustomInput type="switch" id="checkbox_1" name="customSwitch" checked={this.props.gate} onClick={this.props.toggleGate} label="Ouvrir la porte" />
            <CustomInput type="switch" id="checkbox_2" name="customSwitch" checked={this.props.water} onClick={this.props.toggleWater} label="Activer l'arrosage" />
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="treshold">Luminosité d'ouverture de la porte : {this.props.treshold}%</Label>
          <CustomInput type="range" id="treshold_1" name="customRange" value={this.props.treshold} onChange={this.props.changeTreshold} />
        </FormGroup>
        <Button type="submit">Envoyer</Button>
      </Form>
    );
  }
}
