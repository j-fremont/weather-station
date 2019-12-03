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
       luminosity: Influx.FieldType.FLOAT,
       pressure: Influx.FieldType.FLOAT
    },
    tags: ['sensor']
  }]
});

const writeTemperature = (message) => {
  influx.writePoints([{ // ...and add a new point in InfluxDB.
    measurement: 'weather',
    tags: { sensor: message.sensor },
    fields: {
      temperature: message.value
    }
  }]);
};

const writeHumidity = (message) => {
  influx.writePoints([{ // ...and add a new point in InfluxDB.
    measurement: 'weather',
    tags: { sensor: message.sensor },
    fields: {
      humidity: message.value
    }
  }]);
};

const writeLuminosity = (message) => {
  influx.writePoints([{ // ...and add a new point in InfluxDB.
    measurement: 'weather',
    tags: { sensor: message.sensor },
    fields: {
      luminosity: message.value
    }
  }]);
};

const writePressure = (message) => {
  influx.writePoints([{ // ...and add a new point in InfluxDB.
    measurement: 'weather',
    tags: { sensor: message.sensor },
    fields: {
      pressure: message.value
    }
  }]);
};

var client = mqtt.connect('mqtt://' + config.mqtt.host + ':' + config.mqtt.port);

client.on('connect', () => {

  console.log('connection mqtt topics');

  client.subscribe('temperature'); // Topic subscriptions
  client.subscribe('humidity');
  client.subscribe('luminosity');
  client.subscribe('pressure');
});

client.on('message', (topic, message) => { // Topic messages

  console.log('message from topic ' + topic + ' - message : ' + message);
  
  const json = JSON.parse(message);

  switch (topic) {
    case 'temperature':
      writeTemperature(json);
      emit('sock_temperature', json);
      break;
    case 'humidity':
      writeHumidity(json);
      emit('sock_humidity', json);
      break;
    case 'luminosity':
      writeLuminosity(json);
      emit('sock_luminosity', json);
      break;
    case 'pressure':
      writePressure(json);
      emit('sock_pressure', json);
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
