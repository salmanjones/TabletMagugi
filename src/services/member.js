import {callService} from 'utils';
import * as api from './api';

/**
 * 查询会员
 */
export const fetchMemberInfo = (keyWord, cardInfoFlag, pageIndex, pageSize) => {
    return callService(api.fetchMemberInfo, {
        kw: keyWord,
        cardInfoFlag: cardInfoFlag,
        ps: pageSize,
        p: pageIndex,
    }).then(backData => {
        let cardList = backData.data.memberList.map(x => {
            return {
                id: x.id,
                name: x.name || '-',
                memberCardNo: x.memberCardNo,
                sex: x.sex,
                memberType: x.memberType,
                phone: x.phone || '-',
                imgUrl: x.bmsImgUrl || '',
                reserveId: x.reserveId,
                reserveStatus: x.reserveStatus,
                reserveStaffName: x.reserveStaffName,
                reserveTrueTime: x.reserveTrueTime,
                vipStorageCardList: (x.vipStorageCardList || []).map(item => {
                    item.brandLogo = item.orderBy;
                    item.cardCategory = item.projectCategroyId;
                    delete item.details;
                    return item;
                }),
            };
        });
        backData.data.memberList = cardList;
        return backData;
    });
};

/**
 * 生成会员号码
 */
export const fetchMemberNO = () => {
    return callService(api.getMemberNo, {});
};

/**
 * 创建新会员
 * @param {*} member
 */
export const fetchCreateMember = member => {
    return callService(api.createNewMember, member).then(backData => {
        const memberId = backData.data;
        backData.data = {
            id: memberId,
            name: member.memberName,
            memberCardNo: member.memberNo,
            sex: member.memberSex,
            phone: member.memberPhone,
            vipStorageCardList: [],
        };
        return backData;
    });
};


/**
 * 查询等待会员
 */
export const fetchWaitingMembersResult = (storeId, showCard) => {
    return callService(api.fetchWaitingMembersInfo, {
        storeId: storeId,
        showCard: showCard
    });
};

/**
 * 根据会员id查询对应的卡信息
 */
export const fetchMemberCardList = (memberId) => {
    return callService(api.fetchMemberCardList, {
        memberId: memberId
    });
};


/**
 * 查询登录人员的权限信息
 */
export const selectStaffAclInfoResult = (staffId, companyId) => {
    return callService(api.selectStaffAclInfo, {
        staffId: staffId,
        companyId: companyId
    });
};


/**
 * 查询等待会员的对应卡信息
 */
export const fetchWaitingMembersCardResult = (storeId, customerId, companyId) => {
    return callService(api.fetchWaitingMemberCardInfo, {
        companyId: companyId,
        storeId: storeId,
        customerId: customerId
    });
};

/**
 * 查询当前版本号
 */
export const fetchFindVersionResult = (systemName) => {
    return callService(api.fetchFindVersionInfo, {
        appType: systemName
    });
};

/**
 * 查询员工的轮排信息
 */
export const findStaffRotateInfoResult = (staffId, companyId, storeId) => {
    return callService(api.findStaffRotateInfo, {
        companyId: companyId,
        storeId: storeId,
        staffId: staffId
    });
};

/**
 * 查询员工的轮排信息
 */
export const saveStaffRotateInfoResult = (staffId, companyId, storeId, checkIdStr) => {
    return callService(api.saveStaffRotateInfo, {
        companyId: companyId,
        storeId: storeId,
        staffId: staffId,
        checkIdStr: checkIdStr
    });
};

/**
 * 查询该公司是否需要设置会员密码
 */
export const fetchMemberPasswordStat = () => {
    return callService(api.fetchMemberPasswordStat, {});
};

