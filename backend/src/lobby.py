import requests
import urllib.parse
import random
import os
#import pandas as pd
import time
import math
#import numpy as np
#import matplotlib.pyplot as plt
from datetime import datetime

class GameBloc:

    def __init__(self, username : str, password : str, remember_me : bool):
        self.username = username
        self.password = password
        self.remember_me = remember_me
        self.s = requests.Session()
        self.headers = {}
        self.cod_url = "https://profile.callofduty.com/do_login?new_SiteId=cod"

    def login(self):
        self.s.get(self.cod_url)
        data = {
            'username' : self.username,
            'password' : self.password,
            'remember_me' :  self.remember_me,
            '_csrf' : self.s.cookies['XSRF-Token']
        }
        self.s.post("https://profile.callofduty.com/do_login?new_SiteId=cod", params = data)

    def create_lobby(self, matchId : str):
        data = self.s.get("https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/" + matchId +"/it")
        return data.json()['data']

    def join_lobby(self, _username : str) -> str:
        username = urllib.parse.quote(_username)
        join = self.s.get(f'https://my.callofduty.com/api/papi-client/crm/cod/v2/platform/uno/username/{ username }/search')
        join.json()

    def get_all_players_in_lobby(self, matchId : str):
        data = self.s.get("https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/" + matchId +"/it")
        return data.json()['data']['allPlayers']

    def get_all_players_stats(self, matchId : str):
        data = self.s.get("https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/" + matchId +"/it")
        return data.json()['data']['allPlayers']['playerStats']

    def get_all_players_info(self, matchId : str):
        data = self.s.get("https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/" + matchId +"/it")
        return data.json()['data']['allPlayers']['playerStats'].info()
 
    def join_lobby_with_teamates(self, teamates : dict([str, str])):
        kds = []
        lobby_players_full = []
        team = ""
        team_stats = {}
        team_allocation = ""
        for player in get_all_players_in_lobby(matchId):
            time.sleep(0.2)
            if player["player"]['uno'] in teamates.values():
                team = player['player']['team']
                team_allocation = player['playerStats']['teamPlacement']
                team_stats[player['player']['username']] = [player['playerStats']['kills']]
                resp = requests.get('https://www.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/uno/uno/' + str(player['player']['uno']) + '/profile/type/warzone', headers=headers, cookies=resp_login.cookies)
                kds.append(resp.json().get('data', {}).get('lifetime', {}).get('mode', {}).get('br', {}).get('properties', {}).get('kdRatio'))
            lobby_players_full.append(resp.json()['data'])
        kds

    def close(self):
        pass

    


    




        