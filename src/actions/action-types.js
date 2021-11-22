import {createAction} from 'utils';

//LoginActivity
export const LOGIN_TEXTINPUT_CHANGE = 1000; //登录输入框改变
export const LOGIN_TEXTINPUT_FOCUSIN = 1001; //输入框获得焦点
export const LOGIN_TEXTINPUT_FOCUSOUT = 1002; //输入框失去焦点
export const LOGIN_TEXTINPUT_CHECK = 1003; //校验用户输入结果
export const LOGIN_SUBMIT_POSTING = 1005; //提交表单
export const LOGIN_SUCCESS = 1006; //登陆成功
export const LOGIN_SESSION_SUCCESS = 1007; //登陆成功-存储用户信息
export const LOGIN_FAILURE = 1008; //登录失败
export const LOGIN_FORM_CLEAR = 1009; //清空表单
export const LOGOUT_SUCCESS = 1010; //注销成功
export const LOGIN_LINK_RESETPWD = 1011; //跳转重置密码

//ResetpwdActivity
export const RESETPWD_SEND_CODE = createAction('RESETPWD_SEND_CODE'); //重置密码-发送验证码
export const RESETPWD_FROM_SUBMIT = createAction('RESETPWD_FROM_SUBMIT'); //重置密码-提交表单

//CashierBillingActivity
export const CASHIERBILLING_CLEAR = createAction('CASHIERBILLING_CLEAR', true); //收银-清除缓存
export const CASHIERBILLING_INIT = createAction('CASHIERBILLING_INIT'); //收银-初始化
export const CASHIERBILLING_FLOWNUMBER_INIT = {
    REFRESH: `CASHIERBILLING_FLOWNUMBER_INIT_REFRESH`,
    RESET: `CASHIERBILLING_FLOWNUMBER_INIT_RESET`,
}; //收银-初始化水单号
export const CASHIERBILLING_SAVE = createAction('CASHIERBILLING_SAVE'); //收银-挂单
export const CASHIERBILLING_GET = createAction('CASHIERBILLING_GET'); //收银-取单
export const CASHIERBILLING_PAY = createAction('CASHIERBILLING_PAY'); //收银-结算
export const CASHIERBILLING_PREPAY = createAction('CASHIERBILLING_PREPAY'); //收银-预算
export const CASHIERBILLING_PAY_REAL_V4 = createAction('CASHIERBILLING_PAY_REAL_V4');//收银支付，现金，银行卡，外联
export const CASHIERBILLING_TOAPP = createAction('CASHIERBILLING_TOAPP'); //收银-app支付
export const CASHIERBILLING_WXAPP = createAction('CASHIERBILLING_WXAPP'); //收银-微信小程序支付
export const CASHIERBILLING_MULTIPLY = createAction('CASHIERBILLING_MULTIPLY'); //收银-混合支付
export const CASHIERBILLING_STOCK = createAction('CASHIERBILLING_STOCK'); //收银-预出库
export const CASHIERBILLING_FLOWNUMBER = createAction(
    'CASHIERBILLING_FLOWNUMBER'
); //收银-校验水单号
export const CASHIERBILLING_UPDATE_CONSUMABLE = createAction('CASHIERBILLING_UPDATE_CONSUMABLE', true);//添加修改消耗
export const CASHIERBILLING_RELOAD_ORDER = createAction('CASHIERBILLING_RELOAD_ORDER'); //重新加载保存订单
export const CASHIERBILLING_DELETE = createAction('CASHIERBILLING_DELETE'); //收银-废单

//PendingOrderActivity
export const GET_PENDING_LIST = createAction('GET_PENDING_LIST'); //获取挂单列表
//billingOrderActivity
export const GET_BILLING_LIST = createAction('GET_BILLING_LIST'); //获取挂单列表

export const RESET_BILLING_LIST = createAction('RESET_BILLING_LIST', true);
//staff
export const SERVICE_STAFFS_GET = createAction('SERVICE_STAFFS_GET');

//Member
export const MEMBER_INDENTIFY_QUERY = createAction('MEMBER_INDENTIFY_QUERY');
export const MEMBER_INDENTIFY_SELECT_MEMBER = createAction(
    'MEMBER_INDENTIFY_SELECT_MEMBER',
    true
);
export const MEMBER_INDENTIFY_RESET = createAction(
    'MEMBER_INDENTIFY_RESET',
    true
);

//VipCard
export const VIPCARD_SELECT_CARD = createAction('VIPCARD_SELECT_CARD', true);
export const VIPCARD_INIT = createAction('VIPCARD_INIT', true);
export const VIPCARD_GET_SALES_CARD = createAction('VIPCARD_GET_SALES_CARD');
export const VIPCARD_SET_COUNT = createAction('VIPCARD_SET_COUNT', true);
export const VIPCARD_SELECT_STAFF = createAction('VIPCARD_SELECT_STAFF', true);
export const VIPCARD_SET_STAFF = createAction('VIPCARD_SET_STAFF', true);

//billing modify
export const BILLING_MODIFY_ACTIONS = {
    //加载订单明细信息
    LOAD_DATA: createAction('BILLING_MODIFY_INITIAL_BILLING'),

    //更新客数
    UPDATE_CUSTOMER_NUMBER: createAction('UPDATE_CUSTOMER_NUMBER', true),

    //更新服务人
    UPDATE_STAFF_INFO: createAction('UPDATE_STAFF_INFO', true),

    //更新消耗
    UPDATE_CONSUME_INFO: createAction('UPDATE_CONSUME_INFO', true),

    //重置
    RESET: createAction('RESET', true),
};
