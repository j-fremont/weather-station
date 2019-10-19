#include <Ethernet.h>
#include <DHT.h>
#include <PubSubClient.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

//int tempPin = 0;
int lumPin = 2;

byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};

IPAddress ip(192, 168, 1, 20);

EthernetClient ethClient;
PubSubClient mqttClient(ethClient);

void setup()
{
  Serial.begin(57600);
  dht.begin();
  mqttClient.setServer("192.168.1.10", 1883);
  Ethernet.begin(mac, ip);
  delay(1500);
}

void loop()
{
  /*
  // Pour mesurer la temperature avec le LM35
  int valTemp;
  int datTemp;
  valTemp = analogRead(tempPin);
  datTemp = (125*valTemp)>>8;
  Serial.print("Temp : ");
  Serial.print(datTemp);
  Serial.println("C");
  */
  
  int l = analogRead(lumPin);
  float l_pct = map(l, 0, 1024, 0, 100);
  /*Serial.print(F("Lum : "));
  Serial.println(l);
  Serial.println(l_pct);*/

  float h = dht.readHumidity();
  float t = dht.readTemperature();
  /*float f = dht.readTemperature(true);
  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);
  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));
  Serial.print(f);
  Serial.print(F("°F  Heat index: "));
  Serial.print(hic);
  Serial.print(F("°C "));
  Serial.print(hif);
  Serial.println(F("°F"));*/

  if (mqttClient.connect("arduino")) {
    Serial.println("connected...");
    mqttClient.publish("luminosity", String(l_pct).c_str());
    mqttClient.publish("temperature", String(t).c_str());
    mqttClient.publish("humidity", String(h).c_str());
  } else {
    Serial.print("failed, rc=");
    Serial.print(mqttClient.state());
  }
  
  mqttClient.loop();
  Serial.println("sleeping...");
  delay(10000);
}

