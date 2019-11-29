import React from 'react';

export default class MyTemperature extends React.Component {

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
              font-size={'32px'}>{this.props.value}°
            </text>
          </g>
        </svg>
      </div>
    );
  };
};
