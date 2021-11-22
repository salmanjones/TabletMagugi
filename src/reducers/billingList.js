import {handleActions} from 'redux-actions';
import {GET_BILLING_LIST, RESET_BILLING_LIST} from 'actions';

export const initialState = {
    searchKey: '',
    loading: true,
    swiperShow: false,
    list: [],
    error: '',
};

export const billingListReducer = handleActions(
    {
        [GET_BILLING_LIST.PENDING]: (state, {body}) => {
            const {flowNumber, selectTime, refresh} = body;
            let newState = {
                ...state,
                loading: true,
                swiperShow: true,
            };
            if (!refresh) {
                newState.flowNumber = flowNumber;
                newState.selectTime = selectTime;
            }
            return newState;
        },
        [GET_BILLING_LIST.SUCCESS]: (state, {body}) => {
            return {
                ...state,
                loading: false,
                list: body,
                swiperShow: true,
            };
        },
        [GET_BILLING_LIST.ERROR]: (state, {body}) => {
            return {
                ...state,
                loading: false,
                error: body,
                swiperShow: true,
            };
        },
        [RESET_BILLING_LIST]: (state, {body}) => {
            return {
                ...initialState,
            };
        },
    },
    initialState
);
