#Pincode number automation
import requests
import json

pincode="805131"
url = "https://www.mca.gov.in/bin/mca/login"

headers = {
    "Origin": "www.mca.gov.in",
    "Content-Length": "235",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Accept": "*/*",
    "X-Requested-With": "XMLHttpRequest",
    "Sec-Ch-Ua-Platform": "Windows"
}
#bipul's id
data="data=Ut8pBOc0RSM6iYqffqN1orWH0Ee6A57QEKGmyHa5KnuzzybQ%2BjY2pMJIsLZw9DznTxfJeWvJFEcqsU2aZC33AC2nYaU60TNo8VjomCHN2dDSdHEC2enwIeEWCNR42vj7gfXFsvEwLfoO25%2BUKeho68x7N0qx56oyIAoVHQsAH1VP5mEoz%2FgNjOF8O12Av4DsLLckO7DUNCnmr%2FYByWESRw%3D%3D"
response = requests.post(url, headers=headers, data=data)
set_cookie_value = response.headers.get('Set-Cookie')
start_index = set_cookie_value.find("session-token=") + len("session-token=")
end_index = set_cookie_value.find(";", start_index)
session_token = set_cookie_value[start_index:end_index]
url = 'https://www.mca.gov.in/content/forms/af/mca-aem-forms/form-fillip/fillip-main-form/form-fillip/jcr:content/guideContainer.af.dermis'

headers = {
    'Host': 'www.mca.gov.in',
    'Cookie': f'cookiesession1=678B2869144E6B476733B93A4104896E; deviceId=4d23ogqkdbe; alertPopup=true; session-token{session_token}',
    'Content-Length': '544',
    'Sec-Ch-Ua': '', 
    'Sec-Ch-Ua-Mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'text/plain, */*; q=0.01',
    'Csrf-Token': 'undefined',
    'X-Requested-With': 'XMLHttpRequest',
    'Sec-Ch-Ua-Platform': "",
    'Origin': 'https://www.mca.gov.in',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://www.mca.gov.in/content/mca/global/en/mca/llp-e-filling/Fillip.html',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9'
}

payload = {
    'functionToExecute': 'invokeFDMOperation',
    'formDataModelId': '/content/dam/formsanddocuments-fdm/mca-aem-forms/common-service/common-pin-info',
    "input": f'{{"Model0":{{"value":"{pincode}"}}}}',   
    'operationName': 'POST /bin/mca-gov/commonpincode',
    'guideNodePath': '/content/forms/af/mca-aem-forms/form-fillip/fillip-main-form/block2/jcr:content/guideContainer/rootPanel/items/panel_1379931518_cop/items/panel/items/panel/items/panel_702814714/items/panel/items/guidetextbox_copy_11_1386963699'
}

response = requests.post(url, headers=headers, data=payload)
print(response.text)