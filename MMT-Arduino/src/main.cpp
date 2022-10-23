#include <Arduino.h>
int sensor_values[5];
//String commands = {"air":sensor_values[0],"soil":sensor_values[1],"heading":sensor_values[2],"speed":sensor_values[3],"angle":sensor_values[4]}

void setup() {
  Serial.begin(9600);
}
void loop() {
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    Serial.print("You sent me: ");
    Serial.println(data);
  }
  Serial.print("Hello There!!!");
  delay(1000);
}