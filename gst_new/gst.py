import json
import requests
import numpy as np
with open('data.json', 'r', encoding='utf-8') as json_file:
    inp = json.load(json_file)
url = "http://reg.gst.gov.in/registration/"
response = requests.get(url)
cookie=response.headers['Set-Cookie'].split(';')[0]
url = f"https://reg.gst.gov.in/services/captcha?rnd={np.random.random()}"
headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": cookie,
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Referer": "https://reg.gst.gov.in/registration/",
    }
response = requests.get(url, headers=headers, stream=True)
if response.status_code == 200:
    with open("captcha.png", "wb") as f:
        for chunk in response.iter_content(chunk_size=128):
            f.write(chunk)
    print("Captcha image saved as captcha.png")
else:
    print("Failed to fetch captcha image")
captchacookie = response.headers['Set-Cookie'].split('; ')[0]
captcha="552202"

url = "https://reg.gst.gov.in/registration/api/submit/sendotp"
headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": f"{cookie}; {captchacookie}",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://reg.gst.gov.in"
}
data={'applnType': 'APLRG',
 'pt': 'P',
 'stCd': inp['opdtls'][0]['rsad']['stcd'],
 'dtCd': inp['opdtls'][0]['rsad']['dst'],
 'lgBzName': inp['opdtls'][0]['fn']+" "+inp['opdtls'][0]['mn']+" "+inp['opdtls'][0]['ln'],
 'id': inp['opdtls'][0]['pan']['num'],
 'email': inp['opdtls'][0]['em'],
 'mbno': inp['opdtls'][0]['mbno'],
 'captcha': captcha}
response = requests.post(url, headers=headers, data=json.dumps(data))

print("Response Status Code:", response.status_code)
print("Response Content:")
if not 'invalid' in json.loads(response.text)['message']:
    print(response.text)

del data['captcha']
data["smsOtp"]="089379"
data["emailOtp"]="145742"
import requests
import json

url = "https://reg.gst.gov.in/registration/api/submit/submitotp"

headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": f"{cookie}; {captchacookie}",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://reg.gst.gov.in"
}
response = requests.post(url, headers=headers, data=json.dumps(data))
trn = json.loads(response.text)['trn']
url = f"https://reg.gst.gov.in/services/captcha?rnd={np.random.random()}"
headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": cookie,
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Referer": "https://reg.gst.gov.in/registration/",
    }
response = requests.get(url, headers=headers, stream=True)
if response.status_code == 200:
    with open("captcha1.png", "wb") as f:
        for chunk in response.iter_content(chunk_size=128):
            f.write(chunk)
    print("Captcha image saved as captcha1.png")
else:
    print("Failed to fetch captcha image")
captchacookie = response.headers['Set-Cookie'].split('; ')[0]
captcha = "534970"
url = "https://reg.gst.gov.in/registration/api/submit/sendtrnotp"

headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": f"{cookie}; {captchacookie}",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://reg.gst.gov.in"
}
data={"trn":f"{trn}","captcha":captcha}
response = requests.post(url, headers=headers, data=json.dumps(data))
smsotp = "480565"
url = "https://reg.gst.gov.in/registration/api/submit/submittrnotp"

headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": f"{cookie}",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://reg.gst.gov.in"
}
data={"trn":f"{trn}","smsOtp": smsotp}
response = requests.post(url, headers=headers, data=json.dumps(data))
print(response.text)
auth_token=response.headers['set-cookie'].split(';')[0].split('=')[1]
new_cookie=f"{cookie};AuthToken={auth_token};"
url = "https://reg.gst.gov.in/registration/api/get/ExstPanDtls"
headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": cookie,
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://reg.gst.gov.in",
 }
data1 = {
    "pan": inp['opdtls'][0]['pan']['num'],
    "stateCode": inp['opdtls'][0]['rsad']['stcd']
}
response = requests.post(url, headers=headers, data=json.dumps(data1))

print(response.text)
pandate=json.loads(response.text)['panDate']
url = "https://reg.gst.gov.in/registration/auth/api/myapp"
headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": new_cookie,
    }
response = requests.get(url, headers=headers)
print(response.text)
draft_id=eval(response.text)[0]['draft_id']
inp['aplCd']=draft_id
#to upload photograph of promoter
url = "https://reg.gst.gov.in/document"
headers = {
    "Cookie": new_cookie,
    "X-Requested-With": "XMLHttpRequest",
    "Origin": "https://reg.gst.gov.in",
    "Referer": "https://reg.gst.gov.in/registration/auth/newappl/promoters"
}

files = {
    "upfile": ("vethika_photo.jpeg", open(r"C:\Users\Admin\Downloads\gst_vdp\vethika_photo.jpeg", "rb"), "image/jpeg"),
}

data1 = {
    "ty": "PHOT",
    "applnid": draft_id
}

response = requests.post(url, headers=headers, files=files, data=data1)
print("Response Content:", response.text)
#auth signatory letter of auth file upload
    
url = "https://reg.gst.gov.in/document"
headers = {
    "Cookie": new_cookie,
    "Origin": "https://reg.gst.gov.in",
    "Referer": "https://reg.gst.gov.in/registration/auth/newappl/authsignatory"
    }

files = {
    "upfile": ("GST-Declaration-Authorised-Signatory_HIGH (1).pdf", open(r"gst_vdp/GST-Declaration-Authorised-Signatory_HIGH (1).pdf", "rb"), "application/pdf"),
}

data1 = {
    "ty": "LOAU",
    #"ty":"CRBC" if Copy of resolution passed by BoD / Managing Committee
    "applnid": draft_id
}

