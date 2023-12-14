import requests
from bs4 import BeautifulSoup
from Crypto.Cipher import AES
from Crypto.Protocol.KDF import PBKDF2
from Crypto.Util.Padding import pad, unpad
from binascii import unhexlify
import base64
import json
import urllib
from datetime import datetime
with open("data_ie.json", "r") as json_file:
    inp = json.load(json_file)
def create_captcha():
    response0 = requests.request("GET", "https://www.dgft.gov.in/CP/")
    awsalb=response0.headers['set-cookie'].split(";")[0]
    html_content = response0.text
    soup = BeautifulSoup(html_content, 'html.parser')
    if csrf_value := soup.find('meta', attrs={'name': '_csrf'}):
        csrf = csrf_value.get('content')
        print("CSRF Content:", csrf)
    else:
        print("CSRF Meta tag not found.")
        
    headers = {
    'Cookie':f'{awsalb}'}
    payload=None

    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/webHP?requestType=ApplicationRH&actionVal=visiterCount&screenId=90000802&_csrf={csrf}", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-3].split(", ")[1]
    headers = { 'Cookie':f'{jsessionId}; {awsalb}'}
    payload=base64.b64decode("cG9ydGFsPUNBUw==")

    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/webHP?requestType=ApplicationRH&actionVal=loginModel&screenId=90000512&_csrf={csrf}", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    html = response0.content
    soup = BeautifulSoup(html, "html.parser")
    desired_id_element = soup.find(id="temp_key")
    salt = desired_id_element.get('value')
    class AesUtil:
        def __init__(self, key_size, iteration_count):
            self.key_size = key_size // 8
            self.iteration_count = iteration_count

        def generate_key(self, salt, pass_phrase):
            return PBKDF2(
                pass_phrase.encode(),
                unhexlify(salt),
                dkLen=self.key_size,
                count=self.iteration_count,
            )

        def encrypt(self, salt, iv, pass_phrase, plain_text):
            key = self.generate_key(salt, pass_phrase)
            cipher = AES.new(key, AES.MODE_CBC, iv=unhexlify(iv))
            padded_text = pad(plain_text.encode(), AES.block_size)
            ciphertext = cipher.encrypt(padded_text)
            return base64.b64encode(ciphertext).decode()

        def decrypt(self, salt, iv, pass_phrase, cipher_text):
            key = self.generate_key(salt, pass_phrase)
            cipher = AES.new(key, AES.MODE_CBC, iv=unhexlify(iv))
            ciphertext = base64.b64decode(cipher_text)
            decrypted_data = unpad(cipher.decrypt(ciphertext), AES.block_size)
            return decrypted_data.decode()

    def encrypt_password(plain_text, salt, iv, pass_phrase):
        iteration_count = 1000
        key_size = 128
        aes_util = AesUtil(key_size, iteration_count)
        return aes_util.encrypt(salt, iv, pass_phrase, plain_text)

    def decrypt_password(cipher_text, salt, iv, pass_phrase):
        iteration_count = 1000
        key_size = 128
        aes_util = AesUtil(key_size, iteration_count)
        return aes_util.decrypt(salt, iv, pass_phrase, cipher_text)
    plain_text = inp['password']
    iv = "4d67fd8ee80132c6115e39880b08165d"
    pass_phrase = "tcs@1234"
    encrypted_result = encrypt_password(plain_text, salt, iv, pass_phrase)
    print("Encrypted Password:", encrypted_result)
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload=base64.b64decode("cG9ydGFsPUNBUw==")

    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/webHP?requestType=ApplicationRH&actionVal=commonCaptcha&screenId=90000512&_csrf={csrf}", headers=headers, data=payload)

    html = response0.content
    soup = BeautifulSoup(html, "html.parser")
    captcha_element = soup.find(id="captcha")
    captcha_id=captcha_element.get("src").split("?")[1]
    awsalb=response0.headers['set-cookie'].split(";")[0]

    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload=None

    response0 = requests.request("GET", f"https://www.dgft.gov.in/CP/SimpleCaptcha?{captcha_id}", headers=headers, data=payload)
    if response0.status_code == 200:
        image_path = "captcha_image3.jpg"
        with open(image_path, 'wb') as image_file:
            for chunk in response0.iter_content(chunk_size=128):
                image_file.write(chunk)
        print("CAPTCHA image saved as:", image_path)
    else:
        print("Failed to fetch CAPTCHA image")
    awsalb=response0.headers['set-cookie'].split(';')[0]
    return jsessionId,awsalb,csrf,encrypted_result


