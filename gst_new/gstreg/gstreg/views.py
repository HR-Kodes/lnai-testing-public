import json
import numpy as np
import requests
from django.http import HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from datetime import date
class RegistrationProcessView(APIView):
    def get(self, request):
        response = requests.get("http://reg.gst.gov.in/registration/")
        cookie = response.headers['Set-Cookie'].split(';')[0]
        captcha_cookie = ''
        inp = {}

        with open('data.json', 'r', encoding='utf-8') as json_file:
            inp = json.load(json_file)

        url = f"https://reg.gst.gov.in/services/captcha?rnd={np.random.random()}"
        headers = {
            "Host": "reg.gst.gov.in",
            "Cookie": cookie,
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "Referer": "https://reg.gst.gov.in/registration/",
        }

        response = requests.get(url, headers=headers, stream=True)
        captcha_cookie = response.headers['Set-Cookie'].split('; ')[0]

        if response.status_code != 200:
            return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
        with open("captcha.png", "wb") as f:
            for chunk in response.iter_content(chunk_size=128):
                f.write(chunk)
        print("Captcha image saved as captcha.png")

        # Store variables in session
        request.session['cookie'] = cookie
        request.session['captcha_cookie'] = captcha_cookie
        request.session['inp'] = inp

        return JsonResponse({"captchacookie": captcha_cookie, "cookie": cookie})

class GenerateOTP(APIView):
    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body)
        captcha = request_data.get('captcha')

        if not captcha:
            return HttpResponseBadRequest("Missing 'captcha' parameter")

        # Retrieve variables from session
        cookie = request.session.get('cookie')
        captcha_cookie = request.session.get('captcha_cookie')
        inp = request.session.get('inp')

        url = "https://reg.gst.gov.in/registration/api/submit/sendotp"
        headers = {
            "Host": "reg.gst.gov.in",
            "Cookie": f"{cookie}; {captcha_cookie}",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://reg.gst.gov.in"
        }

        data = {
            'applnType': 'APLRG',
            'pt': 'P',
            'stCd': inp['opdtls'][0]['rsad']['stcd'],
            'dtCd': inp['opdtls'][0]['rsad']['dst'],
            'lgBzName': inp['opdtls'][0]['fn'] + " " + inp['opdtls'][0]['mn'] + " " + inp['opdtls'][0]['ln'],
            'id': inp['opdtls'][0]['pan']['num'],
            'email': inp['opdtls'][0]['em'],
            'mbno': inp['opdtls'][0]['mbno'],
            'captcha': captcha
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))
        

        if 'invalid' in response.json()['message']:
            return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
        print(response.text)
        request.session['gen_data'] = json.dumps(data)
        return JsonResponse({"response": response.text})

class SubmitOTP1(APIView):
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body)
        sms_otp = request_data.get('sms_otp')
        email_otp = request_data.get('email_otp')
        # print(sms_otp)
        # print(email_otp)    
        data = json.loads(request.session.get('gen_data'))
        # print(data)
        if not sms_otp and not email_otp:
            return HttpResponseBadRequest("Missing 'sms_otp' or 'email_otp' parameter")

        # Retrieve variables from session
        cookie = request.session.get('cookie')
        captcha_cookie = request.session.get('captcha_cookie')
        # print(captcha_cookie)
        # data = {}  # Initialize data here with the required data

        url = "https://reg.gst.gov.in/registration/api/submit/submitotp"
        headers = {
            "Host": "reg.gst.gov.in",
            "Cookie": f"{cookie}; {captcha_cookie}",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://reg.gst.gov.in"
        }

        del data['captcha']
        data["smsOtp"] = sms_otp
        data["emailOtp"] = email_otp

        response = requests.post(url, headers=headers, data=json.dumps(data))
        trn = json.loads(response.text)['trn']
        print(trn)
        request.session['trn']=trn
        if response.status_code != 200:
            return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
        print(response.text)
        return JsonResponse({"response": response.text})

class SendTRNOTP(APIView):
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body)
        captcha = request_data.get('captcha')
        trn = request.session.get('trn')

        if not captcha:
            return HttpResponseBadRequest("Missing 'captcha' parameter")

        # Retrieve variables from session
        cookie = request.session.get('cookie')
        captcha_cookie = request.session.get('captcha_cookie')

        url = "https://reg.gst.gov.in/registration/api/submit/sendtrnotp"
        headers = {
            "Host": "reg.gst.gov.in",
            "Cookie": f"{cookie}; {captcha_cookie}",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://reg.gst.gov.in"
        }

        data = {"trn": trn, "captcha": captcha}
        response = requests.post(url, headers=headers, data=json.dumps(data))
        print(trn)

        if response.status_code != 200:
            return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
        print(response.text)
        return JsonResponse({"response": response.text})

