const CryptoJS = require('./crypto-js');
const Base64 = require('./base64');

const DES_KEY = "8Z(%^2*)";
const DES_IV = 'CAIDCQUGBwQ=';

/**
 * des 加密
 */
export const desEncrypt = (message) => {
    var keyHex = CryptoJS.enc.Utf8.parse(DES_KEY);
    var ivHex = CryptoJS.enc.Utf8.parse(Base64.decode(DES_IV));
    return CryptoJS.DES.encrypt(message, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).ciphertext.toString(CryptoJS.enc.Base64);
};

/**
 * des 解密
 */
export const desDecrypt = (message) => {
    var keyHex = CryptoJS.enc.Utf8.parse(DES_KEY);
    var ivHex = CryptoJS.enc.Utf8.parse(Base64.decode(DES_IV));
    var ciphertext = CryptoJS.enc.Hex.parse(CryptoJS.enc.Base64.parse(message).toString());
    return CryptoJS.DES.decrypt({ciphertext: ciphertext}, keyHex, {
        iv: ivHex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
};

/**
 * SHA-1加密
 */
export const shaEncrypt = (message) => {
    return CryptoJS.enc.Hex.parse(CryptoJS.SHA1(message).toString()).toString();
};
