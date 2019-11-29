import React from 'react';
import { Label } from 'reactstrap';
import MyAlert from './alert.react';
import MyFormCommand from './form.react';

export default class MyCommandWater extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activated: true,
      command: "on"
    }
  }

  alert = () => {
    if (this.state.activated) {
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

  setOn = () => {
    var state = this.state;
    state.command = "on";
    this.setState({
      state
    });
  }

  setOff = () => {
    var state = this.state;
    state.command = "off";
    this.setState({
      state
    });
  }

  setAuto = () => {
    var state = this.state;
    state.command = "auto";
    this.setState({
      state
    });
  }

  onFormSubmit = () => {

  }

  render() {

    const alert = this.alert();

    const labels = {
      on: "Marche",
      off: "Arrêt",
      auto: "Automatique"
    };

    return (
      <div>
        <Label>Arrosage</Label>
        <MyAlert
          color={alert.color}
          message={alert.message} />
        <MyFormCommand
          command={this.state.command}
          labels={labels}
          setOn={this.setOn}
          setOff={this.setOff}
          setAuto={this.setAuto}
          onFormSubmit={this.onFormSubmit} />
      </div>
    );
  }
}
