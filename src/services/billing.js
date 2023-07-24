import {AppConfig, callService} from '../utils';
import * as api from './api';

/**
 * 收银-初始化
 */
export const fetchInitBilling = params => {
    return callService(api.initCashierBilling, params);
};

export const getCompanyAutoFlowNumber = () => {
    return callService(api.initCashierBillingFlowNumber, {});
};

/**
 * 收银-取单（开单页面）
 */
export const fetchGetBillingDetail = params => {
    return callService(api.getPendingList, params);
};

/**
 * 收银-挂单
 */
export const fetchSaveBilling = params => {
    return callService(api.saveCashierBilling, params);
};

/**
 * 收银-预算
 */
export const fetchPrePayBilling = params => {
    params.realPay = 'false';
    return callService(api.prePayCashierBilling, params);
};

/**
 * 收银-作废
 */
export const deleteBilling = params => {
    return callService(api.deleteCashierBilling, params);
};

export const payBillingV4 = params => {
    return callService(api.prePayCashierBilling, params);
}

/**
 * 收银-app 支付
 */
export const fetchAppBilling = params => {
    return callService(api.appPayCashierBilling, params);
};

/**
 * 收银-减口库存
 */
export const fetchStockBilling = params => {
    return callService(api.preStockCashierBilling, params);
};

/**
 * 库存检查
 */
export const preCheckStock = params => {
    return callService(api.preCheckStock, params);
};

/**
 * 收银-微信|支付宝支付
 */
export const fetchPayBilling = params => {
    return callService(api.payCashierBilling, params);
};

/**
 * 水单号校验
 */
export const fetchCheckFlowNumber = params => {
    return callService(api.checkFlowNoCashierBilling, params);
};

/**
 * 获取挂单列表
 */
export const fetchPendingList = flowNumber => {
    return callService(api.getPendingList, {
        flowNumber: flowNumber || '',
        pending: true,
        type: 0,
    }).then(backData => {
        let billingList = backData.data.billingList.map(x => {
            return {
                id: x.billing.id,
                billingNo: x.billing.billingNo,
                flowNumber: x.billing.flowNumber,
                name: x.billing.name ? x.billing.name : '-',
                keyNumber: x.billing.keyNumber,
                timeCount: x.billing.allTimeProjectCount,
                phone: (x.billing.phone && x.billing.phone != '19800002015') ? x.billing.phone : '-',
                totalPrice: x.totalPrice,
                createTime: x.billing.createTime,
                staffName: x.staffName || '',
                payWay: x.billing.phoneLockStatus
            };
        });
        backData.rights = backData.data.rights || null;
        backData.data = billingList;

        return backData;
    });
};

/**
 * 获取单据列表
 */
export const fetchBillingList = params => {
    let flowNumber = params.flowNumber;
    let st = params.billingStatus;
    let start = params.selectTime;
    let end = params.selectTime;
    let size = '1000';
    let p = '1';

    return callService(api.getBillingList, {
        flowNumber: flowNumber || '',
        st: st || '',
        start: start || '',
        end: end || '',
        size: size || '',
        p: p || '',
    }).then(backData => {
        let billingList = backData.data.billingList.result.map(x => {
            return {
                flowNumber: x.flowNumber,
                name: x.name ? x.name : '-',
                keyNumber: x.keyNumber,
                timeCount: x.allTimeProjectCount,
                phone: (x.phone && x.phone != '19800002015') ? x.phone : '-',
                totalPrice: x.totalPrice,
                createTime: x.createTime,
                payEndTime: x.payEndTime,
                billingStatus: x.status,
                prickStatus: x.prickStatus,
                billingNo: x.billingNo,
                paidIn: x.paidIn
            };
        });
        backData.data = billingList;
        return backData;
    });
};

export const getServiceStaffs = params => {
    return callService(api.billingSearch, params).then(backData => {
        return backData.data;
    });
};

export const fetchPaymentResult = (tradeNo, payType) => {
    let params = {
        tradeNo: tradeNo,
        mtp: payType,
    };
    return callService(api.getPaymentResult, params);
};

/**
 * 通過获取订单详情
 */
export const fetchBillingDetail4Modify = params => {
    let queryParams = {
        billingNo: params.billingNo,
    };
    return callService(api.findBillingDetails4Modify, queryParams);
};

/**
 * 修改单据
 * @param {} params
 */
export const fetchModifyBilling = params => {
    return callService(api.modifyBilling, params);
};

/**
 * 查询基本订单相关基本信息
 */
export const billingSearch = params => {
    return callService(api.billingSearch, params).then(backData => {
        return backData.data;
    });
};

/**
 * 并单订单信息加载
 */
export const mergePayInit = params => {
    return callService(api.mergePayInit, params).then(backData => {
        return backData.data;
    });
};

export const mergeBindBilling4App = params => {
    return callService(api.mergeBindBilling4App, params).then(backData => {
        return backData.data;
    });
};
//转换会员单
export const changeBillingOwner = params => {
    return callService(api.changeOwner, params);
}

//价目表信息
export const priceListInfo = params => {
    return callService(api.priceListInfo, params);
}

//价目表项目明细信息
export const priceListItemDetail = params => {
    return callService(api.priceListItemDetail, params);
}

export const getAvailablePaymentInfo = params => {
    return callService(api.getAvailablePaymentInfo, params, AppConfig.platform.app);
}

// 获取限购项目信息
export const getLimitItems = params => {
    return callService(api.getLimitItems, params);
}
