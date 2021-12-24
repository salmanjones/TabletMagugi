// 結單管理
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const AmendServicerModalStyle = StyleSheet.create({

    modalBackground: {
        flex: 0,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#FFF',
        height: '90%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    container: {
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    servicerInfoBodyHeight: {
        height: '99%',
        marginBottom: PixelUtil.size(1),
    },
    servicerBox: {
        //左侧框
        width: '39%',
        height: '100%',
    },
    titleDeleteBox: {
        position: 'absolute',
        right: PixelUtil.size(38),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    daleteIconImg: {
        width: PixelUtil.rect(32, 38).width,
        height: PixelUtil.rect(32, 38).height,
        marginRight: PixelUtil.size(9),
    },
    servicerBoxBorder: {
        //左侧框-主体
        width: '100%',
        height: '80%',
        paddingLeft: PixelUtil.size(64),
        paddingRight: PixelUtil.size(64),
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
    },

    servicerAccount: {
        // 操作区域
        width: '100%',
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    consumeBox: {
        //右侧框
        width: '61%',
        height: '100%',
    },
    consumeTitle: {
        //右侧框-标题
        width: '100%',
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderColor: '#cbcbcb',
        borderLeftWidth: PixelUtil.size(2),
        borderBottomWidth: PixelUtil.size(2),
    },
    servicertitle: {
        //左侧框-标题
        width: '100%',
        height: '10%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        position: 'relative',
    },
    consumeInpBox: {
        //右侧框-标题-输入框
        width: PixelUtil.rect(527, 68).width,
        height: PixelUtil.size(68),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        right: '-6%',
    },

    consumeInp: {
        width: PixelUtil.rect(300, 68).width,
        height: PixelUtil.size(68),
        paddingTop: 0,
        paddingBottom: 0,
        marginRight: PixelUtil.size(40),
        marginLeft: PixelUtil.size(40),
    },
    consumeBoxBorder: {
        //右侧框-主体
        width: '100%',
        height: '89%',
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderBottomWidth: 0,
        borderTopWidth: 0,
        position: 'relative',
    },
    textColor9C: {
        fontSize: PixelUtil.size(32),
        color: '#9c9c9c'
    },
    textColorRed: {
        fontSize: PixelUtil.size(32),
        color: '#ff4444'
    },
    textColor333: {
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    text28Color333: {
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    text28Colorfff: {
        fontSize: PixelUtil.size(28),
        color: '#fff',
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
    serviceImgInfoBox: {   //服务人头像信息
        width: '100%',
        height: PixelUtil.rect(236, 236).height,
        marginTop: PixelUtil.size(64),
        marginBottom: PixelUtil.size(64),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    noServicerBox: {
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
        backgroundColor: '#F3F3F3',
        borderWidth: PixelUtil.size(4),
        borderStyle: 'solid',
        borderColor: '#CBCBCB',
        borderRadius: PixelUtil.size(4),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    noServicerBoxActive: {
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
        backgroundColor: '#F3F3F3',
        borderWidth: PixelUtil.size(4),
        borderStyle: 'solid',
        borderColor: '#BCCDFF',
        borderRadius: PixelUtil.size(4),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIconImg: {
        width: PixelUtil.rect(40, 40).width,
        height: PixelUtil.rect(40, 40).height,
    },
    serviceTextInfoBox: {
        height: PixelUtil.rect(236, 236).height,
        marginLeft: PixelUtil.size(44),
        flex: 0,
        justifyContent: 'flex-start',
    },
    serviceTextInfoBoxOther: {
        height: PixelUtil.rect(236, 236).height,
        marginLeft: PixelUtil.size(44),
        flex: 0,
        justifyContent: 'center',
    },
    serviceTypeBox: {  //服务项目信息
        marginBottom: PixelUtil.size(40),
        height: PixelUtil.size(130),
        width: '100%',
        backgroundColor: '#F0F5FF',
        borderRadius: PixelUtil.size(4),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: PixelUtil.size(25),
        paddingTop: PixelUtil.size(25),
    },
    serviceTypeTitle: {
        width: '21%',
        marginLeft: '6%',
        marginRight: '6%',
    },
    serviceTypeName: {
        marginRight: '6%',
        width: '62%',
    },
    serviceClassifyBox: {
        width: '100%',
        height: '30%',
        // backgroundColor: '#F0F5FF',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    serviceClassifyLi: {
        width: '33%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        borderWidth: PixelUtil.size(4),
        borderColor: '#fff',
        backgroundColor: '#F0F5FF',
        borderRadius: PixelUtil.size(4),
    },
    serviceClassifyLiActive: {
        width: '33%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        borderWidth: PixelUtil.size(4),
        borderColor: '#BCCDFF',
        backgroundColor: '#F0F5FF',
        borderRadius: PixelUtil.size(4),
        zIndex: 2,
        position: 'relative'
    },
    serviceClassifyLiOther: {
        width: '33%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        borderWidth: PixelUtil.size(4),
        borderColor: '#fff',
        backgroundColor: '#F0F5FF',
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(2),
    },
    serviceClassifyLiOtherActive: {
        width: '33%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        borderWidth: PixelUtil.size(4),
        borderColor: '#BCCDFF',
        backgroundColor: '#F0F5FF',
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(2),
        zIndex: 1,
        position: 'relative'
    },
    serviceClassifyLiUnable: {
        width: '33%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        backgroundColor: '#8e8e8e20',
        borderRadius: PixelUtil.size(4),
        borderWidth: PixelUtil.size(4),
        borderColor: '#fff',
    },
    serviceClassifyTitleLi: {
        width: '100%',
        height: '30%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderColor: '#fff',
    },
    serviceClassifyNumLi: {
        width: '100%',
        height: '70%',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    redactIconImg: {
        width: PixelUtil.rect(24, 24).width,
        height: PixelUtil.rect(24, 24).height,
        marginTop: PixelUtil.size(8),
    },
    serviceImgInfoOtherBox: {
        width: '100%',
        height: PixelUtil.rect(236, 236).height,
        marginTop: PixelUtil.size(64),
        marginBottom: PixelUtil.size(64),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    servicerInfoBox: {
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
        backgroundColor: '#F3F3F3',
        borderWidth: PixelUtil.size(4),
        // borderStyle: 'solid',
        borderColor: '#cbcbcb',
        borderRadius: PixelUtil.size(4),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    servicerInfoBoxActive: {
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
        backgroundColor: '#F3F3F3',
        borderWidth: PixelUtil.size(4),
        borderStyle: 'solid',
        borderColor: '#bccdff',
        borderRadius: PixelUtil.size(4),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    personImg: {
        width: PixelUtil.rect(228, 228).width,
        height: PixelUtil.rect(228, 228).height,
    },
    redactBox: {  //编辑图标-盒
        position: 'absolute',
        right: PixelUtil.size(-1),
        top: PixelUtil.size(-1),
        zIndex: 5,
    },
    redactImg: {  //编辑图标
        width: PixelUtil.rect(80, 80).width,
        height: PixelUtil.rect(80, 80).height,
    },
    servicerNum: {
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    servicerNumBox: {
        width: PixelUtil.rect(118, 50).width,
        height: PixelUtil.rect(118, 50).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(15),
        paddingLeft: PixelUtil.size(18),
        paddingRight: PixelUtil.size(18),
        paddingTop: PixelUtil.size(18),
        paddingBottom: PixelUtil.size(18),

    },
    servicerGenreBox: {
        position: 'relative',
        marginTop: PixelUtil.size(26),
        width: '100%',
        paddingRight: PixelUtil.size(20),
        paddingTop: PixelUtil.size(20),
    },
    servicerGenreTextBox: {
        height: PixelUtil.rect(160, 64).height,
        paddingLeft: PixelUtil.size(10),
        paddingRight: PixelUtil.size(10),
        backgroundColor: '#F0F5FF',
        borderRadius: PixelUtil.size(8),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    redactImgOther: {
        width: PixelUtil.rect(24, 25).width,
        height: PixelUtil.rect(24, 25).height,
        marginLeft: PixelUtil.size(15),
    },
    servicerGenreTextBoxActive: {
        height: PixelUtil.rect(160, 64).height,
        paddingLeft: PixelUtil.size(10),
        paddingRight: PixelUtil.size(10),
        backgroundColor: '#F0F5FF',
        borderRadius: PixelUtil.size(8),
        borderWidth: PixelUtil.size(4),
        borderColor: '#BCCDFF',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    servicerGenreText: {
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    addTypeAssign: { //指定图标
        position: 'absolute',
        top: PixelUtil.size(2),
        right: PixelUtil.size(6),
        width: PixelUtil.rect(39, 39).width,
        height: PixelUtil.rect(39, 39).height,
        zIndex: 5
    },
    btnBOX: {
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appointBtnBox: {
        width: PixelUtil.rect(200, 94).width,
        height: PixelUtil.rect(200, 94).height,
        position: 'relative',
        marginRight: PixelUtil.size(140),
    },
    appointBtn: {
        width: PixelUtil.rect(200, 94).width,
        height: PixelUtil.rect(200, 94).height,
        backgroundColor: '#111c3c',
        borderRadius: PixelUtil.size(8),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appointBtnText: {
        fontSize: PixelUtil.size(34),
        color: '#fff'
    },
    unAppointBtn: {
        width: PixelUtil.rect(200, 94).width,
        height: PixelUtil.rect(200, 94).height,
        backgroundColor: '#979797',
        borderRadius: PixelUtil.size(8),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appointBtnAssign: {
        position: 'absolute',
        top: PixelUtil.size(-20),
        right: PixelUtil.size(-16),
        width: PixelUtil.rect(39, 39).width,
        height: PixelUtil.rect(39, 39).height,
        zIndex: 5
    },

    dutyBtnBOX: {
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: '5%',
        paddingTop: '6.7%',
    },
    dutyBtnItem: {
        width: '30%',
        height: PixelUtil.rect(308, 148).height,
        backgroundColor: '#EAF0FF',
        borderRadius: PixelUtil.size(4),
        borderWidth: PixelUtil.size(4),
        borderColor: '#BCCDFF',
        marginRight: '2%',
        marginBottom: '3%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dutyBtnItemActive: {
        width: '30%',
        height: PixelUtil.rect(308, 148).height,
        backgroundColor: '#EAF0FF',
        borderRadius: PixelUtil.size(4),
        borderWidth: PixelUtil.size(4),
        borderColor: '#ff9b1f',
        marginRight: '2%',
        marginBottom: '3%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dutyBtnText: {
        fontSize: PixelUtil.size(32),
        color: '#333'
    },
    dutyBtnTextActive: {
        fontSize: PixelUtil.size(32),
        color: '#111c3c'
    },
    KeyboardBOX: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    simulateKeyboardbox: {
        width: PixelUtil.size(600),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: PixelUtil.size(60),
    },
    simulateKeyboardBtnbox: {
        width: PixelUtil.size(600),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: PixelUtil.size(73),
    },
    simulateKeyboardTextActiveView: {
        width: PixelUtil.rect(500, 76).width,
        height: PixelUtil.rect(500, 76).height,
        borderWidth: PixelUtil.size(4),
        borderColor: '#40AAFF',
        borderStyle: 'solid',
        borderRadius: PixelUtil.size(4),
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
        backgroundColor: '#fff',
        position: 'relative',
    },
    simulateKeyboardTextActiveInp: {
        width: PixelUtil.rect(480, 76).width,
        height: PixelUtil.rect(480, 76).height,
        padding: 0,
        paddingTop: PixelUtil.size(4),
        lineHeight: PixelUtil.size(36),
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    servicerImgBox: {
        //服务人-头像-框
        width: '100%',
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: PixelUtil.size(2),
    },
    consumeTitleOther: {
        //右侧框-标题
        width: PixelUtil.rect(1188, 106).width,
        height: '10.2%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        backgroundColor: '#fff',
    },
    consumeBoxBorderOther: {
        //右侧框-主体
        width: PixelUtil.rect(1188, 1100).width,
        height: '84.6%',
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        borderStyle: 'solid',
        borderTopWidth: 0,
        position: 'relative',
    },
    consumeBoxBorderOtherA: {
        //右侧框-主体
        width: PixelUtil.rect(1188, 1100).width,
        height: '90%',
        borderColor: '#cbcbcb',
        borderWidth: PixelUtil.size(2),
        //borderRightWidth: 0,
        borderStyle: 'solid',
        borderTopWidth: 0,
        position: 'relative',
    },
});
