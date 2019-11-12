'use strict';

const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mqtt = require('mqtt');
const Influx = require('influx');
const config = require('./src/config');

var historyRouter = require('./routes/history');
var lastRouter = require('./routes/last');

var websock = undefined;

app.use(cors());

app.use('/history', historyRouter);
app.use('/last', lastRouter);

const influx = new Influx.InfluxDB({ // InfluxDB schema
  host: config.influxdb.host,
  database: 'homedb',
  schema: [{
    measurement: 'weather',
    fields: {
       temperature: Influx.FieldType.FLOAT,
       humidity: Influx.FieldType.FLOAT,
       luminosity: Influx.FieldType.FLOAT
    },
    tags: ['sensor']
  }]
});

const writeTemperature = (sensor, value) => {
  influx.writePoints([{ // ...and add a new point in InfluxDB.
    measurement: 'weather',
    tags: { sensor: sensor },
    fields: {
      temperature: value
    }
  }]);
};

const writeHumidity = (sensor, value) => {
  influx.writePoints([{ // ...and add a new point in InfluxDB.
    measurement: 'weather',
    tags: { sensor: sensor },
    fields: {
      humidity: value
    }
  }]);
};

const writeLuminosity = (sensor, value) => {
  influx.writePoints([{ // ...and add a new point in InfluxDB.
    measurement: 'weather',
    tags: { sensor: sensor },
    fields: {
      luminosity: value
    }
  }]);
};

var client = mqtt.connect('mqtt://' + config.mqtt.host + ':' + config.mqtt.port);

client.on('connect', () => {

  console.log('connection mqtt topics');

  client.subscribe('temperature_inside'); // Topic subscriptions
  client.subscribe('temperature_outside');
  client.subscribe('humidity_inside');
  client.subscribe('humidity_outside');
  client.subscribe('luminosity_outside');
});

client.on('message', (topic, message) => { // Topic messages

  console.log('message from topic ' + topic + ' - message : ' + message);

  const value = parseFloat(message).toFixed(1).toString();

  switch (topic) {
    case 'temperature_inside':
      writeTemperature('inside', value);
      emit('sock_temperature_inside', value);
      break;
    case 'temperature_outside':
      writeTemperature('outside', value);
      emit('sock_temperature_outside', value);
      break;
    case 'humidity_inside':
      writeHumidity('inside', value);
      emit('sock_humidity_inside', value);
      break;
    case 'humidity_outside':
      writeHumidity('outside', value);
      emit('sock_humidity_outside', value);
      break;
    case 'luminosity_outside':
      writeLuminosity('outside', value);
      emit('sock_luminosity_outside', value);
      break;
    default:
      console.log('Topic ' + topic + 'unknown...');
  }
});

const emit = (message, value) => {
  if (websock===undefined) {
    console.log('websocket undefined...');
  } else {
    websock.emit(message, value);
  }
};

io.on('connection', socket => { // Emit last readings in the web socket
  console.log('connection web socket');
  websock=socket;
});


http.listen(config.server.port, () => {
  console.log('listening on *:' + config.server.port);
});
