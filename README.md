
## With Docker

Pull, configure and run hypriot/rpi-noip image (https://hub.docker.com/r/hypriot/rpi-noip).
```
$ docker pull hypriot/rpi-noip
```

Start multi-container application.
```
$ docker-compose up -d
```

Test d'un conteneur à partir de hypriot/rpi-node mais pas la bonne version de node et npm.

Test d'un conteneur à partir de hypriot/rpi-alpine-scratch mais APK ne connaît pas nodejs.

Pour lancer un conteneur qui ne s'arrête pas : CMD tail -f /dev/null

