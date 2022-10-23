#include <Arduino.h>
#include "MPU9250.h"
#include <math.h>
#include <Wire.h>
#include <DHT.h>
#include <Adafruit_Sensor.h>
#include <DHT_U.h>
#include <Servo.h>
#include <ArduinoJson.h>
#include <string>

int sensor_values[5];
// String commands = {"air":sensor_values[0],"soil":sensor_values[1],"heading":sensor_values[2],"speed":sensor_values[3],"angle":sensor_values[4]}

// define keycode for LCD push button
#define None 0
#define Select 1
#define Left 2
#define Up 3
#define Down 4
#define Right 5
#define DHTPIN 28
#define pin_for_moisture_sensor A1
#define DHTTYPE DHT11
#define servopin 13

int pwm = 8;
int direction = 26;
// int speed = 128;
MPU9250 IMU(Wire, 0x68);
DHT_Unified dht(DHTPIN, DHTTYPE);
Servo myservo;
DynamicJsonDocument doc(1024);

struct magValues
{
  float x = 0;
  float y = 0;
};

struct dhtValues
{
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

dhtValues GetDhtValues()
{
  dhtValues dht_value;
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  // if (isnan(event.temperature)) {
  //   Serial.println(F("Error reading temperature!"));
  // }
  // else {
  dht_value.temp = event.temperature;
  if (dht_value.temp > 0)
  {
    Serial.print(F("Temperature: "));
    Serial.print(dht_value.temp);
    Serial.println(F("°C"));
  }
  // }
  // Get humidity event and print its value.
  dht.humidity().getEvent(&event);
  // if (isnan(event.relative_humidity)) {
  //   Serial.println(F("Error reading humidity!"));
  // }
  // else {
  dht_value.humidity = event.relative_humidity;
  if (dht_value.humidity < 100)
  {
    Serial.print(F("Humidity: "));
    Serial.print(dht_value.humidity);
    Serial.println(F("%"));
  }
  // }
  return dht_value;
}

void Move(int rdirection, int speed)
{
  if (rdirection == 2)
  {
    digitalWrite(direction, HIGH);
    delay(50);
    analogWrite(pwm, speed);
  }
  else if (rdirection == 1)
  {
    digitalWrite(direction, LOW);
    delay(50);
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
  // pinMode(pin_for_moisture_sensor, INPUT);
  // sensor_t sensor;
  // dht.temperature().getSensor(&sensor);
  // dht.humidity().getSensor(&sensor);
  myservo.attach(servopin);
  // IMU.begin();
  // IMU.setDlpfBandwidth(MPU9250::DLPF_BANDWIDTH_20HZ);
  // IMU.setSrd(19);
  Serial.begin(38400);
}
void loop()
{
  // int heading = 0;
  // int moisture = 0;
  int dir = 0;
  int speed = 0;
  int steer_angle = 0;
  // int moisture_percentage = 0;
  //  sensors_event_t event;
  // dhtValues dht_values;
  // magValues mag_values;
  // IMU.readSensor();
  if (Serial.available() > 0)
  {
    String data = Serial.readStringUntil('\n');
    Serial.print("You sent me: ");
    Serial.println(data);
    const char *kResponseBodyFormat = "{\"speed\":%d,\"angle\":%d,\"dir\":%d}";
    int actual_arguments = sscanf(
        data.c_str(), kResponseBodyFormat,
        &speed, &steer_angle, &dir);
    Serial.print(speed);
  }
  // Serial.print("Hello There!!!");
  delay(1000);
  Move(dir, speed); // pass in 0 for stopping, 1 for forward, and 2 for backwards
  myservo.write(steer_angle);
  // heading = GetHeading(GetMagValues()); // heading has the heading from the magnometer
  // moisture = analogRead(pin_for_moisture_sensor); //will read the raw data for moisture
  // moisture_percentage = GetMoisturePercent(moisture); //will convert raw data of moisture to percent
  // dht_values = GetDhtValues(); not working
  // Serial.print(heading);
}