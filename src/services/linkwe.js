import {callLinkWeCom} from '../utils';
import * as api from './api';

/**
 * 获取门店福利管企微码
 * @param params
 * @returns {Promise<*>}
 */
export const getStoreQRImg = (params) => {
    return callLinkWeCom({
        method: "post",
        url: api.lwGetStoreQR,
        data: params,
        responseType: 'arraybuffer'
    });
}

export const getStoreQRState = (params) => {
    return callLinkWeCom({
        method: "get",
        url: api.lwGetQRState,
        data: params
    });
}
