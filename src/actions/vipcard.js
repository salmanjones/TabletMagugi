import * as types from './action-types';
import {fetchVipCardSales} from '../services';
import {delay, showMessage} from '../utils';

const CACHE_TIME = 3600 * 1000 * 2;

export const vipcardInitAction = member => {
    return function (dispatch, getState) {
        dispatch({
            type: types.VIPCARD_INIT,
            body: member,
        });
    };
};

export const vipcardSetCountAction = count => {
    return function (dispatch, getState) {
        dispatch({
            type: types.VIPCARD_SET_COUNT,
            body: count,
        });
    };
};

export const vipcardSelectCardAction = card => {
    return function (dispatch, getState) {
        dispatch({
            type: types.VIPCARD_SELECT_CARD,
            body: card,
        });
    };
};

export const vipcardSelectStaffAction = index => {
    return function (dispatch, getState) {
        dispatch({
            type: types.VIPCARD_SELECT_STAFF,
            body: index,
        });
    };
};

export const vipcardSetStaffAction = staff => {
    return function (dispatch, getState) {
        dispatch({
            type: types.VIPCARD_SET_STAFF,
            body: staff,
        });
    };
};

export const createCardAction = () => {
    return function (dispatch, getState) {
        const vipcard = getState().vipcard;
        if (!vipcard.payment.deptId) {
            showMessage('请选择部门');
            dispatch({
                type: types.VIPCARD_CREATE_NEW_CARD.ERROR,
            });
        } else {
            dispatch({
                type: types.VIPCARD_CREATE_NEW_CARD.PENDING,
            });

            delay(
                dispatch({
                    type: types.VIPCARD_CREATE_NEW_CARD.SUCCESS,
                }),
                2000
            );
        }
    };
};

/**
 * 初始化销售卡列表，缓存2小时
 */
export const getSalesCardAction = () => {
    return function (dispatch, getState) {
        const {salesCard} = getState().component;
        const lastTime = salesCard.lastTime;

        if (new Date() - lastTime < CACHE_TIME) {
            dispatch({
                type: types.VIPCARD_GET_SALES_CARD.SUCCESS,
                body: salesCard.cards,
            });
        } else {
            dispatch({
                type: types.VIPCARD_GET_SALES_CARD.PENDING,
            });

            const storeId = getState().auth.userInfo.storeId;
            return Promise.all([
                fetchVipCardSales(storeId, 1),
                fetchVipCardSales(storeId, 2),
            ]).then(data => {
                dispatch({
                    type: types.VIPCARD_GET_SALES_CARD.SUCCESS,
                    body: {
                        1: data[0].data,
                        2: data[1].data,
                    },
                });
            }).catch(err => {
                dispatch({
                    type: types.VIPCARD_GET_SALES_CARD.ERROR,
                    body: err,
                });
            });
        }
    };
};
