import {callService} from '../utils';
import * as api from './api';

/**
 * 获取门店轮牌信息
 * @param {*} storeId
 */
export const getStoreDutys = storeId => {
    return callService(api.getStoreDutys, storeId).then(backData => {
        return backData;
    });
};

export const saveStaffOrder = (params) => {
    return callService(api.saveStaffOrder, params).then(backData => {
        return backData;
    });
}

export const getStoreDutysSetting = storeId => {
    return callService(api.getStoreDutysSetting, storeId).then(backData => {
        return backData;
    });
};

export const updateDutyStaffs = (params) => {
    return callService(api.updateDutyStaffs, params);
}

export const updateDutyStaffStatus = (params) => {
    return callService(api.updateDutyStaffStatus, params);
}

export const resetDutyStaffs = (params) => {
    return callService(api.resetDutyStaffs, params);
}

export const sortDutyStaffs = (params) => {
    return callService(api.sortDutyStaffs, params);
}

export const modifyStoreDutysSetting = (params) => {
    return callService(api.modifyStoreDutysSetting, params).then(backData => {
        return backData;
    });
};
export const deleteDutyTableSetting = (params) => {
    return callService(api.deleteDutyTableSetting, params).then(backData => {
        return backData;
    });
};

export const changeSortOfDutysSetting = (params) => {
    return callService(api.changeSortOfDutysSetting, params).then(backData => {
        return backData;
    });
};

export const checkResource = (params) => {
    return callService(api.checkResource, params).then(backData => {
        return backData;
    });
};

export const batchSaveDutyStaffs = (params) => {
    return callService(api.batchSaveDutyStaffs, params).then(backData => {
        return backData;
    });
}




