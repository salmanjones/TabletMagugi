import {handleActions} from 'redux-actions';

import {
    CASHIERBILLING_CLEAR,
    CASHIERBILLING_CUSTOMER,
    CASHIERBILLING_DELETE,
    CASHIERBILLING_FLOWNUMBER,
    CASHIERBILLING_FLOWNUMBER_INIT,
    CASHIERBILLING_GET,
    CASHIERBILLING_INIT,
    CASHIERBILLING_MULTIPLY,
    CASHIERBILLING_PAY,
    CASHIERBILLING_PAY_REAL_V4,
    CASHIERBILLING_PREPAY,
    CASHIERBILLING_RELOAD_ORDER,
    CASHIERBILLING_SAVE,
    CASHIERBILLING_STOCK,
    CASHIERBILLING_TOAPP,
    CASHIERBILLING_UPDATE_CONSUMABLE,
    CASHIERBILLING_WXAPP
} from '../actions';

const defaultOrderState = {
    loading: false,
    orderData: {
        flowNumber: '',
        handNumber: '',
        customerNumber: 1
    },
    propChangeType: '',
    tradeInfo: {
        codeUrl: '',
        tradeNo: ''
    },
    stockData: [],
    orderFlowNmberRefreshTag: '',
    reloadBillNo: '',
};
export const billingOrderReducer = handleActions({
    [CASHIERBILLING_CLEAR]: (state) => {
        return {
            ...state,
            propChangeType: '',
            tradeInfo: {
                codeUrl: '',
                tradeNo: ''
            },
            stockData: [],
            reloadBillNo: '',
            orderData: {
                ...state.orderData,
                flowNumber: '',
                handNumber: '',
                lastFlowNumber: state.orderData.flowNumber,
            }
        };
    },
    //开单
    [CASHIERBILLING_INIT.PENDING]: (state) => {
        return {
            ...state,
            loading: true,
            propChangeType: 'loading'
        };
    },
    [CASHIERBILLING_INIT.SUCCESS]: (state, action) => {
        let orderData = action.data;
        if (!orderData.flowNumber && orderData.lastFlowNumber) {
            let valuePart = orderData.lastFlowNumber.match(/0*([^0][0-9]*)/)[1];
            let zeroPart = orderData.lastFlowNumber.replace(valuePart, "");
            orderData.flowNumber = zeroPart + (Number(valuePart) + Math.floor(Math.random() * (1000) + 1));
        }

        if (!orderData.flowNumber) {
            let now = new Date();
            orderData.flowNumber = now.getHours().toString() + now.getMinutes().toString() + now.getSeconds().toString() + Math.floor(Math.random() * 10000)
        }
        return {
            ...state,
            loading: false,
            orderData: orderData,
            propChangeType: 'initData'
        };
    },
    [CASHIERBILLING_INIT.ERROR]: (state) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'loading'
        };
    },

    //取单
    [CASHIERBILLING_GET.PENDING]: (state) => {
        return {
            ...state,
            loading: true,
            propChangeType: 'loading'
        };
    },
    [CASHIERBILLING_GET.SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            orderData: action.data,
            propChangeType: 'getData'
        };
    },
    [CASHIERBILLING_GET.ERROR]: (state) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'loading'
        };
    },
    //刷新订单单号
    [CASHIERBILLING_FLOWNUMBER_INIT.REFRESH]: (state) => {
        return {
            ...state,
            orderFlowNmberRefreshTag: true
        };
    },

    [CASHIERBILLING_FLOWNUMBER_INIT.RESET]: (state) => {
        return {
            ...state,
            orderFlowNmberRefreshTag: false
        };
    },

    //校验水单号
    [CASHIERBILLING_FLOWNUMBER.PENDING]: (state, action) => {
        return {
            ...state,
            loading: true,
            propChangeType: 'loading'
        };
    },
    [CASHIERBILLING_FLOWNUMBER.SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'loading'
        };
    },
    [CASHIERBILLING_FLOWNUMBER.ERROR]: (state) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'loading'
        };
    },

    //修改客数｜新老客｜水单
    [CASHIERBILLING_CUSTOMER.SUCCESS]: (state, {orderInfo}) => {
        let orderData = {
            ...state.orderData,
            customerNumber: orderInfo.customerNumber,
            customerSex: orderInfo.customerSex,
            flowNumber: orderInfo.flowNumber,
            handNumber: orderInfo.handNumber,
            isOldCustomer: orderInfo.isOldCustomer,
        }

        return {
            ...state,
            orderData,
            loading: false,
            propChangeType: 'updateCustomer'
        };
    },

    //挂单
    [CASHIERBILLING_SAVE.PENDING]: (state, action) => {
        return {
            ...state,
            loading: true,
            propChangeType: 'loading'
        };
    },
    [CASHIERBILLING_SAVE.SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'saveOrder'
        };
    },
    [CASHIERBILLING_SAVE.ERROR]: (state) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'loading'
        };
    },

    //废单
    [CASHIERBILLING_DELETE.PENDING]: (state, action) => {
        return {
            ...state,
            loading: true,
            propChangeType: 'loading'
        };
    },
    [CASHIERBILLING_DELETE.SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'deleteOrder'

        };
    },
    [CASHIERBILLING_DELETE.ERROR]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'deleteOrderError',
            message: action.body
        };
    },

    //结单
    [CASHIERBILLING_PAY.PENDING]: (state) => {
        return {
            ...state,
            loading: true,
            propChangeType: 'loading',
        };
    },
    [CASHIERBILLING_PAY.SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'paySuccess',
            tradeInfo: action.data
        };
    },
    [CASHIERBILLING_PAY.ERROR]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'payException'
        };
    },

    //去app支付
    [CASHIERBILLING_TOAPP.PENDING]: (state) => {
        return {
            ...state,
            loading: true,
            propChangeType: 'loading'
        };
    },
    [CASHIERBILLING_TOAPP.SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'toApp'
        };
    },
    [CASHIERBILLING_TOAPP.ERROR]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'toAppException'
        };
    },

    //微信小程序支付
    [CASHIERBILLING_WXAPP.PENDING]: (state) => {
        return {
            ...state,
            loading: true,
            propChangeType: 'loading'
        };
    },
    [CASHIERBILLING_WXAPP.SUCCESS]: (state, {billingNo}) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'toWXApp',
            billingNo: billingNo
        };
    },
    [CASHIERBILLING_WXAPP.ERROR]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'toWXAppException'
        };
    },

    //混合支付
    [CASHIERBILLING_MULTIPLY.SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'toMultiplyPay'
        };
    },

    // 现金 银行卡 外联
    [CASHIERBILLING_PAY_REAL_V4.SUCCESS]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'payEndSuccess'
        };
    },
    [CASHIERBILLING_PAY_REAL_V4.ERROR]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'payEndException',
            message: action.data.msg
        };
    },

    //预算
    [CASHIERBILLING_PREPAY.ERROR]: (state) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'prePayException'
        };
    },

    //扣库存
    [CASHIERBILLING_STOCK.PENDING]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'stockFailure',
            stockData: action.data
        };
    },
    [CASHIERBILLING_STOCK.ERROR]: (state, action) => {
        return {
            ...state,
            loading: false,
            propChangeType: 'stockException',
            stockData: []
        };
    },
    [CASHIERBILLING_UPDATE_CONSUMABLE]: (state, {itemData}) => {
        return {
            ...state,
            propChangeType: 'editConsumable',
            itemWithConsumable: itemData
        };
    },
    [CASHIERBILLING_RELOAD_ORDER]: (state, action) => {
        return {
            ...state,
            propChangeType: 'reloadOrder',
        };
    }
}, defaultOrderState);
