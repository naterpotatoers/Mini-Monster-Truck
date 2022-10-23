import sys
from GPS import gpsRead

if __name__ == '__main__':
    try:
        data = gpsRead("/dev/ttyS0",9600)
        url = "http://10.0.0.45:5000/status"
    except:
            print("Make sure your GPS is plugged in and you are using the correct port!")
            exit(1)
    GPS_Coordinates = data.get_position(url)
    print(GPS_Coordinates)
    # exit(1)