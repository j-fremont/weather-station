'use strict';

const express = require('express');
const router = express.Router();
const Influx = require('influx');
const config = require('../src/config');

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

router.get('/:mode', function(req, res, next) {

  var mode = req.param("mode");

  influx.query("select temperature, humidity, luminosity from weather where sensor='" + mode + "' group by * order by desc limit 1").then(results => {
    res.send(results);
  });
});

module.exports = router;
