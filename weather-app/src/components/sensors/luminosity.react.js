import React from 'react';

export default class MyLuminosity extends React.Component {

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
              y={65}
              fill={'white'}
              font-size={'30px'}>{this.props.value}
            </text>
            <text
              x={10}
              y={85}
              fill={'white'}
              font-size={'16px'}>lux
            </text>            
          </g>
        </svg>
      </div>
    );
  };
};
