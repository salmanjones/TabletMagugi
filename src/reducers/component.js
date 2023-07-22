import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';
import {concatWithoutDuplicate, ListStatus} from '../utils';

import {
    COMPONENT_ACTIONS,
    MEMBER_INDENTIFY_QUERY,
    MEMBER_INDENTIFY_RESET,
    SERVICE_STAFFS_GET,
    VIPCARD_GET_SALES_CARD,
} from '../actions';

const MemberInitialState = {
    listState: ListStatus.idle,
    list: [],
    member: {},
    pageIndex: 0,
    pageNext: 1,
    pageSize: 10,
    error: '',
    selectIndex: 0,
};

export const memberIdentifyReducer = handleActions(
    {
        [MEMBER_INDENTIFY_QUERY.PENDING]: (state, {body}) => {
            const loadMore = body.loadMore;
            return {
                ...(loadMore ? state : MemberInitialState),
                listState: ListStatus.loading,
            };
        },
        [MEMBER_INDENTIFY_QUERY.SUCCESS]: (state, {body}) => {
            const isEnd = body.length < state.pageSize;
            return {
                ...state,
                list: concatWithoutDuplicate(state.list, body),
                listState: isEnd ? ListStatus.end : ListStatus.idle,
                pageIndex: isEnd ? state.pageIndex : state.pageIndex + 1,
                pageNext: isEnd ? 0 : state.pageNext + 1,
            };
        },
        [MEMBER_INDENTIFY_QUERY.ERROR]: (state, {body}) => {
            return {
                ...state,
                listState: ListStatus.error,
                error: body,
            };
        },
        [MEMBER_INDENTIFY_RESET]: (state, {body}) => {
            return {
                ...MemberInitialState,
            };
        },
    },
    MemberInitialState
);

const initialStaffState = {
    loading: false,
    data: [],
    cfk: null,
};

export const staffReducer = handleActions(
    {
        [SERVICE_STAFFS_GET.PENDING]: state => {
            return {
                ...state,
                loading: true,
            };
        },
        [SERVICE_STAFFS_GET.SUCCESS]: (state, {body}) => {
            if (state.cfk && state.cfk === body.cfk) {
                return {
                    ...state,
                    loading: false,
                    propChangeType: 'finish'
                };
            }

            return {
                ...state,
                loading: false,
                data: body.data,
                cfk: body.cfk,
                propChangeType: 'finish'
            };
        },
        [SERVICE_STAFFS_GET.ERROR]: (state, {body}) => {
            return {
                ...state,
                loading: false,
                error: body,
            };
        },
    },
    initialStaffState
);

/**
 * 可销售卡种列表
 */
const initSalesVipcardState = {
    cards: {1: [], 2: []},
    lastTime: 0,
};

export const salesCardReducer = handleActions(
    {
        [VIPCARD_GET_SALES_CARD.PENDING]: state => {
            return {
                ...state,
                loading: true,
            };
        },
        [VIPCARD_GET_SALES_CARD.SUCCESS]: (state, {body}) => {
            return {
                loading: false,
                lastTime: new Date(),
                cards: body,
            };
        },
        [VIPCARD_GET_SALES_CARD.ERROR]: (state, {body}) => {
            return {
                ...state,
                loading: false,
                error: body,
            };
        },
    },
    initSalesVipcardState
);

const initConsumableState = {
    "-1": {lastTime: new Date(), items: []},
    currentConsumables: [],
    categoryConsumables: [],
    loading: false,
}

export const consumablesReducer = handleActions(
    {
        [COMPONENT_ACTIONS.COMPONENT_LOAD_CONSUMABLES.PENDING]: state => {
            return {
                ...state,
                loading: true,
            };
        },
        [COMPONENT_ACTIONS.COMPONENT_LOAD_CONSUMABLES.SUCCESS]: (state, {body}) => {
            return {
                ...state,
                [body.categoryId]: {items: body.data, lastTime: new Date()},
                categoryConsumables: body.data,
                loading: false,
            }
        },
        [COMPONENT_ACTIONS.COMPONENT_LOAD_CONSUMABLES.ERROR]: (state, {body}) => {
            return {
                ...state,
                loading: false
            };
        },
    },
    initConsumableState
);

export const staffModifyReducer = handleActions(
    {
        [COMPONENT_ACTIONS.STAFF_MODIFY_LOAD.PENDING]: state => {
            return {
                ...state,
                loading: true,
            };
        },
        [COMPONENT_ACTIONS.STAFF_MODIFY_LOAD.SUCCESS]: (state, {body}) => {
            return {
                ...state,
                staffPositions: body.positions,
                accessRights: body.accessRights,
                lastFreshTime: new Date(),
                loading: false,
            }
        },
        [COMPONENT_ACTIONS.STAFF_MODIFY_LOAD.ERROR]: (state, {body}) => {
            return {
                ...state,
                loading: false
            };
        },
    },
    {
        loading: false,
        accessRights: {hasChangeHandFeeRight: false, hasChangeProjectRight: false, hasChangeTakeoutRight: false},
        staffPositions: [],
        lastFreshTime: null
    }
);

/**
 *
 */
export const componentReducer = combineReducers({
    memberIdentify: memberIdentifyReducer,
    staffSevice: staffReducer,
    salesCard: salesCardReducer,
    consumables: consumablesReducer,
    staffModify: staffModifyReducer
});
