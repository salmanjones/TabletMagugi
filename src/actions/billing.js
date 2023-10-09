//libs
//self
import {displayError} from '../utils';
import {
    deleteBilling,
    fetchAppBilling,
    fetchBillingList,
    fetchCheckFlowNumber,
    fetchGetBillingDetail,
    fetchInitBilling,
    fetchPayBilling,
    fetchPendingList,
    fetchPrePayBilling,
    fetchSaveBilling,
    fetchStockBilling,
    getServiceStaffs,
    payBillingV4
} from '../services';
import {
    CASHIERBILLING_CLEAR,
    CASHIERBILLING_DELETE,
    CASHIERBILLING_FLOWNUMBER,
    CASHIERBILLING_FLOWNUMBER_INIT,
    CASHIERBILLING_GET,
    CASHIERBILLING_INIT,
    CASHIERBILLING_MULTIPLY,
    CASHIERBILLING_PAY,
    CASHIERBILLING_PAY_REAL_V4,
    CASHIERBILLING_PREPAY,
    CASHIERBILLING_RELOAD_PROFILE,
    CASHIERBILLING_SAVE,
    CASHIERBILLING_STOCK,
    CASHIERBILLING_TOAPP,
    CASHIERBILLING_WXAPP,
    GET_BILLING_LIST,
    GET_PENDING_LIST,
    RESET_BILLING_LIST,
    SERVICE_STAFFS_GET
} from '../actions';

//收银-清除缓存
export const clearBillingCacheAction = () => {
    return {
        type: CASHIERBILLING_CLEAR,
    };
};

//收银-重新加载会员资料
export const reloadProfileAction = (status) => {
    if(status == 'init') {
        return {
            type: CASHIERBILLING_RELOAD_PROFILE.PENDING,
        }
    }else if(status == 'finish'){
        return {
            type: CASHIERBILLING_RELOAD_PROFILE.SUCCESS,
        }
    }
}


export const cashierBillingFlowNumberInitAction = refeshTag => {
    return (dispatch, getState) => {
        if (refeshTag) {
            dispatch({
                type: CASHIERBILLING_FLOWNUMBER_INIT.REFRESH,
            });
        } else {
            dispatch({
                type: CASHIERBILLING_FLOWNUMBER_INIT.RESET,
            });
        }
    };
};

//收银-初始化
export const cashierBillingInitAction = navParams => {
    return (dispatch, getState) => {
        let cachedOrderData = getState().billingOrder.orderData;
        if (cachedOrderData && cachedOrderData.projectInfo) {

            //0专业店 1综合店
            if (navParams.isSynthesis == 0) {
                var dataCateId = '';

                var projectInfojSON = JSON.parse(cachedOrderData.projectInfo);
                for (var item in projectInfojSON) {
                    var itemArr = item.split(";");
                    dataCateId = itemArr[itemArr.length - 1];
                }

                //相等取缓存数据
                if (dataCateId == navParams.operatorId) {
                    dispatch({
                        type: CASHIERBILLING_INIT.SUCCESS,
                        data: buildInitOrderData(navParams, cachedOrderData),
                    });
                } else {
                    //loading
                    dispatch({
                        type: CASHIERBILLING_INIT.PENDING,
                    });

                    //向后台发送请求
                    let params = {
                        isSynthesis: navParams.isSynthesis, //0专业店 1综合店
                        choosedCid: navParams.operatorId, //主营分类id 综合店忽略此参数
                    };
                    return fetchInitBilling(params)
                        .then(backData => {
                            dispatch({
                                type: CASHIERBILLING_INIT.SUCCESS,
                                data: buildInitOrderData(navParams, backData.data),
                            });
                        })
                        .catch(err => {
                            displayError(err);
                            dispatch({
                                type: CASHIERBILLING_INIT.ERROR,
                            });
                        });
                }

            } else {
                dispatch({
                    type: CASHIERBILLING_INIT.SUCCESS,
                    data: buildInitOrderData(navParams, cachedOrderData),
                });
            }

        } else {
            //loading
            dispatch({
                type: CASHIERBILLING_INIT.PENDING,
            });

            //向后台发送请求
            let params = {
                isSynthesis: navParams.isSynthesis, //0专业店 1综合店
                choosedCid: navParams.operatorId, //主营分类id 综合店忽略此参数
            };
            return fetchInitBilling(params)
                .then(backData => {
                    dispatch({
                        type: CASHIERBILLING_INIT.SUCCESS,
                        data: buildInitOrderData(navParams, backData.data),
                    });
                })
                .catch(err => {
                    displayError(err);
                    dispatch({
                        type: CASHIERBILLING_INIT.ERROR,
                    });
                });
        }
    };
};

