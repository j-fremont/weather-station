import React from 'react';
import io from "socket.io-client";

const config = require('../config');

const socket = io('ws://' + config.server.host + ':' + config.server.port);

export default class MyHumidity extends React.Component {
  /*constructor(props) {
    super(props)
    this.state = {
      humidity: undefined
    }
  }

  componentDidMount() {

    socket.on('connect', () => {
      console.log("Connected to the server socket...");
    });

    socket.on(this.props.socket, (payload) => {
      this.setState({
        humidity: payload
      });
    })
  };*/

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
              fill={'#117864'}/>
            <text
              x={10}
              y={30}
              fill={'white'}
              font-size={'16px'}>Humidité
            </text>
            <text
              x={10}
              y={80}
              fill={'white'}
              font-size={'32px'}>{this.props.value}%
            </text>
          </g>
        </svg>
      </div>
    );
  };
};
