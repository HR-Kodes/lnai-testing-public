from requests_toolbelt import MultipartEncoder
import aiohttp
import asyncio
from requests_toolbelt.multipart.encoder import MultipartEncoder
import json
import requests
c_name = 'DECORATION LLP'
business_names = ["DECORPLANNER LLP", "PLANNINGPROS LLP",
                  "EVENTENSEMBLE LLP", "EVENTATION LLP"]

url = "https://www.mca.gov.in/bin/mca/login"

headers = {
    "Origin": "www.mca.gov.in",
    "Content-Length": "231",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672.127 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept": "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "Sec-Ch-Ua-Platform": "Windows"
}

data = "data=Ut8pBOc0RSM6iYqffqN1orWH0Ee6A57QEKGmyHa5KnuzzybQ%2BjY2pMJIsLZw9DznTxfJeWvJFEcqsU2aZC33AC2nYaU60TNo8VjomCHN2dDSdHEC2enwIeEWCNR42vj7gfXFsvEwLfoO25%2BUKeho6%2B3l%2FkhEucDAzA4XeVNg0dhlBlgG95nyBiwYk3XhQoJtHSgqcb%2FI8MCyxN9h1unz%2Fw%3D%3D"

response = requests.post(url, headers=headers, data=data)


set_cookie_value = response.headers.get('Set-Cookie')

start_index = set_cookie_value.find("session-token=") + len("session-token=")
end_index = set_cookie_value.find(";", start_index)
session_token = set_cookie_value[start_index:end_index]
payload4 = r'''{"requestBody":{"formData":{"purpose":"New Incorporation","proposedname1":"ZIZZAGGGGG LLP","formIntegrationId":"1686922988308_FOUSER","NICcode1":"98200","NICCode1Desc":"Undifferentiated service-producing activities of private households for own use","NICcode2":"98100","NICCode2Desc":"Undifferentiated goods-producing activities of private households for own use","NICcode3":"","NICCode3Desc":"","formAttachment":[]},"formDescription":"RUN LLP","formName":"RUN LLP","formVersion":"1.1","userId":"BIPULKUMARSINGH6690@GMAIL.COM","integrationId":"1686922988308_FOUSER","status":"Draft/Pending Submission"}}'''
payload4_json = json.loads(payload4)
payload4_json['requestBody']['formData']['proposedname1'] = c_name
payload4_json = json.dumps(payload4_json)


async def has_empty_alert(session, name):
    url = "https://www.mca.gov.in/bin/mca-gov/RunLLPSaveSubmit"
    headers = {
        "Host": "www.mca.gov.in",
        "Cookie": f"cookiesession1=678B28695C218253C321286001478935; alertPopup=true; session-token={session_token}",
        "Sec-Ch-Ua-Mobile": "?0",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary0AN6dHNNjREqqUBN",
        "Accept": "*/*",
        "Csrf-Token": "undefined",
        "X-Requested-With": "XMLHttpRequest",
        "Sec-Ch-Ua-Platform": "",
        "Origin": "https://www.mca.gov.in",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://www.mca.gov.in/content/mca/global/en/mca/llp-e-filling/run-llp.html",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "en-US,en;q=0.9"
    }

    payload4_json = json.loads('''{"requestBody":{"formData":{"purpose":"New Incorporation","proposedname1":"ZIZZAGGGGG LLP","formIntegrationId":"1686922988308_FOUSER","NICcode1":"98200","NICCode1Desc":"Undifferentiated service-producing activities of private households for own use","NICcode2":"98100","NICCode2Desc":"Undifferentiated goods-producing activities of private households for own use","NICcode3":"","NICCode3Desc":"","formAttachment":[]},"formDescription":"RUN LLP","formName":"RUN LLP","formVersion":"1.1","userId":"BIPULKUMARSINGH6690@GMAIL.COM","integrationId":"1686922988308_FOUSER","status":"Draft/Pending Submission"}}''')

    payload4_json['requestBody']['formData']['proposedname1'] = name
    payload4_json = json.dumps(payload4_json)

    multipart_data = MultipartEncoder(fields={
        'data': (None, payload4_json),
        'action': (None, 'savesubmit'),
        'operation': (None, 'Submit'),
        'serveAction': (None, 'validateform')
    })

    headers['Content-Type'] = multipart_data.content_type

    async with session.post(url, headers=headers, data=multipart_data) as response:
        result = await response.json()
        alert_list = result['validationResponse']['validationresposeBody']
        all_empty = all(not item['alertDescription'] for item in alert_list)
        return all_empty


async def check_alert_descriptions(business_names, session_token):
    empty_alert_names = []

    async with aiohttp.ClientSession() as session:
        tasks = []
        for name in business_names:
            task = has_empty_alert(session_token, name)
            tasks.append(task)

        results = await asyncio.gather(*tasks)

        for name, result in zip(business_names, results):
            if result:
                empty_alert_names.append(name)
                print(f"Empty alert for name: {name}")
            else:
                print(f"No empty alert for name: {name}")

    return empty_alert_names

if __name__ == '__main__':
    # Example usage
    # business_names = ["Business1", "Business2"]
    # session_token = "your_session_token_here"

    result = asyncio.run(check_alert_descriptions(business_names, session_token))
    print("Empty alert names:", result)
