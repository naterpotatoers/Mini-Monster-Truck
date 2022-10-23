#include <Arduino.h>
#include "MPU9250.h"
#include <math.h>
#include <Wire.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>
#include <DHT_U.h>

int sensor_values[5];
// String commands = {"air":sensor_values[0],"soil":sensor_values[1],"heading":sensor_values[2],"speed":sensor_values[3],"angle":sensor_values[4]}

// define keycode for LCD push button
#define None 0
#define Select 1
#define Left 2
#define Up 3
#define Down 4
#define Right 5
#define DHTPIN A0
#define pin_for_moisture_sensor A1
#define DHTTYPE DHT22

int pwm = 8;
int direction = 26;
int speed = 128;
MPU9250 IMU(Wire, 0x68);
DHT_Unified dht(DHTPIN, DHTTYPE);

struct magValues
{
  float x = 0;
  float y = 0;
};

struct dhtValues {
  int temp = 0;
  int humidity = 0;
};

magValues GetMagValues()
{
  magValues magxy;
  magxy.x = IMU.getMagX_uT();
  magxy.y = IMU.getMagY_uT();
  return magxy;
}

int GetHeading(magValues magxy)
{
  magxy.x = round(magxy.x);
  magxy.y = round(magxy.y);
  float heading = atan2(magxy.y, magxy.x) * (180 / 3.14);
  if (heading < 0)
  {
    heading += 360;
  }
  return round(heading);
}
int GetMoisturePercent(int moisture_value)
{
  // do some conversions to percent
  return 0;
}

dhtValues GetDhtValues(sensors_event_t event){
  dhtValues dht;
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  }
  else {
    dht.temp = event.temperature;
    Serial.print(F("Temperature: "));
    event.temperature;
    Serial.print(event.temperature);
    Serial.println(F("°C"));
  }
  // Get humidity event and print its value.
  // dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  }
  else {
    Serial.print(F("Humidity: "));
    Serial.print(event.relative_humidity);
    Serial.println(F("%"));
  }
}

void Move(int rdirection)
{
  if (rdirection == 2)
  {
    digitalWrite(direction, HIGH);
    delay(10);
    analogWrite(pwm, speed);
  }
  else if (rdirection == 1)
  {
    digitalWrite(direction, LOW);
    // delay(10);
    analogWrite(pwm, speed);
  }
  else
  {
    analogWrite(pwm, 0);
  }
}

void setup()
{
  pinMode(pwm, OUTPUT);
  pinMode(direction, OUTPUT);
  pinMode(pin_for_moisture_sensor, INPUT);
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  // IMU.begin();
  // IMU.setDlpfBandwidth(MPU9250::DLPF_BANDWIDTH_20HZ);
  // IMU.setSrd(19);
  Serial.begin(9600);
}
void loop()
{
  // int heading = 0;
  // int moisture = 0;
  // int moisture_percentage = 0;
  //  sensors_event_t event;
  // dht.temperature().getEvent(&event);
  // int dht_values = 0;
  // IMU.readSensor();
  // if (Serial.available() > 0) {
  //   String data = Serial.readStringUntil('\n');
  //   Serial.print("You sent me: ");
  //   Serial.println(data);
  // }
  // Serial.print("Hello There!!!");
  delay(1000);
  Move(1); //pass in 0 for stopping, 1 for forward, and 2 for backwards
  // heading = GetHeading(GetMagValues()); //heading has the heading from the magnometer
  // moisture = analogRead(pin_for_moisture_sensor); //will read the raw data for moisture
  // moisture_percentage = GetMoisturePercent(moisture); //will convert raw data of moisture to percent
  // dht_values = analogRead(DHTPIN);
  // Serial.print(dht_values);
}