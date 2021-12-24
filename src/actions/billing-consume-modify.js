import {createAction, delay} from '../../utils';
import {BILLING_MODIFY_ACTIONS, CASHIERBILLING_UPDATE_CONSUMABLE} from './action-types';

export const BILLING_CONSUME_MODIFY_ACTIONS = {
    //加载信息
    BILLING_CONSUME_MODIFY_LOAD: createAction('BILLING_CONSUME_MODIFY_LOAD'),
    //展示添加消耗品
    BILLING_CONSUME_MODIFY_SHOW: createAction(
        'BILLING_CONSUME_MODIFY_SHOW',
        true
    ),
    //展示修改消耗品
    BILLING_CONSUME_MODIFY_UPDATE_SHOW: createAction(
        'BILLING_CONSUME_MODIFY_UPDATE_SHOW',
        true
    ),
    //添加消耗品
    BILLING_CONSUME_MODIFY_ADD: createAction('BILLING_CONSUME_MODIFY_ADD', true),
    BILLING_CONSUME_MODIFY_UPDATE: createAction('BILLING_CONSUME_MODIFY_UPDATE', true),
    //查询消耗品
    BILLING_CONSUME_MODIFY_SEARCH: createAction(
        'BILLING_CONSUME_MODIFY_SEARCH',
        true
    ),
    //
    BILLING_CONSUME_MODIFY_SEARCH_RESET: createAction(
        'BILLING_CONSUME_MODIFY_SEARCH_RESET',
        true
    ),
    //移除消耗品
    BILLING_CONSUME_MODIFY_REMOVE: createAction(
        'BILLING_CONSUME_MODIFY_REMOVE',
        true
    ),
    BILLING_CONSUME_MODIFY_CANCEL: createAction(
        'BILLING_CONSUME_MODIFY_CANCEL',
        true
    ),
    //展示领料人
    BILLING_CONSUME_MODIFY_SHOW_STAFF: createAction(
        'BILLING_CONSUME_MODIFY_SHOW_STAFF',
        true
    ),
    //添加领料人
    BILLING_CONSUME_MODIFY_ADD_STAFF: createAction(
        'BILLING_CONSUME_MODIFY_ADD_STAFF',
        true
    ),
    //删除领料人
    BILLING_CONSUME_MODIFY_DELETE_STAFF: createAction(
        'BILLING_CONSUME_MODIFY_DELETE_STAFF',
        true
    ),
    //保存
    BILLING_CONSUME_MODIFY_SAVE: createAction(
        'BILLING_CONSUME_MODIFY_SAVE',
        true
    ),
    //刷新
    BILLING_CONSUME_MODIFY_RESET: createAction(
        'BILLING_CONSUME_MODIFY_RESET',
        true
    ),
    //显示一个控件
    BILLING_CONSUME_MODIFY_SHOW_BLOCK: createAction(
        'BILLING_CONSUME_MODIFY_SHOW_BLOCK', true
    ),

};

const {
    //加载信息
    BILLING_CONSUME_MODIFY_LOAD,
    //展示消耗品
    BILLING_CONSUME_MODIFY_SHOW,
    BILLING_CONSUME_MODIFY_UPDATE_SHOW,
    //添加消耗品
    BILLING_CONSUME_MODIFY_ADD,
    BILLING_CONSUME_MODIFY_UPDATE,
    //查询消耗品
    BILLING_CONSUME_MODIFY_SEARCH,
    BILLING_CONSUME_MODIFY_SEARCH_RESET,
    //移除消耗品
    BILLING_CONSUME_MODIFY_REMOVE,
    BILLING_CONSUME_MODIFY_CANCEL,
    //展示领料人
    BILLING_CONSUME_MODIFY_SHOW_STAFF,
    //选择领料人
    BILLING_CONSUME_MODIFY_ADD_STAFF,
    //删除领料人
    BILLING_CONSUME_MODIFY_DELETE_STAFF,
    //保存
    BILLING_CONSUME_MODIFY_SAVE,
    BILLING_CONSUME_MODIFY_RESET,
    BILLING_CONSUME_MODIFY_SHOW_BLOCK,
} = BILLING_CONSUME_MODIFY_ACTIONS;

//加载订单信息
export const consumableLoadOrderDataAction = queryParams => (
    dispatch,
    getState
) => {
    let {itemData, orderData} = queryParams;
    dispatch({type: BILLING_CONSUME_MODIFY_LOAD.PENDING});

    delay(
        dispatch({
            type: BILLING_CONSUME_MODIFY_LOAD.SUCCESS,
            data: {
                project: itemData,
                consumables: itemData.consumables,
                billing: orderData,
            },
        }),
        2000
    );
};

export const addConsumableAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_ADD, body: data});
};

export const updateConsumableAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_UPDATE, body: data});
};

export const deleteConsumableAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_REMOVE, body: data});
};

export const cancelConsumableSelectAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_CANCEL, body: data});
};

export const openStaffsBoxAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_SHOW_STAFF, body: data});
};
export const openConsumableBoxAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_SHOW, body: data});
};
export const openConsumableBoxUpdateAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_UPDATE_SHOW, body: data});
};
export const addStaffAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_ADD_STAFF, body: data});
};

export const deleteStaffAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_DELETE_STAFF, body: data});
};

export const resetSearchAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_SEARCH_RESET, body: data});
};

export const searchAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_SEARCH, body: data});
};
export const resetConsumeAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_RESET, body: data});
};

/**
 * 添加消耗
 * @param {} itemData
 */
export const addConsumablesAction = itemData => {
    return function (dispatch, getState) {
        dispatch({
            type: BILLING_MODIFY_ACTIONS.UPDATE_CONSUME_INFO,
            body: itemData,
        });

        dispatch({
            type: CASHIERBILLING_UPDATE_CONSUMABLE,
            itemData: itemData
        });
    };
};

export const showBlockAction = data => (dispatch, getState) => {
    dispatch({type: BILLING_CONSUME_MODIFY_SHOW_BLOCK, body: data});
};
