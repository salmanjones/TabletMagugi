import {callLinkWeCom} from '../utils';
import * as api from './api';

export const getStoreQRImg = (params) => {
    return callLinkWeCom({
        method: "get",
        url: api.lwGetStoreQR,
        data: params,
        responseType: 'arraybuffer'
    });
}
