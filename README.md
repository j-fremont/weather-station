
# weather-station

Développement d'une station météo pour la maison selon le schéma suivant.






## Partie serveur (Raspberry)

1. Installation du broker MQTT
2. Installation du serveur NodeJS
3. Développement de l'application React
4. Installation d'un reverse proxy Nginx
5. Installation d'InfluxDB

### Installation du broker MQTT

Se logger sur le Raspberry.
```
[fremont@presario]$ ssh pi@192.168.1.xx
```

Installer Mosquitto.
```
[pi@raspberry]$ sudo apt-get install mosquitto mosquitto-clients
```

Pour démarrer Mosquitto automatiquement.
```
[pi@raspberry]$ sudo systemctl enable mosquitto.service
```

Pour configurer une IP fixe sur le Raspberry, dans /etc/dhcpcd.conf :
```
static ip_address=192.168.1.10/24
static routers=192.168.1.1
static domain_name_servers=192.168.1.1
```

Et relancer la configuration réseau.
```
[pi@raspberry]$ sudo /etc/init.d/networking restart
```

Pour tester le serveur MQTT, sur un terminal du PC, installer le client Mosquitto.
```
[fremont@presario]$ sudo apt-get install mosquitto-clients
```

Sur un autre PC (le Raspberry pas exemple), souscrire au topic.
```
[pi@raspberry]$ mosquitto_sub -d -t test
```

Et publier un message sur un topic du broker MQTT.
```
[fremont@presario]$ mosquitto_pub -d -h 192.168.1.10 -t test -m "Hello world"
Client mosqpub|3940-fremont-Pr sending CONNECT
Client mosqpub|3940-fremont-Pr received CONNACK
Client mosqpub|3940-fremont-Pr sending PUBLISH (d0, q0, r0, m1, 'test', ... (11 bytes))
Client mosqpub|3940-fremont-Pr sending DISCONNECT
```

### Installation du serveur NodeJS

Vérifier la version du Raspberry.
```
[pi@raspberry]$ uname -m
armv6l
[pi@raspberry]$ wget http://nodejs.org/dist/v10.16.2/node-v10.16.2-linux-armv6l.tar.xz
...
[pi@raspberry]$ tar xvf node-v10.16.2-linux-armv6l.tar.xz
```

Dans ~/.profile.
```
export NODEJS_HOME=/home/pi/node-v10.16.2-linux-armv6l
export PATH=$PATH:$NODEJS_HOME/bin
```

Puis prendre en compte les modifications.
```
[pi@raspberry]$ source ~/.profile
```

## Développement de l'application React

Installer l'outil pour créer une app React.
```
[fremont@presario]$ npm install -g create-react-app
```

Créer l'application.
```
[fremont@presario]~/projets_react$ create-react-app weather-app
```

Installer les librairies.
```
[fremont@presario]~/projets_react/weather-app$ npm install --save react react-dom
[fremont@presario]~/projets_react/weather-app$ npm install --save bootstrap reactstrap
[fremont@presario]~/projets_react/weather-app$ npm install --save mqtt
[fremont@presario]~/projets_react/weather-app$ npm install --save influx
```

Lancement du serveur.
```
[pi@raspberry]~/projets_react/weather-app$ node server.js
listening on *:9000
```

Lancement du client.
```
[pi@raspberry]~/projets_react/weather-app$ npm start
listening on *:9000
```

### Installation d'un reverse proxy Nginx

Update and upgrade packages.
```
[pi@raspberry]$ sudo apt-get update && sudo apt-get upgrade
```

Install and start Nginx.
```
[pi@raspberry]$ sudo apt-get install nginx
[pi@raspberry]$ sudo /etc/init.d/nginx start
[pi@raspberry]$ sudo /etc/init.d/nginx stop
```

Modifier la configuration de Nginx pour jouer le rôle de reverse proxy.
```
[pi@raspberry]$ vi /etc/nginx/sites-available/default
```

