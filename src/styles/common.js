import {Platform, StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const commonStyles = StyleSheet.create({
    hidden: {
        display: 'none',
    },
    magugiLogo: {
        //版权-图标
        width: PixelUtil.rect(49.8, 49.8, 2548).width,
        height: PixelUtil.rect(49.8, 49.8, 2548).height,
    },
    searchContent: {
        //搜索框-主体
        height: PixelUtil.rect(2048, 68).height,
        // width: PixelUtil.rect(2048, 68).width,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: PixelUtil.size(60.3),
        paddingRight: PixelUtil.size(60.3),
        marginTop: PixelUtil.size(30),
    },
    searchInpBox: {
        height: PixelUtil.rect(560, 70).height,
        width: PixelUtil.rect(560, 70).width,
        marginRight: PixelUtil.size(19.5),
        overflow: 'hidden',
    },
    searchInp: {
        //搜索框
        height: PixelUtil.rect(540, 68).height,
        width: PixelUtil.rect(540, 68).width,
        paddingLeft: PixelUtil.size(72),
        fontSize: PixelUtil.size(32),
        paddingTop: 0,
        paddingBottom: 0,
    },
    searchModuleBtn: {
        //搜索框-按钮
        height: PixelUtil.rect(172, 68).height,
        width: PixelUtil.rect(172, 68).width,
    },
    searchModuleBtnRight: {
        marginRight: PixelUtil.size(20.1),
    },
    back: {
        //返回按钮
        height: PixelUtil.rect(80, 60).height,
        width: PixelUtil.rect(80, 60).width,
        flex: 0,
        justifyContent: 'center',
    },
    backImg: {
        height: PixelUtil.rect(40, 40).height,
        width: PixelUtil.rect(40, 40).width,
    },
    headOrderBox: {
        //登录后-左侧内容（非首页）
        height: PixelUtil.rect(600, 66).height,
        width: PixelUtil.rect(600, 66).width,
        overflow: 'hidden',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: PixelUtil.size(40),
    },
    headOrderInfoBox: {
        height: PixelUtil.rect(560, 66).height,
        width: PixelUtil.rect(560, 66).width,
        overflow: 'hidden',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headOrderInfo: {
        //登录后-左侧内容-单据信息
        height: PixelUtil.rect(280, 86).height,
        width: PixelUtil.rect(280, 86).width,
        marginRight: PixelUtil.size(44),
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    headOrderGenre: {
        //登录后-左侧内容-单据类型
        height: PixelUtil.rect(70, 56).height,
        width: PixelUtil.rect(70, 56).width,
        marginLeft: PixelUtil.size(20),
        marginRight: PixelUtil.size(20),
    },
    borderRightImg: {
        //登录后-左侧内容-右边线
        height: PixelUtil.rect(6, 66).height,
        width: PixelUtil.rect(6, 66).width,
        marginRight: PixelUtil.size(20),
    },
    headOrderNumber: {
        //登录后-左侧内容-单号
        fontSize: PixelUtil.size(22),
        color: '#FF9B1F',
    },
    headOrderOther: {
        //登录后-左侧内容-手牌号+客数
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: PixelUtil.size(4)
    },
    headGuestNumber: {
        //登录后-左侧内容-客数
        fontSize: PixelUtil.size(23),
        color: '#fff',
    },
    headOrderHand: {
        //登录后-左侧内容-手牌号
        width: PixelUtil.rect(95, 33).width,
        height: PixelUtil.rect(95, 33).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headOrderHandBox: {
        //登录后-左侧内容-手牌号-框
        width: PixelUtil.rect(75, 32).width,
        height: PixelUtil.rect(75, 32).height,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headOrderHandText: {
        //登录后-左侧内容-手牌数字
        fontSize: PixelUtil.size(22),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
    },
    headOrderPriceLi: {
        //登录后-左侧内容-价目单
        height: PixelUtil.rect(96, 96).height,
        width: PixelUtil.rect(96, 96).width,
        marginTop: PixelUtil.size(4),
    },
    headOrderPriceLiImg: {
        //登录后-左侧内容-价目单-图片
        height: PixelUtil.rect(50, 50).height,
        width: PixelUtil.rect(50, 50).width,
        marginLeft: PixelUtil.size(20),
    },
    headOrderPriceLiText: {
        //登录后-左侧内容-价目单-内容
        fontSize: PixelUtil.size(28),
        marginTop: PixelUtil.size(4),
        color: '#fff',
    },
    HeadClientBox: {
        //登录后-右侧内容（非首页）
        height: PixelUtil.rect(900, 66).height,
        width: PixelUtil.rect(900, 66).width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    HeadClientImgBox: {
        //登录后-右侧内容-头像
        height: PixelUtil.rect(66, 66).height,
        width: PixelUtil.rect(66, 66).width,
        borderRadius: PixelUtil.size(52),
        overflow: 'hidden',
        marginRight: PixelUtil.size(20),
        backgroundColor: '#cbcbcb',
        flexShrink: 0
    },
    HeadClientImg: {
        height: PixelUtil.rect(66, 66).height,
        width: PixelUtil.rect(66, 66).width,
    },
    HeadClientSearchContent: {
        height: PixelUtil.rect(336, 70).height,
        width: PixelUtil.rect(336, 70).width,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        marginRight: PixelUtil.size( 10),
    },
    HeadClientSearchImg: {
        width: 21,
        height: 21,
        position: 'absolute',
        left: PixelUtil.size(20),
        top: PixelUtil.size(12),
        zIndex: 2,
    },
    HeadClientSearchIBox: {
        //顾客识别-搜索框
        height: PixelUtil.rect(336, 68).height,
        width: PixelUtil.rect(336, 68).width,
    },
    HeadClientOtherInfo: {
        marginRight: PixelUtil.size(10),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    HeadClientOtherInfoText: {
        fontSize: PixelUtil.size(24),
        color: '#fff',
        textAlign: 'center',
        marginRight: PixelUtil.size(15),
        marginTop: PixelUtil.size(15)
    },
    HeadClientInfo: {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    HeadClientOtherNameBox: {
        width: PixelUtil.size(148),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    HeadClientOtherSexBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    HeadClientCardInfo: {
        marginRight: PixelUtil.size(20)
    },
    HeadClientCardImgBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(10)
    },
    HeadClientCardImg: {
        height: PixelUtil.rect(28, 20).height,
        width: PixelUtil.rect(28, 20).width,
    },
    simulateKeyboardContent: {
        // 虚拟键盘
        width: PixelUtil.rect(586, 426).width,
        height: PixelUtil.rect(586, 426).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    simulateKeyboardBtn: {
        // 虚拟键盘-按钮
        width: PixelUtil.rect(168, 76).width,
        height: PixelUtil.rect(168, 76).height,
        borderWidth: PixelUtil.size(4),
        borderColor: '#cbcbcb',
        borderStyle: 'solid',
        borderRadius: PixelUtil.size(4),
        marginBottom: PixelUtil.size(40),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'relative',
    },
    simulateKeyboardText: {
        // 虚拟键盘-文字
        fontSize: PixelUtil.size(36),
        color: '#333',
    },
    simulateKeyboardTextDelete: {
        // 虚拟键盘-刪除
        fontSize: PixelUtil.size(36),
        color: '#ff4646',
    },
    simulateKeyboardTextOther: {
        // 虚拟键盘-清除
        fontSize: PixelUtil.size(36),
        color: '#111c3c',
    },
    simulateKeyboardBtnActive: {
        // 虚拟键盘-按钮
        width: PixelUtil.rect(168, 76).width,
        height: PixelUtil.rect(168, 76).height,
        shadowOffset: {width: PixelUtil.size(0), height: PixelUtil.size(8)},
        shadowColor: '#40AAFF',
        shadowOpacity: 0.8,
        elevation: 5,
        backgroundColor: '#40AAFF',
        position: 'relative',
        bottom: PixelUtil.size(76),
        zIndex: 9,
    },
    simulateKeyboardBtnActiveView: {
        width: PixelUtil.rect(168, 76).width,
        height: PixelUtil.rect(168, 76).height,
        borderWidth: PixelUtil.size(4),
        borderColor: '#40AAFF',
        borderStyle: 'solid',
        borderRadius: PixelUtil.size(4),
        marginBottom: PixelUtil.size(40),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'relative',
    },
    simulateKeyboardInput: {
        width: PixelUtil.rect(586, 426).width,
        height: PixelUtil.size(90),
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(4),
        marginBottom: PixelUtil.size(30),
        padding: PixelUtil.size(10),
        fontSize: PixelUtil.size(34),
        color: '#ff4444'
    },
    MemberListBox: {
        //顾客识别-列
        width: '100%',
        height: PixelUtil.rect(984, 143.8).height,
        color: '#151515',
        borderBottomColor: '#CFDDFF',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    MemberListBoxActive: {
        //顾客识别-列-选中
        width: '100%',
        height: PixelUtil.rect(984, 143.8).height,
        color: '#151515',
        borderBottomColor: '#CFDDFF',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#EAF0FF',
    },
    MemberListAvatar: {
        //顾客识别-列-头像
        width: PixelUtil.rect(120, 120).width,
        height: PixelUtil.rect(120, 120).height,
        overflow: 'hidden',
        borderRadius: PixelUtil.size(60),
    },
    MemberListInfo: {
        //顾客识别-列-信息
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    MemberListNameBox: {
        //顾客识别-列-信息-姓名-盒子
        width: PixelUtil.rect(780, 68).width,
        marginLeft: PixelUtil.size(24),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: PixelUtil.size(18),
    },
    MemberListName: {
        //顾客识别-列-信息-姓名
        fontSize: PixelUtil.size(28),
        color: '#333333',
        marginRight: PixelUtil.size(16),
        maxWidth: PixelUtil.size(240),
    },
    MemberListNumber: {
        //顾客识别-列-信息-会员号
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    MemberListNumberOther: {
        fontSize: PixelUtil.size(28),
        color: '#333',
        marginRight: PixelUtil.size(16),
    },
    MemberListSexImage: {
        //顾客识别-列-信息-会员性别
        width: PixelUtil.rect(30, 30).width,
        height: PixelUtil.rect(30, 30).height,
    },
    MemberListPhone: {
        //顾客识别-列-手机号
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    MemberListPhoneR:{
        //顾客识别-列-手机号
        fontSize: PixelUtil.size(28),
        color: '#333',
        marginTop: PixelUtil.size(-40)
    },
    MemberListSex: {
        //顾客识别-列-性别
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    cardBox: {
        //会员卡
        width: PixelUtil.size(452),
        height: PixelUtil.size(244),
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: PixelUtil.size(20),
        marginLeft: PixelUtil.size(36),
    },
    cardPayBox: {
        //会员卡
        width: PixelUtil.size(542),
        height: PixelUtil.size(292),
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: PixelUtil.size(20),
        marginLeft: PixelUtil.size(36),
    },
    cardBoxBg: {
        //会员卡-卡类型
        width: '100%',
        height: '100%',
    },
    cardSaleTitle:{
        marginLeft: PixelUtil.size(40),
        marginTop: PixelUtil.size(10),
        color: '#FFEFD5',
        fontSize: PixelUtil.size(20),
        fontWeight: '700'
    },
    cardName: {
        //会员卡-卡名
        marginLeft: PixelUtil.size(20),
        marginTop: PixelUtil.size(20),
        width: PixelUtil.size(412),
        height: PixelUtil.size(100)
    },
    cardNameText: {
        //会员卡-卡名-文字
        fontSize: PixelUtil.size(24),
        color: '#5E3F20',
        textAlign: 'left',
        fontWeight: '700',
        lineHeight: PixelUtil.size(48)
    },
    rechargeSplitLineBox:{
        width: '100%',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(2)
    },
    rechargeTimesSplitLineBox:{
        width: '100%',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(8)
    },
    rechargeSplitLine:{
        width:  PixelUtil.size(412),
        height: PixelUtil.size(2)
    },
    cardSite:{
        //会员卡-地址
        marginLeft: PixelUtil.size(20),
        marginTop: PixelUtil.size(8),
        width: PixelUtil.size(412),
        display: "flex",
        justifyContent: 'flex-start'
    },
    cardTimesSite:{
        //会员卡-地址
        marginLeft: PixelUtil.size(20),
        marginTop: PixelUtil.size(12),
        width: PixelUtil.size(412),
        display: "flex",
        justifyContent: 'flex-start'
    },
    cardSiteText: {
        //会员卡-地址-文字
        fontSize: PixelUtil.size(18),
        color: '#5E3F20',
        textAlign: 'left',
    },
    cardPrice: {
        //会员卡-卡名
        marginLeft: PixelUtil.size(20),
        width: PixelUtil.size(412),
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'baseline'
    },
    rechargeCardPrice: {
        //会员卡-卡名
        marginLeft: PixelUtil.size(20),
        width: PixelUtil.size(412),
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'baseline'
    },
    cardPricePreText:{
        fontSize: PixelUtil.size(28),
        color: '#5E3F20',
        fontWeight: '700'
    },
    cardPriceText: {
        //会员卡-价格-文字
        fontSize: PixelUtil.size(40),
        color: '#5E3F20',
        fontWeight: '700'
    },
    cardIconBox: {
        //会员卡-小图标
        width: PixelUtil.rect(84, 84).width,
        height: PixelUtil.rect(84, 84).height,
        borderRadius: PixelUtil.size(42),
        position: 'absolute',
        top: PixelUtil.size(34.4),
        left: PixelUtil.size(34.2),
        zIndex: 2,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    cardIconBoxMore: {
        //会员卡-小图标-更多
        width: PixelUtil.rect(40, 40).width,
        height: PixelUtil.rect(40, 40).height,
        position: 'absolute',
        bottom: PixelUtil.size(30.4),
        right: PixelUtil.size(34.2),
        zIndex: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    cardIcon: {
        //会员卡-小图标
        width: PixelUtil.rect(74, 74).width,
        height: PixelUtil.rect(74, 74).height,
        borderRadius: PixelUtil.size(37),
    },
    cardIconMore: {
        //会员卡-小图标-更多
        width: PixelUtil.rect(38, 30).width,
        height: PixelUtil.rect(38, 30).height,
        // borderRadius: PixelUtil.size(37),
    },
    timeCardBox: {
        //次卡-图标
        width: PixelUtil.rect(84, 84).width,
        height: PixelUtil.rect(84, 84).height,
        borderRadius: PixelUtil.size(42),
        position: 'absolute',
        top: PixelUtil.size(18),
        left: PixelUtil.size(20),
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    timeCardIcon: {
        //次卡-图标
        width: PixelUtil.rect(74, 74).width,
        height: PixelUtil.rect(74, 74).height,
        borderRadius: PixelUtil.size(37),
    },
    timeCardName: {
        //会员卡-卡名
        marginLeft: PixelUtil.size(20),
        marginTop: PixelUtil.size(20),
        width: PixelUtil.size(412),
        height: PixelUtil.size(100)
    },
    timeCardNameText: {
        //会员卡-卡名-文字
        fontSize: PixelUtil.size(24),
        color: '#3C4C72',
        textAlign: 'left',
        fontWeight: '700',
        lineHeight: PixelUtil.size(48)
    },
    timeCardNum: {
        //次卡-余次
        width: '40%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: Platform.OS === 'ios' ? '2%' : '3%',
        marginTop: PixelUtil.size(50)
    },
    timeCardOtherBody: {
        //会员卡-卡名
        marginLeft: PixelUtil.size(20),
        width: PixelUtil.size(412),
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'baseline'
    },
    timeCardOtherBox: {
        width: '100%',
        height: '48%',
        marginTop: '14%',
    },
    timeCardPriceBigPreText:{
        fontSize: PixelUtil.size(28),
        color: '#101B3C',
        fontWeight: "700"
    },
    timeCardPriceBigText: {
        //次卡-余次-金额v
        fontSize: PixelUtil.size(40),
        color: '#101B3C',
        fontWeight: '700'
    },
    timeCardPriceBigAfterText:{
        //次卡-余次-金额v
        fontSize: PixelUtil.size(20),
        color: '#444956',
        fontWeight: '500',
    },
    timeCardOtherBodyRight:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
    },
    timeCardPriceText: {
        //次卡-余次-金额
        fontSize: PixelUtil.size(32),
        color: '#101B3C',
        fontWeight: '700'
    },
    timeCardNumText: {
        //次卡-余次-数量
        fontSize: PixelUtil.size(26),
        color: '#999',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    timeCardStore: {
        //会员卡-地址-文字
        fontSize: PixelUtil.size(18),
        color: '#606060',
        textAlign: 'left',
    },
    simulateKeyboardInpContent: {
        //带输入框的虚拟键盘
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 999,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        left: 0,
        top: 0,
    },
    simulateKeyboardInp: {
        //带输入框的虚拟键盘-输入框
        width: PixelUtil.size(586),
        height: PixelUtil.size(80),
        fontSize: PixelUtil.size(32),
        color: '#333',
        paddingLeft: PixelUtil.size(30),
        paddingRight: PixelUtil.size(30),
        textAlign: 'center',
    },
    btnbox: {
        //带输入框的虚拟键盘-按钮
        width: PixelUtil.rect(172, 69).width,
        height: PixelUtil.rect(172, 69).height,
        marginTop: PixelUtil.size(38),
    },
    searchBtnImg: {
        //带输入框的虚拟键盘-按钮-图片
        width: PixelUtil.rect(172, 69).width,
        height: PixelUtil.rect(172, 69).height,
    },
    TimeCardName: {
        //修改项目-信息-次卡名称
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'left',
        marginBottom: PixelUtil.size(24),
        width: '100%',
        height: PixelUtil.size(44),
        overflow: 'hidden',
    },
    // 顾客识别列-右侧-预约
    MemberListRightBox: {
        width: PixelUtil.rect(780, 68).width,
        // height: PixelUtil.rect(780, 68).height,
        marginLeft: PixelUtil.size(24),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    appointmentImage: {
        width: PixelUtil.rect(120, 35).width,
        height: PixelUtil.rect(120, 35).height,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    // 收银主页-预约信息
    appointmentInfoBox: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginRight: PixelUtil.size(58)
    },
    appointmentInfoBoxO: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    titleLeftDashed: {
        width: PixelUtil.rect(2, 104).width,
        height: PixelUtil.rect(2, 104).height,
        marginRight: PixelUtil.size(22)
    },
    titleAppointmentImg: {
        width: PixelUtil.rect(125, 36).width,
        height: PixelUtil.rect(125, 36).height,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titleAppointmentText: {
        fontSize: PixelUtil.size(24),
        color: '#F97E67',
        marginTop: PixelUtil.size(10)
    }
});
