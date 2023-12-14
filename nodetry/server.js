var CryptoJS=require("crypto-js")
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
encrypt()