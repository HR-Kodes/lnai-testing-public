import requests
import json
import urllib.parse
from requests_toolbelt.multipart.encoder import MultipartEncoder

# Session token extraction from response headers
def get_session_token(response):
    set_cookie_value = response.headers.get('Set-Cookie')
    start_index = set_cookie_value.find("session-token=") + len("session-token=")
    end_index = set_cookie_value.find(";", start_index)
    session_token = set_cookie_value[start_index:end_index]
    return session_token

def fetch_session_token():
    url = "https://www.mca.gov.in/bin/mca/login"
    headers = {
    "Origin": "www.mca.gov.in",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
    data = "data=Ut8pBOc0RSM6iYqffqN1orWH0Ee6A57QEKGmyHa5KnuzzybQ%2BjY2pMJIsLZw9DznTxfJeWvJFEcqsU2aZC33ABxdnX1vQI08BNLAfdFcxaBKXp34%2BM%2BNsTWWf6i0ZZgvHSx43nNtUWzIKy4h2QbDiAMGtAz9f02zrir4%2FyFnV4GQ%2ByBBUt9hu%2F4oNXEAM4veAwOS%2B1yNt9lrmoh50BSIGg%3D%3D"
    response = requests.post(url, headers=headers, data=data)
    session_token = get_session_token(response)
    return session_token

def check_company_name(c_name, session_token):
    payload4=r'''{"requestBody":{"formData":{"purpose":"New Incorporation","proposedname1":"ZIZZAGGGGG LLP","formIntegrationId":"1686922988308_FOUSER","NICcode1":"98200","NICCode1Desc":"Undifferentiated service-producing activities of private households for own use","NICcode2":"98100","NICCode2Desc":"Undifferentiated goods-producing activities of private households for own use","NICcode3":"","NICCode3Desc":"","formAttachment":[]},"formDescription":"RUN LLP","formName":"RUN LLP","formVersion":"1.1","userId":"BIPULKUMARSINGH6690@GMAIL.COM","integrationId":"1686922988308_FOUSER","status":"Draft/Pending Submission"}}'''
    payload4_json=json.loads(payload4)
    payload4_json['requestBody']['formData']['proposedname1']=c_name
    payload4_json=json.dumps(payload4_json)
    url = "https://www.mca.gov.in/bin/mca-gov/RunLLPSaveSubmit"

    headers = {
        "Host": "www.mca.gov.in",
        "Cookie": f"cookiesession1=678B28695C218253C321286001478935; alertPopup=true; session-token={session_token}",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary0AN6dHNNjREqqUBN",
        "Origin": "https://www.mca.gov.in",
        "Referer": "https://www.mca.gov.in/content/mca/global/en/mca/llp-e-filling/run-llp.html",
        }

    multipart_data = MultipartEncoder(fields={
        'data': (None, payload4_json),
        'action': (None, 'savesubmit'),
        'operation': (None, 'Submit'),
        'serveAction': (None, 'validateform')
    })

    headers['Content-Type'] = multipart_data.content_type

    response = requests.post(url, headers=headers, data=multipart_data)
    # print(response.status_code)
    # print(response.text)
    result = response.json()
    alert_list = result['validationResponse']['validationresposeBody']
    all_empty = all(not item['alertDescription'] for item in alert_list)
    if all_empty:
        print(f"{c_name} is available.")
    else:
        print(f"{c_name} is not available.")
def main():
    session_token = fetch_session_token()
    company_names = [
        'MKNSDIUADIA LLP'
    ]
    
    for c_name in company_names:
        check_company_name(c_name, session_token)

if __name__ == "__main__":
    main()
