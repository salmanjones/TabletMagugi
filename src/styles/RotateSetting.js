//libs
import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

export const RotateSettingStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    flexBox: {
        //首页版块-主体
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: PixelUtil.rect(1036, 1036, 2548).width,
        height: PixelUtil.rect(1036, 1036, 2548).height,
    },
    flexLi: {
        //首页版块
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: PixelUtil.rect(376.2, 376.2).width,
        height: PixelUtil.rect(376.2, 376.2).height,
        marginRight: PixelUtil.size(80.3),
        borderRadius: PixelUtil.size(49.77, 2548),
        marginBottom: PixelUtil.size(99, 2548),
    },
    flexLiNoRight: {
        //首页版块-没有右边距
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: PixelUtil.rect(376.2, 376.2).width,
        height: PixelUtil.rect(376.2, 376.2).height,
        borderRadius: PixelUtil.size(49.77, 2548),
        marginBottom: PixelUtil.size(99, 2548),
    },
    liText: {
        //首页版块-文字
        fontSize: PixelUtil.size(44),
        color: '#04172B',
        textAlign: 'center',
        marginTop: PixelUtil.size(41),
    },
    imgStyle: {
        //首页版块-图标
        width: PixelUtil.rect(66, 66).width,
        height: PixelUtil.rect(66, 66).height,
    },
    // --------------------------------------员工轮牌设置主页------------------------------------------------------------
    staffTitleBox: {
        height: '7.8%',
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#CBCBCB',
    },
    staffBodyBox: {
        height: '92.2%',
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    staffLeft: {
        width: '60%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',

        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
    },
    staffRight: {
        width: '40%',
        height: '100%',
    },
    staffRightTitle: {
        width: '40%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    staffRightContent: {
        height: '90%',
        width: '100%',
    },
    bottomBtnGroup: {
        height: '11%',
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
    },
    consumeInpBox: {
        //右侧框-标题-输入框
        marginLeft: PixelUtil.size(-10),
        marginTop: PixelUtil.size(-32),
    },
    consumeInpText: {
        color: '#9c9c9c',
        fontSize: PixelUtil.size(28),
        marginLeft: PixelUtil.size(40),
    },

    titleText: {
        //右侧框-标题-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    staffInfoBox: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        flex: 0,
        flexDirection: 'row',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
    },


    rotateModalBodyR: {  //上牌管理-主要内容--右侧
        height: '100%',
        width: '14.5%',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
    },
    rotateModalBodyRDuty: {  //上牌管理-主要内容--右侧-标题
        width: '100%',
        height: PixelUtil.size(106),
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateModalBodyRDutyT: { //上牌管理-主要内容--右侧-标题
        fontSize: PixelUtil.size(32),
        color: '#666',
    },
    rotateModalBodyRItemT: {
        fontSize: PixelUtil.size(32),
        color: '#666',
    },

    rotateModalBodyRItemTActive: {
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
    },
    rotateModalBodyRItem: {  //上牌管理-主要内容--右侧-行
        width: '100%',
        height: PixelUtil.size(150),
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateModalBodyRItemActive: {  //上牌管理-主要内容--右侧-行选中
        width: '100%',
        height: PixelUtil.size(150),
        backgroundColor: '#dee8ff',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nullContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nullImage: {
        width: PixelUtil.rect(230, 134).width,
        height: PixelUtil.size(134),
        marginBottom: PixelUtil.size(50),
    },
    nullTextTip: {
        color: '#B4B4B4',
        fontSize: PixelUtil.size(30),
    },
    settingCancelBtn: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(200),
        backgroundColor: '#999',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    settingbtnText: {
        color: '#fff',
        fontSize: PixelUtil.size(32),
    },
    settingSaveBtn: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(200),
        backgroundColor: '#111c3c',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    servicerInfoContent: {
        marginLeft: PixelUtil.size(64),
        height: '100%',
        paddingTop: PixelUtil.size(40),
    },
    servicerInfoBox: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    servicerItemBox: {
        width: PixelUtil.size(236),
        height: PixelUtil.size(236),
        borderColor: '#BCCDFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginRight: PixelUtil.size(36),
        overflow: 'hidden',
    },
    servicerItemImg: {
        //服务人-发型师-头像
        width: PixelUtil.size(236),
        height: PixelUtil.size(236),
    },
    servicerItemText: {
        fontSize: PixelUtil.size(32),
        color: '#8e8e8e',
    },
    marginTop12: {
        marginTop: PixelUtil.size(12),
    },
    servicerNumBox: {
        width: PixelUtil.size(86),
        height: PixelUtil.size(42),
        borderRadius: PixelUtil.size(200),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: PixelUtil.size(41),
    },
    servicerNum: {
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    servicerSettingsBox: {
        marginTop: PixelUtil.size(40),
        width: '100%',
    },
    settingCheckBox: {
        width: '48%',
        borderWidth: 0,
        backgroundColor: '#fff',
        paddingLeft: 0,
        marginLeft: 0,
    },
    qsText: {
        fontSize: PixelUtil.size(30),
        color: '#b4b4b4',
    },
    servicerSettingsQs: {
        marginTop: '14%',
        flex: 0,
        alignItems: 'center',
    },
    qsSetting: {
        width: PixelUtil.size(210),
        height: PixelUtil.size(210),
        marginBottom: PixelUtil.size(40),
    },
    settingBtn: {
        width: PixelUtil.size(180),
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(200),
        marginTop: PixelUtil.size(40),
    },
    settingBtnImg: {
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
    },
    staffLeftO: {
        width: '60%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
        paddingLeft: PixelUtil.size(50),
    },
    designerNumber: {
        //选中内容-编号
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PixelUtil.size(12),
    },

});
