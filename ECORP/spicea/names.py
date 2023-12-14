import json
from urllib.parse import unquote
import requests


def fetch_business_names(keywords, description):
    url = 'https://namelix.com/app/load7.php'
    headers = {
        'Host': 'namelix.com',
        'Cookie': '_gid=GA1.2.1507851473.1686314518; _ga_8FEYX4RE7V=GS1.1.1686314518.1.1.1686314548.0.0.0; _ga=GA1.1.1138832737.1686314518',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.110 Safari/537.36',
        'Origin': 'https://namelix.com',
        'Referer': 'https://namelix.com/app/?keywords=GOTURN+PRIVATE+LIMITED',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9'
    }

    business_names = []
    for page in range(1, 4):  # Fetch data from pages 1, 2, and 3
        data = {
            'keywords': keywords,
            'description': description,
            'blacklist': '',
            'max_length': '25',
            'style': 'auto',
            'random': 'low',
            'extensions[]': 'com',
            'require_domains': 'false',
            'premium_index': '0',
            'page': str(page)
        }

        # Encode the dictionary into URL-encoded form
        encoded_payload = "&".join(
            [f"{key}={str(value).replace(' ', '+')}" for key, value in data.items()]).replace("[]", '%5B%5D')

        response = requests.post(url, headers=headers, data=encoded_payload)
        text = json.loads(response.text)
        business_names.extend([item["businessName"] for item in text])

    modified_names = [
        name.upper() + ' PRIVATE LIMITED' for name in business_names]
    return modified_names


if __name__ == "__main__":
    keywords = input("Enter keywords: ")
    description = input("Enter description: ")
    business_names = fetch_business_names(keywords, description)
