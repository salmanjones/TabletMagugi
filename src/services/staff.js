import {AppConfig, callService} from '../utils';
import {staffQueues, staffWorks} from "./api";

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
export const fetchWorksList = (appUserId, pageNo = "1", pageSize = "15")=>{
    let params = {
        cname:'',
        staffAppUserId: appUserId,
        targetAppUserId:appUserId,
        pageNo: pageNo + "",
        pageSize: pageSize + ""
    }

    return callService(staffWorks, params, AppConfig.platform.app)
}