//收银-取单(开单页面)
export const cashierBillingGetAction = queryParams => {
    return (dispatch, getState) => {
        //loading
        dispatch({type: CASHIERBILLING_GET.PENDING});

        let params = {
            flowNumber: queryParams.flowNumber,
            isSynthesis: queryParams.isSynthesis,
        };

        return fetchGetBillingDetail(params)
            .then(backData => {
                dispatch({
                    type: CASHIERBILLING_GET.SUCCESS,
                    data: buildGetOrderData(backData.data, queryParams),
                });
            })
            .catch(err => {
                displayError(err);
                dispatch({
                    type: CASHIERBILLING_GET.ERROR,
                });
            });
    };
};

//收银--挂单-水单号
export const cashierBillingSaveAction = billingData => {
    return (dispatch, getState) => {
        //loading
        dispatch({type: CASHIERBILLING_FLOWNUMBER.PENDING});

        let billingInfo = JSON.parse(billingData.billing);
        return fetchCheckFlowNumber({
            flowNumber: billingInfo.flowNumber,
            billingNo: billingInfo.billingNo,
            storeId: billingInfo.storeId,
            companyId: billingInfo.companyId,
        }).then(backData => {
            let checkStat = backData.data.checkStatus;
            dispatch({type: CASHIERBILLING_FLOWNUMBER.SUCCESS});
            if (checkStat == '0') {
                dispatch(cashierBillingSave(billingData));
            } else {
                displayError('', '水单号已存在', true);
            }
        })
            .catch(err => {
                displayError(err, '校验水单号失败，请稍后再试');
                dispatch({
                    type: CASHIERBILLING_FLOWNUMBER.ERROR,
                });
            });
    };
};

//收银--挂单--保存
const cashierBillingSave = billingData => {
    return (dispatch, getState) => {
        //loading
        dispatch({
            type: CASHIERBILLING_SAVE.PENDING,
        });

        return fetchSaveBilling(billingData).then(backData => {
            const code = backData.code
            const exceptions = backData.exceptions
            if(code == '6000'){
                dispatch({
                    type: CASHIERBILLING_SAVE.SUCCESS,
                });
            }else{
                displayError('', exceptions, true);
                dispatch({
                    type: CASHIERBILLING_SAVE.ERROR,
                });
            }
        }).catch(err => {
            displayError(err, '', true);
            dispatch({
                type: CASHIERBILLING_SAVE.ERROR,
            });
        });
    };
};

//收银--支付开始-水单号  billingData挂单数据结构   prePayData：预算数据结构   payType：支付方式 channel: 支付渠道
export const cashierBillingPayAction = (billingData, prePayData, payType, channel) => {
    return (dispatch, getState) => {
        //loading
        dispatch({type: CASHIERBILLING_FLOWNUMBER.PENDING});

        let billingInfo = JSON.parse(billingData.billing);
        return fetchCheckFlowNumber({
            flowNumber: billingInfo.flowNumber,
            billingNo: billingInfo.billingNo,
            storeId: billingInfo.storeId,
            companyId: billingInfo.companyId,
        }).then(backData => {
            dispatch({type: CASHIERBILLING_FLOWNUMBER.SUCCESS});
            let checkStat = backData.data.checkStatus;
            if (checkStat == '0') {
                dispatch(cashierBillingPay(billingData, prePayData, payType, channel));
            } else {
                displayError('', '水单号已存在', true);
            }
        }).catch(err => {
            displayError(err, '校验水单号失败，请稍后再试');
            dispatch({
                type: CASHIERBILLING_FLOWNUMBER.ERROR,
            });
        });
    };
};

//收银--支付开始-保存
const cashierBillingPay = (billingData, prePayData, payType, channel) => {
    return (dispatch, getState) => {
        //loading
        dispatch({type: CASHIERBILLING_PAY.PENDING});
        return fetchSaveBilling(billingData).then(backData => {
            dispatch(
                submitBillingSuccess(backData.data.billing, backData.data.consumeDetails, prePayData, payType, channel)
            );
        }).catch(err => {
            dispatch({
                type: CASHIERBILLING_PAY.ERROR,
            });
        });
    };
};