Ecrire.
```
server {
        listen 80;

        location / {
                proxy_pass http://192.168.1.10:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

Configurer le transfert de port sur la box.

### Installation d'InfluxDB

https://www.terminalbytes.com/temperature-using-raspberry-pi-grafana/


Sur https://bentek.fr/influxdb-grafana-raspberry-pi/ :

```
[pi@raspberry]$ sudo -i
[pi@raspberry]$ curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
[pi@raspberry]$ echo "deb https://repos.influxdata.com/debian stretch stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
[pi@raspberry]$ sudo apt-get update
[pi@raspberry]$ sudo apt-get install influxdb
[pi@raspberry]$ sudo vi /etc/influxdb/influxdb.conf
```

```
[http]
  # Determines whether HTTP endpoint is enabled.
  enabled = true

  # The bind address used by the HTTP service.
  bind-address = ":8086"

  # Determines whether user authentication is enabled over HTTP/HTTPS.
  auth-enabled = false
```

```
[pi@raspberry]$ sudo service influxdb restart
[pi@raspberry]$ influx -precision rfc3339
Connected to http://localhost:8086 version 1.7.8
InfluxDB shell version: 1.7.8
> create database homedb
> show databases
...
homedb
> use homedb
Using database homedb
> insert temperature sensor1=18.5
> insert temperature sensor2=35.8
> select * from temperature
name: temperature
time                           sensor1 sensor2
----                           ------- -------
2019-09-15T10:20:23.709379761Z 18.5    
2019-09-15T10:20:46.326459395Z         35.8
> drop series from temperature
> drop series from humidity
> drop series from luminosity
> select * from temperature group by * order by desc limit 2

> select mean(temperature),mean(humidity),mean(luminosity) from weather where sensor='room1' group by time(10s) fill(0) order by desc


> exit
```

## Partie capteurs (Arduino, ESP8266,...)

Arduino + Ethernet shield

### Capteur d'humidité et températeur DHT11

Aller sur https://github.com/adafruit/DHT-sensor-library et télécharger la librairie.

Télécharger également https://github.com/adafruit/Adafruit_Sensor.

Dézipper et copier ces deux librairies dans ~/arduino-1.8.5/libraries/.

### Ethernet

Simplement inclure Ethernet.h. Une alternative à MQTT et d'utiliser la librarie SPI pour une liaison serie (voir dans les exemples de l'Arduino Studio).

### Client MQTT

Lancer l'IDE Arduino et installer PubSubClient : menu Croquis/Inclure une bibliothèque/Gérer les bibliothèques (filtrer la recherche avec "MQTT").

Si besoin, un exemple de subscribe avec callback ici : http://www.rgot.org/mqtt-utilisation-avec-arduino/.

https://www.carnetdumaker.net/articles/utiliser-les-entrees-sorties-numeriques-dune-carte-arduino-genuino/

### ESP8266 sur Arduino IDE

Sur https://github.com/esp8266/Arduino/blob/master/README.md.

Lancer l'IDE Arduino.

Dans Préférences, ajouter l'URL https://arduino.esp8266.com/stable/package_esp8266com_index.json.

Dans Outils, Gestionnaire de cartes, Installer ESP8266.

https://www.fais-le-toi-meme.fr/fr/electronique/tutoriel/programmes-arduino-executes-sur-esp8266-arduino-ide

Pour Télécharger un sketch :

https://www.instructables.com/id/Minitaure-Weather-Station-ESP8266/

https://www.instructables.com/id/ESP-12F-ESP8266-Module-Minimal-Breadboard-for-Flas/

1. Avant la fin de la compilation, rester appuyer sur le bouton Flash.
2. Puis pendant "Connecting........_____....._____....._____....._____....._", appui bref sur le bouton Reset.
3. A la fin de "Wrote XXXXXX bytes...", relacher le bouton Flash.

### Problème "Carte generic (plateforme esp8266, package esp8266) est inconnue" quand on compile le sketch

Il y a deux versions de la librairie esp8266 dans /root/.arduino15.

Aller dans Préférences et cliquer sur le lien en bas /root/.arduino15/preferences.txt.

Dans /root/.arduino15/packages/esp8266/hardware/esp8266/2.5.1, supprimer la librairie en trop.


