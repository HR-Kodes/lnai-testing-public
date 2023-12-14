"""
URL configuration for gstreg project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views
from . import views
# from gstreg.views import RegistrationProcessView,generate_otp,submitOtp1,sendtrnotp,submitOtp2,pandetails
# URL configuration
# urlpatterns = [
#     # path('api/captcha/', CaptchaProcessView.as_view(), name='captcha-process'),
#     path('registration', RegistrationProcessView.as_view(), name='registration-process'),
#     path('generate_otp', generate_otp.as_view(), name='generate_otp'),
#     path('submitOtp1', submitOtp1.as_view(), name='submitOtp1'),
#     path('sendtrnotp', sendtrnotp.as_view(), name='sendtrnotp'),
#     path('submitOtp2', submitOtp2.as_view(), name='submitOtp2'),
#     path('pandetails', pandetails.as_view(), name='pandetails'),]
urlpatterns = [
    # Map the RegistrationProcessView to the '/registration-process/' endpoint
    path('registration-process/', views.RegistrationProcessView.as_view(), name='registration_process'),

    # Map the GenerateOTP view to the '/generate-otp/' endpoint
    path('generate-otp/', views.GenerateOTP.as_view(), name='generate_otp'),

    # Map the SubmitOTP1 view to the '/submit-otp1/' endpoint
    path('submit-otp1/', views.SubmitOTP1.as_view(), name='submit_otp1'),

    # Map the SendTRNOTP view to the '/send-trno-tp/' endpoint
    path('send-trno-tp/', views.SendTRNOTP.as_view(), name='send_trno_tp'),

    # Map the SubmitOTP2 view to the '/submit-otp2/' endpoint
    path('submit-otp2/', views.SubmitOTP2.as_view(), name='submit_otp2'),

    # Map the Pandetails view to the '/pandetails/' endpoint
    path('pandetails/', views.Pandetails.as_view(), name='pandetails'),

    # Map the DraftId view to the '/draft-id/' endpoint
    path('draft-id/', views.DraftId.as_view(), name='draft_id'),
    path('PromoterPhoto/', views.PromoterPhoto.as_view(), name='PromoterPhoto'),
    path('AuthSign/', views.AuthSign.as_view(), name='AuthSign'),
    path('address_proof/', views.address_proof.as_view(), name='address_proof'),
    path('gen_evc_otp/', views.gen_evc_otp.as_view(), name='gen_evc_otp'),
    path('submit_evc_otp/', views.submit_evc_otp.as_view(), name='submit_evc_otp'),

]