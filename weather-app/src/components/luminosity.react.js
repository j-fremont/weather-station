import React from 'react';
import io from "socket.io-client";

const config = require('../config');

const socket = io(config.server.host + ':' + config.server.port);

export default class MyLuminosity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      luminosity: undefined
    }
  }

  componentDidMount() {

    socket.on('connect', () => {
      console.log("Connected to the server socket...");
    });

    socket.on('sock_luminosity', (payload) => {
      this.setState({
        luminosity: payload
      });
    })
  };

  render() {
    return (
      <div class='my_toast'>
        <svg
          width={120}
          height={100}>
          <g>
            <rect
              x={0}
              y={0}
              rx={5}
              ry={5}
              width={120}
              height={100}
              fill={'#9a7d0a'}/>
            <text
              x={10}
              y={30}
              fill={'white'}
              font-size={'16px'}>Luminosité
            </text>
            <text
              x={10}
              y={80}
              fill={'white'}
              font-size={'32px'}>{this.state.luminosity}%
            </text>
          </g>
        </svg>
      </div>
    );
  };
};
