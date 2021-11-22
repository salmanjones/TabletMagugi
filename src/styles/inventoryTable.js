import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

export const inventoryTableStyle = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#FFF',
        height: '95%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        marginTop: PixelUtil.size(-60)
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
    inventoryTable: {
        //库存不足-表格
        width: '94%',
        height: '94%',
        borderWidth: PixelUtil.size(2),
        borderColor: '#d6d8dc',
    },
    inventoryTableTh: {
        width: '100%',
        height: PixelUtil.size(60),
    },
    inventoryTableTbody: {
        width: '100%',
        height: '92%',
    },
    inventoryTableTr: {
        //库存不足-行
        width: '100%',
        height: PixelUtil.size(60),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#d6d8dc',
    },
    inventoryTableTdL: {
        //库存不足-左列
        width: '50%',
        height: '100%',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#d6d8dc',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(18),
    },
    inventoryTableTdR: {
        //库存不足-右列
        width: '50%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(18),
    },
    inventoryTableTdText: {
        //库存不足-文字
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
});
