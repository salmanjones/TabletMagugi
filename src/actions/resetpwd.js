import {Keyboard} from "react-native";
import Toast from 'react-native-root-toast';

import {RESETPWD_SEND_CODE} from "../actions";
import {fetchResetPwdCode, fetchResetPwdSubmit} from "../services";
import {resetNavigationTo, StateCode} from "../utils";

//重置密码--发送验证码
export const resetpwdSendCodeAction = (currState) => {
    //隐藏键盘
    Keyboard.dismiss();

    return (dispatch, getState) => {
        //loading
        dispatch({
            type: RESETPWD_SEND_CODE.PENDING
        });

        //向后台发送请求
        let formData = {
            "username": currState.uname,
            "phone": currState.phone
        }
        return fetchResetPwdCode(formData).then((backData) => {
            if (StateCode.reqSuccess === backData.code) {
                showToast("短信发送成功！");
                dispatch({
                    type: RESETPWD_SEND_CODE.SUCCESS
                })
            } else {
                showToast(convertCodeMsg(backData.code));
                dispatch({
                    type: RESETPWD_SEND_CODE.ERROR
                });
            }
        }).catch(err => {
            showToast(convertCodeMsg(err.code));
            dispatch({
                type: RESETPWD_SEND_CODE.ERROR
            });
        })
    }
};

//重置密码--提交表单
export const resetpwdSubmitAction = (currState) => {
    //隐藏键盘
    Keyboard.dismiss();

    return (dispatch, getState) => {
        //loading
        dispatch({
            type: RESETPWD_SEND_CODE.PENDING
        });

        //向后台发送请求
        let formData = {
            "username": currState.uname,
            "password": currState.pwd,
            "passwordRepeat": currState.npwd,
            "phone": currState.phone,
            "code": currState.checkcode
        }
        return fetchResetPwdSubmit(formData).then((backData) => {
            if (StateCode.reqSuccess === backData.code) {
                showToast("密码重置成功！");
                dispatch({
                    type: RESETPWD_SEND_CODE.SUCCESS
                })
                resetNavigationTo('LoginActivity', dispatch);
            } else {
                showToast(convertCodeMsg(backData.code));
                dispatch({
                    type: RESETPWD_SEND_CODE.ERROR
                });
            }
        }).catch(err => {
            showToast(convertCodeMsg(err.code));
            dispatch({
                type: RESETPWD_SEND_CODE.ERROR
            });
        })
    }
};

const convertCodeMsg = (code) => {
    let msg = "";
    if (code == '7003') {
        msg = "发生未知错误，请联系管理员";
    } else if (code == '20001') {
        msg = "用户名不能为空";
    } else if (code == '20002') {
        msg = "新密码不能为空";
    } else if (code == '20003') {
        msg = "确认密码不能为空";
    } else if (code == '20004') {
        msg = "手机号不能为空";
    } else if (code == '20005') {
        msg = "验证码不能为空";
    } else if (code == '20006') {
        msg = "2次输入密码不一致";
    } else if (code == '20007') {
        msg = "无效用户信息";
    } else if (code == '20008') {
        msg = "验证码错误";
    } else {
        msg = "发生未知错误，请联系管理员";
    }

    return msg;
}

const showToast = (message) => {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
};
