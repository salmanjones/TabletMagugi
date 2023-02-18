import AsyncStorage from '@react-native-async-storage/async-storage'
import {AppConfig, StateCode} from './constant';
import {desDecrypt, desEncrypt} from './encrypt/encrypt';
import * as Api from '../services/api';
const qs = require('qs');

let vCode = null
let _staffId = ''
let _platform =  AppConfig.platform.bms
let _magugiFetch = fetch

const _timeoutFetch = (url, header) => {
    return timeout(AppConfig.requestTimeout, _magugiFetch(url, header));
}

const Msg = {
    '7001': '无效的客户端',
    '7002': '无效的Token',
    '7004': '错误的请求参数',
    '7006': '无效数据返回格式',
    '5001': '请求Token异常，请稍后再试',
    '5002': '网络异常，请稍后再试',
    '5003': '获取Token异常',
    '5004': '错误的请求数据，请检查后再试',
    '5005': '无效的Token,尝试重新请求失败',
    '5006': '无效登录信息，请重新登陆',
    '5007': '请求超时，请重试',
    default: '网络出小差，请稍后再试',
}

// 获取token名称
const getTokenName = function () {
    return AppConfig.tokenBms
}

// 构建获取vcode的promise
const buildVcodePromise = (url)=>{
    return new Promise(function (resolve, reject) {
        _fetch(url, null, function (res) {
            if (res.code === StateCode.reqSuccess) {
                setVcodeStorage(res.data);
                resolve(res.data);
            } else {
                reject({
                    code: StateCode.failToGetToken,
                    exceptions: Msg[StateCode.failToGetToken],
                })
            }
        },function (res) {
            reject(res);
        })
    })
}

function setVcodeStorage(key) {
    vCode = key;
    if (key) {
        let tokenName = getTokenName()
        AsyncStorage.setItem(tokenName, key, err => {
            console.error('#######################################', tokenName, key, err)
            console.error('保存vCode异常', err)
        })
    }
}

function getStorage(key) {
    return AsyncStorage.getItem(key).then(value => {
        return value
    }).catch(err => {
        return ''
    });
}

function _callRealService(path, params, resolve, reject, retryCount) {
    _fetch(path, params, function (res) {
        if (res.code !== StateCode.reqSuccess) {
            reject(res);
        } else {
            resolve(res);
        }
    }, res => {
        if (res.code === StateCode.invalidToken) {
            vCode = null;
            let tokenName = getTokenName()
            AsyncStorage.removeItem(tokenName).then(() => {
                retryCount = (retryCount || 0) + 1;
                console.log('vCode失效! 尝试重新获取:' + retryCount);
                _callService(path, params, resolve, reject, retryCount);
            }).catch(err => {
                console.log('移除vCode缓存异常', err);
                reject({
                    code: StateCode.failToRemoveTokenCache,
                    exceptions: Msg[StateCode.failToRemoveTokenCache],
                });
            });
        } else {
            reject(res);
        }
    })
}

function _callService(url, reqParams, resolve, reject, retryCount) {
    if (retryCount >= 3) {
        reject({
            code: StateCode.tooTimesGetToken,
            exceptions: Msg[StateCode.tooTimesGetToken],
        });
        return false;
    }

    _getVCodePromise().then(function () {
        _callRealService(url, reqParams, resolve, reject, retryCount);
    }).catch(function (res) {
        reject(res);
    });
}

async function _getVCodePromise() {
    let tokenName = getTokenName()
    vCode = vCode || (await getStorage(tokenName));
    if (vCode) {
        return Promise.resolve(vCode);
    }

    return buildVcodePromise(Api.getTokenBms)
}

function _fetch(url, params, resolve, reject) {
    try {
        let bodyData = {}
        if(_platform == AppConfig.platform.bms){
            bodyData = {
                bodyData: desEncrypt(
                    JSON.stringify(
                        Object.assign({}, params, {
                            appId: AppConfig.appId,
                            accessToken: vCode,
                            vcode: vCode,
                            unique: AppConfig.appId,
                            client: AppConfig.client
                        })
                    )
                )
            }
        }else{
            let args = Object.assign({}, params, {
                appId: AppConfig.appId,
                unique: AppConfig.appId,
                client: AppConfig.client
            })

            const keys = Object.keys(args)
            keys.forEach(key=>{
                let value = args[key]
                bodyData[key] = desEncrypt(value.toString())
            })
        }

        const header = {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                Accept: 'application/json,text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                client: AppConfig.client,
                appId: desEncrypt(AppConfig.appId)
            },
            body: qs.stringify(bodyData),
        };

        _timeoutFetch(url, header).then(response => {
            return response.json();
        }).then(textData => {
            if(_platform ==  AppConfig.platform.bms){ // bms服务请求
                try {
                    const reqData = JSON.parse(desDecrypt(textData));
                    resolve(reqData.backData);
                } catch (e) {
                    const backData = textData.backData;
                    reject({
                        code: backData.code,
                        exceptions: Msg[backData.code] || Msg.default,
                    });
                }
            }else if(_platform ==  AppConfig.platform.app){ // app服务请求
                const {code} = textData
                if(code == StateCode.reqSuccess){
                    resolve(textData);
                }else{
                    reject({
                        code,
                        exceptions: Msg[code] || Msg.default,
                    })
                }
            }
        }).catch(err => {
            console.log('请求服务异常', _platform, err);
            reject({
                code: StateCode.networkError,
                exceptions: Msg[StateCode.networkError],
            });
        });
    } catch (err) {
        console.error("错误的请求参数", url, err)
        reject({
            code: StateCode.badRequestData,
            exceptions: Msg[StateCode.badRequestData],
        });
    }
}

/**
 * 超时处理
 * @param {*} ms
 * @param {*} promise
 */
function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject({
                code: StateCode.requestTimeout,
                exceptions: Msg[StateCode.requestTimeout],
            });
        }, ms);
        promise.then(resolve, reject);
    });
}

/**
 *
 * @param {*} url
 * @param {*} params
 */
export const callService = async (url, params, platform =  AppConfig.platform.bms) => {
    _platform = platform
    _staffId = _staffId || (await getStorage(AppConfig.sessionStaffId)) || '';
    return new Promise((resolve, reject) => {
        params = Object.assign({}, params, {_staffId: _staffId});
        if (platform == AppConfig.platform.bms && !vCode) {
            _callService(url, params, resolve, reject);
        } else {
            _callRealService(url, params, resolve, reject);
        }
    });
};

export const clearFetchCache = () => {
    _staffId = '';
};
