//libs
import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';
import {color} from "react-native-elements/dist/helpers";

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
    },
    openCardTitle: {
        // 售卡-标题
        width: '100%',
        height: PixelUtil.size(140),
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
        alignItems: 'center',
    },
    openCardTitleR: {
        width: '50%',
        height: PixelUtil.size(142),
    },
    contentBox: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
        borderRightColor: '#cbcbcb'
    },
    Leftcontent: {
        // 左边主体
        width: '100%',
        height: '100%',
    },
    LeftcontentNew: {
        // 左边主体
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#ccffcc'
    },
    title: {
        // 售卡-标题
        width: '100%',
        height: PixelUtil.size(145),
        /*display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),*/
        backgroundColor: '#ffcc00'
    },
    titleText: {
        // 标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        width: '100%',
        textAlign: 'center'
    },
    cardOperateBox: {
        // 主体-顶部
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardOperateNoneBox: {
        // 无内容
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardOperateBoxOther: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
    },
    cardOperateNoneBoxOther: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2)
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
        marginTop: PixelUtil.size(40)
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
        display: 'flex',
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
        marginBottom: PixelUtil.size(40),
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
        marginBottom: PixelUtil.size(40),
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
        width: PixelUtil.size(860),
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
    },
    storedCardInfo: {
        // 顶部-充值-信息
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: PixelUtil.size(30)
    },
    storedCardText: {
        // 顶部-充值-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    storedCardInpBox: {
        // 顶部-充值-输入框盒子
        width: PixelUtil.size(726),
        height: PixelUtil.size(68),
        backgroundColor: '#fff',
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
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(34),
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
    },
    storedCardTip: {
        // 顶部-充值-提示
        width: '100%',
        fontSize: PixelUtil.size(28),
        color: '#666',
        marginTop: PixelUtil.size(20),
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
        height: PixelUtil.size(122),
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
        width: PixelUtil.size(128),
        height: PixelUtil.size(128),
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
        paddingLeft: PixelUtil.size(16),
    },
    servicerPersonInfo: {
        // 服务项-服务人
        width: PixelUtil.size(128),
        height: PixelUtil.size(128),
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
        width: PixelUtil.size(128),
        height: PixelUtil.size(128),
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
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
    },
    openCardTitleRO: {
        width: '100%',
        height: PixelUtil.size(146),
        position: 'relative',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        borderStyle: 'solid'
    },
    ShowMemberCardBox: {
        // 顾客识别-识别展示
        width: '100%',
        flex: 1,
        backgroundColor: '#ffffff'
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
        flex: 1,
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
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    openCardTitleRTitle: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2)
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
        height: PixelUtil.size(310),
        overflow: 'hidden',
    },
    openCardOther: {
        width: '25%',
        paddingTop: PixelUtil.size(60),
        paddingBottom: PixelUtil.size(60),
    },
    openCardOtheBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: PixelUtil.size(30),
    },
    openCardText: {
        fontSize: PixelUtil.size(48),
        color: '#333',
        textAlign: 'center',
        height: PixelUtil.size(80),
        textAlignVertical: 'center',
        marginRight: PixelUtil.size(30)
    },
    openCardOtherTextBox: {
        height: PixelUtil.size(80),
        paddingTop: PixelUtil.size(8),
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
        height: PixelUtil.size(154),
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
    },
    chooseItem: {
        //有选中内容
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f1f0f0'
    },
    activeAreaL: {
        width: '100%',
        height: PixelUtil.size(154),
        borderStyle: 'solid',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2)
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
        marginLeft: PixelUtil.size(40),
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
        height: PixelUtil.size(154),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    openActiveStaffArea: {
        //操作区域(开卡)
        width: '100%',
        height: PixelUtil.size(154),
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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
        height: '100%',
    },
    tipTextBox: {
        // 提示
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    tipTextWrap: {
        width: PixelUtil.size(860),
        height: PixelUtil.size(70),
        backgroundColor: '#f3f3f3',
        borderRadius: PixelUtil.size(26),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(30)
    },
    tipText: {
        // 提示
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlignVertical: 'center'
    },
    serviceTextInfoBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb'
    },

    //开卡售卡用户信息
    //背景
    userbg: {
        width: '100%',
        height: "100%",
        // flex: 0,
        // flexDirection: 'row',
    },
    cardNo: {
        width: '100%',
        color: '#fff',
        fontSize: PixelUtil.size(18),
        fontWeight: PixelUtil.size(500),
        textAlign: 'center',
        lineHeight: PixelUtil.size(29)
    },
    cardNoImg: {
        width: PixelUtil.size(138),
        height: PixelUtil.size(29),
        marginTop: PixelUtil.size(5)
    },
    carduserInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PixelUtil.size(-20)
    },
    cardUserLeft: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avaterIamge: {
        width: PixelUtil.rect(64, 64).width,
        height: PixelUtil.rect(64, 64).height,
        borderRadius: PixelUtil.size(500),
        marginLeft: PixelUtil.size(40)
    },
    avaterInfo: {
        marginLeft: PixelUtil.size(13),
        // marginTop:PixelUtil.size(10)
    },
    avaterInfotop: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    usertitleText: {
        fontSize: PixelUtil.size(30),
        color: '#fff',
        fontWeight: '700',
        maxWidth: PixelUtil.size(185),
        overflow: 'hidden',
    },
    sexText: {
        fontSize: PixelUtil.size(22),
        color: '#fff',
        fontWeight: '700',
        marginLeft: PixelUtil.size(10)
    },
    avaterlogo: {
        width: PixelUtil.rect(38, 38).width,
        height: PixelUtil.rect(38, 38).height,
        resizeMode: 'contain',
        marginLeft: PixelUtil.size(15)
    },
    phoneText: {
        // marginTop:PixelUtil.size(5),
        fontWeight: '700',
        fontSize: PixelUtil.size(22),
        color: '#fff'
    },
    storeInfo: {
        marginLeft: PixelUtil.size(28),
        flex: 0,
        flexDirection: 'row'
    },
    secondCard: {
        marginLeft: PixelUtil.size(50),
        color: '#FFFFFF',
        fontSize: PixelUtil.size(20),
    },
    storeCard: {
        marginLeft: PixelUtil.size(50),
    },
    threeCard: {
        marginLeft: PixelUtil.size(60),
        color: '#FFFFFF',
        fontSize: PixelUtil.size(20),
    },
    storeNameCard: {
        color: '#FFFFFF'
    },
    storeNumberCard: {
        textAlign: 'center',
        marginTop: PixelUtil.size(5),
        color: '#FFFFFF'
    },
    application: {
        marginRight: PixelUtil.size(24),
        // marginTop: PixelUtil.size(15),
        marginLeft: PixelUtil.size(50)
    },
    appliimg: {
        width: PixelUtil.size(168),
        height: PixelUtil.size(70),
        resizeMode: 'contain',
    },
    reservation: {
        marginLeft: PixelUtil.size(66),

    },
    reservationText: {
        color: '#FFA200',
        fontSize: PixelUtil.size(20),
        fontWeight: PixelUtil.size(500)
    },
    //自定义nav样式
    containerStyle: {
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    buttonStyle: {
        color: '#fff',
        fontSize: PixelUtil.size(32),
        marginLeft: PixelUtil.size(80),
        width: PixelUtil.size(178),
        textAlign: 'center'
    },
    selectedButtonStyle: {
        width: PixelUtil.size(178),
        height: PixelUtil.size(66),
        textAlign: 'center',
        lineHeight: PixelUtil.size(60),
        fontSize: PixelUtil.size(32),
        marginLeft: PixelUtil.size(80),
        color: '#FFA200',
        borderRadius: PixelUtil.size(35),
        backgroundColor: '#fff',
        overflow: 'hidden'
    }
});
