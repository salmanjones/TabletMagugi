import {persistCombineReducers} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import {authReducer, handleLoginForm} from './auth';
import {hanleResetpwdForm} from './resetpwd';
import {pendingListReducer} from './pending';
import {billingListReducer} from './billingList'
import navReducer from './nav';
import {billingOrderReducer} from './billing';
import {componentReducer} from './component';
import {vipcardReducer} from './vipcard';
import {billingConsumableModifyReducer} from './billingConsumableModify';
import {orderModifyReducer} from './billingModify';

const opt = {
    key: 'redux-persist',
    storage: AsyncStorage,
    transform: [],
    whitelist: ['auth'],
};

const reducers = persistCombineReducers(opt, {
    nav: navReducer,
    auth: authReducer,
    handleLoginForm,
    hanleResetpwdForm,
    pending: pendingListReducer,
    billingList: billingListReducer,
    //memberIdentify: memberIdentifyReducer,
    billingOrder: billingOrderReducer,
    component: componentReducer,
    vipcard: vipcardReducer,
    billingConsumableModify: billingConsumableModifyReducer,
    editBilling: orderModifyReducer,
});

export default reducers;
