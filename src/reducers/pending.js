import {handleActions} from 'redux-actions';
import {GET_PENDING_LIST} from 'actions';

export const initialState = {
    searchKey: '',
    loading: false,
    swiperShow: false,
    list: [],
    error: '',
};

export const pendingListReducer = handleActions(
    {
        [GET_PENDING_LIST.PENDING]: (state, {body}) => {
            const {searchKey, refresh} = body;
            let newState = {
                ...state,
                loading: true,
                swiperShow: true,
            };
            if (!refresh) {
                newState.searchKey = searchKey;
            }
            return newState;
        },
        [GET_PENDING_LIST.SUCCESS]: (state, {body, rights}) => {
            return {
                ...state,
                loading: false,
                list: body,
                swiperShow: true,
                rights: rights
            };
        },
        [GET_PENDING_LIST.ERROR]: (state, {body}) => {
            return {
                ...state,
                loading: false,
                error: body,
                swiperShow: true,
            };
        },
    },
    initialState
);
