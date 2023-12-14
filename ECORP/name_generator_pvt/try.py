import requests
import json
import urllib.parse

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
    formData = "%7B%22formData%22%3A%7B%22companyType%22%3A%22New+Company+(Others)%22%2C%22companyClass%22%3A%22Private%22%2C%22companyCategory%22%3A%22Company+limited+by+shares%22%2C%22companySubCategory%22%3A%22Non-government+company%22%2C%22proposedName1%22%3A%22DUMBMET+PRIVATE+LIMITED%22%2C%22NICCode1%22%3A%2298200%22%2C%22Description1%22%3A%22Undifferentiated+service-producing+activities+of+private+households+for+own+use%22%2C%22NICCode2%22%3A%2298100%22%2C%22Description2%22%3A%22Undifferentiated+goods-producing+activities+of+private+households+for+own+use%22%2C%22formIntegrationId%22%3A%221%22%2C%22continueFlag%22%3A%22N%22%2C%22LLPIN%22%3A%22%22%2C%22NICCode3%22%3A%22%22%2C%22Description3%22%3A%22%22%2C%22proposedName2%22%3A%22%22%7D%2C%22formDescription%22%3A%22SPICE+PART+A%22%2C%22formName%22%3A%22Spice%2B+Part+A%22%2C%22formVersion%22%3A%221%22%2C%22userId%22%3A%22BIPULKUMARSINGH6690%40GMAIL.COM%22%2C%22integrationId%22%3A%221%22%2C%22prefill%22%3A%22false%22%2C%22status%22%3A%22Draft%2FPending+Submission%22%2C%22operation%22%3A%22Save%22%2C%22referenceNumber%22%3A%22%22%2C%22srn%22%3A%22%22%2C%22formId%22%3A%22%22%2C%22Approvedname%22%3A%22%22%2C%22serveAction%22%3A%22autocheck%22%7D"

    # Manually parse the data
    decoded_data = urllib.parse.unquote_plus(formData,encoding='utf-8')
    data_start = decoded_data.find('{')

    data_end = decoded_data.rfind('}') + 1
    data_str = decoded_data[data_start:data_end]
    data = eval(data_str)
    data['formData']['proposedName1']=c_name
    encoded_data = urllib.parse.quote_plus(json.dumps(data), encoding='utf-8').replace('%20', '').replace('%28','(').replace('%29',')').replace('+%','%')
    url = "https://www.mca.gov.in/bin/mca-gov/newSpiceA"

    headers = {
        "Host": "www.mca.gov.in",
        "Cookie": f"cookiesession1=678B28695C218253C321286001478935; alertPopup=true; session-token={session_token}; deviceId=1uytaas0tlbi",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Origin": "https://www.mca.gov.in",
        "Referer": "https://www.mca.gov.in/content/mca/global/en/mca/e-filing/incorporation/spice.html",
    }

    payload = f"formData={encoded_data}"
    response = requests.post(url, headers=headers, data=payload)
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
        'FORALLTECHNOLOGIES SCIENCES PRIVATE LIMITED',
        'LEGALNITIAISOLUTIONS PRIVATE LIMITED'
    ]
    
    for c_name in company_names:
        check_company_name(c_name, session_token)

if __name__ == "__main__":
    main()