//收银--支付-保存订单完毕  orderInfo已保存订单结构(含单号) readyData挂单数据结构   prePayData：预算数据结构   payType：支付方式
const submitBillingSuccess = (orderInfo, consumeDetails, prePayData, payType, channel) => {
    return (dispatch, getState) => {
        if (channel == 'tablet') {//平板支付
            let paymentList = prePayData.paymentList || [];
            if (payType == 'cash' || payType == 'bank' || payType == 'other') {
                //检查库存
                fetchStockBilling({billingNo: orderInfo.billingNo}).then(backData => {
                    return payBillingV4({
                        billingInfo: JSON.stringify(orderInfo),
                        billingNo: orderInfo.billingNo,
                        itemList: JSON.stringify(consumeDetails.filter(x => x.service != 2)),//排除消耗
                        paymentList: JSON.stringify(paymentList),
                        realPay: 'true',
                        sendMsg: '0',
                    }).then((backData) => {
                        let resultCode = backData.data.payResultCode;
                        if (resultCode === '1'){
                            dispatch({type: CASHIERBILLING_PAY_REAL_V4.SUCCESS, data: {billingNo: orderInfo.billingNo}});
                        }
                        else {
                            dispatch({type: CASHIERBILLING_PAY_REAL_V4.ERROR, data: backData.data});
                        }
                    }).catch((err) => {
                        dispatch({type: CASHIERBILLING_PAY_REAL_V4.ERROR, data: {msg: '网络异常'}});
                    });

                }).catch(err => {
                    let backData = err.data;
                    if (backData && backData.payResultCode == '6') {
                        let stockData = JSON.parse(backData.payMsg);
                        dispatch({type: CASHIERBILLING_STOCK.PENDING, data: stockData});
                    } else {
                        dispatch({type: CASHIERBILLING_STOCK.ERROR,});
                    }
                });
            } else if (payType == 'wx' || payType == 'ali') {
                //开始预算
                //let paymentList = prePayData.paymentList//prePayData.paymentList[payType];
                //paymentList.payAmount = orderInfo.totalPrice;
                let roundMode = prePayData.roundMode;
                return fetchPrePayBilling({
                    billingInfo: JSON.stringify(orderInfo),
                    billingNo: orderInfo.billingNo,
                    itemList: prePayData.itemList,
                    paymentList: JSON.stringify(paymentList),
                    sendMsg: '0',
                }).then((backData) => {
                    dispatch(prePayBillingSuccess(orderInfo, payType, paymentList, backData, roundMode));
                }).catch((err) => {
                    dispatch({
                        type: CASHIERBILLING_PREPAY.ERROR,
                    });
                });
            }
        } else if (channel == 'multiply') {//混合支付
            dispatch({
                type: CASHIERBILLING_MULTIPLY.SUCCESS,
                billingNo: orderInfo.billingNo
            });
        } else {//小程序或者app支付
            let isPayByApp = channel == 'app';
            //转为app订单
            return fetchAppBilling({billingNo: orderInfo.billingNo}).then((backData) => {
                let resData = backData.data;
                if (resData.bindingStatus == '0') {
                    dispatch({
                        type: isPayByApp ? CASHIERBILLING_TOAPP.SUCCESS : CASHIERBILLING_WXAPP.SUCCESS,
                        billingNo: orderInfo.billingNo
                    });
                } else {
                    dispatch({
                        type: isPayByApp ? CASHIERBILLING_TOAPP.ERROR : CASHIERBILLING_WXAPP.ERROR,
                    });
                }
            }).catch((err) => {
                dispatch({
                    type: isPayByApp ? CASHIERBILLING_TOAPP.ERROR : CASHIERBILLING_WXAPP.ERROR,
                });
            });
        }
    };
};

