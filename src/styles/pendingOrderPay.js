import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const pendingOrderPayStyle = StyleSheet.create({
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

    },
    titleText: {
        // 顾客识别-标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    titleL: {
        //左标题
        width: '60%',
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
        marginRight: '2%',
    },
    titleItem: {
        //左侧-标题-其他
        width: '14%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleItemO: {
        //左侧-标题-其他
        width: '14%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleR: {
        //右标题
        width: '40%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timePayTip: {
        width: '100%',
        height: '100%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    billInfoBox: {
        // 顾客识别-主体
        width: '100%',
        height: '80%',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    timePayL: {
        //左侧-列表-主体
        width: '60%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
    },
    timePayLi: {
        width: '100%',
        height: PixelUtil.size(100),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timePayLiActive: {
        width: '100%',
        height: PixelUtil.size(100),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F2F5FF',
    },
    timePayLiFirst: {
        width: '100%',
        height: PixelUtil.size(85),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timePayLiSwiperOut: {
        width: '100%',
        height: PixelUtil.size(85),
        backgroundColor: '#F0F0F0'
    },
    timePayLiSwiperOutActive: {
        width: '100%',
        height: PixelUtil.size(85),
        backgroundColor: '#E4EBFF'
    },
    timePayLiInfo: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '72%',
        height: PixelUtil.size(85),
    },
    timePayType: {
        //左侧-列表-项目
        width: '26%',
        height: PixelUtil.size(100),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: '2%',
    },
    timePayItem: {
        //左侧-列表-其他
        width: '14%',
        height: PixelUtil.size(100),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    timePayItemO: {
        //左侧-标题-其他
        width: '14%',
        height: PixelUtil.size(85),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timePayText: {
        fontSize: PixelUtil.size(28),
        color: '#333333',
    },
    timePayTextRed: {
        fontSize: PixelUtil.size(28),
        color: '#ff2a39',
    },
    timePayR: {
        //右侧
        width: '40%',
        height: '100%',
    },
    timePayRBox: {
        //右侧-选择区
        width: '100%',
        height: '100%',
    },
    timePayRAliListActive: {
        //右侧-行-支付宝
        width: '90%',
        height: PixelUtil.rect(880, 116).height,
        borderRadius: PixelUtil.size(8),
        borderColor: '#2A7BE2',
        borderWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(18),
        paddingRight: PixelUtil.size(18),
        marginTop: PixelUtil.size(36),
    },
    timePayRImg: {
        //右侧-图片
        width: PixelUtil.rect(205, 84).width,
        height: PixelUtil.rect(205, 84).height,
    },
    timePayBtnBoxB: {
        width: '100%',
        height: '11%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    timePayBtnBoxL: {
        width: '60%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    btmFontColorO: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        marginRight: PixelUtil.size(40),
    },
    btmFontColor: {
        fontSize: PixelUtil.size(36),
        color: '#ff0000',
    },
    timePayBtnBox: {
        // 顾客识别-按钮组框
        width: '40%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
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

    FF7149Text: {
        fontSize: PixelUtil.size(32),
        color: '#FF7149',
        marginRight: PixelUtil.size(40),
    },
    C333Text: {
        fontSize: PixelUtil.size(32),
        color: '#333333',
        marginRight: PixelUtil.size(40),
    },
    imgStyle: {
        width: PixelUtil.size(44),
        height: PixelUtil.size(44),
    },
    timePayRBoxWayBox: {
        paddingRight: PixelUtil.size(67),
    },

    timePayRother: {
        width: '93%',
        height: PixelUtil.rect(660, 116).height,
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
        width: '93%',
        height: PixelUtil.rect(660, 116).height,
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
    payWaylist: {
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    timePayRList: {
        //右侧-行
        width: '40%',
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
        width: '40%',
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
});
