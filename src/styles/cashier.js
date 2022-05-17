import {Platform, StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const cashierStyles = StyleSheet.create({
    hidden: {
        display: 'none'
    },
    container: {
        backgroundColor: '#fff',
        position: 'relative',
        flex: 1,
    },
    openOrderContainer: {
        //开单主体
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    openOrderBox: {
        //开单内容主体
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    openOrderlist: {
        //开单内容主体
        width: PixelUtil.rect(930, 500).width,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    memberItemBox: {
        marginBottom: PixelUtil.size(5),
        marginTop: PixelUtil.size(79),
    },
    inputBox: {
        //开单-输入框-背景
        width: PixelUtil.rect(608, 70).width,
        height: PixelUtil.rect(608, 70).height,
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    input: {
        //开单-输入框
        width: PixelUtil.rect(568, 70).width,
        height: PixelUtil.rect(568, 70).height,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: PixelUtil.size(28.5),
    },
    inputSmall: {
        //开单-输入框
        width: PixelUtil.rect(500, 70).width,
        height: PixelUtil.rect(500, 70).height,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: PixelUtil.size(28.5),
    },
    inputBoxSmall: {
        //开单-输入框-背景
        width: PixelUtil.rect(540, 70).width,
        height: PixelUtil.rect(540, 70).height,
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: PixelUtil.size(60),
    },
    radioBox: {
        //开单-单选框-主体
        width: PixelUtil.rect(608, 54).width,
        height: PixelUtil.rect(608, 54).height,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: PixelUtil.size(40),
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    radio: {
        //开单-单选框
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioImg: {
        //开单-单选框-图片
        width: PixelUtil.rect(52, 52).width,
        height: PixelUtil.rect(52, 52).height,
        marginRight: PixelUtil.size(10),
    },
    radioText: {
        //开单-单选框-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    orderGenreBox: {
        //开单-单据-主体
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(40),
        width: PixelUtil.size(980),
        overflow: 'hidden'
    },
    orderGenre: {
        borderWidth: PixelUtil.size(2),
        borderStyle: 'solid',
        borderColor: '#111C3C',
        borderRadius: PixelUtil.size(8),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: PixelUtil.rect(240, 100).width,
        height: PixelUtil.rect(240, 100).height,
        marginLeft: PixelUtil.size(30),
        marginRight: PixelUtil.size(30),
        marginBottom: PixelUtil.size(30)
    },
    orderGenreImg: {
        //开单-单据-美发图片
        width: PixelUtil.rect(70, 65).width,
        height: PixelUtil.rect(70, 65).height,
    },
    orderGenreBilling: {
        //开单-单据-开单图片
        width: PixelUtil.rect(51, 65).width,
        height: PixelUtil.rect(51, 65).height,
        marginRight: PixelUtil.size(30)
    },
    orderGenreText: {
        //开单-单据-文字
        fontSize: PixelUtil.size(28),
        color: '#111C3C',
        marginLeft: PixelUtil.size(18)
    },
    // 识别会员
    openOrderlistOther: {
        //开单内容主体
        flex: 1,
    },
    openOrderRightBox: {
        width: PixelUtil.size(1000),
        height: PixelUtil.size(280),
        marginLeft: PixelUtil.size(48),
        marginRight: PixelUtil.size(48),
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
    },
    rightSearchBox: {
        flex: 0,
        flexDirection: 'row',
        marginTop: PixelUtil.size(32),
        height: PixelUtil.size(70),
    },
    radioBoxHas: {
        //开单-单选框-主体
        width: PixelUtil.rect(380, 70).width,
        height: PixelUtil.rect(380, 70).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    // 会员识别
    memberInfoBox: {
        // paddingLeft: PixelUtil.size(48),
        // paddingRight: PixelUtil.size(48),
        width: PixelUtil.size(1000),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: PixelUtil.size(-60),
    },
    memberInfoLi: {
        // width: PixelUtil.size(1000),
        flexDirection: 'row',
        alignItems: 'center',
        height: PixelUtil.size(120),
        paddingBottom: PixelUtil.size(30),
        paddingTop: PixelUtil.size(30),
    },
    memberAvatarImg: {
        width: PixelUtil.size(120),
        height: PixelUtil.size(120),
        borderRadius: PixelUtil.size(60),
        marginRight: PixelUtil.size(16),
    },
    memberBaseInfo: {},
    memberUserBase: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameText: {
        maxWidth: PixelUtil.size(240),
        fontSize: PixelUtil.size(32),
        color: '#333'
    },
    MemberListSexImage: {
        width: PixelUtil.size(30),
        height: PixelUtil.size(30),
        marginLeft: PixelUtil.size(14),
    },
    memberVipNum: {
        fontSize: PixelUtil.size(28),
        color: '#333'
    },
    memberNumInfo: {},
    memberOtherInfo: {
        flex: 0,
        alignItems: 'flex-end',
        top: PixelUtil.size(-6),
    },
    appointmentImage: {
        width: PixelUtil.size(150),
        height: PixelUtil.size(44),
    },
    marginBottom10: {
        marginBottom: PixelUtil.size(10),
    },
    memberCardListBox: {
        width: '100%',
        maxHeight: Platform.OS === 'ios' ? '66.5%' : '65.5%',
        paddingLeft: PixelUtil.size(14),
        paddingRight: PixelUtil.size(48),
        flex: 0,
        alignItems: 'center',
    },
});
