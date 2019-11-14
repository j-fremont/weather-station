import React from 'react';
import { Alert, Label } from 'reactstrap';

export default class MyAlerts extends React.Component {

  render() {

    return (
      <div>
      <Label>Etats</Label>
        <Alert color={this.props.gate.color}>
          {this.props.gate.message}
        </Alert>
        <Alert color={this.props.water.color}>
          {this.props.water.message}
        </Alert>
      </div>
    );
  }
}
