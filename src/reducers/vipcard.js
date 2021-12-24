import {handleActions} from 'redux-actions';
import {VIPCARD_INIT, VIPCARD_SELECT_CARD, VIPCARD_SELECT_STAFF, VIPCARD_SET_COUNT, VIPCARD_SET_STAFF,} from '../actions';

export const initialState = {
    staffs: [{}, {}, {}, {}],
    card: {},
    count: 1,
    member: {},
    totalPrice: 0,
    staffIndex: -1,
};

export const vipcardReducer = handleActions(
    {
        [VIPCARD_INIT]: (state, {body}) => {
            return {
                ...initialState,
                member: body,
            };
        },
        [VIPCARD_SET_COUNT]: (state, {body}) => {
            return {
                ...state,
                count: body,
                totalPrice: (Number(state.card.openPrice) + Number(state.card.depositMoney)) * body,
            };
        },
        [VIPCARD_SELECT_CARD]: (state, {body}) => {
            return {
                ...state,
                card: body,
                count: 1,
                totalPrice: body.initialPrice,
            };
        },
        [VIPCARD_SELECT_STAFF]: (state, {body}) => {
            return {
                ...state,
                staffIndex: body,
            };
        },
        [VIPCARD_SET_STAFF]: (state, {body}) => {
            if (state.staffIndex !== -1) {
                let staffs = [].concat(state.staffs);
                staffs[state.staffIndex] = body || {};
                return {
                    ...state,
                    staffs: staffs,
                };
            }
            return state;
        },
    },
    initialState
);
