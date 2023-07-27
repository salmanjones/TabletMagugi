import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const memberFilingStyle = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 200
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#FFF',
        height: '95%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: PixelUtil.size(120),
        position: 'relative',
        overflow: 'hidden',
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
        height: PixelUtil.size(68),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0
    },
    checkBoxText: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'normal',
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
    memberFiling: {
        //会员建档
        width: '90%',
        // height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    memberFilingImg: {
        //会员建档-图片框
        width: '40%',
        height: PixelUtil.size(720),
        position: 'relative',
    },
    memberPortraitBox: {
        //会员建档-图片-框
        width: PixelUtil.rect(648, 648).width,
        height: PixelUtil.rect(648, 648).height,
        backgroundColor: '#cbcbcb',
    },
    memberPortrait: {
        //会员建档-图片
        width: PixelUtil.rect(648, 648).width,
        height: PixelUtil.rect(648, 648).height,
    },
    memberPortraitOperate: {
        //会员建档-图片修改框
        width: PixelUtil.rect(648, 80).width,
        height: PixelUtil.rect(648, 80).height,
        backgroundColor: '#00000050',
        position: 'absolute',
        bottom: 0,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    memberPortraitOperateText: {
        //会员建档-图片-文字
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    memberFilingInfo: {
        //会员建档-信息
        width: '60%',
        height: PixelUtil.size(720)
    },
    required: {
        //会员建档-必填-*
        color: '#ff0000',
        fontSize: PixelUtil.size(32),
    },
    memberFilingInfoList: {
        //会员建档-行
        width: '100%',
        height: PixelUtil.size(106),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    memberFilingInfoTr: {
        //会员建档-行
        width: '100%',
        height: PixelUtil.size(76),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: PixelUtil.size(30),
        position: 'relative',
    },
    memberFilingErrorTip: {
        width: PixelUtil.size(608),
        paddingLeft: PixelUtil.size(30),
        paddingRight: PixelUtil.size(30),
        marginLeft: PixelUtil.size(30),
        position: 'absolute',
        bottom: PixelUtil.size(-30),
        left: 0,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    memberFilingErrorTipText: {
        fontSize: PixelUtil.size(18),
        color: '#121c3c',
    },
    memberFilingInfoChange: {
        //会员建档-修改
        width: PixelUtil.rect(176, 68).width,
        height: PixelUtil.rect(176, 68).height,
        marginLeft: PixelUtil.size(40),
        marginTop: PixelUtil.size(-2),
        position: 'absolute',
        top: PixelUtil.size(2),
        right: 0,
    },
    memberFilingInfoChangeImg: {
        //会员建档-性别
        width: PixelUtil.rect(176, 68).width,
        height: PixelUtil.rect(176, 68).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    memberFilingInfoChangeText: {
        fontSize: PixelUtil.size(32),
        color: '#000',
    },
    memberFilingInfoSexTr: {
        //会员建档-行
        width: '100%',
        height: PixelUtil.size(76),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // marginTop:PixelUtil.size(20),
    },
    memberFilingInfoSexTdR: {
        //会员建档-性别-右
        width: PixelUtil.size(608),
        height: PixelUtil.size(76),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    memberFilingInfoTdL: {
        //会员建档-左
        width: PixelUtil.size(186),
        height: PixelUtil.size(76),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    memberFilingInfoTdR: {
        //会员建档-右
        width: PixelUtil.size(846),
        height: PixelUtil.size(76),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(22),
    },
    memberFilingInfoInpBox: {
        //会员建档-输入框
        width: PixelUtil.rect(608, 76).width,
        height: PixelUtil.rect(608, 76).height,
        paddingLeft: PixelUtil.size(30),
        paddingRight: PixelUtil.size(30),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    memberFilingInfoInp: {
        //会员建档-输入
        width: '100%',
        height: '100%',
        fontSize: PixelUtil.size(32),
        color: '#333',
        paddingTop: 0,
        paddingBottom: 0,
    },
    memberFilingInfoText: {
        //会员建档-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
});