response = requests.post(url, headers=headers, files=files, data=data1)
print("Response Content:", response.text)
auth_sign_att1=json.loads(response.text)
#auth signatory photo file upload
#limit file size to 100kb
url = "https://reg.gst.gov.in/document"
headers = {
    "Cookie": new_cookie,
    "Origin": "https://reg.gst.gov.in",
    "Referer": "https://reg.gst.gov.in/registration/auth/newappl/authsignatory"
    }
files = {
    "upfile": (r"kashvi_pic.jpeg", open(r"gst_vdp/kashvi_pic.jpeg", "rb"), "image/jpeg"),
}
data1 = {
    "ty": "PHOT",
    "applnid": draft_id
}
response = requests.post(url, headers=headers, files=files, data=data1)
print("Response Content:", response.text)
auth_sign_att2=json.loads(response.text)
inp['asgdtls'][0]['dcupdtls']=[auth_sign_att1,auth_sign_att2]
url = "https://reg.gst.gov.in/documenthb/upload"
headers = {
    "Cookie": new_cookie,
    "Origin": "https://reg.gst.gov.in",
    "Referer": "https://reg.gst.gov.in/registration/auth/newappl/business/place"
}

files = {
    "upfile": ("electricty_bill.jpeg", open(r"gst_vdp/electricty_bill.jpeg", "rb"), "image/jpeg"),
}
data1 = {
    "ty": "ELCB",
    "applnid": draft_id
}

response = requests.post(url, headers=headers, files=files, data=data1)

print("Response Status Code:", response.status_code)
print("Response Content:", response.text)
id=json.loads(response.text)['id']
url = f"https://reg.gst.gov.in/documenthb/docstatus/{id}"
headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": new_cookie,
    "Accept": "application/json, text/plain, */*",
    "At": auth_token,
    "Referer": "https://reg.gst.gov.in/registration/auth/newappl/business/place",
   }
response = requests.get(url, headers=headers)
print("Response Content:", response.text)
ppz_doc_att1=json.loads(response.text)
url = "https://reg.gst.gov.in/documenthb/upload"
headers = {
    "Cookie": new_cookie,
    "Origin": "https://reg.gst.gov.in",
    "Referer": "https://reg.gst.gov.in/registration/auth/newappl/business/place"
}
files = {
    "upfile": ("NOC_high__1__compressed.pdf", open(r"gst_vdp/NOC_high__1__compressed.pdf", "rb"), "application/pdf"),
}
data1 = {
    "ty": "CNLR",
    "applnid": draft_id
}
response = requests.post(url, headers=headers, files=files, data=data1)
print("Response Content:", response.text)
id=json.loads(response.text)['id']
url = f"https://reg.gst.gov.in/documenthb/docstatus/{id}"
headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": new_cookie,
    "Accept": "application/json, text/plain, */*",
    "At": auth_token,
    "Referer": "https://reg.gst.gov.in/registration/auth/newappl/business/place",
   }
response = requests.get(url, headers=headers)

print("Response Status Code:", response.status_code)
print("Response Content:", response.text)
ppz_doc_att2=json.loads(response.text)
inp['ppbzdtls']['dcupdtls']=[ppz_doc_att1,ppz_doc_att2]
inp['secToken']=trn
inp['stsidtls']={}
inp['adhrflag']="Y"
inp['asgdtls'][0]['aadhaarflag']="Y"
inp['opdtls'][0]['aadhaarflag']="Y"
inp['decdtls']={'asdes': inp['opdtls'][0]['dg'], 'pl': inp['opdtls'][0]['rsad']['loc'], 'dt': '28/08/2023', 'asnm': inp['opdtls'][0]['pan']['num']}
url = "https://reg.gst.gov.in/registration/auth/api/save/appdraftnewreg"
headers = {
    "Host": "reg.gst.gov.in",
    "Cookie": new_cookie,
    "Content-Type": "application/json;charset=UTF-8",
    "At": auth_token,
    "Origin": "https://reg.gst.gov.in",
   }
response = requests.post(url, headers=headers, data=json.dumps(inp))
print(response.text)

ck=response.headers['Set-Cookie'].split(',')[-1].split(';')[0]
new_cookie1 = f'AuthToken={auth_token};{ck}'
import requests

url = 'https://reg.gst.gov.in/registration/auth/api/evc/otp'

headers = {
    'Host': 'reg.gst.gov.in',
    'Cookie': new_cookie1,
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    'At': auth_token,
    'Origin': 'https://reg.gst.gov.in',
    'Referer': 'https://reg.gst.gov.in/registration/auth/newappl/verify',
    }

data = {
    "formType":"APLRG","tranId":trn,"userName":inp['opdtls'][0]['fn']+" "+inp['opdtls'][0]['mn']+" "+inp['opdtls'][0]['ln'],"email":inp['opdtls'][0]['em'],"mobNo":inp['opdtls'][0]['mbno']
}

response = requests.post(url, json=data, headers=headers)
print("Response Content:", response.content)
tranid=json.loads(response.text)['message']
otp=""
import requests

url = 'https://reg.gst.gov.in/registration/auth/api/evc/submit'
headers = {
    'Host': 'reg.gst.gov.in',
    'Cookie': new_cookie,
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    'At': auth_token,
    'Origin': 'https://reg.gst.gov.in',
    'Referer': 'https://reg.gst.gov.in/registration/auth/newappl/verify',
    }
data = {
    "otp": otp,
    "dataToSign": json.dumps(inp),
    "formType": "APLRG",
    "tranId": tranid,
    "userId": trn
}

response = requests.post(url, json=data, headers=headers)
print("Response Content:", response.content)
