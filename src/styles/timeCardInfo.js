import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const timeCardInfoStyles = StyleSheet.create({
    containerStyle: {
        width: PixelUtil.rect(480, 68).width,
        height: PixelUtil.rect(480, 68).height,
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 0,
        marginTop: PixelUtil.size(22),
        marginBottom: PixelUtil.size(26),
    },
    MemberQueryContainer: {
        width: PixelUtil.size(1968),
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    buttonStyle: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        marginRight: PixelUtil.size(40),
        backgroundColor: '#fff',
        borderRadius: PixelUtil.size(200),
    },
    selectedButtonStyle: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#111c3c',
        borderRadius: PixelUtil.size(200),
    },
    textStyle: {
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    selectedTextStyle: {
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    titleBox: {
        width: PixelUtil.rect(1968, 116).width,
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        backgroundColor: '#fff',
    },
    cardInfoBox: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 1
    },
    cardInfoBody: {
        width: '100%',
        height: '91%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cardImg: {
        //储值卡
        width: '100%',
        height: '38.53%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(20),
    },
    cardInfoItemBox: {
        width: '100%',
        height: '59.63%',
        backgroundColor: '#fff',
    },
    cardInfoItemTitle: {
        width: '100%',
        height: PixelUtil.size(60),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        marginRight: '25%',
    },
    itemTitleText: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        marginRight: PixelUtil.size(430),
    },
    timeCardInfoLeft: {
        width: '50%',
        height: '100%',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
        paddingLeft: PixelUtil.size(96),
        paddingRight: PixelUtil.size(96),
    },
    cardInfo: {
        //信息
        width: '100%',
        height: '30%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardInfoLast: {
        //信息
        width: '100%',
        height: '33.3%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardInfoItem: {
        //信息-项
        width: '30%',
        height: '100%',
        overflow: 'hidden',
        marginRight: '3.3%',
    },
    cardInfoItemStore: {
        width: '67%',
        height: '100%',
        overflow: 'hidden',
    },
    cardInfoNote: {
        //信息-备注
        width: '100%',
        height: PixelUtil.size(45),
        overflow: 'hidden',
    },
    cardInfoText: {
        //信息-文字
        height: PixelUtil.size(45),
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'left',
        marginTop: PixelUtil.size(12),
        overflow: 'hidden',
    },
    timeCardInfoRight: {
        width: '50%',
        height: '100%',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
        paddingLeft: PixelUtil.size(146),
        paddingRight: PixelUtil.size(146),
        paddingTop: PixelUtil.size(68),
    },
    rightItem: {
        width: '100%',
        height: PixelUtil.size(74),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    rightItemL: {
        width: '45%',
        height: PixelUtil.size(74),
        overflow: 'hidden',
        marginRight: '5%',
    },
    rightItemR: {
        width: '45%',
        height: PixelUtil.size(74),
        overflow: 'hidden',
        marginLeft: '5%',
    },
    rightItemText: {
        fontSize: PixelUtil.size(28),
        color: '#333',
        height: PixelUtil.size(74),
        overflow: 'hidden',
    },
    rightItemTextR: {
        fontSize: PixelUtil.size(28),
        color: '#333',
        height: PixelUtil.size(74),
        overflow: 'hidden',
        textAlign: 'left',
        marginLeft: PixelUtil.size(74),
    },
    MemberQueryBtnBox: {
        //操作区域
        width: '100%',
        height: '13%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
    },
});
