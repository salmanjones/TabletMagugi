import {callService} from '../utils';
import * as api from './api';

/**
 * 新收银：预约日期
 * @param {*} storeId
 */
export const getReserveDate = params => {
    return callService(api.getReserveDate, params).then(backData => {
        return backData;
    });
};
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
 * 获取当前会员所有信息
 */
export const getMemberDetail = params => {
    return callService(api.getMemberDetail, params).then(backData => {
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

/**
 * 获取页面组件刷新状态
 */
export const getRefreshState = params => {
    return callService(api.getRefreshState, params).then(backData => {
        return backData;
    });
}

/**
 * 获取会员信息
 * @param params
 * @returns {Promise<unknown>}
 */
export const getMemberInfo = params => {
    return callService(api.getMemberInfo, params).then(backData => {
        return backData;
    });
}

/**
 * 获取会员档案信息
 */
export const getMemberPortrait = params => {
    return callService(api.fetchMemberInfo, params).then(backData => {
        return backData;
    });
}

/**
 * 获取水单号
 */
export const getBillFlowNO = params => {
    return callService(api.initCashierBillingFlowNumber, params).then(backData => {
        return backData;
    });
}

/**
 * 获取当前档案下的会员卡
 */
export const getMemberCards = params => {
    return callService(api.fetchMemberCardList, params).then(backData => {
        return backData;
    });
}

/**
 * 获取开单用的会员卡信息
 */
export const getMemberBillCards = params => {
    return callService(api.fetchWaitingMemberCardInfo, params).then(backData => {
        return backData;
    })
}

/**
 * 获取员工收银权限
 */
export const getStaffPermission =  params => {
    return callService(api.selectStaffAclInfo, params).then(backData => {
        return backData;
    });
}

/**
 * 获取散客开单二维码
 */
export const getGuestQRImg =  params => {
    return callService(api.getGuestQRImg, params).then(backData => {
        return backData;
    });
}

/**
 * 获取二维码扫描状态
 * @param params
 * @returns {Promise<unknown>}
 */
export const getScanQRState = params => {
    return callService(api.getScanQRState, params).then(backData => {
        return backData;
    });
}

/**
 * 更新会员个人档案
 * @param params
 * @returns {Promise<unknown>}
 */
export const updateMemberProfile = params => {
    return callService(api.updateMemberProfile, params).then(backData => {
        return backData;
    });
}
