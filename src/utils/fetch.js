import AsyncStorage from '@react-native-async-storage/async-storage'
import {AppConfig, StateCode} from './constant';
import {desDecrypt, desEncrypt} from './encrypt/encrypt';
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
        if(platform == AppConfig.platform.bms){
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
        }else{
            let args = Object.assign({}, params, {
                appId: AppConfig.appId,
                unique: AppConfig.appId,
                client: AppConfig.client
            })

            const keys = Object.keys(args)
            keys.forEach(key=>{
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
                appId: desEncrypt(AppConfig.appId)
            },
            body: qs.stringify(bodyData),
        };

        fetch(url, header).then(response => {
            return response.json();
        }).then(textData => {
            if(platform ==  AppConfig.platform.bms){ // bms服务请求
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
            }else if(platform ==  AppConfig.platform.app){ // app服务请求
                const {code} = textData
                if(code == StateCode.reqSuccess){
                    resolve(textData);
                }else{
                    console.error(Msg[code], JSON.stringify(textData))
                    console.error(Msg[code], url, JSON.stringify(desDecrypt(textData)))
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
 *
 * @param {*} url
 * @param {*} params
 */
export const callService = (url, params ,  platform =  AppConfig.platform.bms) => {
    return new Promise((resolve, reject) => {
        getStorage(AppConfig.sessionStaffId).then(_staffId => {
            params = Object.assign({}, params, {_staffId: _staffId});
            _fetch(url, params, platform, resolve, reject);
        }).catch(e=>{
            reject(e)
        })
    });
};

export const clearFetchCache = () => {
    _staffId = '';
};
