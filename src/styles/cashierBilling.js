import {Platform, StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let naviBarHeight = PixelUtil.size(120);
let rightBoxWidth = PixelUtil.screenSize.width * 0.6
let rightPanelWidth = PixelUtil.screenSize.width * 0.5;
let rightPanelHeight = PixelUtil.screenSize.height - naviBarHeight;
let rightPanelMemberHeight = PixelUtil.size(180);
let rightPanelCardsHeight = rightPanelHeight - rightPanelMemberHeight;
let rightPanelPadding = PixelUtil.size(30);
let avatarWidth = PixelUtil.size(104)
let memberExtWidth = rightPanelWidth - avatarWidth - rightPanelPadding * 2;
let memberExtPadding = PixelUtil.size(26);
let memberCellWidth = (memberExtWidth - memberExtPadding) / 3;
let queryInputBoxWidth = rightPanelWidth * 0.5;
let rightCategoryWidth = PixelUtil.size(154);
let topHeaderHeight = PixelUtil.screenSize.height * 0.1;
let priceHeight = PixelUtil.size(72);
let queryBoxConsumableHeight = PixelUtil.screenSize.height - naviBarHeight - topHeaderHeight;
let queryBoxConsumableWidth = rightBoxWidth - PixelUtil.size(2);
export const cashierBillingStyle = StyleSheet.create({
    hidden: {
        display: 'none',
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    bodybox: {
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    servicerBox: {
        //左侧框
        width: PixelUtil.rect(824, 1364).width,
        height: '100%',
    },
    servicerBoxNew: {
        //左侧框
        width: '40%',
        height: '100%',
        borderStyle: 'solid',
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2)
    },
    customerInfoBox: {
        width: "100%",
        height: PixelUtil.size(146),
        borderStyle: 'solid',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        position: 'relative',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    guestInfoBox:{
        width: "100%",
        height: '100%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(90)
    },
    customerInfoExtendBox:{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: PixelUtil.size(40),
        position: 'relative',
        paddingTop: PixelUtil.size(6)
    },
    customerInfoNumberBox:{
        width: PixelUtil.size(136),
        height: PixelUtil.size(28),
        marginTop: PixelUtil.size(4),
        position: 'absolute',
        zIndex: 10,
        top: PixelUtil.size(0),
        left: PixelUtil.size(0)
    },
    customerInfoExtendLeftBox:{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    customerInfoExtendRightBox:{
        height: PixelUtil.size(70),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    guestInfoExtendBox:{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: PixelUtil.size(16),
        position: 'relative'
    },
    customerInfoAvatar:{
        width: PixelUtil.size(64),
        height: PixelUtil.size(64),
        overflow: 'hidden',
        borderRadius: PixelUtil.size(43)
    },
    customerInfoNumberTxt:{
        width: '100%',
        height: '100%',
        color: '#fff',
        fontSize: PixelUtil.size(18),
        fontWeight: PixelUtil.size(500),
        textAlign: 'center',
        lineHeight: PixelUtil.size(28),
        textAlignVertical: 'center'
    },
    customerInfoNewFlag:{
        backgroundColor: '#FFB93E',
        color: '#ffffff',
        fontWeight: '700',
        borderRadius: PixelUtil.size(4),
        overflow: 'hidden',
        fontSize: PixelUtil.size(12),
        width: PixelUtil.size(40),
        height: PixelUtil.size(20),
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: PixelUtil.size(20),
        marginLeft: PixelUtil.size(16)
    },
    customerInfoBase:{
        marginLeft: PixelUtil.size(18),
        height: PixelUtil.size(70),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    customerInfoBaseName:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    customerSexIcon: {
        marginLeft: PixelUtil.size(10),
        width: PixelUtil.size(32),
        height: PixelUtil.size(32),
    },
    customerWecomIcon: {
        marginLeft: PixelUtil.size(10),
        width: PixelUtil.size(32),
        height: PixelUtil.size(32),
    },
    customerSexText: {
        marginLeft: PixelUtil.size(4),
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: PixelUtil.size(22),
        marginTop: PixelUtil.size(2)
    },
    customerInfoBaseNameTxt:{
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: PixelUtil.size(28),
        maxWidth: PixelUtil.size(126),
    },
    guestInfoBaseNameTxt:{
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: PixelUtil.size(28),
    },
    customerInfoBasePhone:{
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: PixelUtil.size(22),
    },
    customerCardsInfoCZ:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    customerCardsInfoCK:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: PixelUtil.size(10)
    },
    customerCardsInfoYE:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: PixelUtil.size(10)
    },
    customerCardsInfoFW:{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: PixelUtil.size(20)
    },
    guestCardsInfoFW:{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: PixelUtil.size(36)
    },
    customerCardsInfoName:{
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: PixelUtil.size(22),
    },
    customerCardsInfoNum:{
        width: PixelUtil.size(90),
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: PixelUtil.size(22),
    },
    customerCardsRName:{
        color: '#ffa608',
        fontWeight: '900',
        textAlign: 'center',
        fontSize: PixelUtil.size(22),
    },
    customerCardsRNum:{
        width: PixelUtil.size(100),
        color: '#ffa608',
        fontWeight: '900',
        textAlign: 'center',
        fontSize: PixelUtil.size(22),
    },
    guestCardsRName:{
        color: '#ffa608',
        fontWeight: '900',
        textAlign: 'left',
        fontSize: PixelUtil.size(28),
    },
    guestCardsRNum:{
        width: PixelUtil.size(160),
        color: '#ffa608',
        fontWeight: '900',
        textAlign: 'left',
        fontSize: PixelUtil.size(28),
    },
    servicertitle: {
        //左侧框-标题
        width: '100%',
        height: PixelUtil.size(72),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2)
    },
    servicerItemTitle: {
        //左侧框-标题-各项
        width: PixelUtil.rect(308, 45).width,
        height: PixelUtil.size(45),
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? PixelUtil.size(16) : PixelUtil.size(0),
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    servicerPerson: {
        //左侧框-标题-加服务人
        width: PixelUtil.rect(128, 45).width,
        height: PixelUtil.size(45),
        marginLeft: PixelUtil.size(28),
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? PixelUtil.size(16) : PixelUtil.size(0),
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    servicerBoxBorder: {
        //左侧框-主体
        width: '100%',
        flex: 1,
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
        borderStyle: 'solid',
        position: 'relative',
    },
    servicerNoneText: {
        fontSize: PixelUtil.size(32),
        color: '#9C9C9C',
    },
    servicerBodyNone: {
        //无内容
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    servicerBody: {
        // 服务项
        width: PixelUtil.rect(824, 1100).width,
        height: '85%',
    },
    servicerBodyNew: {
        // 服务项
        width: '100%',
        flex: 1,
    },
    servicerBodyLiBox: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 90,
        justifyContent: 'center',
        borderBottomColor: '#CFDDFF',
        borderBottomWidth: PixelUtil.size(2),
    },
    servicerBodyLi: {
        //服务项-列
        width: PixelUtil.rect(824, 186).width,
        height: PixelUtil.rect(824, 186).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: PixelUtil.size(28),
    },
    servicerBodyLiActive: {
        backgroundColor: '#EAF0FF',
        width: PixelUtil.rect(824, 186).width,
        height: PixelUtil.rect(824, 186).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: PixelUtil.size(28),
    },
    showServicerLi: {
        //服务项-产品
        width: PixelUtil.rect(304, 148).width,
        height: PixelUtil.rect(304, 148).height,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(8),
        marginBottom: PixelUtil.size(30),
    },
    showServicerLiActive: {
        //服务项-产品-选中
        width: PixelUtil.rect(304, 148).width,
        height: PixelUtil.rect(304, 148).height,
        backgroundColor: '#fff',
        borderColor: '#BACDFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(8),
        marginBottom: PixelUtil.size(30),
    },
    showServicerLiBox: {
        //服务项-产品
        width: '100%',
        height: '100%',
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
        paddingTop: PixelUtil.size(8),
        paddingBottom: PixelUtil.size(8),
    },
    showServicerNameBox: {
        // 服务项-产品-名称
        width: '100%',
        height: PixelUtil.rect(308, 68).height,
        overflow: 'hidden',
    },
    showServicerName: {
        // 服务项-产品-名称
        fontSize: PixelUtil.size(28),
        color: '#333',
        textAlign: 'left',
        lineHeight: PixelUtil.size(34),
        height: PixelUtil.rect(308, 68).height,
        overflow: 'hidden',
    },
    showServicerInfo: {
        // 服务项-产品-信息
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: PixelUtil.rect(290, 40).width,
        height: PixelUtil.rect(290, 40).height,
        marginTop: PixelUtil.size(22),
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
        paddingBottom: PixelUtil.size(6),
    },
    limitItemInfo:{
        display: 'flex',
        position: "absolute",
        top: PixelUtil.size(60),
        left: PixelUtil.size(10),
    },
    limitItemInfoText:{
        //加项目内容-列-其他
        fontSize: PixelUtil.size(20),
        color: '#fff',
        backgroundColor: '#ffbf6b',
        paddingLeft: PixelUtil.size(5),
        paddingTop: PixelUtil.size(1),
        paddingBottom: PixelUtil.size(1),
        paddingRight: PixelUtil.size(5),
        borderRadius: PixelUtil.size(4),
        overflow: 'hidden',
    },
    showServicerText: {
        // 服务项-产品-文字
        fontSize: PixelUtil.size(28),
        color: '#333',
        fontWeight: 'bold',
    },
    servicerPersonInfoBox: {
        width: PixelUtil.rect(178, 160).width,
        height: PixelUtil.rect(178, 160).height,
        position: 'relative',
        paddingTop: PixelUtil.size(20),
        marginLeft: PixelUtil.size(-2),
        marginRight: PixelUtil.size(-10),
        marginTop: PixelUtil.size(-40),
    },
    servicerPersonInfo: {
        // 服务项-服务人
        width: PixelUtil.rect(128, 128).width,
        height: PixelUtil.rect(128, 128).height,
        backgroundColor: '#f3f3f3',
        borderColor: '#BCCDFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(30),
    },
    servicerPersonInfoActive: {
        // 服务项-服务人
        width: PixelUtil.rect(128, 128).width,
        height: PixelUtil.rect(128, 128).height,
        backgroundColor: '#f3f3f3',
        borderColor: '#FF9B1F',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(30),
    },
    servicerPersonBox: {
        // 服务项-服务人-框
        width: '100%',
        height: '100%',
        position: 'relative',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    servicerPersonImg: {
        // 服务项-服务人-头像
        width: PixelUtil.rect(120, 120).width,
        height: PixelUtil.rect(120, 120).height,
        position: 'absolute',
        top: 0,
    },
    servicerPersonNameBox: {
        // 服务项-服务人-名称
        width: PixelUtil.rect(130, 40).width,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: PixelUtil.size(-2),
        left: PixelUtil.size(-5),
        paddingTop: PixelUtil.size(5),
        paddingBottom: PixelUtil.size(5),
    },
    servicerPersonName: {
        // 服务项-服务人-名称
        fontSize: PixelUtil.size(28),
        color: '#fff',
    },
    servicerPersonAppoint: {
        // 服务项-服务人-指定
        width: PixelUtil.rect(178, 160).width,
        height: PixelUtil.rect(178, 160).height,
        position: 'relative',
        paddingTop: PixelUtil.size(20),
        marginLeft: PixelUtil.size(-2),
        marginRight: PixelUtil.size(-10),
        marginTop: PixelUtil.size(-40),
    },
    servicerAppointImg: {
        // 服务项-服务人-指定图标
        width: PixelUtil.rect(39.6, 39.6).width,
        height: PixelUtil.rect(39.6, 39.6).height,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 9,
    },
    addServicerPerson: {
        // 服务项-服务人-加服务人
        width: PixelUtil.rect(40, 40).width,
        height: PixelUtil.rect(40, 40).height,
    },
    addServicerBodyLi: {
        // 加服务人列
        width: '100%',
        height: PixelUtil.size(100),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addServicerBodyBox: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: PixelUtil.rect(284, 100).width,
        height: PixelUtil.rect(284, 100).height,
        marginTop: PixelUtil.size(20),
        borderRadius: PixelUtil.size(20)
    },
    addServicerBodyLiIcon: {
        // 加服务人列-图标
        width: PixelUtil.rect(40, 40).width,
        height: PixelUtil.rect(40, 40).height,
        marginRight: PixelUtil.size(32),
    },
    addServicerBodyLiText: {
        // 加服务人列-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    paymentInfoWarp: {
        width: '100%',
        height: PixelUtil.size(188),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
        borderStyle: 'solid',
        paddingLeft: PixelUtil.size(30)
    },
    paymentInfoLeft: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    paymentInfoRight: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    paymentScrapList: {
        //废单
        width: '33.333%',
        height: '100%',
        backgroundColor: '#999999',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentSuspendBtn: {
        // 挂单
        width: '33.333%',
        height: '100%',
        backgroundColor: '#1BBC93',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentPayBtn: {
        // 结单
        width: '33.333%',
        height: '100%',
        backgroundColor: '#111c2c',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    servicerAccount: {
        // 结算项
        width: '100%',
        height: '15%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
        borderStyle: 'solid',
    },
    showConsumeItem: {
        // 展示框
        marginLeft: PixelUtil.size(18),
        // marginRight: PixelUtil.size(148),
    },
    showConsumeItemText: {
        // 展示文字
        fontSize: PixelUtil.size(36),
        color: '#333',
    },
    accountBtnBox: {
        // 按钮
        marginRight: PixelUtil.size(40),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ff0000'
    },
    suspendBtn: {
        // 挂单
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#1BBC93',
        borderRadius: PixelUtil.size(200),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: PixelUtil.size(20),
    },
    payBtn: {
        // 结单
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#111c2c',
        borderRadius: PixelUtil.size(200),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    consumedBtnText: {
        // 按钮文字
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    consumeBox: {
        //右侧框
        width: PixelUtil.rect(1188, 1364).width,
        height: '100%',
    },
    consumeBoxNew: {
        //右侧框
        width: '60%',
        height: '100%',
        position: 'relative',
    },
    consumeBoxRightWrap:{
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    consumeTitle: {
        //右侧框-标题
        width: '100%',
        height: PixelUtil.size(146),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2)
    },
    consumeTitleNoInp: {
        //右侧框-标题-除inp
        width: PixelUtil.size(760),
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(30)
    },
    servicerTitleNoInp: {
        //右侧框-服务人标题-除inp
        width: PixelUtil.rect(760, 106).width,
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    consumeTextBox: {
        //右侧框-标题-各项
        width: PixelUtil.size(253),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(10),
        paddingRight: PixelUtil.size(10),
    },
    consumeTextBoxActive: {
        //右侧框-标题-选中
        width: PixelUtil.size(253),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(10),
        paddingRight: PixelUtil.size(10),
    },
    consumeText: {
        //右侧框-标题-文字
        fontSize: PixelUtil.size(30),
        color: '#ffffff',
        fontWeight: 'bold',
        width: PixelUtil.size(230),
        textAlign: 'center'
    },
    consumeTextActive: {
        fontSize: PixelUtil.size(30),
        color: '#ff9b1f',
        fontWeight: 'bold',
        paddingVertical: PixelUtil.size(14),
        width: PixelUtil.size(230),
        backgroundColor: '#ffffff',
        borderRadius: PixelUtil.size(30),
        overflow: 'hidden',
        textAlign: 'center'
    },
    consumeInpBox: {
        //右侧框-标题-输入框
        width: PixelUtil.rect(540, 68).width,
        height: PixelUtil.size(68),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    consumeInpText: {
        color: '#9c9c9c',
        fontSize: PixelUtil.size(28),
        marginLeft: PixelUtil.size(40),
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
        flex: 1,
        position: 'relative',
    },
    priceSegmentQueryBox: {
        //右边框-价格选择框
        width: '100%',
        height: PixelUtil.size(72),
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: PixelUtil.size(2),
        borderColor: '#cbcbcb',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: '#ffffff'
    },
    consumeBoxRightContent:{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'flex-start'
    },
    consumeBoxContentLeft:{
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'flex-start',
    },
    consumeBoxContentCategory:{
        width: PixelUtil.size(154),
        height: '100%',
        borderColor: '#cbcbcb',
        borderLeftWidth: PixelUtil.size(2)
    },
    consumeBoxContentBody:{
        flex: 1,
        width: '100%'
    },
    consumeBoxContentServerDetail: {
        width: '100%',
        height: PixelUtil.size(188),
        borderColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2)
    },
    priceItemQueryBoxBody: {
        flex: 1,
        height: '100%',
        position: 'relative',
    },
    priceAllQuery: {
        //右边框-价格选择框-全部价格
        width: PixelUtil.size(162),
        height: PixelUtil.size(52),
        marginTop: PixelUtil.size(10),
        marginLeft: PixelUtil.size(10),
        paddingRight: PixelUtil.size(10),
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceItemQueryBox: {
        //右边框-价格选择框-价格
        height: PixelUtil.rect(1186, 52).height,
        marginTop: PixelUtil.size(10),
        paddingRight: PixelUtil.size(10),
        borderRightColor: '#cbcbcb',
        borderRightWidth: PixelUtil.size(2),
    },
    priceItemQueryBoxText: {
        height: PixelUtil.rect(1186, 52).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceItemQueryText: {
        //右边框-价格选择框-价格-文字
        fontSize: PixelUtil.size(30),
        color: '#333',
        paddingRight: PixelUtil.size(10),
        paddingLeft: PixelUtil.size(10),
    },
    priceItemQueryTextActive: {
        //右边框-价格选择框-价格-文字-选中
        fontSize: PixelUtil.size(30),
        color: '#ff9b1f',
        paddingRight: PixelUtil.size(10),
        paddingLeft: PixelUtil.size(10),
    },
    priceAllQueryTextBox: {
        //右边框-价格选择框-全部价格
        height: PixelUtil.rect(1186, 52).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    consumeOrderGenreOther: {
        //右边框-单据类型
        width: PixelUtil.size(154),
        height: '100%',
        position: 'absolute',
        right: 0,
        top: PixelUtil.size(72),
        borderLeftWidth: PixelUtil.size(2),
        borderLeftColor: '#cbcbcb',
    },
    consumeOrderGenre: {
        //右边框-单据类型
        width: PixelUtil.size(154),
        height: '100%',
        position: 'absolute',
        right: 0,
        top: 0,
        borderLeftWidth: PixelUtil.size(2),
        borderLeftColor: '#cbcbcb',
    },
    consumeOrderGenreLi: {
        //右边框-单据类型-列
        width: PixelUtil.rect(154, 96).width,
        height: PixelUtil.rect(154, 96).height,
        borderBottomColor: '#CFDDFF',
        borderBottomWidth: PixelUtil.size(2),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(10),
        paddingRight: PixelUtil.size(10),
    },
    consumeOrderGenreLiItem: {
        //右边框-单据类型-列
        width: PixelUtil.rect(154, 96).width,
        height: PixelUtil.rect(154, 96).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    consumeOrderGenreLiNone: {
        //右边框-单据类型-第一列
        width: PixelUtil.rect(154, 72).width,
        height: PixelUtil.rect(154, 72).height,
    },
    consumeOrderGenreText: {
        //右边框-单据类型-文字
        color: '#333',
        fontSize: PixelUtil.size(28),
        textAlign: 'center'
    },
    consumeOrderGenreTextActive: {
        color: '#ff9b1f',
        fontSize: PixelUtil.size(28),
        textAlign: 'center'
    },
    consumeBody: {
        // 右边框-主体内容
        width: '100%',
        height: '100%',
        paddingTop: PixelUtil.size(12)
    },
    consumeBodyHeight: {
        height: '100%',
    },
    consumeBodyNonmember: {
        // 无次卡项目-提示
        width: '100%',
        height: '100%',
        marginBottom: PixelUtil.size(1),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    consumeBodyNonmemberText: {
        // 无次卡项目-提示-文字'
        fontSize: PixelUtil.size(32),
        color: '#9C9C9C',
        textAlign: 'center',
        marginTop: PixelUtil.size(10),
    },
    addServicerBox: {
        //加项目内容
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginTop: PixelUtil.size(102),
    },
    addServicerLi: {
        //加项目内容-列
        width: PixelUtil.size(332),
        height: PixelUtil.size(148),
        backgroundColor: '#E8EEFF',
        borderColor: '#B8CBFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(20),
        marginBottom: PixelUtil.size(30),
    },
    addServicerLiBox: {
        width: '100%',
        height: '100%',
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
        paddingTop: PixelUtil.size(8),
        paddingBottom: PixelUtil.size(8),
    },
    addServicerName: {
        //加项目内容-列-名称
        width: '100%',
        height: PixelUtil.rect(308, 68).height,
        fontSize: PixelUtil.size(28),
        color: '#333',
        overflow: 'hidden',
    },
    addServicerInfo: {
        //加项目内容-列-其他
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: PixelUtil.rect(290, 26).width,
        height: PixelUtil.rect(290, 26).height,
        marginTop: PixelUtil.size(22),
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
    },
    addServicerLimit: {
        //加项目内容-列-其他
        fontSize: PixelUtil.size(20),
        color: '#fff',
        backgroundColor: '#ffbf6b',
        paddingLeft: PixelUtil.size(5),
        paddingTop: PixelUtil.size(1),
        paddingBottom: PixelUtil.size(1),
        paddingRight: PixelUtil.size(5),
        borderRadius: PixelUtil.size(4),
        overflow: 'hidden',
    },
    addServicerNumber: {
        //加项目内容-列-编号
        fontSize: PixelUtil.size(22),
        color: '#333',
    },
    addServicerPrice: {
        //加项目内容-列-价格
        fontSize: PixelUtil.size(22),
        color: '#ff4444',
    },
    servicerInfoBody: {
        //服务人
        width: PixelUtil.size(1030),
        height: '100%',
        position: 'absolute',
        left: 0,
        top: PixelUtil.size(2),
        zIndex: 9,
    },
    servicerInfoBodyNew: {
        //服务人
        width: '100%',
        height: '100%',
    },
    servicerInfoBodyHeight: {
        height: '85%',
        marginBottom: PixelUtil.size(1),
    },
    servicerImgBox: {
        //服务人-头像-框
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingBottom: PixelUtil.size(68),
    },
    servicerDuty: {
        //服务人-职务
        marginLeft: PixelUtil.size(26),
        marginRight: PixelUtil.size(22),
        marginTop: PixelUtil.size(40),
    },
    servicerDutyText: {
        //服务人-职务-文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        width: PixelUtil.size(175),
    },
    servicerGroup: {
        //服务人-发型师-分组
        width: PixelUtil.size(820),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: PixelUtil.size(60),
    },
    servicerItem: {
        //服务人-发型师
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
        borderColor: '#BCCDFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginRight: PixelUtil.size(36),
        marginTop: PixelUtil.size(40),
        overflow: 'hidden',
    },
    servicerItemActive: {
        //服务人-发型师
        width: PixelUtil.rect(236, 236).width,
        height: PixelUtil.rect(236, 236).height,
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginRight: PixelUtil.size(36),
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
        width: PixelUtil.rect(236, 50).width,
        height: PixelUtil.rect(236, 50).height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: PixelUtil.size(-2),
        left: PixelUtil.size(-2),
        paddingLeft: PixelUtil.size(10),
        paddingRight: PixelUtil.size(20),
    },
    servicerItemText: {
        //服务人-发型师-文字
        fontSize: PixelUtil.size(26),
        color: '#fff',
    },
    servicerItemNum: {
        //服务人-发型师-手牌号限制4
        width: '40%',
        height: '100%',
        overflow: 'hidden',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    servicerItemName: {
        //服务人-发型师-姓名限制4
        width: '55%',
        height: '100%',
        overflow: 'hidden',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    chooseItemNone: {
        //无选中内容
        width: '100%',
        height: '14.8%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
        marginTop: PixelUtil.size(-3),
        backgroundColor: '#fff'
    },
    chooseItemNoneNew: {
        //无选中内容
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
        marginTop: PixelUtil.size(-4),
        backgroundColor: '#fff'
    },
    chooseItemNoneText: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        width: '100%',
        textAlign: 'center',
    },
    chooseItem: {
        //有选中内容
        width: '100%',
        height: '14.8%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
        marginTop: PixelUtil.size(-3),
        backgroundColor: '#fff',
    },
    chooseItemNew: {
        //有选中内容
        width: '100%',
        height: '15%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
        marginTop: PixelUtil.size(-4),
    },
    designerLeftInfo: {
        //选中内容-左
        width: PixelUtil.rect(200, 100).width,
        marginRight: PixelUtil.size(168),
        marginLeft: PixelUtil.size(74),
    },
    designerNumber: {
        //选中内容-编号
        width: PixelUtil.rect(162, 78).width,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PixelUtil.size(6),
    },
    designerNumberText: {
        //选中内容-编号文字
        fontSize: PixelUtil.size(30),
        color: '#ffa526',
    },
    designerName: {
        // 选中内容-姓名
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    designerDuty: {
        //选中内容-职务
        marginRight: PixelUtil.size(149),
        // marginTop: PixelUtil.size(10),
    },
    designerDutyText: {
        //选中内容-职务文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    designerChooseWayBox: {
        width: PixelUtil.rect(224, 80).width,
        height: PixelUtil.rect(224, 80).height,
        position: 'relative',
        marginTop: PixelUtil.size(10),
    },
    designerChooseWay: {
        //选中内容-选择方式
        width: PixelUtil.rect(208, 60).width,
        height: PixelUtil.rect(208, 60).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: PixelUtil.size(20),
        overflow: 'hidden',
        borderRadius: PixelUtil.size(8),
    },
    designerChooseWayLi: {
        //选中内容-指定方式-默认
        width: PixelUtil.rect(108, 60).width,
        height: PixelUtil.rect(108, 60).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#979797',
    },
    designerChooseWayLiActive: {
        //选中内容-指定方式-选中
        width: PixelUtil.rect(108, 60).width,
        height: PixelUtil.rect(108, 60).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111c3c',
    },
    designerChooseWayText: {
        //选中内容-选择方式-文字
        fontSize: PixelUtil.size(28),
        color: '#fff',
    },
    designerAppointImg: {
        //选中内容-指定-图标
        width: PixelUtil.rect(39.6, 39.6).width,
        height: PixelUtil.rect(39.6, 39.6).height,
        position: 'absolute',
        right: PixelUtil.size(-8),
        top: PixelUtil.size(-20),
    },
    designerDelete: {
        //选中内容-删除
        width: PixelUtil.rect(98, 98).width,
        height: PixelUtil.rect(98, 98).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    designerDeleteImg: {
        //选中内容-删除-图片
        width: PixelUtil.rect(32, 38).width,
        height: PixelUtil.rect(32, 38).height,
    },
    noItems: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    servicerGroupOther: {
        //服务人-发型师-分组
        width: PixelUtil.size(820),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        paddingBottom: PixelUtil.size(20),
    },
    storeStaffImg: {
        width: PixelUtil.size(38),
        height: PixelUtil.size(32),
        marginRight: PixelUtil.size(10),
    },
    // 消耗品数量
    consumableNumBox: {
        // width: '100%',
        height: PixelUtil.size(104),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#CFDDFF',
        borderTopWidth: PixelUtil.size(2),

        marginLeft: PixelUtil.size(30),
        marginRight: PixelUtil.size(30),
    },
    consumableNumItem: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    consumableIcon: {
        width: PixelUtil.size(56),
        height: PixelUtil.size(56),
        marginRight: PixelUtil.size(16),
    },
    consumableName: {
        fontSize: PixelUtil.size(32),
        color: '#333333'
    },
    consumableNumText: {
        fontSize: PixelUtil.size(28),
        color: '#333333'
    },
    consumableRightIcon: {
        width: PixelUtil.size(17),
        height: PixelUtil.size(30),
        marginLeft: PixelUtil.size(9),
    },

    servicerPersonAppointO: {
        // 服务项-服务人-指定
        // width: PixelUtil.rect(178, 160).width,
        height: PixelUtil.size(142),
        position: 'relative',
        marginTop: PixelUtil.size(-20),
        // backgroundColor:'blue'
    },
    servicerAppointImgO: {
        // 服务项-服务人-指定图标
        width: PixelUtil.rect(39.6, 39.6).width,
        height: PixelUtil.rect(39.6, 39.6).height,
        position: 'absolute',
        top: PixelUtil.size(-20),
        right: PixelUtil.size(-16),
        zIndex: 9,
    },
    servicerPersonInfoO: {
        // 服务项-服务人
        width: PixelUtil.rect(128, 128).width,
        height: PixelUtil.rect(128, 128).height,
        backgroundColor: '#f3f3f3',
        borderColor: '#BCCDFF',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(18),
    },
    servicerPersonInfoActiveO: {
        // 服务项-服务人
        width: PixelUtil.rect(128, 128).width,
        height: PixelUtil.rect(128, 128).height,
        backgroundColor: '#f3f3f3',
        borderColor: '#FF9B1F',
        borderWidth: PixelUtil.size(4),
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(18),
    },

    servicerBodyBox: {
        height: '100%',
        width: '100%',
        borderBottomColor: '#cbcbcb',
        borderBottomWidth: PixelUtil.size(2),
    },
    servicerBodyLiBoxO: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: PixelUtil.size(185),
        justifyContent: 'center',
        paddingBottom: PixelUtil.size(23),
        paddingTop: PixelUtil.size(23),
        marginLeft: PixelUtil.size(30),
        marginRight: PixelUtil.size(30),
        marginBottom: PixelUtil.size(2),
    },
    marginLeft: {
        marginLeft: PixelUtil.size(38),
    },
    serviceBoxHeight: {
        height: PixelUtil.size(294),
    },
    serviceBoxHeightNullXH: {
        height: PixelUtil.size(188),
    },
    chooseItemXH: {
        //有选中内容
        width: '100%',
        height: Platform.OS === 'ios' ? '14.8%' : '14.4%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#cbcbcb',
        borderTopWidth: PixelUtil.size(2),
        marginTop: Platform.OS === 'ios' ? PixelUtil.size(-3) : PixelUtil.size(-13),
        backgroundColor: '#fff',
    },
    rightPositionBoxShow: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        flexDirection: 'row',
        zIndex: 1001,
    },
    rightPositionBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 1002
    },
    rightPositionBoxO: {
        flex: 0,
        width: '50%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        zIndex: 1003
    },
    rightAnBox: {
        width: rightPanelWidth,
        height: rightPanelHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        zIndex: 1004,
        backgroundColor: '#f4f4f4',
        display: 'flex'
    },
    rightPanelMemberBox: {
        width: '100%',
        height: PixelUtil.size(180),
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        paddingLeft: rightPanelPadding,
        paddingRight: rightPanelPadding
    },
    HeadClientImgBox: {
        //登录后-右侧内容-头像
        height: avatarWidth,
        width: avatarWidth,
        borderRadius: PixelUtil.size(52),
        overflow: 'hidden',
        backgroundColor: '#cbcbcb',
        flexShrink: 0
    },
    HeadClientImg: {
        height: avatarWidth,
        width: avatarWidth,
    },
    memberExtWrap: {
        width: memberExtWidth,
        height: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: memberExtPadding
    },
    memberCell: {
        height: '100%',
        width: memberCellWidth,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    memberCellHeader: {
        width: '100%',
        height: '50%',
        paddingBottom: PixelUtil.size(10),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    memberCellHeaderTxt: {
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    memberCellFooter: {
        paddingTop: PixelUtil.size(10),
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    memberCellText: {
        fontSize: PixelUtil.size(28),
        color: '#505050'
    },
    memberCellSex: {
        width: PixelUtil.size(28),
        height: PixelUtil.size(32),
        marginLeft: PixelUtil.size(8),
        marginBottom: PixelUtil.size(2)
    },
    rightPanelCardsBox: {
        width: '100%',
        height: rightPanelCardsHeight
    },
    hideBox: {
        width: PixelUtil.rect(84, 168).width,
        height: PixelUtil.rect(84, 168).height,
    },
    hideBtn: {
        width: PixelUtil.rect(84, 168).width,
        height: PixelUtil.rect(84, 168).height,
    },
    queryBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    queryBoxConsumeable: {
        width: queryBoxConsumableWidth,
        height: queryBoxConsumableHeight,
        position: 'absolute',
        zIndex: 99,
        backgroundColor: '#fff',
        borderRightWidth: PixelUtil.size(2),
        borderRightColor: '#cbcbcb',
    },
    queryInputRect: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: PixelUtil.size(115)
    },
    queryNoContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    queryNoContentImg: {
        width: PixelUtil.rect(343, 356).width,
        height: PixelUtil.rect(343, 356).height
    },
    queryInputWrap: {
        width: queryInputBoxWidth,
        height: PixelUtil.size(68),
        position: 'relative',
    },
    queryInputIconFind: {
        width: PixelUtil.size(35),
        height: PixelUtil.size(35),
        position: 'absolute',
        left: PixelUtil.size(15),
        top: PixelUtil.size(16),
        zIndex: 100
    },
    queryInputClear: {
        position: 'absolute',
        right: PixelUtil.size(15),
        top: PixelUtil.size(16),
        zIndex: 100
    },
    queryInputIconClear: {
        width: PixelUtil.size(35),
        height: PixelUtil.size(35),
    },
    queryInputBox: {
        //右侧框-标题-输入框
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(3),
        borderColor: '#CBCBCB',
        borderRadius: PixelUtil.size(34),
        backgroundColor: '#F2F6FC',
        paddingLeft: PixelUtil.size(58),
        paddingRight: PixelUtil.size(58),
        paddingBottom: 0,
        paddingTop: 0,
    },
    queryInputBoxActive: {
        //右侧框-标题-输入框
        width: queryInputBoxWidth,
        height: PixelUtil.size(68),
        borderWidth: PixelUtil.size(3),
        borderColor: '#111c3c',
        borderRadius: PixelUtil.size(34),
        backgroundColor: '#F2F6FC',
        paddingLeft: PixelUtil.size(58),
        paddingRight: PixelUtil.size(58),
        paddingBottom: 0,
        paddingTop: 0,
    },
    queryInputStart: {
        width: PixelUtil.size(150),
        height: PixelUtil.size(68),
        borderWidth: PixelUtil.size(3),
        borderColor: '#111c3c',
        borderRadius: PixelUtil.size(34),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PixelUtil.size(34),
        backgroundColor: '#EAF0FF'
    },
    queryInputCancel: {
        width: PixelUtil.size(150),
        height: PixelUtil.size(68),
        borderWidth: PixelUtil.size(3),
        borderColor: '#FF4444',
        borderRadius: PixelUtil.size(34),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PixelUtil.size(24),
        backgroundColor: "#FFE9E9"
    },
    queryNoContentTxt: {
        fontSize: PixelUtil.size(32),
        color: '#9C9C9C',
        marginTop: PixelUtil.size(15),
        marginLeft: PixelUtil.size(50)
    },
    queryCancelBtn: {
        width: PixelUtil.size(150),
        height: PixelUtil.size(68),
        borderWidth: PixelUtil.size(3),
        borderColor: '#111c3c',
        borderRadius: PixelUtil.size(34),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PixelUtil.size(50),
        marginTop: PixelUtil.size(25)
    },
    topQueryWrap: {
        width: PixelUtil.size(560),
        height: PixelUtil.size(68),
        marginLeft: PixelUtil.size(40),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topQueryCasiher: {
        width: PixelUtil.size(380),
        height: PixelUtil.size(68),
        marginLeft: PixelUtil.size(40),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    topQueryBox: {
        width: PixelUtil.size(460),
        height: PixelUtil.size(68),
        position: 'relative'
    },
    topQueryCasiherBox: {
        width: PixelUtil.size(280),
        height: PixelUtil.size(68),
        position: 'relative'
    },
    topQueryInput: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(3),
        borderRightWidth: 0,
        borderColor: '#CBCBCB',
        borderRadius: PixelUtil.size(34),
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#F2F6FC',
        paddingLeft: PixelUtil.size(15),
        paddingRight: PixelUtil.size(45),
        paddingBottom: 0,
        paddingTop: 0,
    },
    topQueryInputActive: {
        //右侧框-标题-输入框
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(3),
        borderRightWidth: 0,
        borderColor: '#111c3c',
        borderRadius: PixelUtil.size(34),
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#F2F6FC',
        paddingLeft: PixelUtil.size(15),
        paddingRight: PixelUtil.size(45),
        paddingBottom: 0,
        paddingTop: 0,
    },
    topQueryInputClear: {
        position: 'absolute',
        right: PixelUtil.size(15),
        top: PixelUtil.size(16),
        zIndex: 100
    },
    topQueryInputStart: {
        width: PixelUtil.size(100),
        height: PixelUtil.size(68),
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111c3c',
        borderColor: '#111c3c',
        borderTopRightRadius: PixelUtil.size(34),
        borderBottomRightRadius: PixelUtil.size(34),
        borderWidth: PixelUtil.size(3)
    },
    topQueryInputIconFind: {
        width: PixelUtil.size(35),
        height: PixelUtil.size(35),
    },
    //服务人信息区域
    servicerWrap: {
        //有选中内容
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    servicerNameInfo: {
        //选中内容-左
        width: '20%',
        paddingLeft: PixelUtil.size(25),
        paddingRight: PixelUtil.size(15),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    servicerNameTxt: {
        // 选中内容-姓名
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    serviceNumber: {
        //选中内容-编号
        width: PixelUtil.rect(162, 78).width,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PixelUtil.size(6),
    },
    serviceNumberText: {
        //选中内容-编号文字
        fontSize: PixelUtil.size(30),
        color: '#ffa526',
    },
    servicerWayBox: {
        width: '20%',
        height: PixelUtil.size(60),
        position: 'relative',
    },
    servicerWayChooseWay: {
        //选中内容-选择方式
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: PixelUtil.size(8),
    },
    servicerChooseWayLi: {
        //选中内容-指定方式-默认
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#979797',
    },
    servicerChooseWayLiActive: {
        //选中内容-指定方式-选中
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111c3c',
    },
    servicerChooseWayText: {
        //选中内容-选择方式-文字
        fontSize: PixelUtil.size(28),
        color: '#fff',
    },
    servicerAppoint: {
        //选中内容-指定-图标
        width: PixelUtil.rect(39.6, 39.6).width,
        height: PixelUtil.rect(39.6, 39.6).height,
        position: 'absolute',
        right: PixelUtil.size(-8),
        top: PixelUtil.size(-20),
    },
    servicerPosition: {
        //选中内容-职务
        width: '20%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    servicerPositionText: {
        //选中内容-职务文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    servicerYeJi: {
        width: '25%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    servicerYeJiText: {
        fontSize: PixelUtil.size(30),
        width: '100%',
        color: '#333',
    },
    servicerOperator: {
        width: '15%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    servicerOperatorBtn: {
        //选中内容-删除
        width: '50%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    servicerOperatorDelete: {
        //选中内容-删除-图片
        width: PixelUtil.rect(32, 38).width,
        height: PixelUtil.rect(32, 38).height,
    },
    servicerOperatorEdit: {
        //选中内容-删除-图片
        width: PixelUtil.size(38),
        height: PixelUtil.size(46),
    },
});

