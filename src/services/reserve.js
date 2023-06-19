import {callService} from '../utils';
import * as api from './api';

/**
 * 新收银：预约信息
 * @param {*} storeId
 */
export const getReserveInfo = params => {
    return callService(api.getReserveInfo, params).then(backData => {
        return backData;
    });
};

/**
 * 新收银：占用
 * @param params
 * @returns {Promise<unknown>}
 */
export const saveReserveVocation = params => {
    return callService(api.saveReserveVocation, params).then(backData => {
        return backData;
    });
}
