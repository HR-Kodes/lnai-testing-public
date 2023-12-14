try {
    debugger;
    localStorage.removeItem("clientIp");
    delete_cookie("session-token");
    sessionStorage.clear();
  
    if (window.guideBridge.validate([], this.panel.somExpression)) {
      loginErrorText.visible = false;
      var userRole;
      var userName = $(".userID input[type='text']").val().toUpperCase();
      var password12 = $(".password input[type='password']").val();
      var password13 = calcSHA1(password12);
      var clientIp = atob(localStorage.getItem("clientIp"));
      var deviceId = localStorage.getItem("deviceId");
      
      if (deviceId === null) {
        deviceId = Math.random().toString(36).slice(2);
        localStorage.setItem("deviceId", deviceId);
      }
      
      var paramData = getParameterByName("paramData");
  
      function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      
        return JSON.parse(jsonPayload);
      }
  
      var data = "requestType=" + "login" + "&userName=" + userName + "&password=" + password13 + "&deviceId=" + deviceId + "&clientIp=" + clientIp + "&paramData=" + paramData;
  
      $.ajax({
        url: "/bin/mca/login",
        type: "POST",
        data: "data=" + encrypt(data),
        success: function(response) {
          debugger;
          var responseDecoded = decodeURIComponent(response);
          var respJson = JSON.parse(decrypt(responseDecoded));
          
          try {
            var paramDataResponse = respJson.paramData.substring(respJson.paramData.indexOf("{"), respJson.paramData.length);
          } catch (e) {
            console.log("error in capturing the response for STK-2 paramData");
          }
          
          if (respJson.resCode === "200" || respJson.resCode == "200") {
            var errorMsg2 = JSON.parse(respJson.resStr).errorMessage2;
            var userData = JSON.parse(respJson.resStr).data;
            
            if (errorMsg2 !== "") {
              alert(errorMsg2);
            }
            
            loginErrorText.visible = false;
            var refererPage = false;
            debugger;
            var userEmail = userData.email;
            var userMobile = userData.mobile;
            var userRole = userData.userRole;
            
            if (false) {
              guidelib.util.GuideUtil.navigateToURL($("#referer").val(), 'SAME_TAB');
            } else if (localStorage.getItem("OriginModule") !== undefined && localStorage.getItem("OriginModule") !== null && localStorage.getItem("OriginModule").toLocaleLowerCase() === "VpdCart".toLocaleLowerCase()) {
              guidelib.util.GuideUtil.navigateToURL("/content/mca/global/en/mca/document-related-services/view-public-documents-v3.html", "SAME_TAB");
            } else if (userEmail === "" || userEmail === undefined || (userRole !== "Individual" && (userMobile === "" || userMobile === undefined))) {
              guidelib.util.GuideUtil.navigateToURL('/content/mca/global/en/foportal/fo-v2-initial-profile-update.html', 'SAME_TAB');
            } else if (userRole == "Regulatory Authority" && paramDataResponse !== "paramData=null") {
              guidelib.util.GuideUtil.navigateToURL("/content/mca/global/en/mca/STK-2LetterView.html?" + respJson.paramData, "SAME_TAB");
            } else {
              debugger;
              console.log("redirecting to application history");
              guidelib.util.GuideUtil.navigateToURL('/content/mca/global/en/application-history.html', 'SAME_TAB');
            }
          } else if (respJson.resCode === "206" || respJson.resCode == "206") {
            var data = JSON.parse(respJson.resStr).data;
            sessionStorage.setItem("userRole", btoa(data.userRole));
            loginLeftPanel.visible = false;
            loginRightPanel.visible = false;
            otpPanel.visible = true;
            
            sessionStorage.setItem("email", btoa(data.email));
            sessionStorage.setItem("mobile", btoa(data.mobile));
            var email = data.email;
            var mobile = data.mobile;
            var country1 = "India";
            var requestType1 = "sameOTP";
            var templateType1 = "User_Login";
            var data1 = "requestType=" + requestType1 + "&mobileNo=" + mobile + "&EmailId=" + email + "&templateType=" + templateType1 + "&countryName=" + country1;
            sendOTP(data1);
            var errorMsg3 = JSON.parse(respJson.resStr).errorMessage3;
            loginErrorText.visible = true;
            
            if (errorMsg3 !== "") {
              $("span.loginError").text(errorMsg3);
              var EmailId1 = data.email;
              var templateType2 = "New_Device_Notify";
              var mobileNo3;
              var requestType2 = "onlyEmailOTP";
              var data3 = "requestType=" + requestType2 + "&EmailId=" + EmailId1 + "&templateType=" + templateType2 + "&mobileNo=" + mobileNo3;
              sendOTP(data3);
            }
            
            panelPopUp.visible = false;
            forgetPassword.visible = true;
            forgetPasswordOTPPanel.fieldsPanel.forgetPasswordOTPFieldPanel.resend_text.visible = false;
            var timerElement = ".forgetPasswordOTPFieldPanel .timer_text #time";
            var resendField = guideBridge.resolveNode(forgetPasswordOTPFieldPanel.resend_text.somExpression);
            timerForOTP(timerElement, resendField);
          } else if (respJson.resCode === "205" || respJson.resCode == "205") {
            var errorMsg1 = JSON.parse(respJson.resStr).errorMessage1;
            var errorMsg2 = JSON.parse(respJson.resStr).errorMessage2;
            loginErrorText.visible = true;
            
            if (errorMsg1 !== "")
              $("span.loginError").text(errorMsg1);
            else if (errorMsg2 !== "")
              $("span.loginError").text(errorMsg2);
          } else {
            loginErrorText.visible = true;
            $("span.loginError").text("There is some issue with service");
          }
        },
        error: function(response) {
          loginErrorText.visible = true;
          $("span.loginError").text("There is some issue with service");
        }
      });
    }
  }
  
  function getParameterByName(name) {
    var url = (window.location != window.parent.location) ? document.referrer : document.location.href;
    name = name.replace(/[\\[\\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\\+/g, ' '));
  }
  