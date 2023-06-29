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

/**
 * 新收银：取消预约|占用
 * @param params
 * @returns {Promise<unknown>}
 */
export const cancelStaffReserve = params => {
    return callService(api.cancelStaffReserve, params).then(backData => {
        return backData;
    });
}

/**
 * 新收银：通过手机号查询顾客信息(Appuser)
 * @param params
 * @returns {Promise<unknown>}
 */
export const getAppUserInfo = params => {
    return callService(api.getAppUserInfo, params).then(backData => {
        return backData;
    });
}

/**
 * 获取预约需要的基础数据
 * @param params
 * @returns {Promise<unknown>}
 */
export const getReserveInitData = params => {
    return callService(api.getReserveInitData, params).then(backData => {
        return backData;
    });
}

/**
 * 保存顾客预约
 * @param params
 * @returns {Promise<unknown>}
 */
export const saveCustomerReserve = params => {
    return callService(api.saveCustomerReserve, params).then(backData => {
        return backData;
    });
}

/**
 * 更新顾客预约
 * @param params
 * @returns {Promise<unknown>}
 */
export const updateCustomerReserve = params => {
    return callService(api.updateCustomerReserve, params).then(backData => {
        return backData;
    });
}

/**
 * 获取顾客所有信息
 */
export const getCustomerDetail = params => {
    return callService(api.getCustomerDetail, params).then(backData => {
        return backData;
    });
}

/**
 * 卡延期
 */
export const updateCardValidity = params => {
    return callService(api.updateCardValidity, params).then(backData => {
        return backData;
    });
}
