import {BILLING_MODIFY_ACTIONS} from './action-types';
import {fetchBillingDetail4Modify} from 'services';

/**
 * 获取订单明细
 * @param {billingNo} queryParams
 */
export const findBillingDetailAction = queryParams => {
    return (dispatch, getState) => {
        dispatch({type: BILLING_MODIFY_ACTIONS.LOAD_DATA.PENDING});

        let params = {
            billingNo: queryParams.billingNo,
        };

        return fetchBillingDetail4Modify(params)
            .then(backData => {
                let orderData = convertToSimpleBillingData(backData.data.billing);
                dispatch({
                    type: BILLING_MODIFY_ACTIONS.LOAD_DATA.SUCCESS,
                    body: orderData,
                    //positions: JSON.parse(backData.data.staffPositions),
                    accessRights: backData.data.accessRights
                });
                return Promise.resolve(orderData);
            })
            .catch(err => {
                dispatch({
                    type: BILLING_MODIFY_ACTIONS.LOAD_DATA.ERROR,
                    body: err,
                });
                return Promise.reject(err);
            });
    };
};

//
export const moidfyStaffAction = (projectId, staffIndex, staff) => {
    return function (dispatch, getState) {
        dispatch({
            type: BILLING_MODIFY_ACTIONS.UPDATE_STAFF_INFO,
            body: {projectId, staffIndex, staff}
        });
    };
}

/**
 * 重置store
 * @param {*} number
 */
export const resetAction = number => {
    return function (dispatch, getState) {
        dispatch({
            type: BILLING_MODIFY_ACTIONS.RESET,
        });
    };
};

/**
 *  更新客单数
 * @param {*} number
 */
export const updateCustomerNumberAction = number => {
    return function (dispatch, getState) {
        dispatch({
            type: BILLING_MODIFY_ACTIONS.UPDATE_CUSTOMER_NUMBER,
            body: number,
        });
    };
};

// /**
//  * 添加消耗
//  * @param {} itemData
//  */
// export const addConsumablesAction = itemData => {
//   return function(dispatch, getState) {
//     dispatch({
//       type: BILLING_MODIFY_ACTIONS.UPDATE_CONSUME_INFO,
//       body: itemData,
//     });

//     // dispatch({
//     //   type: BILLING_CONSUME_MODIFY_ACTIONS.BILLING_CONSUME_MODIFY_RESET,
//     // });
//   };
// };

/**
 * 格式化订单明细数据
 * @param {*} orderData
 */
const convertToSimpleBillingData = orderData => {
    let formatStaffData = function (staffsStr) {
        let staffs = JSON.parse(staffsStr);
        for (let i = 0; i < 3; i++) {
            staffs[i] = staffs[i] ? staffs[i] : {};
        }
        staffs = staffs.slice(0, 3);
        return staffs;
    };

    let itemList = orderData.consumeList.map(item => ({
        ...item,
        assistList: formatStaffData(item.assistStaffDetail),
        projectMirror: JSON.parse(item.projectMirror),
        projectMirrorIndex: JSON.parse(item.projectMirror).index,
    }));

    var normalItemList = itemList.filter(item => item.service != 2);
    normalItemList.forEach(element => {
        //set staff performance
        element.assistList.forEach(staff => {
            let staffPerformance = 0;
            if (staff.performanceMap && staff.performanceMap != '') {
                let pfmMap = JSON.parse(staff.performanceMap);
                for (let field in pfmMap) {
                    if (pfmMap.hasOwnProperty(field)) {
                        staffPerformance += pfmMap[field];
                    }
                }
            } else if (staff.performance) {
                staffPerformance = staff.performance;
            } else if (staff.systemPerformance) {
                staffPerformance = staff.systemPerformance;
            }

            staff.staffPerformance = staffPerformance
                ? Number(staffPerformance).toFixed(2)
                : '';
            staff.staffWorkfee = staff.workerFee || staff.systemWorkerFee;
            staff.staffWorkfee = staff.staffWorkfee
                ? Number(staff.staffWorkfee).toFixed(2)
                : '';
        });

        if (element.service === 1) {
            var consumables = itemList.filter(
                item =>
                    item.service === 2 &&
                    item.projectMirrorIndex == element.projectMirrorIndex
            );
            element.consumables = consumables;
        }
    });

    return {
        companyId: orderData.companyId,
        storeId: orderData.storeId,
        status: orderData.status,
        type: orderData.type,
        payEndTime: orderData.payEndTime,
        createTime: orderData.createTime,
        integral: orderData.integral,
        remark: orderData.remark,
        prickStatus: orderData.prickStatus,
        categoryName: orderData.categoryName,
        categoryId: orderData.categoryId,
        billingNo: orderData.billingNo,
        flowNumber: orderData.flowNumber,
        handNumber: orderData.keyNumber,
        isOldCustomer: orderData.isOldCustomer,
        customerNumber: orderData.billingNum,
        operatorId: orderData.categoryId,
        operatorText: orderData.categoryName,
        consumeList: normalItemList,
    };
};