def verify_captcha(jsessionId,awsalb,captcha,csrf,encrypted_result):
    captcha="KARP4"
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'
    }
    payload=None
    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/webHP?requestType=ApplicationRH&actionVal=checkCaptcha&queryType=Select&screenId=114&captcha_val={captcha}&_csrf={csrf}", headers=headers, data=payload)
    print(response0.text)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    data = {
        "username": inp['userid'],
        "password": encrypted_result,
        "txt_Captcha": captcha,
        "captcha_val": ""
    }
    response0 = requests.request("POST", "https://www.dgft.gov.in/CP/j_spring_security_check", headers=headers, data=data)
    print(response0.status_code)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-4].split(', ')[1]
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload=None

    response0 = requests.request("GET", "https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=checkLogin", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-4].split(', ')[1]
    html_content = response0.text
    soup = BeautifulSoup(html_content, 'html.parser')
    if csrf_value := soup.find('meta', attrs={'name': '_csrf'}):
        csrf = csrf_value.get('content')
        print("CSRF Content:", csrf)
    else:
        print("CSRF Meta tag not found.")
    return jsessionId,awsalb,csrf
def run(jsessionId,awsalb,csrf):
    
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload=base64.b64decode("cG9ydGFsPUNBUw==")

    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&menuCode=50001&actionVal=loadpage&screenId=50001&appId=201000001&_csrf={csrf}", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-4].split(', ')[1]
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload=None

    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=applicantDetailsFromRegistration&screenId=50001&_csrf={csrf}", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-5].split(', ')[1]
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload={
        "panNumber":inp['payload1']['iecRequestGeneralDetailsDTO']['panNumber']}

    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=isPanExist&screenId=50001&appId=2&_csrf={csrf}", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-5].split(', ')[1]

    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload={
        "panNumber":inp['payload1']['iecRequestGeneralDetailsDTO']['panNumber'],
        "nameAsPan":inp['payload1']['iecRequestGeneralDetailsDTO']['nameAsPan'],
        "birthdate":inp['payload1']['iecRequestGeneralDetailsDTO']['birthdate'],
        "panChange":"true"
    }
    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=validatePan&screenId=50001&_csrf={csrf}", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-5].split(', ')[1]

    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload = {
        "iecModule[iecRequestGeneralDetailsDTO][cin]": "undefined",
        "cin": inp['payload1']['iecRequestGeneralDetailsDTO']['cin'],
        "gstin": ""
    }
    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=getCINData&screenId=50001&_csrf={csrf}", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-5].split(', ')[1]
    inp['payload1']['iecRequestGeneralDetailsDTO']['isCINChange']=json.loads(response0.text)['isCINChange']
    if json.loads(response0.text)['sezEntity'] == None:
        inp['payload1']['iecRequestGeneralDetailsDTO']['sezEntity']='NO'
    else:
        inp['payload1']['iecRequestGeneralDetailsDTO']['sezEntity']= json.loads(response0.text)['sezEntity']
    if json.loads(response0.text)['sezEntity'] == None:
        inp['payload1']['iecRequestGeneralDetailsDTO']['eouEntity']='NO'
    else:
        inp['payload1']['iecRequestGeneralDetailsDTO']['eouEntity']= json.loads(response0.text)['eouEntity']

    headers = {
        'Cookie': f'{jsessionId}; {awsalb}'
    }

    file_url1 = r'''https://legalnitiai.s3.ap-south-1.amazonaws.com/GST-reg/Certificate+of+Incorporation+.pdf'''
    filename1=file_url1.split('/')[-1].replace("+"," ")
    response1 = requests.get(file_url1)
    inp['payload1']['iecRequestGeneralDetailsDTO']['totalFileSize_generalAttach']=str(int(response1.headers['Content-length'])/(1024*1024))[:4]
    if response1.status_code == 200:
        files = {
            'importFilegeneralAttach': (filename1, response1.content, 'application/pdf')
        }
        response0 = requests.post(f"https://www.dgft.gov.in/CP/Upload?attachmentNameHidden=generalAttach&customFunction=&_csrf={csrf}&attachment_type=undefined&_csrf={csrf}", headers=headers, files=files)
        if response0.status_code == 200:
            print("Request was successful.")
        else:
            print(f"Request failed with status code: {response0.status_code}")
    else:
        print(f"Failed to download file with status code: {response0.status_code}")
    soup = BeautifulSoup(response0.text, 'html.parser')
    attachment_input = soup.find('input', {'id': 'AttachmentString_generalAttach'})
    gen_attach=attachment_input.get('value')
    print(gen_attach)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload=None
    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=pincodeData&screenId=99000888&pincode={inp['payload1']['iecRequestGeneralDetailsDTO']['pincode']}&_csrf={csrf}", headers=headers)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-5].split(', ')[1]
    inp['payload1']['iecRequestGeneralDetailsDTO']['state']=json.loads(response0.text)['state']
    inp['payload1']['iecRequestGeneralDetailsDTO']['district']=json.loads(response0.text)['district']
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    payload= {
        "pincode": inp['payload1']['iecRequestGeneralDetailsDTO']['pincode'],
        "districtkey": inp['payload1']['iecRequestGeneralDetailsDTO']['district']['key'],
        "districtvalue": inp['payload1']['iecRequestGeneralDetailsDTO']['district']['value'],
        "sezEntity": inp['payload1']['iecRequestGeneralDetailsDTO']['sezEntity']
    }
    response0 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=getDGFTOffice&screenId=50001&_csrf={csrf}", headers=headers, data=payload)
    awsalb=response0.headers['set-cookie'].split(";")[0]
    jsessionId=response0.headers['set-cookie'].split(";")[-5].split(', ')[1]
    inp['payload1']['iecRequestGeneralDetailsDTO']['dgft']=json.loads(response0.text)[0]

    headers = {
        'Cookie': f'{jsessionId}; {awsalb}'
    }

    file_url2 = inp['addressAttach']
    filename2=file_url2.split('/')[-1].replace("+"," ")
    response2 = requests.get(file_url2)
    inp['payload1']['iecRequestGeneralDetailsDTO']['totalFileSize_addressAttach']=totalFileSize_addressAttach=str(int(response1.headers['Content-length'])/(1024*1024))[:4]

    if response2.status_code == 200:
        files = {
            'importFileaddressAttach': (filename2, response2.content, 'application/pdf')
        }
        response0 = requests.post(f"https://www.dgft.gov.in/CP/Upload?attachmentNameHidden=addressAttach&customFunction=&_csrf={csrf}&attachment_type=undefined&_csrf={csrf}", headers=headers, files=files)
        if response0.status_code == 200:
            print("Request was successful.")
        else:
            print(f"Request failed with status code: {response0.status_code}")
    else:
        print(f"Failed to download file with status code: {response0.status_code}")
    soup = BeautifulSoup(response0.text, 'html.parser')
    if attachment_input := soup.find(
        'input', {'id': 'AttachmentString_addressAttach'}
    ):
        Address_attach = attachment_input.get('value')
        print("Value of ADDRESSattach:", Address_attach)
    else:
        print("AttachmentString_generalAttach not found in the response.")
    awsalb=response0.headers['set-cookie'].split(";")[0]
    inp['payload1']['iecRequestGeneralDetailsDTO']['AttachmentString_generalAttach']=gen_attach
    inp['payload1']['iecRequestGeneralDetailsDTO']['AttachmentString_addressAttach']=Address_attach
    inp['payload1']['iecRequestGeneralDetailsDTO']['generalDetailsAttachmentDTO']['s3Path']=gen_attach
    inp['payload1']['iecRequestGeneralDetailsDTO']['addressDetailsAttachmentDTO']['s3Path']=Address_attach
    payload={
        "iecModule":json.dumps(inp['payload1']),
        "draftId":"",
        "panNumber":inp['payload1']['iecRequestGeneralDetailsDTO']['panNumber'],
        "nameAsPan":inp['payload1']['iecRequestGeneralDetailsDTO']['panNumber'],
        "birthdate":inp['payload1']['iecRequestGeneralDetailsDTO']['birthdate']
    }
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    response3 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=handleRequest&screenId=50001&direction=next&currentTab=generalInformation&fromTab=&fromIndex=&toIndex=&_csrf={csrf}", headers=headers, data=payload)
    soup = BeautifulSoup(response3.text, 'html.parser')
    app_no=soup.find(id="applicationNumber").get('value')
    draftId=soup.find(id="draftId").get("value")
    awsalb=response3.headers['set-cookie'].split(";")[0]
    jsessionId=response3.headers['set-cookie'].split(";")[-4].split(', ')[1]
    a=json.loads(soup.find(id="moduleJson").get("value"))
    a['iecRequestDirectorDetailsDTOs']=inp['iecRequestDirectorDetailsDTOs']
    payload={
        "iecModule":json.dumps(a),
        "draftId":draftId,
        "din":"",
        "directorNameAsPan":"",
        "panDirector":"",
        "birthdateDir":""
    }
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    response3 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=handleRequest&screenId=50001&direction=next&currentTab=detailsOfProperioter&fromTab=&fromIndex=&toIndex=&_csrf={csrf}", headers=headers, data=payload)
    soup = BeautifulSoup(response3.text, 'html.parser')
    awsalb=response3.headers['set-cookie'].split(";")[0]
    jsessionId=response3.headers['set-cookie'].split(";")[-4].split(', ')[1]
    b=json.loads(soup.find(id="moduleJson").get("value"))

    headers = {
        'Cookie': f'{jsessionId}; {awsalb}'
    }

    file_url3 = inp['importFile1']
    filename3=file_url3.split('/')[-1].replace("+"," ")
    response3 = requests.get(file_url3)
    if response3.status_code == 200:
        files = {
            'importFile1': (filename3, response3.content, 'application/pdf')
        }
        response0 = requests.post(f"https://www.dgft.gov.in/CP/Upload?attachmentNameHidden=1&attachmentNameSingle=attach_bank&attachmentFormName=bankForm&_csrf={csrf}&reDirectPage=singleDgftAttachment&dgftSingleAllowedExtensions=pdf&_csrf={csrf}", headers=headers, files=files)
        if response0.status_code == 200:
            print("Request was successful.")
        else:
            print(f"Request failed with status code: {response0.status_code}")
    else:
        print(f"Failed to download file with status code: {response0.status_code}")
    soup = BeautifulSoup(response0.text, 'html.parser')
    if attachmentStr := soup.find(
        'input', {'id': 'attachmentStr'}
    ):
        attachmentStr = attachment_input.get('value')
        print("Value of attachmentStr:", attachmentStr)
    else:
        print("attachmentStr not found in the response.")
    awsalb=response0.headers['set-cookie'].split(";")[0]
    b['bankDetailsDTOs']=inp['bankDetailsDTOs']
    b['bankDetailsDTOs'][0]['bankAttachmentDTO']['s3Path']=attachmentStr
    b['bankDetailsDTOs'][0]['bankAttachmentDTO']['fileName']=filename3
    payload={
        "iecModule":json.dumps(b),
        "draftId":draftId,
        "bankName":b['bankDetailsDTOs'][0]['bankName'],
        "branchAddress":"",
        "accHolder":"",
        "ifsCode":""
    }
    headers = {

    'Cookie':f'{jsessionId}; {awsalb}'}
    response3 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=handleRequest&screenId=50001&direction=next&currentTab=bankInformation&fromTab=&fromIndex=&toIndex=&_csrf={csrf}", headers=headers, data=payload)
    soup = BeautifulSoup(response3.text, 'html.parser')
    awsalb=response3.headers['set-cookie'].split(";")[0]
    jsessionId=response3.headers['set-cookie'].split(";")[-4].split(', ')[1]
    c=json.loads(soup.find(id="moduleJson").get("value"))
    c['iecRequestOtherDetailsDTO']=inp['iecRequestOtherDetailsDTO']
    payload={
        "iecModule":json.dumps(c),
        "draftId":draftId
    }
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    response3 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=handleRequest&screenId=50001&direction=next&currentTab=otherDetails&fromTab=&fromIndex=&toIndex=&_csrf={csrf}", headers=headers, data=payload)
    soup = BeautifulSoup(response3.text, 'html.parser')
    awsalb=response3.headers['set-cookie'].split(";")[0]
    jsessionId=response3.headers['set-cookie'].split(";")[-4].split(', ')[1]
    d=json.loads(soup.find(id="moduleJson").get("value"))
    d['place']=inp['place']
    d['declarationDate']=datetime.now().strftime("%d-%m-%Y")
    d['declarationCheck']=True
    payload={
        "iecModule":json.dumps(d),
        "draftId":draftId,
        "place":d['place'],
        "appId":"1"
    }
    headers = {
    'Cookie':f'{jsessionId}; {awsalb}'}
    response3 = requests.request("POST", f"https://www.dgft.gov.in/CP/web?requestType=ApplicationRH&actionVal=handleRequest&screenId=50001&direction=next&currentTab=declaration&fromTab=&fromIndex=&toIndex=&_csrf={csrf}", headers=headers, data=payload)
