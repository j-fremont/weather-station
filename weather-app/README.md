
# weather-app

Create and load dependencies.

```bash
$ npm install -g create-react-app
...
$ cd weather-station
[weather-station]$ create-react-app weather-app
...
$ cd weather-app
[weather-app]$ npm install --save react react-dom
[weather-app]$ npm install --save bootstrap reactstrap
[weather-app]$ npm install --save mqtt
[weather-app]$ npm install --save influx
[weather-app]$ npm install --save axios
[weather-app]$ npm install --save concurrently 
```

Install.

```
[weather-app]$ npm install
```

Run the server.
```
[weather-app]$ node server.js
```

Run the client.
```
[weather-app]$ npm start
```

Run the client and the server concurrently.
```
[weather-app]$ npm run dev
```

## With Docker

Pull, configure and run hypriot/rpi-noip image (https://hub.docker.com/r/hypriot/rpi-noip).
```
$ docker pull hypriot/rpi-noip
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

Or try https://hub.docker.com/r/hypriot/rpi-node.

Start multi-container application.
```
$ docker-compose up -d
```

Test d'un conteneur à partir de hypriot/rpi-node mais pas la bonne version de node et npm.

Test d'un conteneur à partir de hypriot/rpi-alpine-scratch mais APK ne connaît pas nodejs.

Pour lancer un conteneur qui ne s'arrête pas : CMD tail -f /dev/null
