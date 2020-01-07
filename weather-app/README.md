
# weather-app

Create the app.

```
$ npm install -g create-react-app
```

```
[weather-station]$ create-react-app weather-app
```

Load dependencies.

```
[weather-app]$ npm install --save react react-dom
[weather-app]$ npm install --save bootstrap reactstrap
[weather-app]$ npm install --save mqtt
[weather-app]$ npm install --save influx
[weather-app]$ npm install --save axios
[weather-app]$ npm install --save concurrently
```

Build Docker image.
```
[weather-app]$ docker build -t weather-app .
```

Run Docker image.
```
[weather-app]$ docker run -d -p 3000:3000 \
-e INFLUXDB_HOST='localhost' \
-e MQTT_HOST='localhost' \
-e NODEJS_HOST='localhost' weather-app
```
