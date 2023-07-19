import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const payForPersonStyle = StyleSheet.create({
    //背景框
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
        // opacity:0.6,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 200
    },
    //外部弹框里面内容
    wrapper: {
        backgroundColor: '#fff',
        height: '100%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        // marginTop: PixelUtil.size(60),
        zIndex: 300

    },
    // cashierBillInfoWrapper: {
    //   backgroundColor: '#FFF',
    //   height: '95%',
    //   width: '95%',
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   marginTop: PixelUtil.size(120),
    //   position: 'relative',
    //   overflow:'hidden',
    //   position: 'relative',
    //   marginTop:PixelUtil.size(-60),
    // },

    //上面支付方式和水单号
    headText: {
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
    // 支付方式
    payText: {
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    // 水单号
    flowNum: {
        fontSize: PixelUtil.size(28),
        color: '#f98f1f',
    },
    billInfoBox: {
        // 顾客识别-主体
        width: '100%',
        height: '100%',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    billInfoOtherBox: {
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
    MemberQueryTitle: {
        // 顾客识别-标题
        width: PixelUtil.rect(1968, 116).width,
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
    },
    MemberQueryTitleText: {
        // 顾客识别-标题-文字
        marginLeft: PixelUtil.size(40),
        fontSize: PixelUtil.size(32),
        color: '#333',
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
        // backgroundColor: '#111c3c',
        backgroundColor: '#999',
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
    WeChatPayFor: {
        // 微信支付
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    WeChatPayPerson: {
        //左侧信息
        width: '50%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
    },
    WeChatForRightBox: {
        //右侧信息
        width: '50%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBox: {
        //右边内容
        paddingLeft: PixelUtil.size(256),
        paddingRight: PixelUtil.size(256),
        backgroundColor: '#fff'
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
    WeChatPayForPerson: {
        // 微信支付-支付人信息
        width: '100%',
        height: '26%',
        marginBottom: '2%',
    },
    WeChatPayForPersonInfo: {
        // 微信支付-支付人-行
        marginTop: PixelUtil.size(19),
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    WeChatPayForPersonL: {
        // 微信支付-支付人-左侧文字
        width: '50%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
});
