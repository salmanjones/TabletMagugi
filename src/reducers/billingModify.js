import {handleActions} from 'redux-actions';
import {BILLING_MODIFY_ACTIONS} from 'actions';

export const initialState = {
    loading: true,
    error: '',
    editFlag: false,
    orderData: {
        flowNumber: '',
        handNumber: '',
        customerNumber: 1,
    },
};

export const orderModifyReducer = handleActions(
    {
        [BILLING_MODIFY_ACTIONS.LOAD_DATA.PENDING]: (state, {body}) => {
            return {
                ...state,
                loading: true,
            };
        },
        [BILLING_MODIFY_ACTIONS.LOAD_DATA.SUCCESS]: (
            state,
            {body, positions, accessRights}
        ) => {
            return {
                ...state,
                loading: false,
                orderData: body,
                //positions: positions,
                accessRights: accessRights,
            };
        },
        [BILLING_MODIFY_ACTIONS.UPDATE_STAFF_INFO]: (state, {body}) => {
            let {projectId, staffIndex, staff} = body;
            //let item= state.consumeList.filter(x=>x.id===projectId)[0];
            //item.assistList[staffIndex]=staff;
            let itemList = state.orderData.consumeList.map(item => {
                if (item.id === projectId) {
                    item.assistList[staffIndex] = staff;

                    return {
                        ...item,
                        assistList: [...item.assistList],
                    };
                } else {
                    return item;
                }
            });

            return {
                ...state,
                editFlag: true,
                orderData: {
                    ...state.orderData,
                    consumeList: itemList,
                },
            };
        },
        [BILLING_MODIFY_ACTIONS.LOAD_DATA.ERROR]: (state, {body}) => {
            return {
                ...state,
                loading: false,
                error: body,
            };
        },
        [BILLING_MODIFY_ACTIONS.UPDATE_CUSTOMER_NUMBER]: (state, {body}) => {
            state.orderData.customerNumber = body;
            state.editFlag = true;
            return state;
        },
        [BILLING_MODIFY_ACTIONS.UPDATE_CONSUME_INFO]: (state, {body}) => {

            if (!state.orderData.consumeList) return {...initialState};

            let itemList = state.orderData.consumeList.map(item => {
                if (item.id === body.id) {
                    return {
                        ...body,
                    };
                } else {
                    return item;
                }
            });

            return {
                ...state,
                editFlag: true,
                orderData: {
                    ...state.orderData,
                    consumeList: itemList,
                },
            };
        },
        [BILLING_MODIFY_ACTIONS.RESET]: (state, {body}) => {
            return {
                ...initialState,
            };
        },
    },
    initialState
);
