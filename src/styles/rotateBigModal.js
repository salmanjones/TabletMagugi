// 轮牌大弹层
import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

export const rotateBigModalStyle = StyleSheet.create({
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
        backgroundColor: '#fff',
        width: '95%',
        height: '85%',
        overflow: 'hidden',
        position: 'relative',
        marginTop: PixelUtil.size(120),
    },
    rotateModalTitle: {  //弹层-标题
        height: '8.77%',
        width: '100%',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        paddingLeft: PixelUtil.size(60),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        zIndex: 3
    },
    rotateModalText: { //文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'normal',
    },
    rotateModalBody: {  //上牌管理-主要内容
        height: '80.03%',
        flex: 0,
        flexDirection: 'row',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
    },
    rotateModalBodyO: {  //上牌管理-主要内容--左侧
        width: '100%',
        height: '80.03%',
        borderRightColor: '#cbcbcb',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
    },
    rotateModalBodyL: {  //上牌管理-主要内容--左侧
        height: '100%',
        width: '82.22%',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
    },
    rotateModalBodyLO: {  //上牌管理-主要内容--左侧
        height: '100%',
        width: '82.22%',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateModalBodyLRow: {  //上牌管理-主要内容--左侧-行
        flex: 0,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(10),
        marginTop: PixelUtil.size(10),
        paddingLeft: PixelUtil.size(60),

    },
    rotateModalBodyR: {  //上牌管理-主要内容--右侧
        height: '100%',
        width: '17.78%',
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
    rotateModalBodyRItemT: {
        fontSize: PixelUtil.size(32),
        color: '#666',
    },

    rotateModalBodyRItemTActive: {
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
    },
    checkBoxContainer: {  //单选框
        backgroundColor: '#fff',
        borderWidth: 0,
        width: '22%',
        flexShrink: 0,
        zIndex: 2,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    modalBtm: {   //底部
        height: '11.20%',
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: PixelUtil.size(60),
    },
    modalBtmOther: {
        height: '11.20%',
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: PixelUtil.size(60)
    },
    modalBtmOtherLeft: {
        width: '80%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: PixelUtil.size(30),
        paddingRight: PixelUtil.size(100)
    },
    modalBtmBtn: {  //底部-按钮
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: PixelUtil.size(200),
        marginLeft: PixelUtil.size(20),
    },
    modalCancelBtn: { //底部-取消按钮
        backgroundColor: '#999'
    },
    modalSuccessBtn: { //底部-确定按钮
        backgroundColor: '#111c3c'
    },
    modalBtmBtnText: { //底部-按钮-文字
        fontSize: PixelUtil.size(32),
        color: '#fff'
    },
    rotateModalRule: {  //添加轮牌-主要内容
        height: '80.03%',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        paddingLeft: PixelUtil.size(60),
        paddingRight: PixelUtil.size(60),
        paddingTop: PixelUtil.size(40),
    },
    rotateModalRuleRow: {  //添加轮牌-行
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rotateModalRuleCheckbox: {  //添加轮牌-是否启用-按钮
        marginLeft: PixelUtil.size(20),
        backgroundColor: '#fff',
        borderWidth: 0,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: PixelUtil.size(70),
        paddingTop: 0,
        paddingBottom: 0,
    },
    rotateModalRuleName: {  //添加轮牌-轮牌名称
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        height: PixelUtil.size(70),
        marginBottom: PixelUtil.size(40),
    },
    rotateModalRuleNameTapBg: { //添加轮牌-轮牌名称-输入框-背景
        width: PixelUtil.size(420),
        height: PixelUtil.size(70),
        marginLeft: PixelUtil.size(14),
        marginRight: PixelUtil.size(62),
    },
    rotateModalRuleNameTap: { //添加轮牌-轮牌名称-输入框
        width: PixelUtil.size(420),
        height: PixelUtil.size(70),
        padding: 0,
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
        fontSize: PixelUtil.size(32),
        color: '#333'
    },
    rotateModalRuleTip: { //添加轮牌-说明
        fontSize: PixelUtil.size(28),
        color: '#999'
    },
    rotateModalRuleText: { //添加轮牌-单选
        fontSize: PixelUtil.size(28),
        color: '#333',
        fontWeight: 'normal'
    },
    servicerItem: {
        //服务人-发型师
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
        borderColor: '#BCCDFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginRight: PixelUtil.size(56),
        marginTop: PixelUtil.size(40),
        overflow: 'hidden',
    },
    servicerItemActive: {
        //服务人-发型师-选中
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginRight: PixelUtil.size(56),
        marginTop: PixelUtil.size(40),
        overflow: 'hidden',
        borderColor: '#ff9b1f',
        borderStyle: 'solid',
    },
    servicerItemBox: {
        //服务人-发型师-头像
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#f3f3f3',
    },
    servicerItemImg: {
        //服务人-发型师-头像
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
    },
    servicerInfo: {
        //服务人-发型师-信息
        width: PixelUtil.rect(236, 68).width,
        height: PixelUtil.rect(236, 68).height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: PixelUtil.size(-2),
        left: 0,
    },
    servicerItemText: {
        //服务人-发型师-文字文字
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    servicerItemNum: {
        //服务人-发型师-手牌号限制
        width: PixelUtil.size(100),
        height: '100%',
        overflow: 'hidden',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    servicerItemName: {
        //服务人-发型师-姓名限制
        width: PixelUtil.size(120),
        height: '100%',
        overflow: 'hidden',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: PixelUtil.size(6),
    },
});
