import * as types from "../actions/action-types";

let loginFormValue = {
    username: "",
    usernameValid: true,
    usernameTips: "",
    password: "",
    passwordValid: true,
    passwordTips: "",
    loading: false,
    focus: ""
};

export const loginReducer = (state = loginFormValue, action) => {
    //当前状态
    let currState = Object.assign({}, state);
    switch (action.type) {
        case types.LOGIN_TEXTINPUT_CHANGE:
            return doInputValue(action, currState);
        case types.LOGIN_TEXTINPUT_FOCUSIN:
            currState.focus = action.name;
            return currState;
        case types.LOGIN_TEXTINPUT_FOCUSOUT:
            currState.focus = action.name;
            return currState;
        case types.LOGIN_TEXTINPUT_CHECK:
            currState.usernameValid = action.usernameValid;
            currState.usernameTips = action.usernameTips;
            currState.passwordValid = action.passwordValid;
            currState.passwordTips = action.passwordTips;
            return currState;
        case types.LOGIN_SUBMIT_FORM:
            return currState;
        case types.LOGIN_SUBMIT_POSTING:
            currState.usernameValid = action.usernameValid;
            currState.passwordValid = action.passwordValid;
            currState.loading = action.loading;
            return currState;
        case types.LOGIN_SESSION_SUCCESS:
            currState.loading = action.loading;
            return currState;
        case types.LOGIN_FAILURE:
            currState.loading = action.loading;
            return currState;
        case types.LOGIN_FORM_CLEAR:
            return loginFormValue;
        default:
            return state;
    }
};

//登录注销
const initAuthState = {
    isLoggedIn: false,
    userInfo: null
};
export const authReducer = (state = initAuthState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {...state, isLoggedIn: action.isLoggedIn, userInfo: action.userInfo};
        case types.LOGOUT_SUCCESS:
            return {...state, isLoggedIn: action.isLoggedIn, userInfo: action.userInfo};
        default:
            return state;
    }
}

/**
 * 统一处理input输入
 */
let doInputValue = (action, currState) => {
    if (action.name == 'username') {
        currState.username = action.value;
        if (currState.username.trim().length < 1) {
            currState.usernameValid = false;
            currState.usernameTips = "工号不能为空";
        } else {
            currState.usernameValid = true;
            currState.usernameTips = "";
        }
    } else if (action.name == 'password') {
        currState.password = action.value;
        if (currState.password.trim().length < 1) {
            currState.passwordValid = false;
            currState.passwordTips = "密码不能为空";
        } else {
            currState.passwordValid = true;
            currState.passwordTips = "";
        }
    }

    return currState;
};
