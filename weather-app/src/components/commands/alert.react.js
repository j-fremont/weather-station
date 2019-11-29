import React from 'react';
import { Alert } from 'reactstrap';

export default class MyAlert extends React.Component {

  render() {

    return (
      <div>
        <Alert color={this.props.color}>
          {this.props.message}
        </Alert>
      </div>
    );
  }
}
