import {callService} from '../utils';
import * as api from './api';

const THIRD_PAY = {
    wx: {id: 19, name: '微信'},
    ali: {id: 18, name: '支付宝'},
};

/**
 *  获取售卡卡种列表
 * @param {*} storeId
 * @param {1是储值卡 2是次卡} cardType
 */
export const fetchVipCardSales = (storeId, cardType) => {
    return callService(api.getVipcardSales, {
        storeId: storeId,
        cardType: cardType,
    }).then(backData => {
        let cardList = backData.data.map(x => {
            return {
                id: x.cardCateId,
                cardCateId: x.cardCateId,
                vipCardNo: x.cardCateId,
                brandLogo: x.brandLogo,
                vipCardName: x.cardName,
                cardType: x.cardType,
                storeName: x.storeName,
                initialPrice: x.initMoney,
                openPrice: x.initMoney,
                depositMoney: x.depositMoney,
                cardCategory: x.cardCategory + '',
                times: x.times,
                validTime: x.validTime,
                endDate: x.endDate,
                consumeMode: x.cardMode || x.consumeMode,
            };
        });
        backData.data = cardList;
        return backData;
    });
}

/**
 *
 * @param {*} deptId
 * @param {*} payType
 * @param {*} isRecharge
 * @param {*} memberId
 * @param {*} totalFee
 * @param {*} staffIds
 * @param {*} title
 * @param {*} vipCardNo
 */
export const fetchCreateCardOrder = (
    deptId,
    payType,
    isRecharge,
    memberId,
    totalFee,
    staffIds,
    title,
    vipCardNo,
    cardCateId,
    cardType,
    client,
    isPassword,
    password
) => {
    const pay = THIRD_PAY[payType];
    let params = {
        tp: 'sm',
        mtp: payType,
        pls: JSON.stringify([
            {
                payType: 6,
                payTypeId: pay.id,
                payTypeNo: pay.id,
                payAmount: totalFee,
                payName: pay.name,
            },
        ]),
        type: isRecharge ? 1 : 0,
        memberId: memberId,
        totalFee: totalFee,
        saleStaffIds: staffIds,
        title: title,
        vipCardNo: vipCardNo,
        deptId: deptId,
        cardCateId,
        cardType,
        clientType: client
    }

    if(isPassword == true){ // 需要修改密码
        params['isPassword'] = '1'
        params['password'] = password
    }else{
        params['isPassword'] = '0'
    }

    return callService(api.createCardOrder, params);
}

export const fetchOtherPayment = (
    deptId,
    isRecharge,
    payType,
    payTypeId,
    payName,
    memberId,
    payAmount,
    staffIds,
    vipCardName,
    vipCardNo,
    cardCateId,
    cardType,
    client,
    isPassword,
    password
) => {
    let params = {
        cardCateId,
        cardType,
        payType: payType,
        payTypeId: payTypeId,
        payTypeNo: payTypeId,
        payAmount: payAmount,
        payName: payName,
        deptId: deptId,
        isRecharge: isRecharge,
        memberId: memberId,
        staffIds: staffIds,
        vipCardName: vipCardName,
        vipCardNo: vipCardNo,
        clientType: client
    }

    if(isPassword == true){ // 需要修改密码
        params['isPassword'] = '1'
        params['password'] = password
    }else{
        params['isPassword'] = '0'
    }

    return callService(api.payOtherPayment, params);
}

export const fetchCardConsumeHistory = (cardId, pageNo, pageSize) => {
    let params = {
        cardId,
        pageSize,
        pageNo,
    };

    return callService(api.fetchCardConsumeHistory, params);
};

export const fetchStaffAcl = (acl, staffId) => {
    let params = {
        acl,
        staffId
    };
    return callService(api.findStaffAcl, params);
}

export const fetchOtherPayType = () => {
    return callService(api.getOtherPayType, {});
}
