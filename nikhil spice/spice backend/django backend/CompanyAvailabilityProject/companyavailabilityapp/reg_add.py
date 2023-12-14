import requests
import json
cin="U72900KA2022PTC165868"
url = f"https://api.finanvo.in/company/profile?CIN={cin}"
headers = {
    "Host": "api.finanvo.in",
    "App-Origin": "https://web.compdata.in",
    "Origin": "https://web.compdata.in",
    "Referer": "https://web.compdata.in/",
}

response = requests.get(url, headers=headers)
j=json.loads(response.text)
print(j)