class SubmitOTP2(APIView):
    def post(self, request, *args, **kwargs):
        request_data = json.loads(request.body)
        otp = request_data.get('otp')
        trn=request.session.get('trn')
        if not otp:
            return HttpResponseBadRequest("Missing 'otp' parameter")

        # Retrieve variables from session
        cookie = request.session.get('cookie')

        url = "https://reg.gst.gov.in/registration/api/submit/submittrnotp"
        headers = {
            "Host": "reg.gst.gov.in",
            "Cookie": f"{cookie}",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://reg.gst.gov.in"
        }

        data = {"trn": trn, "smsOtp": otp}
        response = requests.post(url, headers=headers, data=json.dumps(data))
        auth_token = response.headers['set-cookie'].split(';')[0].split('=')[1]
        new_cookie = f"{cookie}; AuthToken={auth_token}"
        request.session['auth_token']=auth_token
        request.session['new_cookie']=new_cookie
        if response.status_code != 200:
            return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
        print(response.text)
        return JsonResponse({"response": response.text})

class Pandetails(APIView):
    def get(self, request):
        # Retrieve variables from session
        cookie = request.session.get('cookie')
        inp = request.session.get('inp')
        cookie=request.session.get('cookie')
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
        pandate = json.loads(response.text)['panDate']

        if response.status_code != 200:
            return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
        print(response.text)
        return JsonResponse({"response": response.text})

class DraftId(APIView):
    def get(self, request):
        # Retrieve variables from session
        # print(request.session.get('new_cookie'))
        inp=request.session.get('inp')
        new_cookie=request.session.get('new_cookie')
        
        trn=request.session.get('trn')
        print(trn)
        url = "https://reg.gst.gov.in/registration/auth/api/myapp"
        headers = {
            "Host": "reg.gst.gov.in",
            "Cookie": new_cookie,
        }
        response = requests.get(url, headers=headers)
        print(trn)
        print(response.text)
        draft_id=json.loads(response.text)[0]['draft_id']
        inp['aplCd']=draft_id
        request.session['inp']=inp
        request.session['draft_id']=draft_id
        if response.status_code != 200:
            return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
        print(response.text)
        return JsonResponse({"response": response.text})

class PromoterPhoto(APIView):
        def post(self, request, *args, **kwargs):
            request_data = json.loads(request.body)
            inp=request.session.get("inp")
            file_url = request_data.get('file_url')
            new_cookie=request.session.get('new_cookie')
            draft_id=request.session.get("draft_id")
            #to upload photograph of promoter
            s3_file_response = requests.get(file_url, stream=True)
            s3_file_response.raise_for_status()  # Check for any download errors
            file_name = file_url.split("/")[-1]

            files = {
                "upfile": (file_name, s3_file_response.content, "image/jpeg"),
            }
            url = "https://reg.gst.gov.in/document"
            headers = {
                "Cookie": new_cookie,
                "Origin": "https://reg.gst.gov.in",
                "Referer": "https://reg.gst.gov.in/registration/auth/newappl/promoters"
            }
            data1 = {
                "ty": "PHOT",
                "applnid": draft_id
            }

            response = requests.post(url, headers=headers, files=files, data=data1)
            prom_photo=json.loads(response.text)
            inp['opdtls'][0]['dcupdtls']=prom_photo
            request.session['inp']=inp
            print("Response Content:", response.text)
            if response.status_code != 200:
                return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
            print(response.text)
            return JsonResponse({"response": response.text})

