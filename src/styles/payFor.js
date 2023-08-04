import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const payForStyle = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#FFF',
        height: '85%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: PixelUtil.size(120),
        position: 'relative',
        overflow: 'hidden',
    },
    billInfoBox: {
        // 顾客识别-主体
        width: PixelUtil.size(1968),
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
    WeChatPayFor: {
        // 微信支付
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    WeChatPayForBox: {
        // 微信支付-框
        width: '50%',
        height: '80%',
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
    WeChatPayForTextBox: {
        // 微信支付-价格文字-框
        width: '100%',
        height: PixelUtil.size(116),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    WeChatPayForText: {
        // 微信支付-价格文字
        fontSize: PixelUtil.size(48),
        color: '#333',
        marginBottom: PixelUtil.size(59),
    },
    WeChatPayForQRcodeBox: {
        //二维码-框
        width: '100%',
        height: PixelUtil.size(456),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    WeChatForQRcode: {
        //二维码
        width: PixelUtil.rect(456, 456).width,
        height: PixelUtil.rect(456, 456).height,
    },
    payForState: {
        //支付状态
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: PixelUtil.size(60)
    },
    payStateImg: {
        //支付状态-图片
        width: PixelUtil.rect(672, 464).width,
        height: PixelUtil.rect(672, 464).height,
    },
    payStateImgOther: {
        //支付状态-图片
        width: PixelUtil.rect(442, 464).width,
        height: PixelUtil.rect(442, 464).height,
    },
    cardUseBox:{
        width: '100%',
        marginTop: PixelUtil.size(98),
        height: PixelUtil.size(434),
        backgroundColor: '#F7F8FC',
        paddingHorizontal: PixelUtil.size(36),
        paddingBottom: PixelUtil.size(32)
    },
    cardUseHeader:{
        width: '100%',
        height: PixelUtil.size(104),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    cardUseHeaderTitle:{
        width: '25%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardUseHeaderTitleTxt:{
        fontSize: PixelUtil.size(28),
        fontWeight: '700',
        color: '#121C35'
    },
    cardUseBody:{
        width: '100%',
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: PixelUtil.size(22),
        paddingVertical: PixelUtil.size(14)
    },
    cardUseBodyItem:{
        width: '100%',
        height: PixelUtil.size(70),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomColor: '#fefefe',
        borderBottomWidth: PixelUtil.size(2)
    },
    cardUseBodyItemTitle:{
        width: '25%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardUseBodyItemText:{
        fontSize: PixelUtil.size(26),
        fontWeight: '500',
        color: '#555555'
    }
});
