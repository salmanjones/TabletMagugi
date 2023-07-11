//libs
import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let naviBarHeight = PixelUtil.size(120);
let rightPanelWidth = PixelUtil.screenSize.width * 0.5;
let rightPanelHeight = PixelUtil.screenSize.height - naviBarHeight;
let rightTabHeight = PixelUtil.size(106);
let rightFooterHeight = PixelUtil.size(185);
let cardBoxHeight = rightPanelHeight - rightTabHeight - rightFooterHeight;
export const RechargeStoredCardStyles = StyleSheet.create({
    content: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingBottom: '2%',
    },
    contentNew: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
    },
    openCardTitle: {
        // 售卡-标题
        width: '100%',
        height: PixelUtil.size(106),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
    },
    openContentBox: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
    },
    openCardTitleL: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    openCardTitleR: {
        width: '50%',
        height: '100%',
    },
    contentBox: {
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    contentBody: {
        width: '50%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
    },
    Leftcontent: {
        // 左边主体
        width: '100%',
        height: '100%',
    },
    LeftcontentNew: {
        // 左边主体
        width: '100%',
        height: '100%',
    },
    title: {
        // 标题
        width: '100%',
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        // 标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    cardOperateBox: {
        // 主体-顶部
        width: '100%',
        height: '60%',
    },
    cardOperateNoneBox: {
        // 无内容
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardOperateBoxOther: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardOperateNoneBoxOther: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardOperateNoneImg: {
        //无内容-图片
        width: PixelUtil.size(368),
        height: PixelUtil.size(368),
    },
    cardOperateNoneT: {
        //无内容-文字
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
        textAlign: 'center',
    },
    cardOperateNoneText: {
        //无内容-文字
        fontSize: PixelUtil.size(24),
        color: '#333',
        marginLeft: PixelUtil.size(40),
        fontWeight: '500'
    },
    cardOperateT: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        marginBottom: PixelUtil.size(12),
        textAlign: 'center',
        fontWeight: '500'
    },
    cardInfo: {
        // 顶部--卡信息
        width: '100%',
        height: '60%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardCategory: {
        // 顶部-卡面信息
        width: '60%',
        paddingTop: PixelUtil.size(34),
        paddingBottom: PixelUtil.size(34),
        paddingLeft: PixelUtil.size(78),
    },
    cardOther: {
        // 顶部-卡其他信息
        width: '40%',
        paddingTop: PixelUtil.size(60),
        paddingBottom: PixelUtil.size(60),
        marginLeft: PixelUtil.size(40),
    },
    cardGivePrice: {
        // 顶部-赠金
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: PixelUtil.size(30),
    },
    cardGivePriceName: {
        // 顶部-赠金-文字
        width: '42%',
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'right',
    },
    cardGivePriceNum: {
        // 顶部-赠金-数字
        width: '58%',
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    cardBalancePrice: {
        // 顶部-欠款
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: PixelUtil.size(20),
    },
    cardBalancePriceName: {
        // 顶部-欠款-文字
        width: '42%',
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'right',
    },
    cardBalancePriceNum: {
        // 顶部-欠款-数字
        width: '58%',
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    cardDate: {
        // 顶部-截止日期
        fontSize: PixelUtil.size(32),
        color: '#333',
        paddingLeft: PixelUtil.size(6),
    },
    storedCardBox: {
        // 顶部-充值
        width: '100%',
        height: '40%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
    },
    storedCardInfo: {
        // 顶部-充值-信息
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    storedCardText: {
        // 顶部-充值-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    storedCardInpBox: {
        // 顶部-充值-输入框盒子
        width: PixelUtil.rect(393.8, 76).width,
        height: PixelUtil.rect(393.8, 76).height,
        backgroundColor: '#fff',
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(4),
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    storedCardInpBoxActive: {
        width: PixelUtil.rect(393.8, 76).width,
        height: PixelUtil.rect(393.8, 76).height,
        borderColor: '#40aaff',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(4),
        backgroundColor: '#40aaff',
        elevation: 8,
        shadowOffset: {width: 0, height: 8},
        shadowColor: '#40aaff',
        shadowOpacity: 1,
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    storedCardInp: {
        // 顶部-充值-输入框
        width: PixelUtil.rect(353.8, 72).width,
        height: PixelUtil.rect(353.8, 72).height,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: '#fff',
    },
    storedCardTip: {
        // 顶部-充值-提示
        position: 'absolute',
        bottom: '20%',
        fontSize: PixelUtil.size(28),
        color: '#000',
    },
    storedCardTipPrice: {
        //无内容-文字
        fontSize: PixelUtil.size(24),
        fontWeight: '500',
        color: '#FFA800',
    },
    cardServicerInfo: {
        // 中部-服务人
        width: '100%',
        height: '40%',
        overflow: 'hidden',
    },
    cardServicerTitle: {
        // 中部-服务人-标题
        width: '100%',
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
    },
    cardServicerTitleItem: {
        // 中部-服务人-标题-各项
        width: PixelUtil.rect(128, 128).width,
        height: PixelUtil.rect(128, 128).height,
        textAlign: 'center',
        fontSize: PixelUtil.size(32),
        color: '#333',
        marginTop: PixelUtil.size(88),
    },
    cardServicerBox: {
        // 中部-服务人-主体
        width: '100%',
        height: '70%',
        overflow: 'hidden',
        paddingLeft: PixelUtil.size(10),
    },
    servicerPersonInfo: {
        // 服务项-服务人
        width: PixelUtil.rect(128, 128).width,
        height: PixelUtil.rect(128, 128).height,
        backgroundColor: '#f3f3f3',
        borderColor: '#BCCDFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(30),
        marginRight: PixelUtil.size(100),
        marginTop: PixelUtil.size(20),
        marginBottom: PixelUtil.size(10),
        overflow: 'hidden',
    },
    servicerPersonInfoSelected: {
        // 服务项-服务人
        width: PixelUtil.rect(128, 128).width,
        height: PixelUtil.rect(128, 128).height,
        backgroundColor: '#f3f3f3',
        borderColor: '#FF9B1F',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(30),
        marginRight: PixelUtil.size(100),
        marginTop: PixelUtil.size(20),
        overflow: 'hidden',
    },
    servicerBodyLi: {
        //服务项-列
        width: '110%',
        height: PixelUtil.size(190),
        borderBottomColor: '#CFDDFF',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: PixelUtil.size(18),
        overflow: 'hidden',
    },
    Rightcontent: {
        //右侧-主体
        width: rightPanelWidth,
        height: rightPanelHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
    },
    openCardTitleRO: {
        width: '100%',
        height: rightTabHeight,
        position: 'relative'
    },
    ShowMemberCardBox: {
        // 顾客识别-识别展示
        width: '100%',
        height: cardBoxHeight,
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderLeftWidth: 0,
    },
    RightServicecontent: {
        //服务人
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    RightTitle: {
        //右侧-标题
        width: '100%',
        height: '9.4%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(28),
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
    },
    RightTitleItem: {
        //右侧-标题-各项
        width: PixelUtil.rect(168, 68).width,
        height: PixelUtil.rect(168, 68).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: PixelUtil.size(80),
    },
    RightTitleItemText: {
        //右侧-标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    RightTitleItemActive: {
        //右侧-标题-各项
        width: PixelUtil.rect(168, 68).width,
        height: PixelUtil.rect(168, 68).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111c3c',
        borderRadius: PixelUtil.size(200),
        marginRight: PixelUtil.size(80),
    },
    RightTitleItemTextActive: {
        //右侧-标题-文字
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    ShowMemberCardBoxO: {
        width: '100%',
        height: '100%',
    },
    ShowMemberCardList: {
        // 顾客识别-卡展示
        width: '100%',
        height: '100%',
        paddingLeft: PixelUtil.size(8),
        paddingRight: PixelUtil.size(8),
        paddingTop: PixelUtil.size(18),
    },
    openCardBody: {
        //售卡主体
        width: '100%',
        height: '75%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
    },
    openCardBox: {
        // 售卡-卡展示
        width: '100%',
        height: PixelUtil.size(850),
    },
    LeftOpenCardcontent: {
        // 售卡-左边主体
        width: '50%',
        height: '100%',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
        position: 'relative',
    },
    openCardTitleRTitleO: {
        width: PixelUtil.size(660),
        height: PixelUtil.size(106),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginLeft: PixelUtil.size(-4),
    },
    openCardTitleRTitle: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    openCardCategory: {
        width: '60%',
        paddingLeft: PixelUtil.size(78),
    },
    openCardInfoBox: {
        // 顶部--卡信息
        width: '100%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    openCardInfo: {
        // 顶部--卡信息
        width: '100%',
        // height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    openCardServicerInfo: {
        // 中部-服务人
        width: '100%',
        height: '25%',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    openCardOther: {
        width: '25%',
        paddingTop: PixelUtil.size(60),
        paddingBottom: PixelUtil.size(60),
    },
    openCardOtheBox: {
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(38),
    },
    openCardText: {
        fontSize: PixelUtil.size(48),
        color: '#333',
        textAlign: 'center',
        marginBottom: PixelUtil.size(30),
        height: PixelUtil.size(72),
    },
    openCardOtherTextBox: {
        height: PixelUtil.size(72),
        paddingTop: PixelUtil.size(4),
        marginRight: PixelUtil.size(20),
        minWidth: PixelUtil.size(100),
    },
    servicerInfoBodyHeight: {
        height: '85.6%',
        marginBottom: PixelUtil.size(1),
    },
    activeAreaR: {
        //删除服务人
        width: '100%',
        height: rightFooterHeight,
    },
    chooseItem: {
        //有选中内容
        width: '100%',
        height: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    activeAreaL: {
        width: '100%',
        height: PixelUtil.size(150),
        backgroundColor: '#00ff00'
    },
    cardOperate: {
        // 底部-结算
        width: '97%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: PixelUtil.size(2),
        borderColor: '#cbcbcb',
        borderRightWidth: 0,
        backgroundColor: '#f8f9fa',
        marginLeft: '3%',
        paddingBottom: PixelUtil.size(2),
    },
    cardOperateNew: {
        // 底部-结算
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
        backgroundColor: '#f8f9fa',
        borderRightWidth: 0,
        marginRight: PixelUtil.size(2),
    },
    showPayPrice: {
        // 底部-结算-展示
        width: PixelUtil.size(384),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    showPayPriceText: {
        // 底部-结算-展示-文字
        fontSize: PixelUtil.size(36),
        color: '#333',
    },
    PayForBtn: {
        // 底部-结算-按钮组
        width: PixelUtil.size(384),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    PayForBtnInfo: {
        // 底部-结算-详细按钮
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        borderRadius: PixelUtil.size(200),
        backgroundColor: '#40AAFF',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: PixelUtil.size(40),
    },
    PayForBtnInfoText: {
        // 底部-结算-详细按钮-文字
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    PayForBtnFinish: {
        // 底部-结算-结单按钮
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        borderRadius: PixelUtil.size(200),
        backgroundColor: '#111c3c',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    PayForBtnFinishText: {
        // 底部-结算-结单按钮-文字
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    ShowOpenCardBox: {
        // 顾客识别-识别展示
        width: '100%',
        height: '100%',
        marginRight: '1%',
    },
    ShowOpenRightcontent: {
        //右侧-主体
        width: '50%',
        height: '100%',
        position: 'relative',
        marginLeft: PixelUtil.size(-2)
    },
    openActiveArea: {
        //操作区域(开卡)
        width: '100%',
        height: '14%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0)',
    },
    openActiveAreaL: {
        //(开卡)
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    cardOperateBottom: {
        // 底部-结算(开卡)
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
        backgroundColor: '#f8f9fa',
    },
    openActiveAreaR: {
        //(开卡)
        width: '100%',
        height: '80%',
        marginTop: PixelUtil.size(22),
    },
    tipTextBox: {
        // 提示
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tipText: {
        // 提示
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    serviceTextInfoBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb'
    },
});
