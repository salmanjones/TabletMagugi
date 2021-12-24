import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let boxWidth = PixelUtil.screenSize.width * 0.95;
let boxHeight = PixelUtil.screenSize.height * 0.85;
let headerHeight = PixelUtil.size(120);
let footerHeight = PixelUtil.size(120);
let bodyHeight = boxHeight - headerHeight - footerHeight;
export const vipPayForStyle = StyleSheet.create({
    //背景层
    modalBackground: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 99999
    },
    //主体框
    cashierBillInfoWrapper: {
        backgroundColor: '#ffffff',
        height: boxHeight,
        width: boxWidth,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    MemberQueryTitle: {
        // 顾客识别-标题
        width: '100%',
        height: headerHeight,
        display: 'flex',
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
        height: footerHeight,
        display: 'flex',
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
        display: 'flex',
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    MemberQueryConfirmText: {
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    billInfoBox: {
        // 顾客识别-主体
        width: '100%',
        height: bodyHeight,
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative'
    },
    vipPayForLeft: {
        //会员卡支付-左侧
        width: '50%',
        height: bodyHeight,
        borderRightColor: '#cbcbcb',
        borderRightWidth: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    vipPayForLeftText: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    vipPayForText: {
        //会员卡支付-左侧-文本
        fontSize: PixelUtil.size(32),
        color: '#000',
        textAlign: 'center',
        marginTop: PixelUtil.size(6)
    },
    vipPayForLImg: {
        //会员卡支付-左侧-图片
        marginTop: PixelUtil.size(50),
        height: '55%',
    },
    vipPayForRight: {
        //会员卡支付-右侧
        width: '50%',
        height: bodyHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    vipPayForImg: {
        //会员卡支付-右侧-图片
        width: PixelUtil.rect(260, 260).width,
        height: PixelUtil.rect(260, 260).height,
    },
    vipPayQRCodeViewCenter: {
        //会员卡支付-右侧
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(50),
        marginLeft: PixelUtil.size(35),
        marginRight: PixelUtil.size(35),
    },
    QRCodeBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vipPayForRightText: {
        marginTop: PixelUtil.size(10),
    },
});
