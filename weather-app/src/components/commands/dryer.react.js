import React from 'react';
import { Label } from 'reactstrap';
import MyAlert from './alert.react';
import MyFormCommand from './form.react';

export default class MyCommandDryer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activated: false,
      command: "off"
    }
  }

  alert = () => {
    if (this.state.activated) {
      return {
        color: "danger",
        message: "Sèche-serviette activé"
      };
    } else {
      return {
        color: "success",
        message: "Sèche-serviette desactivé"
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
        <Label>Séche-serviette</Label>
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
