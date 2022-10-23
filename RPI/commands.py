import requests
import serial.tools.list_ports as port_list
from Serial import SerialSystem
from GPS import gpsRead
import json

serial_port = "/dev/ttyUSB0"
gps_port = "/dev/ttyS0"
commands_url = "http://10.0.0.45:5000/commands"
status_url = "http://10.0.0.45:5000/status"

def jsonParse(str):
    if(str.count("{") >= 1 and str.count("}") >= 1 ):
        if(str.rfind("{") < str.rfind("}")):
            return str[str.rfind("{"):str.rfind("}")+1]
        else:
            return str[str.rfind("{", 0, str.rfind("{")):str.rfind("}")+1]

web_response = requests.get(commands_url)
print("Getting data from: " + web_response.text)

try:
    serial = SerialSystem(serial_port, 38400)
    gps = gpsRead(gps_port,9600)
    print("Using port: " + serial_port)
except:
    ports = list(port_list.comports())
    print('====> Designated Port not found. Using Port:', ports[0].device)
    new_port = ports[0].device
    serial = SerialSystem(new_port, 38400)
    gps = gpsRead(gps_port,9600)

while True:
    print(web_response.text)
    GPS_Coordinates = gps.get_position()
    response = serial.read_serial()
    serial.write_serial(web_response.text)
    response += serial.read_serial()
    json_format = jsonParse(response)

    json_format["latitude"] = GPS_Coordinates[0]
    json_format["longitude"] = GPS_Coordinates[1]
    print("Here", json_format)

    if json_format != None:
        response = ''
        json_format = json.loads(json_format)
        web_response = requests.get(get_initial_commands_url, params=json_format)