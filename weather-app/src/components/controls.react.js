import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export default class MyControls extends React.Component {
  render() {
    return (
      <div>
        <ButtonGroup>
          <Button color="secondary" onClick={() => this.props.changeMean('10s')}>1 jour</Button>
          <Button color="secondary" onClick={() => this.props.changeMean('30s')}>2 jours</Button>
          <Button color="secondary" onClick={() => this.props.changeMean('1m')}>6 jours</Button>
          <Button color="secondary" onClick={() => this.props.changeMean('2m')}>30 jours</Button>
        </ButtonGroup>
      </div>
    );
  };
};
