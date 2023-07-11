import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const amendItemInfoStyle = StyleSheet.create({
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
    activityIndicatorWrapper: {
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
    bodybox: {
        width: '100%',
        height: '100%',
    },
    bodytop: {
        height: PixelUtil.size(96.6),
        width: '100%',
        borderBottomWidth: PixelUtil.size(2),
        borderColor: '#CBCBCB',
        borderStyle: 'solid',
        flex: 0,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: PixelUtil.size(40.2),
    },
    bodytopTitle: {
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    bodyContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iteminfoBox: {
        // width: PixelUtil.size(586),
    },
    iteminfoBoxItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    iteminfoBoxItemOther: {
        display: 'flex',
        width: '30%',
    },
    iteminfoBoxItemLi: {
        // width: PixelUtil.size(586),
        marginLeft: PixelUtil.size(40),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    AmendCardItemNameText: {
        //修改项目-信息-名称
        fontSize: PixelUtil.size(32),
        textAlign: 'left',
        marginBottom: PixelUtil.size(20),
        color: '#333',
    },
    AmendCardItemNameTextCK: {
        //修改项目-信息-名称
        fontSize: PixelUtil.size(32),
        textAlign: 'left',
        marginBottom: PixelUtil.size(20),
        color: '#333',
        marginLeft: PixelUtil.size(-40),
    },
    AmendCardItemPrice: {
        //修改项目-信息-价格
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: PixelUtil.size(24),
    },
    AmendTakeoutUnit: {
        //修改项目-信息-价格
        marginLeft: PixelUtil.size(40),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    AmendCardItemPriceText: {
        //修改项目-信息-价格-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'left',
    },
    AmendCardItemPriceInpBox: {
        //修改项目-信息-价格输入框
        width: PixelUtil.rect(256, 72).width,
        height: PixelUtil.rect(256, 72).height,
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(4),
    },
    AmendCardItemPriceInpBoxActive: {
        //修改项目-信息-价格输入框-选中
        width: PixelUtil.rect(256, 68).width,
        height: PixelUtil.rect(256, 68).height,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    AmendCardItemPriceInp: {
        //修改项目-信息-价格输入框
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'center'
    },
    AmendCardItemCount: {
        //修改项目-数量
        height: PixelUtil.rect(256, 72).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    AmendCardItemCountText: {
        //修改项目-数量-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'left',
    },
    AmendCardItemCountAdd: {
        //修改项目-数量-加
        width: PixelUtil.rect(72, 72).width,
        height: PixelUtil.rect(72, 72).height,
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderRightWidth: 0,
        backgroundColor: '#fff',
    },
    AmendCardItemCountAddText: {
        //修改项目-数量-加-文字
        fontSize: PixelUtil.size(32),
        color: '#979797',
        textAlign: 'center',
        lineHeight: PixelUtil.size(64),
    },
    AmendCardItemCountTextBox: {
        //修改项目-数量-文字
        width: PixelUtil.rect(108, 72).width,
        height: PixelUtil.rect(108, 72).height,
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        backgroundColor: '#40aaff',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AmendCardItemCountTextBoxActive: {
        //修改项目-数量-文字-选中
        width: PixelUtil.rect(108, 72).width,
        height: PixelUtil.rect(108, 72).height,
        borderColor: '#40aaff',
        borderWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AmendCardItemCountTextInp: {
        //修改项目-数量-输入框
        width: PixelUtil.rect(104, 68).width,
        height: PixelUtil.rect(104, 68).height,
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AmendCardItemCountTextInput: {
        width: PixelUtil.rect(104, 68).width,
        height: PixelUtil.rect(104, 68).height,
        backgroundColor: '#fff',
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'center',
        paddingBottom: 0,
        paddingTop: 0,
    },
    AmendCardItemCountT: {
        //修改项目-数量-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    AmendCardItemCountMin: {
        //修改项目-数量-减
        width: PixelUtil.rect(72, 72).width,
        height: PixelUtil.rect(72, 72).height,
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderLeftWidth: 0,
        backgroundColor: '#fff',
    },
    AmendCardItemCountMinText: {
        //修改项目-数量-减-文字
        fontSize: PixelUtil.size(32),
        color: '#979797',
        textAlign: 'center',
        lineHeight: PixelUtil.size(64),
    },
    AmendCardItemKeyboard: {
        marginTop: PixelUtil.size(46),
    },
    bodyBottom: {
        height: PixelUtil.size(117.6),
        width: '100%',
        borderTopWidth: PixelUtil.size(2),
        borderColor: '#CBCBCB',
        borderStyle: 'solid',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: PixelUtil.size(40.2),
    },
    bodyCanelBtn: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.size(68),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
        borderWidth: PixelUtil.size(0),
        borderStyle: 'solid',
        borderColor: '#999',
        borderRadius: PixelUtil.size(200),
        marginRight: PixelUtil.size(20),
    },
    bodyCanelBtnText: {
        fontSize: PixelUtil.size(32),
        color: '#FFF',
    },
    bodyConfirmBtn: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.size(68),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111c3c',
        borderWidth: PixelUtil.size(0),
        borderStyle: 'solid',
        borderColor: '#111c3c',
        borderRadius: PixelUtil.size(200),
        marginRight: PixelUtil.size(40),
    },
    bodyConfirmText: {
        fontSize: PixelUtil.size(32),
        color: '#FFF',
    },

    AmendCardItemCountInpBox: {
        //修改项目-数量-文字
        width: PixelUtil.rect(256, 72).width,
        height: PixelUtil.rect(256, 72).height,
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(6),
    },
    AmendCardItemCountInpBoxActive: {
        //修改项目-数量-文字-选中
        width: PixelUtil.rect(256, 72).width,
        height: PixelUtil.rect(256, 72).height,
        borderColor: '#40aaff',
        borderWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(6),
    },
    AmendCardItemPriceBox: {
        width: PixelUtil.rect(256, 68).width,
    },
    openCardTextInput: {
        width: PixelUtil.rect(256, 72).width,
        height: PixelUtil.rect(256, 72).height,
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: PixelUtil.size(34),
        color: '#333',
        textAlign: 'center',
        marginBottom: PixelUtil.size(38),
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
    },
    saleCardTextInput: {
        width: PixelUtil.rect(280, 72).width,
        height: PixelUtil.rect(280, 72).height,
        borderRadius: PixelUtil.size(36),
        backgroundColor: '#fff',
        paddingTop: 0,
        paddingBottom: 0,
        fontSize: PixelUtil.size(34),
        color: '#333',
        textAlign: 'center',
        marginTop: PixelUtil.size(38),
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
    }
});
