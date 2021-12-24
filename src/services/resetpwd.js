import {callService} from '../utils';
import * as api from './api';


/**
 * 发送验证码
 */
export const fetchResetPwdCode = (fromValue) => {
    return callService(api.resetpwdSendCode, fromValue);
}

/**
 * 提交表单
 */
export const fetchResetPwdSubmit = (fromValue) => {
    return callService(api.resetpwdSubmit, fromValue);
}
