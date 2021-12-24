import {callService} from '../utils';
import * as api from './api';

export const fetchAuthUser = (username, password) => {
    return callService(api.loginAction, {
        username: username,
        password: password
    });
}

export const fetchAuthToken = () => {
    return callService(api.getToken).then((backData) => {
    }).catch((err) => {
        console.error(err);
    })
};
