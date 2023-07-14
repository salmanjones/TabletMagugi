import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const consumeHistoryStyles = StyleSheet.create({
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
    historyInfoBox: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 1,
        borderStyle: 'solid',
        borderTopWidth: PixelUtil.size(2),
        borderColor: '#cbcbcb'
    },
    cardInfoBox: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 1
    },
    subTitleBox: {
        // 副标题
        width: '100%',
        height: PixelUtil.size(154),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#CFDDFF',
    },
    subTitleItem: {
        // 副标题-项目
        width: '40%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitleTime: {
        // 副标题-消费
        width: '20%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitleDate: {
        // 副标题-时间
        width: '40%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitleText: {
        // 副标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    consumeHistoryBox: {
        // 信息
        width: '100%',
        height: '85.14%',
    },
    historyEvenList: {
        // 信息-偶数列
        width: '100%',
        height: PixelUtil.size(102),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#CFDDFF',
        backgroundColor: '#F2F6FF',
    },
    historyOddList: {
        // 信息-奇数列
        width: '100%',
        height: PixelUtil.size(102),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#CFDDFF',
        backgroundColor: '#fff',
    },
    historyItem: {
        // 信息-项目
        width: '40%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyTime: {
        // 信息-消费
        width: '20%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyDate: {
        // 信息-时间
        width: '40%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyListText: {
        // 信息-文字
        fontSize: PixelUtil.size(32),
        color: '#666',
    },
});
