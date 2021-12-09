import {authReducer, loginReducer} from './auth';
import {resetPwdReducer} from './resetpwd';
import {pendingListReducer} from './pending';
import {billingListReducer} from './billingList'
import {billingOrderReducer} from './billing';
import {componentReducer} from './component';
import {vipcardReducer} from './vipcard';
import {billingConsumableModifyReducer} from './billingConsumableModify';
import {orderModifyReducer} from './billingModify';
import {combineReducers} from "redux";

const reducers = combineReducers({
    auth: authReducer,
    login: loginReducer,
    resetPwd: resetPwdReducer,
    pending: pendingListReducer,
    billingList: billingListReducer,
    billingOrder: billingOrderReducer,
    component: componentReducer,
    vipcard: vipcardReducer,
    billingConsumableModify: billingConsumableModifyReducer,
    editBilling: orderModifyReducer,
});

export default reducers;
