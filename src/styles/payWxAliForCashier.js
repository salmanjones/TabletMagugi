import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

export const payWxAliForCashier = StyleSheet.create({
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
    billInfoBox: {
        // 顾客识别-主体
        width: PixelUtil.size(1968),
        height: '80%',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    MemberQueryTitle: {
        // 顾客识别-标题
        width: PixelUtil.rect(1968, 116).width,
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
    },
    MemberQueryTitleText: {
        // 顾客识别-标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    SingleNum: {
        // 顾客识别-标题-水单号
        fontSize: PixelUtil.size(28),
        color: '#f98f1f',
    },
    MemberQueryBtnBox: {
        // 顾客识别-关闭按钮框
        width: '100%',
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    MemberQueryCancelBtn: {
        // 顾客识别-关闭按钮
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
    MemberQueryCancelText: {
        // 顾客识别-关闭按钮-文字
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    MemberQueryConfirmBtn: {
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
    MemberQueryConfirmText: {
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    vipPayForLeft: {
        //会员卡支付-左侧
        width: '50%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vipPayForBox: {
        //会员卡支付-内容框
        width: '45.6%',
        height: PixelUtil.size(832),
    },
    vipPayForLeftText: {
        //会员卡支付-左侧-文本-框
        width: '100%',
        height: PixelUtil.size(135),
        marginBottom: PixelUtil.size(6),
        marginTop: PixelUtil.size(30),
    },
    vipPayForText: {
        //会员卡支付-左侧-文本
        fontSize: PixelUtil.size(32),
        color: '#000',
        textAlign: 'center',
    },
    vipPayForLImgBox: {
        //会员卡支付-左侧-图片框
        width: '100%',
        height: PixelUtil.size(628),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vipPayForLImg: {
        //会员卡支付-左侧-图片
        width: PixelUtil.rect(372, 628).width,
        height: PixelUtil.rect(372, 628).height,
    },
    vipPayForRight: {
        //会员卡支付-右侧
        width: '50%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vipPayForImgBox: {
        //会员卡支付-右侧-图片-框
        width: '100%',
        height: PixelUtil.size(270),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(30),
    },
    vipPayForImg: {
        //会员卡支付-右侧-图片
        width: PixelUtil.rect(276, 270).width,
        height: PixelUtil.rect(276, 270).height,
    },
    vipPayForQRcode: {
        //会员卡支付-右侧-二维码
        width: PixelUtil.rect(456, 456).width,
        height: PixelUtil.rect(456, 456).height,
    },
    vipPayForQRcodeImg: {
        //会员卡支付-右侧-二维码-图
        width: PixelUtil.rect(456, 456).width,
        height: PixelUtil.rect(456, 456).height,
    },
    vipPayForRightText: {
        marginTop: PixelUtil.size(10),
    },

    WeChatPayFor: {
        // 微信支付
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    WeChatPayForPersonR: {
        // 微信支付-支付人-右侧文字
        width: '50%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    WeChatPayForPersonT: {
        // 微信支付-支付人-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    WeChatForQRcodeBox: {
        //二维码-框
        width: '100%',
        height: PixelUtil.rect(424, 424).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: PixelUtil.size(80),
    },
    WeChatForQRcode: {
        //二维码
        width: PixelUtil.rect(424, 424).width,
        height: PixelUtil.rect(424, 424).height,
    },
    WeChatForQRcodeT: {
        //二维码-文字提示
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
        marginTop: PixelUtil.size(80),
        textAlign: 'center',
    },
    WeChatPayForTitle: {
        // 微信支付-价格
        width: '100%',
        height: '6.47%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    WeChatPayForText: {
        // 微信支付-价格文字
        fontSize: PixelUtil.size(42),
        color: '#333',
    },
});
