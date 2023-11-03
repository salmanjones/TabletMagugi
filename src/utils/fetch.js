import AsyncStorage from '@react-native-async-storage/async-storage'
import {AppConfig, LinkWeCom, StateCode} from './constant';
import {desDecrypt, desEncrypt} from './encrypt/encrypt';
import * as api from "../services/api";
import * as Base64Arraybuffer from "base64-arraybuffer"

const qs = require('qs');

let _staffId = ''
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

function getStorage(key) {
    return AsyncStorage.getItem(key).then(value => {
        return value
    }).catch(err => {
        return ''
    });
}

function _fetch(url, params, platform, resolve, reject) {
    try {
        let bodyData = {}
        if (platform == AppConfig.platform.bms) {
            bodyData = {
                bodyData: desEncrypt(
                    JSON.stringify(
                        Object.assign({}, params, {
                            appId: AppConfig.appId,
                            unique: AppConfig.appId,
                            client: AppConfig.client
                        })
                    )
                )
            }
        } else {
            let args = Object.assign({}, params, {
                appId: AppConfig.appId,
                unique: AppConfig.appId,
                client: AppConfig.client
            })

            const keys = Object.keys(args)
            keys.forEach(key => {
                let value = args[key]
                bodyData[key] = desEncrypt(value + '')
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
                appId: desEncrypt(AppConfig.appId),
                des: 'false'
            },
            body: qs.stringify(bodyData),
        };

        fetch(url, header).then(response => {
            // 是否需要des解密
            const toDes = response.headers.map ? response.headers.map.des : ''
            return new Promise((resolve) => {
                response.json().then(backData => {
                    resolve({
                        toDes,
                        content: backData
                    })
                })
            });
        }).then(jsonData => {
            // 是否需要des解密
            const toDes = jsonData.toDes
            // 数据内容
            const textData = jsonData.content

            // 解析数据
            if (platform == AppConfig.platform.bms) { // bms服务请求
                if (toDes == 'false') { // 无需des解密
                    const reqData = JSON.parse(textData)
                    resolve(reqData['backData']);
                } else { // 开始des解密
                    try {
                        const reqData = JSON.parse(desDecrypt(textData));
                        resolve(reqData['backData']);
                    } catch (e) {
                        const code = '5008'
                        reject({
                            code,
                            exceptions: Msg[code],
                        });
                    }
                }
            } else if (platform == AppConfig.platform.app) { // app服务请求
                const {code} = textData
                if (code == StateCode.reqSuccess) {
                    resolve(textData);
                } else {
                    console.error(Msg[code], url, JSON.stringify(textData))
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
            })
        })
    } catch (err) {
        console.error("错误的请求参数", url, err)
        reject({
            code: StateCode.badRequestData,
            exceptions: Msg[StateCode.badRequestData],
        })
    }
}

export const clearFetchCache = () => {
    _staffId = ''
}

/**
 *
 * @param {*} url
 * @param {*} params
 */
export const callService = (url, params, platform = AppConfig.platform.bms) => {
    return new Promise((resolve, reject) => {
        getStorage(AppConfig.sessionStaffId).then(_staffId => {
            params = Object.assign({}, params, {_staffId: _staffId})
            _fetch(url, params, platform, resolve, reject)
        }).catch(e => {
            reject(e)
        })
    })
}

/**
 * 带延时的fetch
 * @param url
 * @param config
 * @param resolve
 * @param reject
 */
const adopt = (url, config, resolve, reject) => {
    // 超时时间
    const timeout = () => {
        return new Promise((resolve, reject) => {
            const timerId = setTimeout(() => {
                timerId && clearTimeout(timerId)
                resolve('timeout') // 504 网络请求超时
            }, config.timeout);
        })
    }

    // 带超时的fetch
    Promise.race([timeout(), fetch(url, config)]).then(response => {
        if (response === 'timeout') {
            reject('网络请求超时，错误码:504')
        } else {
            // 用于判定状态
            const resStatData = response.clone()
            const httpStatus = resStatData.status
            resStatData.json().then(statInfo => {
                const statCode = statInfo.code
                if (httpStatus == '200') {
                    if (statCode == '200') {
                        // 用于返回结果
                        response.json().then(json => {
                            resolve(json)
                        })
                    } else if (statCode == '401') { // 令牌为空,重新发请求
                        // token获取参数
                        const options = JSON.parse(JSON.stringify(config))
                        options['responseType'] = 'json'
                        options['method'] = 'post'
                        delete options['data']

                        fetch(options.tokenUrl, options).then(backResponse=>{
                            backResponse.json().then(jsonObj => {
                                const accessToken = jsonObj.data['access_token']
                                AsyncStorage.setItem(LinkWeCom.tokenKey, accessToken).then(_=>{
                                    config.headers['Authorization'] = 'Bearer ' + accessToken
                                    adopt(url, config, resolve, reject)
                                }).catch(e=>{
                                    reject('缓存linkWeCom Token失败')
                                })
                            }).catch(e=>{
                                reject("处理token失败：" + JSON.stringify(e))
                            })
                        }).catch(e=>{
                            reject("获取token失败：" + JSON.stringify(e))
                        })
                    } else {
                        reject("业务数据异常，错误码:" + statCode)
                    }
                } else {
                    reject("网络请求错误，错误码:" + httpStatus)
                }
            }).catch(_ => {
                if (httpStatus == '200') {
                    response.arrayBuffer().then(buffer => {
                        const base64Value = Base64Arraybuffer.encode(buffer)
                        resolve(base64Value)
                    }).catch(e1 => {
                        reject(e1)
                    })
                } else {
                    reject("网络请求错误，错误码:" + httpStatus)
                }
            })
        }
    }).catch(e => {
        reject(e)
    })
}

/**
 * LinkWeCom
 * @param url
 * @param params
 * @returns {Promise<unknown>}
 */
export const callLinkWeCom = async (options) => {
    return new Promise((resolve, reject) => {
        if (!options.url || options.url.trim().length < 1) {
            reject('请求地址不能为空')
        } else {
            const config = {
                mode: 'cors',
                credentials: 'include',
                timeout: options.timeout || 1000 * 60 * 10,
                method: options.method || 'post',
                responseType: options.responseType.toString().toLowerCase() || 'json',
                headers: {
                    'symbol': LinkWeCom.tokenSymbol,
                    "Content-Type": options.contentType || 'application/json;charset=utf-8',
                },
                tokenUrl: api.lwTokenUrl,
                body: qs.stringify(options.data || {})
            }

            if (config.responseType == 'json' || config.responseType == 'arraybuffer') {
                if (config.method.toString().toLowerCase() === 'get') { // 处理get请求
                    options.url = options.url + '?' + qs.stringify(options.data || {})
                    delete config['body']
                }

                getStorage(LinkWeCom.tokenKey).then(authToken=>{
                    // 请求令牌
                    if(authToken && authToken.length > 0){
                        config.headers['Authorization'] = 'Bearer ' + authToken
                    }

                    // 实际请求
                    adopt(options.url, config, resolve, reject)
                }).catch(err => {
                    console.error("err", err)
                    reject('获取token缓存失败')
                })
            } else {
                reject('无效的数据响应类型，仅支持：json, arraybuffer')
            }
        }
    })
}
