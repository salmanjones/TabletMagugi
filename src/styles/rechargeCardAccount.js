import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

export const rechargeCardAccountStyle = StyleSheet.create({
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
    checkBoxContainer: {
        backgroundColor: '#fff',
        borderWidth: 0,
    },
    checkBoxText: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'normal',
    },
    rechargeCardInfo: {
        width: '100%',
        height: '100%',
    },
    cardServiceInfo: {
        width: ' 100%',
        height: '44.4%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardInfo: {
        //卡样式
        width: '45%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: PixelUtil.size(76),
    },
    cardPrice: {
        //金额
        width: '55%',
        height: '100%',
    },
    cardPriceText: {
        fontSize: PixelUtil.size(38),
        color: '#333',
        marginTop: '8%',
    },
    cardInfoText: {
        //文字
        fontSize: PixelUtil.size(34),
        color: '#333',
        marginTop: PixelUtil.size(40),
    },
    cardGenreBox: {
        //服务类
        width: '100%',
        height: '50%',
    },
    chooseCardGenreBox: {
        width: '100%',
        height: '40%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(556),
        paddingRight: PixelUtil.size(556),
    },
    cardGenreTitleText: {
        //服务类-标题-文本
        fontSize: PixelUtil.size(34),
        color: '#333',
    },
    cardGenreCheckbox: {
        //服务类-单选框
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    accountBox: {
        //支付方式
        width: '100%',
        height: PixelUtil.size(180),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(668),
        paddingRight: PixelUtil.size(668),
        marginTop: PixelUtil.size(30),
    },
    accountList: {
        //支付方式-具体项
        width: PixelUtil.rect(276, 180).width,
        height: PixelUtil.rect(276, 180).height,
        borderWidth: PixelUtil.size(2),
        borderColor: '#d6d8dc',
        borderRadius: PixelUtil.size(6),
        marginRight: PixelUtil.size(80),
    },
    accountListActive: {
        //支付方式-具体项
        width: PixelUtil.rect(276, 180).width,
        height: PixelUtil.rect(276, 180).height,
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        borderRadius: PixelUtil.size(6),
        marginRight: PixelUtil.size(80),
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
    cardInfoAvatar: {
        width: PixelUtil.rect(316, 316).width,
        height: PixelUtil.rect(316, 316).height,
        marginBottom: PixelUtil.size(86),
    },
    cardPersonInfoText: {
        fontSize: PixelUtil.size(38),
        color: '#333',
        marginBottom: PixelUtil.size(60),
    },
});
