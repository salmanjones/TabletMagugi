// 轮牌小弹层
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const rotateSmallModalStyle = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 9999,
    },
    rotateWrapper: {
        backgroundColor: '#FFF',
        height: PixelUtil.size(500),
        width: PixelUtil.size(790),
        overflow: 'hidden',
        position: 'relative',
        borderRadius: PixelUtil.size(18),
    },
    rotateBox: {
        height: PixelUtil.size(350),
        width: PixelUtil.size(790),
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateModalText: { //文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'normal'
    },
    modalBtm: {
        width: PixelUtil.size(790),
        height: PixelUtil.size(148),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalBtmBtn: {  //底部-按钮
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: PixelUtil.size(200),
    },
    modalCancelBtn: { //底部-取消按钮
        backgroundColor: '#999',
        marginRight: PixelUtil.size(128),
    },
    modalSuccessBtn: { //底部-确定按钮
        backgroundColor: '#111c3c'
    },
    modalBtmBtnText: { //底部-按钮-文字
        fontSize: PixelUtil.size(32),
        color: '#fff'
    },
    textDarkBlue: {
        color: '#111c3c'
    }
});
