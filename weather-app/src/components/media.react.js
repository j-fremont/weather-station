import React from 'react';
import { Media } from 'reactstrap';
import Logo from '../home.png';

const style = {
  'width': '128px',
  'margin-right': '25px'
};

const MyMedia = () => {
  return (
    <Media>
      <Media left href="#">
        <Media style={style} object src={Logo} alt="Logo" />
      </Media>
      <Media body>
        <Media heading>
          Weather Station
        </Media>
        Pour la maison...
      </Media>
    </Media>
  );
};

export default MyMedia;
