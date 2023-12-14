from django.urls import path
from companyavailabilityapp.views import CompanyAvailabilityView ,PincodeinfoView,DetectObjectsAndTextView,AttendanceSheet,DirectorList,Minutemeet,RelatedDirectorCompanies,Cindata


urlpatterns = [
    path('companyavailability/<str:c_name>/', CompanyAvailabilityView.as_view(), name='check_company_availability'),
    path('pincode/<int:pincode>/', PincodeinfoView.as_view(), name='get_pincode_info'),
    path('detect', DetectObjectsAndTextView.as_view(), name='detect-objects'),
    path('attendancesheet',AttendanceSheet.as_view(),name='attendance-sheet'),
    path('directorlist',DirectorList.as_view(),name='director-list'),
    path('minutemeet',Minutemeet.as_view(),name='minute-meet'),
    path('companydirector/<str:cin>/',RelatedDirectorCompanies.as_view(),name='companyinfo'),
    path('companydata/<str:cin>/',Cindata.as_view(),name='companyinfo')

    # path('noticemeet/',GenerateNoticeView.as_view(),name='notice-view')
]