//收银--支付-预算完毕-开始扣库存
const prePayBillingSuccess = (orderInfo, payType, paymentList, backData, roundMode) => {
    //散客优惠处理
    if (backData) {
        const payResultCode = backData.data.payResultCode;
        const payTypeMoreList = backData.data.payTypeMoreList;
        if (payResultCode == '2') {
            let payTypeMaster = '';
            let payTypeId = '';
            for (var i = 0; i < payTypeMoreList.length; i++) {
                var element = payTypeMoreList[i];
                payTypeMaster = element.payType;
                payTypeId = element.payTypeId;
            }

            //微信和支付宝
            if (payTypeMaster == '6' && (payTypeId == '18' || payTypeId == '19')) {
                var payAmount = 0.0;
                for (var i = 0; i < payTypeMoreList.length; i++) {
                    var element = payTypeMoreList[i];
                    payAmount += element.beforeConsumeBalance - element.morePayAmount;
                }
                payAmount = payAmount.toFixed(roundMode);
                paymentList.payAmount = payAmount;
                paymentList[0].payAmount = payAmount;
                orderInfo.totalPrice = payAmount;
            }
        }
    }

    return (dispatch, getState) => {
        return fetchStockBilling({billingNo: orderInfo.billingNo}).then(backData => {
            dispatch(reStockBillingSuccess(orderInfo, payType, paymentList));
        }).catch(err => {
            let backData = err.data;
            if (backData) {
                let code = backData.payResultCode;
                if (code == '6') {
                    let stockData = JSON.parse(backData.payMsg);
                    dispatch({
                        type: CASHIERBILLING_STOCK.PENDING,
                        data: stockData
                    });
                } else {
                    dispatch({
                        type: CASHIERBILLING_STOCK.ERROR,
                    });
                }
            } else {
                dispatch({
                    type: CASHIERBILLING_STOCK.ERROR,
                });
            }
        });
    };
};

//收银--支付-库存完毕-开始支付
const reStockBillingSuccess = (orderInfo, payType, paymentList) => {
    return (dispatch, getState) => {
        return fetchPayBilling({
            tp: 'sm',
            mtp: payType,
            type: '3', //参考接口说明
            pls: JSON.stringify(paymentList),
            billingNo: orderInfo.billingNo,
            companyId: orderInfo.companyId,
        }).then(backData => {
            //第三方支付金额计算
            let actaulPrice = paymentList
                .filter(x => x.payTypeId == 18 || x.payTypeId == 19)
                .reduce((result, x) => result + Number(x.payAmount), 0.0);
            backData.data.actaulPrice = actaulPrice;// orderInfo.totalPrice;
            dispatch({
                type: CASHIERBILLING_PAY.SUCCESS,
                data: backData.data,
            });
        }).catch(err => {
            dispatch({
                type: CASHIERBILLING_PAY.ERROR,
            });
            dealyAction(() => displayError(err, '支付失败', true));
        });
    };
};

//构建开单初始化数据
const buildInitOrderData = (navParams, initData) => {
    let companyId = navParams.companyId;
    let storeId = navParams.storeId;
    let deptId = navParams.deptId;
    let isSynthesis = navParams.isSynthesis; //0专业店 1综合店
    let operatorId = navParams.operatorId; //主营分类id
    let operatorText = navParams.operatorText;
    let staffId = navParams.staffId;
    let staffDBId = navParams.staffDBId;
    let numType = navParams.numType;
    let numValue = navParams.numValue;
    let operType = navParams.operType;

    initData.companyId = companyId;
    initData.storeId = storeId;
    initData.deptId = deptId; //开单部门
    initData.operatorId = operatorId; //主营分类
    initData.handNumber = ''; //默认手牌号
    initData.staffId = staffId; //操作员工id
    initData.staffDBId = staffDBId; //操作员工数据库id
    initData.customerNumber = 1;
    initData.operatorId = operatorId;
    initData.isSynthesis = isSynthesis;
    initData.operatorText = operatorText;
    initData.operType = operType;

    if (numValue.length > 0) {
        if ('flownum' == numType) {
            //水单号
            initData.flowNumber = numValue;
        } else {
            initData.handNumber = numValue;
        }
    }

    return initData;
};

//构建单据信息
const buildGetOrderData = (billingData, navParams) => {
    if (billingData.billingList && billingData.billingList.length < 1) {
        return {
            flowNumber: '-1',
            handNumber: '',
            customerNumber: 1,
        };
    } else {
        let orderData = billingData.billingList[0];
        let companyId = navParams.companyId;
        let storeId = navParams.storeId;
        let isSynthesis = navParams.isSynthesis; //0专业店 1综合店
        let staffId = navParams.staffId;
        let staffDBId = navParams.staffDBId;

        return {
            companyId: companyId,
            storeId: storeId,
            isSynthesis,
            staffId: staffId,
            staffDBId: staffDBId,
            totalPrice: orderData.totalPrice,
            billingInfo: orderData.billing,
            consumeList: orderData.consumeList,
            projectInfo: billingData.projectInfo,
            productInfo: billingData.productInfo,
            consumeInfo: billingData.consumeInfo,
            staffInfo: billingData.staffInfo,
            staffPositionInfo: billingData.staffPositionInfo,
            searchInfo: billingData.searchInfo,
            categoryOrder: billingData.categoryOrder,
            isKeyNumber: false,
            memberInfo: billingData.memberInfo,

            //兼容左上角单据信息
            flowNumber: orderData.billing.flowNumber,
            handNumber: orderData.billing.keyNumber,
            isOldCustomer: orderData.billing.isOldCustomer,
            customerNumber: orderData.billing.billingNum,
            customerSex: orderData.billing.customerSex,
            //isSynthesis: '0',
            operatorId: orderData.billing.categoryId,
            operatorText: orderData.billing.categoryName,
        };
    }
};

