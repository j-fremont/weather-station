#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <DHT.h>

#define WIFI_SSID "MY_SSID"
#define WIFI_PASS "MY_PASS"

#define MOSQUITTO_IP "192.168.1.10"

#define DHTPIN 4
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

WiFiClient espClient;
PubSubClient mqttClient(espClient);

void setup() {
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  pinMode(LED_BUILTIN, OUTPUT);
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_BUILTIN,HIGH);
    delay(250);
    digitalWrite(LED_BUILTIN,LOW);
    delay(250);
  }
  dht.begin();
  mqttClient.setServer(MOSQUITTO_IP, 1883);
}

void reconnect() { // Boucle jusqu'à reconnexion
  while (!mqttClient.connected()) {
    //if (client.connect("ESP8266", mqtt_user, mqtt_password)) {
    if (!mqttClient.connect("ESP8266")) {
      delay(5000);
    }
  }
}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }
  
  mqttClient.loop();

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  mqttClient.publish("temperature", String(t).c_str());
  mqttClient.publish("humidity", String(h).c_str());  

  delay(10000);
}

