import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const MemberQueryStyle = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#fff',
        height: '95%',
        width: '98%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: PixelUtil.size(10),
        position: 'relative',
        overflow: 'hidden',
    },
    title: {
        // 顾客识别-标题
        width: '100%',
        height: '9%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        marginTop: PixelUtil.size(-10),
    },
    body: {
        // 顾客识别-主体
        width: '100%',
        height: '80%',
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
    MemberQueryBox: {
        // 顾客识别-识别展示
        width: '100%',
        height: '100%',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
    },
    MemberQueryBoxRight: {
        // 顾客识别-识别展示
        width: '100%',
        height: '100%',
    },
    MemberQueryBoxLeft: {
        // 顾客识别-识别展示-搜索框
        paddingBottom: PixelUtil.size(31),
    },
    ShowMemberCardBox: {
        // 顾客识别-卡展示
        width: PixelUtil.size(984),
        height: '100%',
        borderBottomColor: '#cbcbcb',
    },
    ShowMemberCardList: {
        // 顾客识别-卡展示
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        paddingLeft: PixelUtil.size(8),
        paddingRight: PixelUtil.size(8),
        paddingTop: PixelUtil.size(18),
        paddingBottom: PixelUtil.size(18),
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
    MemberQueryBtnBoxNew: {
        // 顾客识别-关闭按钮框
        width: '100%',
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
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
});
