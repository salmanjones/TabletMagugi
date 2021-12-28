import {callService} from '../utils';
import * as api from './api';

/**
 * 用户登录
 * @param username
 * @param password
 * @returns {Promise<unknown>}
 */
export const fetchAuthUser = (username, password) => {
    return callService(api.loginAction, {
        username: username,
        password: password
    });
}