class AuthSign(APIView):
        def post(self, request, *args, **kwargs):
            request_data = json.loads(request.body)
            inp=request.session.get('inp')
            file_url1 = request_data.get('file_url1')
            file_url2 = request_data.get('file_url2')
            
            new_cookie=request.session.get('new_cookie')
            draft_id=request.session.get("draft_id")
            s3_file_response1 = requests.get(file_url1, stream=True)
            # s3_file_response1.raise_for_status()  
            file_name1 = file_url1.split("/")[-1]

            file1 = {
                "upfile": (file_name1, s3_file_response1.content, "application/pdf"),
            }
            url = "https://reg.gst.gov.in/document"
            headers = {
                "Cookie": new_cookie,
                "Origin": "https://reg.gst.gov.in",
                "Referer": "https://reg.gst.gov.in/registration/auth/newappl/authsignatory"
            }
            
            data1 = {
                "ty": "LOAU",
                #"ty":"CRBC" if Copy of resolution passed by BoD / Managing Committee
                "applnid": draft_id
            }

            response = requests.post(url, headers=headers, files=file1, data=data1)
            auth_sign_att1=json.loads(response.text)
            print("Response Content:", response.text)
            
            s3_file_response2 = requests.get(file_url2, stream=True)
            s3_file_response2.raise_for_status()  # Check for any download errors
            file_name2 = file_url2.split("/")[-1]
            file2 = {
                "upfile": (file_name2, s3_file_response2.content, "image/jpeg"),
            }
            data2 = {
                "ty": "PHOT",
                "applnid": draft_id
            }
            response = requests.post(url, headers=headers, files=file2, data=data1)
            print("Response Content:", response.text)
            auth_sign_att2=json.loads(response.text)
            inp['asgdtls'][0]['dcupdtls']=[auth_sign_att1,auth_sign_att2]
            request.session['inp']=inp
            if response.status_code != 200:
                return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
            print(response.text)
            return JsonResponse({"response": response.text})
class address_proof(APIView):
    def post(self, request, *args, **kwargs):
            request_data = json.loads(request.body)
            inp=request.session.get('inp')
            trn=request.session.get('trn')
            file_url1 = request_data.get('file_url1')
            file_url2 = request_data.get('file_url2')
            
            new_cookie=request.session.get('new_cookie')
            draft_id=request.session.get("draft_id")
            s3_file_response1 = requests.get(file_url1, stream=True)
            # s3_file_response1.raise_for_status()  
            file_name1 = file_url1.split("/")[-1]

            file1 = {
                "upfile": (file_name1, s3_file_response1.content, "image/jpeg"),
            }
            url = "https://reg.gst.gov.in/document"
            headers = {
                "Cookie": new_cookie,
                "Origin": "https://reg.gst.gov.in",
                "Referer": "https://reg.gst.gov.in/registration/auth/newappl/business/place"
            }
            
            data1 = {
                "ty": "ELCB",
                "applnid": draft_id
            }

            response = requests.post(url, headers=headers, files=file1, data=data1)
            ppz_doc_att1=json.loads(response.text)
            print("Response Content:", response.text)
            
            s3_file_response2 = requests.get(file_url2, stream=True)
            s3_file_response2.raise_for_status()  # Check for any download errors
            file_name2 = file_url2.split("/")[-1]
            file2 = {
                "upfile": (file_name2, s3_file_response2.content, "application/pdf"),
            }
            data2 = {
                "ty": "CNLR",
                "applnid": draft_id
            }
            response = requests.post(url, headers=headers, files=file2, data=data1)
            print("Response Content:", response.text)
            ppz_doc_att2=json.loads(response.text)
            inp['ppbzdtls']['dcupdtls']=[ppz_doc_att1,ppz_doc_att2]
            inp['secToken']=trn
            inp['stsidtls']={}
            inp['adhrflag']="Y"
            inp['asgdtls'][0]['aadhaarflag']="Y"
            inp['opdtls'][0]['aadhaarflag']="Y"
            inp['decdtls']={'asdes': inp['opdtls'][0]['dg'], 'pl': inp['opdtls'][0]['rsad']['loc'], 'dt': date.today().strftime("%d/%m/%Y"), 'asnm': inp['opdtls'][0]['pan']['num']}

            request.session['inp']=inp
            if response.status_code != 200:
                return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
            print(response.text)
            return JsonResponse({"response": response.text})
        
class gen_evc_otp(APIView):
    def get(self, request):
        new_cookie=request.session.get('new_cookie')
        auth_token=request.session.get("auth_token")
        inp=request.session.get("inp")
        trn=request.session.get("inp")
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
        request.session['tranid']=tranid
        if response.status_code != 200:
                return JsonResponse({"error": f"Request failed with status code: {response.status_code}"})
        print(response.text)
        return JsonResponse({"response": response.text})
    
class submit_evc_otp(APIView):
        def post(self, request, *args, **kwargs):
            request_data = json.loads(request.body)
            new_cookie=request.session.get('new_cookie')
            auth_token=request.session.get('auth_token')
            inp=request.session.get('inp')
            tranid=request.session.get('tranid')
            trn=request.session.get('trn')
            
            otp = request_data.get('otp')
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


