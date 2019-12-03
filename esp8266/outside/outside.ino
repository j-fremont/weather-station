#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <Adafruit_TSL2591.h>

#define WIFI_SSID "MY_SSID"
#define WIFI_PASS "MY_PASS"

#define MOSQUITTO_IP "192.168.1.10"

#define SDAI2CPIN 4 // GPIO4 I2C SDA bus
#define SCLI2CPIN 5 // GPIO5 I2C SCL bus
#define BMP280ADDR 0x76 // Set BMP280 I2C address

Adafruit_BMP280 bmp280;

Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591); // pass in a number for the sensor identifier (for your use later)

WiFiClient espClient;
PubSubClient mqttClient(espClient);

const String sensor = String("outside");

void setup() {

  float t = 0;
  float p = 0;
  float l = 0;

  Serial.begin(9600);

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

  while (!mqttClient.connected()) {
    if (!mqttClient.connect("ESP8266")) {
      Serial.println("MQTT reconnect...");
      delay(5000);
    }
  }

  Wire.begin(SDAI2CPIN, SCLI2CPIN);
  
  bmp280.begin(BMP280ADDR);

  t = bmp280.readTemperature();
  p = bmp280.readPressure()/100;

  if (tsl.begin())
  {
    Serial.println("Found a TSL2591 sensor");

    uint32_t lum = tsl.getFullLuminosity();
    uint16_t ir, full;
    ir = lum >> 16;
    full = lum & 0xFFFF;
    l = tsl.calculateLux(full, ir);
  }
  else
  {
    Serial.println("No TSL2591 sensor found ... check your wiring?");
  }
  
  String t_msg = String("{\"sensor\":\"") + sensor + String("\",\"value\":") + String(t) + String("}");
  mqttClient.publish("temperature", t_msg.c_str());

  String p_msg = String("{\"sensor\":\"") + sensor + String("\",\"value\":") + String(p) + String("}");
  mqttClient.publish("pressure", p_msg.c_str());

  String l_msg = String("{\"sensor\":\"") + sensor + String("\",\"value\":") + String(l) + String("}");
  mqttClient.publish("luminosity", l_msg.c_str());
  
  delay(1000); // Time to finish pub before sleeping

  Serial.println("Go to sleep...");

  ESP.deepSleep(600e6); // 10 minutes...
}

void loop() {

}

