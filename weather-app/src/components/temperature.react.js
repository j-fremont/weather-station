import React from 'react';
import io from "socket.io-client";

const socket = io('localhost:9000');

export default class MyTemperature extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: undefined
    }
  }

  componentDidMount() {

    socket.on('connect', () => {
      console.log("Connected to the server socket...");
    });

    socket.on('sock_temperature', (payload) => {
      this.setState({
        temperature: payload
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
              fill={'#1a5276'}/>
            <text
              x={10}
              y={30}
              fill={'white'}
              font-size={'16px'}>Température
            </text>
            <text
              x={10}
              y={80}
              fill={'white'}
              font-size={'32px'}>{this.state.temperature}°
            </text>
          </g>
        </svg>
      </div>
    );
  };
};
