import {callService} from '../utils';
import * as api from './api';

/**
 * 获取验证码
 * @param params
 * @returns {Promise<unknown>}
 */
export const sendSmsCode = params => {
    return callService(api.getSmsCode, params).then(backData => {
        return backData;
    });
}

/**
 * 校验验证码
 * @param params
 * @returns {Promise<unknown>}
 */
export const verifySmsCode = params => {
    return callService(api.verifySmsCode, params).then(backData => {
        return backData;
    });
}
