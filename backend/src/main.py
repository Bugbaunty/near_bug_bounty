import requests
import os
import random

class GameBloc :

    device_id = hex(random.getrandbits(128)).lstrip("0x")
    payload = {"deviceId" : device_id}
    response = requests.post("")