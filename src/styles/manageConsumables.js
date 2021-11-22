import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

let naviBarHeight = PixelUtil.size(136);
let headerHeight = PixelUtil.screenSize.height * 0.1;
let operatorBoxHeight = PixelUtil.size(180)
let leftBoxWidth = PixelUtil.screenSize.width * 0.4;
let leftBoxHeight = PixelUtil.screenSize.height - naviBarHeight - headerHeight;
let servicerBodyHeight = leftBoxHeight - operatorBoxHeight;
let rightBoxWidth = PixelUtil.screenSize.width * 0.6;
let rightBoxHeight = PixelUtil.screenSize.height - naviBarHeight;
let rightBoxContentHeight = rightBoxHeight - headerHeight;
let rightBoxServicerHeight = rightBoxContentHeight - operatorBoxHeight;
let categoryWidth = PixelUtil.size(154);
let rightOperboxWidth = rightBoxWidth - categoryWidth;
let addServicerLiWidth = (rightOperboxWidth - PixelUtil.size(96)) / 3
export const manageConsumablesStyle = StyleSheet.create({
    //-----左侧框-----
    consumeLeftBox: {
        //左侧框
        width: leftBoxWidth,
        height: '100%',
    },
    consumeLeftHeader: {
        //左侧框-标题
        width: PixelUtil.rect(824, 106).width,
        height: headerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    consumeLeftContent: {
        //左侧框-主体
        width: leftBoxWidth,
        height: leftBoxHeight,
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
    },
    consumeLeftFooter: {
        //左侧框-操作区域
        width: leftBoxWidth,
        height: operatorBoxHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
        backgroundColor: '#f3f3f3',
        position: 'relative'
    },
    consumeBack: {
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
        backgroundColor: '#999999',
        borderRadius: PixelUtil.size(34),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: PixelUtil.size(45),
        marginBottom: PixelUtil.size(34)
    },
    consumeSave: {
        // 结单
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
        backgroundColor: '#111c2c',
        borderRadius: PixelUtil.size(34),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PixelUtil.size(30),
        marginBottom: PixelUtil.size(34)
    },
    consumedBtnText: {
        // 按钮文字
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    //-----右侧框-----
    consumeRightBox: {
        width: rightBoxWidth,
        height: rightBoxHeight,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    consumeRightTitle: {
        //右侧框-标题
        width: '100%',
        height: headerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    consumeRightContent: {
        //右侧框-主体
        width: '100%',
        height: rightBoxContentHeight,
        borderWidth: PixelUtil.size(2),
        borderBottomWidth: 0,
        borderRightWidth: 0,
        borderStyle: 'solid',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: '#cbcbcb'
    },
    consumeProcuctBox: {
        width: rightBoxWidth,
        height: rightBoxContentHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    consumeServicerBox: {
        width: rightBoxWidth,
        height: rightBoxServicerHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    consumeServicerContent: {
        width: rightBoxWidth,
        height: rightBoxServicerHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        backgroundColor: '#fff'
    },
    consumeRightFooter: {
        //左侧框-操作区域
        width: rightBoxWidth,
        height: operatorBoxHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative'
    },
    consumeServicerSingle: {
        //有选中内容
        width: '100%',
        height: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    consumeServicerTips: {
        //无选中内容
        width: '100%',
        height: '85%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    consumeChooseCategory: {
        //右边框-单据类型
        width: categoryWidth,
        height: '100%',
        borderLeftWidth: PixelUtil.size(2),
        borderLeftColor: '#cbcbcb',
    },
    consumeChooseBody: {
        // 右边框-主体内容
        width: rightOperboxWidth,
        height: '100%',
    },
    consumeEditBody: {
        width: rightBoxWidth,
        height: rightBoxContentHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderStyle: 'solid',
    },
    //------以下为旧写法------
    servicerBodyNew: {
        // 服务项
        width: '100%',
        height: servicerBodyHeight,
    },
    backBtn: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#999999',
        borderRadius: PixelUtil.size(200),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: PixelUtil.size(20),
    },
    addServicerBox: {
        //加消耗内容
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginTop: PixelUtil.size(30),
    },
    addServicerLi: {
        //加项目内容-列
        width: addServicerLiWidth,
        height: PixelUtil.rect(318, 148).height,
        backgroundColor: '#E8EEFF',
        borderColor: '#B8CBFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(20),
        marginBottom: PixelUtil.size(15),
        marginTop: PixelUtil.size(15),
    },
    addServicerLiBox: {
        //加消耗内容-项
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
    },

    addServicerNumber: {
        //加项目内容-列-编号
        fontSize: PixelUtil.size(28),
        color: '#333',
    },

    showServicerLiBox: {
        //服务项-产品
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
        paddingTop: PixelUtil.size(8),
        paddingBottom: PixelUtil.size(8),
    },
    servicerInfoBodyHeight: {
        height: '99%',
        marginBottom: PixelUtil.size(1),
    },
    // 规格单位
    unitBox: {
        width: PixelUtil.rect(208, 60).width,
        height: PixelUtil.rect(208, 60).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: PixelUtil.size(8),
        overflow: 'hidden',
    },
    unitItem: {
        width: PixelUtil.rect(104, 60).width,
        height: PixelUtil.rect(104, 60).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#999',
    },
    unitItemActive: {
        width: PixelUtil.rect(104, 60).width,
        height: PixelUtil.rect(104, 60).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111c3c',
    },
    unitItemText: {
        color: '#fff',
        fontSize: PixelUtil.size(28)
    },

    AmendCardItemCount: {
        //修改项目-数量
        width: PixelUtil.rect(320, 72).width,
        height: PixelUtil.rect(320, 72).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    AmendCardItemCountTextBox: {
        //修改项目-数量-文字
        width: PixelUtil.rect(212, 72).width,
        height: PixelUtil.rect(212, 72).height,
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        backgroundColor: '#cbcbcb',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AmendCardItemCountTextBoxActive: {
        //修改项目-数量-文字-选中
        width: PixelUtil.rect(212, 72).width,
        height: PixelUtil.rect(212, 72).height,
        borderColor: '#40aaff',
        borderWidth: PixelUtil.size(2),
        backgroundColor: '#40aaff',
        elevation: 1,
        shadowOffset: {width: 0, height: 1},
        shadowColor: '#40aaff',
        shadowOpacity: 1,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    AmendCardItemCountTextInp: {
        //修改项目-数量-输入框
        width: PixelUtil.rect(208, 68).width,
        height: PixelUtil.rect(208, 68).height,
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AmendCardItemCountTextInpError: {
        //修改项目-数量-输入框
        width: PixelUtil.rect(208, 68).width,
        height: PixelUtil.rect(208, 68).height,
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(4),
    },
    AmendCardItemKeyboard: {
        marginTop: PixelUtil.size(60),
    },
    bodyBottom: {
        height: PixelUtil.size(117.6),
        width: '60%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
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
    },

    consumeTitle: {
        //右侧框-标题
        width: PixelUtil.rect(1188, 106).width,
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        right: 0,
        paddingRight: PixelUtil.size(30),
    },

    consumeInpBox: {
        //右侧框-标题-输入框
        width: PixelUtil.rect(332, 70).width,
        height: PixelUtil.size(70),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    consumeInp: {
        lineHeight: PixelUtil.size(70),
        marginLeft: PixelUtil.size(30),
        fontSize: PixelUtil.size(32),
        color: '#111C3C',
    },

    DatepickerBox: {
        height: PixelUtil.rect(593, 70).height,
        width: PixelUtil.rect(593, 70).width,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
        marginTop: PixelUtil.size(40),
        marginLeft: PixelUtil.size(60.3),

    },
    DatepickerText: {
        width: PixelUtil.size(173),
        height: '100%',
        lineHeight: PixelUtil.size(70),
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    DatepickerInpBox: {
        width: PixelUtil.size(380),
        height: '100%',
        flex: 0,
        justifyContent: 'flex-start',
    },
    suoDanImg: {
        width: PixelUtil.rect(32, 32).width,
        height: PixelUtil.rect(32, 32).height,
        marginLeft: PixelUtil.size(12),
    },
    addServicerName: {
        //加项目内容-列-名称
        width: '100%',
        height: PixelUtil.rect(308, 68).height,
        fontSize: PixelUtil.size(28),
        textAlign: 'center',
        color: '#333',
    },

    DatepickerInpBoxJD: {
        width: PixelUtil.rect(608, 76).width,
        height: PixelUtil.rect(608, 76).height,
        paddingLeft: PixelUtil.size(30),
        paddingRight: PixelUtil.size(30),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
