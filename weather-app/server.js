const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mqtt = require('mqtt');
const Influx = require('influx');
const config = require('./src/config');

var last_temperature=0, last_humidity=0, last_luminosity=0; // Last readings in MQTT server

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

var client = mqtt.connect('mqtt://' + config.mqtt.host + ':' + config.mqtt.port);

client.on('connect', () => {

  console.log('connect');

  client.subscribe('temperature'); // Topic subscriptions
  client.subscribe('humidity');
  client.subscribe('luminosity');
});

client.on('message', (topic, message) => { // Topic messages

  console.log('message from topic ' + topic + ' - message : ' + message);

  if (topic==='temperature') {
    last_temperature=parseFloat(message).toFixed(1).toString(); // Update last reading...
    influx.writePoints([{ // ...and add a new point in InfluxDB.
      measurement: 'weather',
      tags: { sensor:'inside' },
      fields: {
        temperature: last_temperature
      }
    }]);
  }
  else if (topic==='humidity') {
    last_humidity=parseFloat(message).toFixed(1).toString()
    influx.writePoints([{
      measurement: 'weather',
      tags: { sensor:'inside' },
      fields: {
        humidity: last_humidity
      }
    }]);
  }
  else if (topic==='luminosity') {
    last_luminosity=parseFloat(message).toFixed(1).toString()
    influx.writePoints([{
      measurement: 'weather',
      tags: { sensor:'inside' },
      fields: {
        luminosity: last_luminosity
      }
    }]);
  }
});

io.on('connection', socket => { // Emit last readings in the web socket

  console.log('connection web socket');

  setInterval(() => {
    socket.emit('sock_temperature', last_temperature);
    socket.emit('sock_humidity', last_humidity);
    socket.emit('sock_luminosity', last_luminosity);
  }, config.interval.emit);

});

http.listen(config.server.port, () => {
  console.log('listening on *:' + config.server.port);
});
