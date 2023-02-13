import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const cashierPayStyle = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#FFF',
        height: '95%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        marginTop: PixelUtil.size(-60)
    },
    timeCradPayWrapper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    title: {
        // 顾客识别-标题
        width: '100%',
        height: '8%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
    },
    titleText: {
        // 顾客识别-标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    titleL: {
        //左标题
        width: '50%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleType: {
        //左侧-标题-项目
        width: '26%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: '4%',
    },
    titleItem: {
        //左侧-标题-其他
        width: '17.5%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleR: {
        //右标题
        width: '50%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    billInfoBox: {
        // 顾客识别-主体
        width: '100%',
        height: '82%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(40),
    },
    timePayL: {
        //左侧-列表-主体
        width: '50%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
    },
    timePayList: {
        //左侧-列表-行
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: PixelUtil.size(36),
    },
    timePayType: {
        //左侧-列表-项目
        width: '26%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: '4%',
    },
    timePayItem: {
        //左侧-列表-其他
        width: '17.5%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    timePayText: {
        //左侧-列表-文字
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    timePayR: {
        //右侧
        width: '50%',
        height: '100%',
    },
    payTitleNullbox: {
        //右侧
        width: '100%',
        height: '100%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    payTitle: {
        fontSize: PixelUtil.size(28),
        color: '#8e8e8e',
        marginTop: PixelUtil.size(30),
        paddingLeft: PixelUtil.size(30),
    },
    timePayRBox: {
        //右侧-选择区
        width: '100%',
        height: '100%',
    },
    timePayRBoxWayBox: {
        paddingRight: PixelUtil.size(67),
    },
    timePayRList: {
        //右侧-行
        width: PixelUtil.rect(400, 116).width,
        height: PixelUtil.rect(400, 116).height,
        borderRadius: PixelUtil.size(8),
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(30),
        marginLeft: PixelUtil.size(50),
        marginRight: PixelUtil.size(20),
    },
    timePayRListActive: {
        //右侧-行-微信
        width: PixelUtil.rect(400, 116).width,
        height: PixelUtil.rect(400, 116).height,
        borderRadius: PixelUtil.size(8),
        borderColor: '#111c3c',
        borderWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(30),
        marginLeft: PixelUtil.size(50),
        marginRight: PixelUtil.size(20),
    },
    timePayRother: {
        width: PixelUtil.rect(880, 116).width,
        height: PixelUtil.rect(880, 116).height,
        borderRadius: PixelUtil.size(8),
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(18),
        paddingRight: PixelUtil.size(18),
        marginTop: PixelUtil.size(36),
        marginLeft: PixelUtil.size(30),
    },
    timePayRotherActive: {
        //右侧-行
        width: PixelUtil.rect(880, 116).width,
        height: PixelUtil.rect(880, 116).height,
        borderRadius: PixelUtil.size(8),
        borderColor: '#111d3e',
        borderWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(18),
        paddingRight: PixelUtil.size(18),
        marginTop: PixelUtil.size(36),
        marginLeft: PixelUtil.size(30),
    },
    timePayRImg: {
        //右侧-图片
        width: PixelUtil.rect(78, 72).width,
        height: PixelUtil.rect(78, 72).height,
        marginRight: PixelUtil.size(14),
    },
    timePayImgPb: {
        //右侧-图片
        width: PixelUtil.size(150),
        height: PixelUtil.size(72),
    },
    timePaymultiply: {
        //右侧-图片
        width: PixelUtil.size(260),
        height: PixelUtil.size(72),
    },
    timePayImgXcx: {
        width: PixelUtil.rect(150, 72).width,
        height: PixelUtil.rect(150, 72).height,
    },
    timePayBtnBtm: {
        width: '100%',
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
    },
    btmFontColor: {
        fontSize: PixelUtil.size(36),
        fontWeight: "bold",
        color: '#ff0000',
        marginLeft: PixelUtil.size(40),
    },
    timePayBtnBox: {
        // 顾客识别-按钮组框
        width: '80%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    canelBtn: {
        // 顾客识别-取消按钮
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#999',
        borderRadius: PixelUtil.size(200),
        marginRight: PixelUtil.size(40),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successBtn: {
        // 顾客识别-挂单按钮
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#1BBC93',
        borderRadius: PixelUtil.size(200),
        marginRight: PixelUtil.size(40),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmBtn: {
        // 顾客识别-支付按钮
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#111c3c',
        borderRadius: PixelUtil.size(200),
        marginRight: PixelUtil.size(40),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timePayBtnBoxText: {
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    // 平板支付-详细支付方式
    timePayRBoxChoose: {
        width: '100%',
        height: '100%',
    },
    couponTitleBox: {
        width: '100%',
        height: PixelUtil.size(108),
    },
    couponTitle: {
        height: PixelUtil.size(107),
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(1),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(30),
        paddingRight: PixelUtil.size(30),
    },
    couponTitleText: {
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    couponTitleR: {
        height: PixelUtil.size(107),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dangerText: {
        fontSize: PixelUtil.size(28),
        color: '#FF5656',
    },
    couponText: {
        fontSize: PixelUtil.size(28),
        color: '#999',
    },
    payWayBox: {},
    payWayTitle: {
        fontSize: PixelUtil.size(28),
        color: '#8e8e8e',
        marginTop: PixelUtil.size(34),
        paddingLeft: PixelUtil.size(50),
    },
    payWaylist: {
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: PixelUtil.size(30),
    },
    // 优惠券样式
    couponList: {
        paddingBottom: PixelUtil.size(4),
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        // height:0,
        maxHeight: PixelUtil.size(343),
        flex: 0,
        alignItems: 'center'
    },
    couponListFlat: {
        width: PixelUtil.size(712),
        paddingTop: PixelUtil.size(40),
        paddingBottom: PixelUtil.size(34),
        maxHeight: PixelUtil.size(343),
    },
    couponLi: {
        // width: '90%',
        width: PixelUtil.size(671),
        height: PixelUtil.rect(671, 130).height,
        marginBottom: PixelUtil.size(34),
        marginLeft: PixelUtil.size(20),
        marginRight: PixelUtil.size(20),
        // marginLeft: '8.2%',
    },
    couponLiBg: {
        width: PixelUtil.size(671),
        height: PixelUtil.rect(671, 130).height,
    },
    couponLiBox: {
        width: PixelUtil.size(671),
        height: PixelUtil.rect(671, 130).height,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    couponLiL: {
        width: PixelUtil.size(186),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    couponUnit: {
        fontSize: PixelUtil.size(30),
        color: '#442808',
    },
    couponPrice: {
        fontSize: PixelUtil.size(56),
        color: '#442808',
    },
    couponLiR: {
        width: PixelUtil.size(485),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingLeft: '4.7%',
        // paddingRight: '4.7%',
    },
    color333: {
        fontSize: PixelUtil.size(28),
        color: '#333',
        width: PixelUtil.size(322),
        lineHeight: PixelUtil.size(40),
    },
    couponLiRL: {
        paddingRight: PixelUtil.size(26),
        paddingLeft: PixelUtil.size(35),
    },
    couponLiRR: {
        width: PixelUtil.rect(40, 40).width,
        height: PixelUtil.rect(40, 40).height,
        marginRight: PixelUtil.size(62),
    },
});
