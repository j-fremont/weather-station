import React from 'react';
import { Media } from 'reactstrap';
import Logo from '../home.png';

const style = {
  'width': '128px',
  'margin-right': '25px'
};

export default class MyMedia extends React.Component {

  modeName = () => {

    switch(this.props.mode) {
      case 'inside':
        return 'Capteurs intérieurs';
      case 'outside':
        return 'Capteurs extérieurs';
      case 'command':
        return 'Mode commande';
      default:
        return 'Mode inconnu';
    }
  }

  render() {

    const mode = this.modeName();

    return (
      <Media>
        <Media left href="#">
          <Media style={style} object src={Logo} alt="Logo" />
        </Media>
        <Media body>
          <Media heading>
            Station météo
          </Media>
          {mode}
        </Media>
      </Media>
    );
  }
};
