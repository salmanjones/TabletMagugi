import {callService} from '../utils';
import * as api from './api';


/**
 * 设置
 */
export const getCommonSetting = params => {
    return callService(api.getCommonSetting, params);
};

/**
 * 权限信息
 */
export const getRights = params => {
    return callService(api.getRights, params);
};
