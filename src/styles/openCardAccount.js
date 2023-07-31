import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const openCardAccountStyle = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#FFF',
        height: '90%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    billInfoBox: {
        // 顾客识别-主体
        width: '100%',
        flex: 1,
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    MemberQueryTitle: {
        // 顾客识别-标题
        width: '100%',
        height: PixelUtil.size(114),
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
    leftBodyBox: {
        width: '50%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
        backgroundColor: 'grey'
    },
    leftBox: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ffffff',
    },
    rightBodyBox: {
        width: '50%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    MemberQueryBtnBox: {
        // 顾客识别-关闭按钮框
        width: '100%',
        height: PixelUtil.size(114),
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
    cardInfo: {
        //卡样式
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(160),
        paddingRight: PixelUtil.size(160),
        borderBottomWidth: PixelUtil.size(2),
        borderColor: '#ececec'
    },
    cardPrice: {
        //金额
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(196),
        paddingRight: PixelUtil.size(160),
    },
    cardPriceText: {
        fontSize: PixelUtil.size(38),
        color: '#333',
        marginBottom: PixelUtil.size(20),
        marginRight: PixelUtil.size(60),
    },
    cardInfoText: {
        //文字
        fontSize: PixelUtil.size(38),
        color: '#333',
        marginBottom: PixelUtil.size(20),
    },
    cardGenreBox: {
        //服务类
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    chooseCardGenreBox: {
        width: '100%',
        height: PixelUtil.size(114),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderColor: '#ececec',
    },

    cardGenreCheckbox: {
        //服务类-单选框
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    checkBoxContainer: {
        backgroundColor: '#fff',
        borderWidth: 0,
        flexShrink: 0,
        marginLeft: PixelUtil.size(10),
        marginRight: PixelUtil.size(10),
    },
    checkBoxText: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'normal',
        textAlign: 'left'
    },
    cardGenreTitleText: {
        //服务类-标题-文本
        fontSize: PixelUtil.size(34),
        color: '#333',
    },
    accountBox: {
        //支付方式
        width: '100%',
        height: PixelUtil.size(180),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(160),
        paddingRight: PixelUtil.size(160),
        marginTop: PixelUtil.size(30),
    },
    accountList: {
        //支付方式-具体项
        width: PixelUtil.rect(276, 180).width,
        height: PixelUtil.rect(276, 180).height,
        borderWidth: PixelUtil.size(2),
        borderColor: '#d6d8dc',
        borderRadius: PixelUtil.size(6),
        marginRight: PixelUtil.size(40),
    },
    accountListActive: {
        //支付方式-具体项
        width: PixelUtil.rect(276, 180).width,
        height: PixelUtil.rect(276, 180).height,
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        borderRadius: PixelUtil.size(6),
        marginRight: PixelUtil.size(40),
    },
    accountListBox: {
        //支付方式-具体项
        width: PixelUtil.rect(276, 180).width,
        height: PixelUtil.rect(276, 180).height,
    },
    accountListImg: {
        //支付方式-具体项-图片
        width: PixelUtil.rect(72, 72).width,
        height: PixelUtil.rect(72, 72).height,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: PixelUtil.size(28),
        marginBottom: PixelUtil.size(10),
    },
    accountListText: {
        //支付方式-具体项-文字
        fontSize: PixelUtil.size(32),
        color: '#9c9c9c',
        textAlign: 'center',
    },
    rightBox: {
        //右边内容
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(40),
    },
    rightBoxNew: {
        //右边内容
        paddingLeft: PixelUtil.size(256),
        paddingRight: PixelUtil.size(256),
    },
    cardInfoAvatarBox: {
        width: PixelUtil.size(240),
        height: PixelUtil.size(240),
        borderRadius: PixelUtil.size(120),
        overflow: 'hidden',
        backgroundColor: '#cbcbcb',
        marginRight: PixelUtil.size(20),
    },
    cardInfoAvatarBoxNew: {
        width: PixelUtil.rect(240, 240).width,
        height: PixelUtil.rect(240, 240).height,
        marginBottom: PixelUtil.size(46),
        marginTop: PixelUtil.size(40),
        borderRadius: PixelUtil.size(120),
        overflow: 'hidden',
        backgroundColor: '#cbcbcb',
    },
    cardInfoAvatar: {
        width: PixelUtil.rect(240, 240).width,
        height: PixelUtil.rect(240, 240).height,
    },
    cardPersonInfoText: {
        fontSize: PixelUtil.size(38),
        color: '#333',
        lineHeight: PixelUtil.size(80)
    },
});
