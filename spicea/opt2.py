import aiohttp
import asyncio
import requests


async def fetch(session, url, data, headers):
    async with session.post(url, data=data, headers=headers) as response:
        content_type = response.headers.get("Content-Type", "")
        if response.status == 200:
            if "application/json" in content_type:
                return await response.json()
            else:
                return await response.text()
        else:
            raise ValueError(
                f"Request failed with status code {response.status}")


async def get_session_token():
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

    start_index = set_cookie_value.find(
        "session-token=") + len("session-token=")
    end_index = set_cookie_value.find(";", start_index)
    session_token = set_cookie_value[start_index:end_index]

    return session_token


async def has_empty_alert(session, business_name, headers):

    url = "https://www.mca.gov.in/bin/mca-gov/RunLLPSaveSubmit"
    data = aiohttp.FormData()
    data.add_field("data", '{"requestBody":{"formData":{"purpose":"New Incorporation","proposedname1":"DECORPLANNER LLP","formIntegrationId":"1686922988308_FOUSER","NICcode1":"98200","NICCode1Desc":"Undifferentiated service-producing activities of private households for own use","NICcode2":"98100","NICCode2Desc":"Undifferentiated goods-producing activities of private households for own use","NICcode3":"","NICCode3Desc":"","formAttachment":[]},"formDescription":"RUN LLP","formName":"RUN LLP","formVersion":"1.1","userId":"BIPULKUMARSINGH6690@GMAIL.COM","integrationId":"1686922988308_FOUSER","status":"Draft/Pending Submission"}}')
    data.add_field("action", "savesubmit")
    data.add_field("operation", "Submit")
    data.add_field("serveAction", "validateform")

    response = await fetch(session, url, data=data, headers=headers)

    if isinstance(response, dict):
        alert_list = response.get('validationResponse', {}).get(
            'validationresposeBody', [])
        # Process the alert_list as needed
    else:
        # Handle non-JSON response
        print("Received non-JSON response:", response)

    return business_name if not alert_list else None


async def check_alert_descriptions(business_names, headers):
    async with aiohttp.ClientSession() as session:
        tasks = [has_empty_alert(session, name, headers)
                 for name in business_names]
        results = await asyncio.gather(*tasks)
        empty_alert_names = [name for name in results if name is not None]
        return empty_alert_names


async def main():
    business_names = ["Business1", "Business2", "Business3"]
    session_token = await get_session_token()
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

    empty_alert_names = await check_alert_descriptions(business_names, headers)
    print("Business names with empty alerts:", empty_alert_names)

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