/**
 * 获取挂单列表
 */
export const getPendingListAction = (flowNumber, refresh, disableLoading = false) => {
    return function (dispatch, getState) {
        if(!disableLoading){
            dispatch({
                type: GET_PENDING_LIST.PENDING,
                body: {
                    searchKey: flowNumber,
                    refresh: refresh,
                },
            });
        }

        if (refresh) {
            flowNumber = getState().pending.searchKey;
        }

        return fetchPendingList(flowNumber)
            .then(backData => {
                dispatch({
                    type: GET_PENDING_LIST.SUCCESS,
                    body: backData.data,
                    rights: backData.rights
                });
                return backData;
            })
            .catch(err => {
                displayError(err, '获取取单单据异常');
                dispatch({
                    type: GET_PENDING_LIST.ERROR,
                });
            });
    };
};

/**
 * 获取结单列表
 */
export const getBillingListAction = (params, refresh) => {
    return function (dispatch, getState) {
        dispatch({
            type: GET_BILLING_LIST.PENDING,
            body: {
                flowNumber: params.flowNumber,
                selectTime: params.selectTime,
                refresh: refresh,
            },
        });

        if (refresh) {
            params.flowNumber = getState().billingList.flowNumber;
            params.selectTime = getState().billingList.selectTime;
        }

        return fetchBillingList(params)
            .then(backData => {
                dispatch({
                    type: GET_BILLING_LIST.SUCCESS,
                    body: backData.data,
                });
                return backData;
            })
            .catch(err => {
                displayError(err, '获取取单单据异常');
                dispatch({
                    type: GET_BILLING_LIST.ERROR,
                });
            });
    };
};

/**
 * 获取结单列表
 */
export const resetBillingListAction = (params, refresh) => {
    return function (dispatch, getState) {
        dispatch({
            type: RESET_BILLING_LIST,
        });
    };
};

export const getServiceStaffsAction = () => {
    return function (dispatch, getState) {
        dispatch({
            type: SERVICE_STAFFS_GET.PENDING,
        });

        let state = getState();
        let cfk = state.component.staffSevice.cfk || 'cfk_' + state.auth.userInfo.storeId + '_staffs';
        return getServiceStaffs({type: 'staff', cfk: cfk})
            .then(backData => {
                dispatch({
                    type: SERVICE_STAFFS_GET.SUCCESS,
                    body: backData,
                });
                //return backData;
            })
            .catch(err => {
                displayError(err);
                dispatch({
                    type: SERVICE_STAFFS_GET.ERROR,
                });
            });
    };
};

export const deleteBillingAction = (param) => {
    return function (dispatch, getState) {
        dispatch({
            type: CASHIERBILLING_DELETE.PENDING,
        });
        return deleteBilling(param)
            .then(backData => {
                let retStatus = backData.data ? backData.data.retStatus : null;
                let msg = '';
                switch (retStatus) {
                    case '1':
                        msg = '废单成功';
                        break;
                    case '-1':
                        msg = '从单不允许废单';
                        break;
                    case '-2':
                        msg = '该单已被支付不允许废单';
                        break;
                    case '-3':
                        msg = '该单已被废除';
                        break;
                    case '-5':
                        msg = '该单据是APP单据，无法废单';
                        break;
                    case '-6':
                        msg = '从单不允许废单';
                        break;
                    case '-98':
                        msg = '该订单正在支付中，不可作废~';
                        break;
                    case '-99':
                        msg = '从单不允许废单';
                        break;
                    case '-6':
                        msg = '从单不允许废单';
                        break;
                }

                if (retStatus == 1) {
                    dispatch({
                        type: CASHIERBILLING_DELETE.SUCCESS,
                        body: msg
                    });
                } else {
                    dispatch({
                        type: CASHIERBILLING_DELETE.ERROR,
                        body: msg
                    });
                }

                //return backData;
            })
            .catch(err => {
                displayError(err);
                dispatch({
                    type: CASHIERBILLING_DELETE.ERROR,
                    body: '网络异常'
                });
            });
    };
}
