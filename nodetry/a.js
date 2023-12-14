
const CryptoJS = require("crypto-js");
var password12 = "MCA@1234";
var userName = "Bipulkumarsingh6690@gmail.com";
var password13 = CryptoJS.SHA1(password12);
var deviceId = Math.random().toString(36).slice(2) + clientIp;
var clientIp = "192.168.39.203";
var paramData = null;
const data = "requestType=" + "login" + "&userName=" + userName + "&password=" + password13 + "&deviceId=" + deviceId + "&clientIp=" + clientIp + "&paramData=" + paramData;
console.log(data);
// var CryptoJS=require("crypto-js")
var password = "d6163f0659cfe4196dc03c2c29aab06f10cb0a79cdfc74a45da2d72358712e80",
    salt = CryptoJS.MD5("fc74a45dsalt"),
    iv = CryptoJS.MD5("c29aab06iv"),
    keySize = 128,
    iterations = 100;

function encrypt(u) {
    var d = CryptoJS.PBKDF2(password, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });
    u = CryptoJS.AES.encrypt(u, d, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    console.log(encodeURIComponent(u.toString()));
    return encodeURIComponent(u.toString())
}
encrypt(data)