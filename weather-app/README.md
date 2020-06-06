
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

## Docker

Build Docker image.
```
[weather-app]$ docker build -t weather-app .
```
