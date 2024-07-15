import {AppConfig, callADM, callService} from '../utils';
import {getMBlogs, staffQueues, staffWorks,} from "./api";
import * as api from "./api";

/**
 * 门店员工列表
 * @param username
 * @param password
 * @returns {Promise<unknown>}
 */
export const fetchStaffList = (storeId, orderBy) => {
    return callService(staffQueues, {
        storeId: storeId,
        orderBy: orderBy || "pop",
        pageSize: '1000'
    }, AppConfig.platform.app)
}

/**
 * 员工作品列表
 * @param appUserId
 * @param pageNo
 * @param pageSize
 * @returns {Promise<Promise<unknown> | Promise.Promise>}
 */
export const fetchWorksList = (appUserId, pageNo = "1", pageSize = "15") => {
    let params = {
        cname: '',
        staffAppUserId: appUserId,
        targetAppUserId: appUserId,
        pageNo: pageNo + "",
        pageSize: pageSize + ""
    }

    return callService(staffWorks, params, AppConfig.platform.app)
}

/**
 * 获取员工作品（新）
 */
export const fetchMBlogs = (data) => {
    let params = {
        method: "get",
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: getMBlogs,
        data: data
    }

    return callADM(params)
}
