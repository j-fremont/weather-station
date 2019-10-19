
# weather-station

Développement d'une station météo pour la maison selon le schéma suivant.






## Partie serveur (Raspberry)

1. Installation du broker MQTT
2. Installation du serveur NodeJS
3. Développement de l'application React
4. Installation d'un reverse proxy Nginx

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

Configurer Nginx en reverse proxy.

Configurer le transfert de port sur la box.


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
