import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export default class MyControls extends React.Component {

  /* '30m' : queries the last day. '10s' for tests.
   * '1h' : queries the last two days. '30s' for tests.
   * '3h' : queries the last six days. '1m' for tests.
   * '15h' : queries the last 30 days. '2m' for tests.
   */

  render() {
    return (
      <div>
        <ButtonGroup>
          <Button color="secondary" onClick={() => this.props.changeMean('30m')}>1 jour</Button> 
          <Button color="secondary" onClick={() => this.props.changeMean('1h')}>2 jours</Button>
          <Button color="secondary" onClick={() => this.props.changeMean('3h')}>6 jours</Button>
          <Button color="secondary" onClick={() => this.props.changeMean('15h')}>30 jours</Button>
        </ButtonGroup>
      </div>
    );
  };
};
