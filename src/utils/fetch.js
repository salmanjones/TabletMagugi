import AsyncStorage from '@react-native-async-storage/async-storage'
import {AppConfig, StateCode} from './constant';
import {desDecrypt, desEncrypt} from './encrypt/encrypt';
import * as Api from '../services/api';

let vCode = null;
let vCodePromise = null;
let staffId = '';
let _magugiFetch = fetch;

const timeoutFetch = (url, header) => {
  return timeout(AppConfig.requestTimeout, _magugiFetch(url, header));
};

const APP_ID = 'Magugi715758&!%=&ARG-Tablet=';

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
};

function setVcodeStorage(key) {
  vCode = key;
  if (key) {
    AsyncStorage.setItem(AppConfig.tokenName, key, err => {
      console.log('保存vCode异常', err);
    });
  }
}

function getStorage(key) {
  return AsyncStorage.getItem(key)
    .then(value => {
      return value;
    })
    .catch(err => {
      return '';
    });
}

function _callRealService(path, params, resolve, reject, retryCount) {
  _fetch(
    path,
    params,
    function(res) {
      if (res.code !== StateCode.reqSuccess) {
        reject(res);
      } else {
        resolve(res);
      }
    },
    res => {
      if (res.code === StateCode.invalidToken) {
        vCode = null;
        AsyncStorage.removeItem(AppConfig.tokenName)
          .then(() => {
            retryCount = (retryCount || 0) + 1;
            console.log('vCode失效! 尝试重新获取:' + retryCount);
            _callService(path, params, resolve, reject, retryCount);
          })
          .catch(err => {
            console.log('移除vCode缓存异常', err);
            reject({
              code: StateCode.failToRemoveTokenCache,
              exceptions: Msg[StateCode.failToRemoveTokenCache],
            });
          });
      } else {
        reject(res);
      }
    }
  );
}

function _callService(url, reqParams, resolve, reject, retryCount) {
  if (retryCount >= 3) {
    reject({
      code: StateCode.tooTimesGetToken,
      exceptions: Msg[StateCode.tooTimesGetToken],
    });
    return false;
  }

  _getVCodePromise()
    .then(function() {
      _callRealService(url, reqParams, resolve, reject, retryCount);
    })
    .catch(function(res) {
      reject(res);
    });
}

async function _getVCodePromise() {
  vCode = vCode || (await getStorage(AppConfig.tokenName));
  if (vCode) {
    return Promise.resolve(vCode);
  }

  if (!vCodePromise) {
    vCodePromise = new Promise(function(resolve, reject) {
      _fetch(
        Api.getToken,
        null,
        function(res) {
          vCodePromise = null;
          if (res.code === StateCode.reqSuccess) {
            setVcodeStorage(res.data);
            resolve(res.data);
          } else {
            reject({
              code: StateCode.failToGetToken,
              exceptions: Msg[StateCode.failToGetToken],
            });
          }
        },
        function(res) {
          vCodePromise = null;
          reject(res);
        }
      );
    });
  }

  return vCodePromise;
}

function _fetch(url, params, resolve, reject) {
  try {
    const bodyData = desEncrypt(
      JSON.stringify(
        Object.assign({}, params, {
          appId: APP_ID,
          accessToken: vCode,
        })
      )
    );

    const header = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept: 'application/json,text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: 'bodyData=' + bodyData,
    };

    timeoutFetch(url, header)
      .then(response => {
        return response.json();
      })
      .then(textData => {
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
      })
      .catch(err => {
        console.log('请求服务异常', err);
        reject({
          code: StateCode.networkError,
          exceptions: Msg[StateCode.networkError],
        });
      });
  } catch (err) {
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
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
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
export const callService = async (url, params) => {
  staffId = staffId || (await getStorage(AppConfig.sessionStaffId)) || '';
  return new Promise((resolve, reject) => {
    params = Object.assign({}, params, { _staffId: staffId });
    if (!vCode) {
      _callService(url, params, resolve, reject);
    } else {
      _callRealService(url, params, resolve, reject);
    }
  });
};

export const clearFetchCache = () => {
  staffId = '';
};
