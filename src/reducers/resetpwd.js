import {RESETPWD_FROM_SUBMIT, RESETPWD_SEND_CODE} from "actions";

const defaultSatete = {
    loading: false
}
export const hanleResetpwdForm = (state = defaultSatete, action) => {
    //当前状态
    let currState = Object.assign({}, state);
    switch (action.type) {
        case RESETPWD_SEND_CODE.PENDING:
            currState.loading = true;
            return currState;
        case RESETPWD_SEND_CODE.SUCCESS:
            currState.loading = false;
            return currState;
        case RESETPWD_SEND_CODE.ERROR:
            currState.loading = false;
            return currState;
        case RESETPWD_FROM_SUBMIT.PENDING:
            currState.loading = true;
            return currState;
        case RESETPWD_FROM_SUBMIT.SUCCESS:
            currState.loading = false;
            return currState;
        case RESETPWD_FROM_SUBMIT.ERROR:
            currState.loading = false;
            return currState;
        default:
            return state;
    }
}
