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

const String sensor = String("inside");

void setup() {

  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
  pinMode(LED_BUILTIN, OUTPUT);
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_BUILTIN,HIGH);
    delay(250);
    digitalWrite(LED_BUILTIN,LOW);
    delay(250);
  }

  Serial.println("WiFi connected...");

  mqttClient.setServer(MOSQUITTO_IP, 1883);

  /*while (!mqttClient.connected()) {
    if (!mqttClient.connect("ESP8266")) {
      Serial.println("MQTT reconnect...");
      delay(5000);
    }
  }*/

  mqttClient.connect("ESP8266");
  Serial.println("MQTT connect...");
  delay(5000);

  if (mqttClient.connected()) {

    dht.begin();
  
    float h = dht.readHumidity();
    float t = dht.readTemperature();
  
    String t_msg = String("{\"sensor\":\"") + sensor + String("\",\"value\":") + String(t) + String("}");
    mqttClient.publish("temperature", t_msg.c_str());
  
    String h_msg = String("{\"sensor\":\"") + sensor + String("\",\"value\":") + String(h) + String("}");
    mqttClient.publish("humidity", h_msg.c_str());
  
    delay(1000); // Time to finish pub before sleeping
  
  }

  Serial.println("Go to sleep...");

  ESP.deepSleep(600e6); // 10 minutes...
}

void loop() {

}
