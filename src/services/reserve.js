import {callService} from '../utils';
import * as api from './api';

/**
 * 新收银预约信息
 * @param {*} storeId
 */
export const getReserveInfo = params => {
    return callService(api.getReserveInfo, params).then(backData => {
        return backData;
    });
};
