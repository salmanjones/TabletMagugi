import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let headerHeight = PixelUtil.size(120, 2048);
let footerHeight = PixelUtil.size(150, 2048);
let borderWidth = PixelUtil.size(2);
let bodyerHeight = PixelUtil.screenSize.height * 0.95 - headerHeight - footerHeight - borderWidth * 2;
let footerWidth = PixelUtil.screenSize.width * 0.95;
let footerRight = PixelUtil.size(384);
let footerLeft = footerWidth - footerRight - PixelUtil.size(40) * 3;
let rightTitleHeight = PixelUtil.size(100);
let rightContentHeight = bodyerHeight - rightTitleHeight;
let editCardListHeight = rightContentHeight - PixelUtil.size(30) * 2 - PixelUtil.size(240);
let editKeyboardHeight = rightContentHeight - PixelUtil.size(30) * 2;
export const multiplyPayOldStyle = StyleSheet.create({
    hide: {
        display: 'none'
    },
    modal: {
        width: '100%',
        height: '100%',
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100
    },
    contentWrapper: {
        backgroundColor: '#FFF',
        height: '95%',
        width: '95%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    pwdBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 110
    },
    pwdTitle: {
        width: '100%',
        height: PixelUtil.size(140),
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        paddingLeft: PixelUtil.size(50),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: PixelUtil.size(30)
    },
    pwdTitleValue: {
        fontSize: PixelUtil.size(35),
        color: '#333',
        fontWeight: 'bold',
        marginLeft: PixelUtil.size(40)
    },
    pwdWrapper: {
        backgroundColor: '#FFF',
        height: PixelUtil.size(900),
        width: PixelUtil.size(760),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        height: headerHeight,
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        height: headerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: PixelUtil.size(8),
        marginLeft: PixelUtil.size(40),
    },
    leftTitle: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'bold'
    },
    leftValue: {
        fontSize: PixelUtil.size(32),
        marginLeft: PixelUtil.size(20),
        color: '#9c9c9c'
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: PixelUtil.size(40),
    },
    headerAvatar: {
        width: PixelUtil.size(80),
        height: PixelUtil.size(80),
        borderRadius: PixelUtil.size(40),
        borderWidth: PixelUtil.size(0.5),
        borderColor: '#f1f1f1'
    },
    rightValue: {
        fontSize: PixelUtil.size(32),
        marginLeft: PixelUtil.size(20),
        color: '#9c9c9c'
    },
    bodyer: {
        width: '100%',
        height: bodyerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    bodyerLeft: {
        width: '50%',
        height: '100%',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
    },
    bodyLeftItem: {
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40)
    },
    bodyLeftItemActive: {
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
        backgroundColor: '#eaf0ff'
    },
    bodyLeftItemDisable: {
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
        backgroundColor: '#eee'
    },
    bodyLeftItemContent: {
        width: '100%',
        height: PixelUtil.size(145),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bodyLeftItemLeft: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemLeftCheckBox: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        paddingLeft: 0,
        marginLeft: 0,
    },
    itemLeftImgTitle: {
        height: '100%',
        position: 'absolute',
        left: PixelUtil.size(90),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    img_left: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemLeftImg: {
        width: PixelUtil.size(72),
        height: PixelUtil.size(72),
    },
    itemLeftTitle: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'bold',
        marginLeft: PixelUtil.size(40)
    },
    bodyLeftItemRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    itemRightTxt: {
        fontSize: PixelUtil.size(32),
        color: '#ff4444',
        fontWeight: 'bold',
        marginRight: PixelUtil.size(40)
    },
    itemRightEdit: {
        width: PixelUtil.size(100),
        height: PixelUtil.size(80),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemRightImg: {
        width: PixelUtil.size(35),
        height: PixelUtil.size(35),
    },
    itemRightImgArrow: {
        width: PixelUtil.size(20),
        height: PixelUtil.size(35),
    },
    bodyLeftItemSplit: {
        width: '100%',
        height: 0.5,
        flexDirection: 'row',
    },
    bodyerRight: {
        width: '50%',
        height: '100%',
        position: 'relative'
    },
    rightDefault: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noContentImg: {
        width: PixelUtil.rect(343, 356).width,
        height: PixelUtil.rect(343, 356).height
    },
    noContentTxt: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        marginTop: PixelUtil.size(15),
        marginLeft: PixelUtil.size(50)
    },
    rightWrapper: {
        width: '100%',
        height: '100%',
    },
    rightWrapperTitle: {
        width: '100%',
        height: rightTitleHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(40),
        borderBottomWidth: PixelUtil.size(1),
        borderBottomColor: '#cbcbcb',
    },
    rightTitleTxt: {
        fontSize: PixelUtil.size(32),
        marginLeft: PixelUtil.size(20)
    },
    rightTitleTxt0: {
        fontSize: PixelUtil.size(32),
        marginRight: PixelUtil.size(60)
    },
    rightWrapperContent: {
        width: '100%',
        height: rightContentHeight,
    },
    rightWrapperCoupon: {
        width: '100%',
        height: '100%',
    },
    rightWrapperCouponItem: {
        width: '100%',
        marginTop: PixelUtil.size(30),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightWrapperCouponImg: {
        width: PixelUtil.size(670),
        height: PixelUtil.size(130),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rightWrapperCouponDesc: {
        width: PixelUtil.size(525),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: PixelUtil.size(40)
    },
    rightWrapperCouponDiscount: {
        width: PixelUtil.size(130),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightWrapperCouponPrefix: {
        fontSize: PixelUtil.size(20),
        color: '#442808',
        marginTop: PixelUtil.size(15),
        fontWeight: 'bold'
    },
    rightWrapperCouponValue: {
        fontSize: PixelUtil.size(45),
        color: '#442808',
        fontWeight: 'bold'
    },
    rightWrapperCouponWhite: {
        width: PixelUtil.size(34),
    },
    rightWrapperCouponName: {
        width: PixelUtil.size(361),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: PixelUtil.size(32),
        color: '#442808',
    },
    rightWrapperCard: {
        width: '100%',
        height: '100%',
    },
    rightWrapperCardItem: {
        width: '100%',
        marginTop: PixelUtil.size(30),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightWrapperCardImg: {
        width: PixelUtil.size(860),
        height: PixelUtil.size(240),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    rightWrapperCardEditImg: {
        width: PixelUtil.size(860),
        height: PixelUtil.size(240),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightWrapperCardDesc: {
        width: PixelUtil.size(724),
        height: PixelUtil.size(170),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: PixelUtil.size(33),
    },
    rightWrapperCardEditDesc: {
        width: PixelUtil.size(724),
        height: PixelUtil.size(170),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    rightWrapperCardLeft: {
        width: PixelUtil.size(85),
        height: PixelUtil.size(85),
        borderRadius: PixelUtil.size(43),
        overflow: 'hidden'
    },
    rightWrapperCardRight: {
        marginLeft: PixelUtil.size(25),
        height: '100%',
        width: PixelUtil.size(613),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    rightCardName: {
        width: '100%',
        fontSize: PixelUtil.size(34),
        fontWeight: 'bold',
        color: '#fff'
    },
    rightCardMiddleInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightCardStoreName: {
        width: '45%',
        fontSize: PixelUtil.size(32),
        color: '#fff'
    },
    rightCardConsume: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightCardConsumeMoney: {
        fontSize: PixelUtil.size(32),
        color: '#fff'
    },
    rightCardConsumeEditBtn: {
        position: 'absolute',
        width: PixelUtil.size(80),
        height: PixelUtil.size(80),
        marginBottom: PixelUtil.size(18),
        right: PixelUtil.size(20),
    },
    rightCardConsumeEditImg: {
        width: PixelUtil.size(50),
        height: PixelUtil.size(50),
        marginTop: PixelUtil.size(10),
        marginLeft: PixelUtil.size(10)
    },
    rightCardFooterInfo: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightCardConsumeSpace: {
        width: PixelUtil.size(50),
        height: PixelUtil.size(50)
    },
    editCardWrap: {
        width: '100%',
        marginTop: PixelUtil.size(30),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    editCardList: {
        width: '100%',
        height: editCardListHeight,
        marginTop: PixelUtil.size(30),
    },
    editCardFooter: {
        width: '100%',
        height: footerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    payKeyBoardWrap: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    payKeyBoardFooter: {
        width: PixelUtil.rect(586, 426).width,
        height: footerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    editCardItemTitleGroup: {
        fontSize: PixelUtil.size(32),
        fontWeight: 'bold',
        color: '#333',
        marginLeft: -PixelUtil.size(26)
    },
    cardMoneyModifyWrap: {
        width: '100%',
        height: editCardListHeight,
        marginTop: PixelUtil.size(30),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    keyBoardScroll: {
        marginTop: PixelUtil.size(30),
        width: '100%',
        height: editKeyboardHeight,
    },
    keyBoardWrap: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    keyBoardTopTxt: {
        width: '80%',
        fontSize: PixelUtil.size(34),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: PixelUtil.size(30),
        textAlign: 'center'
    },
    otherPayWrap: {
        width: '100%',
        height: rightContentHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        width: '100%',
        height: footerHeight,
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    footerLeft: {
        width: footerLeft,
        marginLeft: PixelUtil.size(40),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    footerLeftTop: {
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: PixelUtil.size(35)
    },
    footerLeftBottom: {
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: PixelUtil.size(5)
    },
    footerLeftItem: {
        width: '33.333%',
        height: '100%',
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'bold'
    },
    leftItemRed: {
        color: '#ff4444'
    },
    leftItemOrange: {
        color: '#f8c674'
    },
    footerRight: {
        width: footerRight,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: PixelUtil.size(40),
        marginRight: PixelUtil.size(40),
    },
    canelBtn: {
        // 顾客识别-取消按钮
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#999',
        borderRadius: PixelUtil.size(200),
        marginRight: PixelUtil.size(40),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    confirmBtn: {
        // 顾客识别-支付按钮
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#111c3c',
        borderRadius: PixelUtil.size(200),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    btnText: {
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
});
