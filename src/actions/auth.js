//libs
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Keyboard} from "react-native";
import Toast from 'react-native-root-toast';
//self
import * as types from './action-types';
import {fetchAuthUser} from '../services';
import {AppConfig, resetNavigationTo, StateCode} from '../utils';
import {AppNavigate} from "../navigators";

//输入
export const loginInputChangeAction = (value, name) => {
    return {
        type: types.LOGIN_TEXTINPUT_CHANGE,
        name: name,
        value: value
    }
};

//获得焦点
export const loginInputFoucusinAction = (name) => {
    return {
        type: types.LOGIN_TEXTINPUT_FOCUSIN,
        name: name
    }
};

//失去焦点
export const loginInputFoucusoutAction = (name) => {
    //隐藏键盘
    Keyboard.dismiss();

    return {
        type: types.LOGIN_TEXTINPUT_FOCUSOUT,
        name: ""
    }
};

//用户登录
export const loginSubmitAction = () => {
    //隐藏键盘
    Keyboard.dismiss();

    return function (dispatch, getState) {
        let formValue = getState().login;
        let checkValue = verifyInputInfo(formValue);

        if (checkValue.commit) {
            dispatch(loginInputPostAction())
        } else {
            dispatch(checkInputAction(checkValue));
        }
    };
};

//用户注销
export const logoutAction = () => {
    return function (dispatch, getState) {
        dispatch(loginFormClearAction())
        dispatch(logoutSuccessAction());

        resetNavigationTo('LoginActivity');
    }
};

//跳转重置密码
export const linkToResetpwdAction = () => {
    return (dispatch, getState) => {
        dispatch({type: types.LOGIN_LINK_RESETPWD})
        AppNavigate.navigate('ResetPwdActivity')
    };
};

//触发表单验证结果
const checkInputAction = (value) => {
    return value;
}

//校验用户登录信息
const verifyInputInfo = (formValues) => {
    let backData = {
        type: types.LOGIN_TEXTINPUT_CHECK,
        commit: true,
        usernameValid: true,
        usernameTips: "",
        passwordValid: true,
        passwordTips: ""
    };

    if (formValues.username.length < 1) {
        backData.commit = false;
        backData.usernameValid = false;
        backData.usernameTips = "工号不能为空";
    }

    if (formValues.password.length < 1) {
        backData.commit = false;
        backData.passwordValid = false;
        backData.passwordTips = "密码不能为空";
    }

    return backData;
};

//推送表单内容
const loginInputPostAction = () => {
    return function (dispatch, getState) {
        //触发loading
        dispatch(getDataPosting());
        //获取当前表单值
        let formValue = getState().login;
        //开始网络请求
        return fetchAuthUser(formValue.username, formValue.password).then((backData) => {
            let code = backData.code;
            if (StateCode.reqSuccess != code) {
                let message = convertCodeMsg(code);
                dispatch(getDataFailureAction(message));
            } else {
                dispatch(saveUserInfoAction(backData.data));
            }
        }).catch((e) => {
            dispatch(getDataFailureAction(convertCodeMsg(e.code)));
        })
    }
};

const convertCodeMsg = (code) => {
    let message = "";
    if (code == '7003') {
        message = "发生未知错误，请联系管理员";
    }
    if ('10001' == code) {
        message = "用户名或密码错误";
    } else if ('10002' == code) {
        message = "用户名或密码错误";
    } else if ('10003' == code) {
        message = "用户名或密码错误";
    } else if ('10004' == code) {
        message = "您的公司已注销";
    } else if ('10005' == code) {
        message = "您的账号已停止服务";
    } else if ('10006' == code) {
        message = "您的账号已过期";
    } else {
        message = "网络异常，请稍后再试";
    }

    return message;
}

//开始请求
const getDataPosting = () => {
    return {
        type: types.LOGIN_SUBMIT_POSTING,
        usernameValid: true,
        passwordValid: true,
        loading: true
    }
};

//请求成功
const saveUserInfoAction = (data) => {
    return function (dispatch, getState) {
        dispatch(() => {
            return {
                type: types.LOGIN_SESSION_SUCCESS,
                loading: false
            };
        })

        //保存用户信息到
        AsyncStorage.setItem(AppConfig.sessionStaffId, data.staffId, err => {
            console.log('保存vCode异常', err);
        });
        dispatch(loginSuccessAction(data));

        resetNavigationTo('HomeActivity', {
            title: data.storeName
        });
    }
};

//请求失败
const getDataFailureAction = (message) => {
    Toast.show(message, {
        duration: Toast.durations.Long,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });

    return {
        type: types.LOGIN_FAILURE,
        loading: false
    }
};

//登陆成功
const loginSuccessAction = (data) => {
    return {
        type: types.LOGIN_SUCCESS,
        isLoggedIn: true,
        userInfo: data
    }
};

//注销成功
const logoutSuccessAction = () => {
    return {
        type: types.LOGOUT_SUCCESS,
        isLoggedIn: false,
        userInfo: null
    }
};

//清空表单
const loginFormClearAction = () => {
    return {
        type: types.LOGIN_FORM_CLEAR
    }
};
