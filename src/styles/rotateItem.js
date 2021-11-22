//libs
import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

export const rotateItemStyles = StyleSheet.create({
    scrollContent: {
        backgroundColor: '#FBFCFF',
        width: '100%',
        height: '100%',
    },
    rotateBody: {
        paddingBottom: PixelUtil.size(30),
        backgroundColor: '#FBFCFF'
    },
    rotateBodyOdd: {
        paddingBottom: PixelUtil.size(30),
        backgroundColor: '#FFFCF7'
    },
    rotateListBox: { //轮牌-主体
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingLeft: PixelUtil.size(8),
        marginTop: PixelUtil.size(-24),
    },
    textBlue: {
        color: '#1a8fff'
    },
    textRed: {  //停用
        color: '#ff4444'
    },
    textGreen: {  //正序
        color: '#1bbc93'
    },
    textPurple: {   //倒序
        color: '#6271f3'
    },
    textYellow: {
        color: '#ffa739'
    },
    marginRight: {
        marginRight: PixelUtil.size(34),
    },
    rotateText: {
        fontSize: PixelUtil.size(36),
        color: '#fff',
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
    },
    rotate: {// 卡片
        marginRight: PixelUtil.size(18),
        marginLeft: PixelUtil.size(18),
        marginTop: PixelUtil.size(18),
        width: PixelUtil.size(254),
        height: PixelUtil.size(346),
        overflow: 'hidden',
        flexShrink: 0,
    },
    rotateItem: {// 卡片
        width: PixelUtil.size(254),
        height: PixelUtil.size(346),
        position: 'relative',
        flex: 0,
        alignItems: 'center',
    },
    rotateItemText: {  //卡片文字
        fontSize: PixelUtil.size(24),
        color: '#333',
    },
    rotateItemTitleText: {  //卡片文字
        fontSize: PixelUtil.size(24),
        color: '#333',
        width: PixelUtil.size(200),
        textAlign: 'center'
    },
    rotateItemImgBox: {  //卡片-图片盒子
        width: PixelUtil.size(254),
        height: PixelUtil.size(140),
        position: 'relative',
        overflow: 'hidden',
        flex: 0,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    rotateItemImg: {  //卡片-图片
        width: PixelUtil.size(120),
        height: PixelUtil.size(120),
        borderRadius: PixelUtil.size(60),
        borderColor: '#fff',
        borderWidth: PixelUtil.size(2),
        marginTop: PixelUtil.size(16),
    },
    rotateImgNum: {  //卡片-服务计数
        width: PixelUtil.size(44),
        height: PixelUtil.size(44),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: PixelUtil.size(12),
        left: PixelUtil.size(10),
        zIndex: 2,
    },
    rotateNumText: {//卡片-服务计数-文字
        fontSize: PixelUtil.size(32),
        color: '#FF7149'
    },
    rotateImgWarn: { //红牌警告
        width: PixelUtil.size(50),
        height: PixelUtil.size(50),
        position: 'absolute',
        top: 0,
        right: PixelUtil.size(2),
        zIndex: 2,
    },
    totateBtmT: { //卡片底部一行
        height: PixelUtil.size(86),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        // borderBottomWidth: PixelUtil.size(2),
        // borderBottomColor: '#d6d8dc',
    },
    totateBtmTBox: {  //卡片底部一行文字限制
        width: PixelUtil.size(214),
        height: PixelUtil.size(90),
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: PixelUtil.size(20),
        marginRight: PixelUtil.size(20),
    },
    rotateBtmB: {  //卡片底部二行
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: PixelUtil.size(70),
    },
    rotateBtmBOther: {   //卡片底部二行-倒计时
        paddingTop: PixelUtil.size(16),
        paddingBottom: PixelUtil.size(16),
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: PixelUtil.size(73),
    },
    rotateBtmLabel: {  //拉片-底部标签
        width: PixelUtil.size(254),
        height: PixelUtil.size(56),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rotateBtmLabelT: {
        color: '#fff',
        fontSize: PixelUtil.size(28),
    },
    rotateBtmLabelTO: {
        color: '#666',
        fontSize: PixelUtil.size(28),
    },
    rotateBtmService: {  //服务中
        backgroundColor: '#F97E67',
    },
    rotateBtmWait: {  //等待中
        backgroundColor: '#546FCA',
    },
    rotateBtmFurlough: {  //临休
        backgroundColor: '#999',
    },
    rotateBtmUsher: {  //迎宾
        backgroundColor: '#2ABE9E',
    },
    titleAbsentee: { //未上班
        width: PixelUtil.size(54),
        height: PixelUtil.size(30),
        backgroundColor: '#dbdbdb',
        borderRadius: PixelUtil.size(4),
        marginRight: PixelUtil.size(17),
    },
    rotateTitleBox: {  //轮牌组标题
        position: 'relative',
        paddingBottom: PixelUtil.size(40),
    },
    rotateTitleFlow: { //轮牌组标题-下箭头
        position: "absolute",
        right: PixelUtil.size(40),
        bottom: PixelUtil.size(22),
        width: PixelUtil.size(40),
        height: PixelUtil.size(20),
        zIndex: 2
    },
    rotateTitleOne: {//轮牌组标题-第一个
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
        paddingTop: PixelUtil.size(27),
        paddingBottom: PixelUtil.size(27),
        backgroundColor: '#E9EFFF',
    },
    rotateTitleOdd: {//轮牌组标题-奇数
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
        paddingTop: PixelUtil.size(27),
        paddingBottom: PixelUtil.size(27),
        backgroundColor: '#FDF3DD',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#FDC85C',
    },
    rotateTitle: {//轮牌组标题-偶数
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(40),
        paddingTop: PixelUtil.size(27),
        paddingBottom: PixelUtil.size(27),
        backgroundColor: '#E9EFFF',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#7EA4EC',
    },
    rotateTitleL: { //轮牌组标题-左
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rotateTitleText: {//轮牌组标题-左文字
        fontSize: PixelUtil.size(34),
        color: '#333'
    },
    rotateTitleOtherText: {//轮牌设置-组标题-站门牌
        fontSize: PixelUtil.size(34),
        color: '#1a8fff'
    },
    rotateTitleR: { //轮牌组标题-右
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rotateTitleRtip: { //轮牌组标题-提示
        fontSize: PixelUtil.size(28),
        color: '#8e8e8e',
        marginLeft: PixelUtil.size(20),
    },
    rotateTitleBtn: {//轮牌组标题-按钮
        width: PixelUtil.size(120),
        height: PixelUtil.size(45),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rotateTitleBtnSetting: {//轮牌组标题-按钮
        width: PixelUtil.size(180),
        height: PixelUtil.size(68),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rotateTitleBtnO: {//轮牌组标题-按钮
        width: PixelUtil.size(120),
        height: PixelUtil.size(45),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: PixelUtil.size(20),
    },
    rotateListTitle: {  //轮播设置-标题
        height: '8.3%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
    },
    rotateListText: { //轮播设置-行-列
        fontSize: PixelUtil.size(32),
        color: '#333',
        width: '12.5%',
        textAlign: 'center',
    },
    rotateListBody: {  //轮播设置-主体
        height: '78.76%',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
    },
    rotateListRow: {  //轮播设置-行
        height: PixelUtil.size(120),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rotateListRowActive: { //轮播设置-行-选中
        height: PixelUtil.size(120),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eef3ff'
    },
    rotateListName: {  //轮播设置-轮牌名称
        width: '12.5%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rotateListNameLabel: {  //轮播设置-轮牌名称-标签
        width: PixelUtil.size(220),
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(200),
        backgroundColor: '#f3f3f3',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateListNameActiveLabel: {  //轮播设置-轮牌名称-标签-选中
        width: PixelUtil.size(220),
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(200),
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateListOtherNameLabel: {  //轮播设置-轮牌名称-站门牌
        width: PixelUtil.size(220),
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(200),
        backgroundColor: '#E4F9F4',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateListOtherNameLabelActive: {  //轮播设置-轮牌名称-站门牌-选中
        width: PixelUtil.size(220),
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(200),
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateListBtm: {   //轮播设置-底部
        height: '12.94%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '17.38%',
        paddingRight: '17.38%',
    },
    rotateListBtmIcon: {   //轮播设置-底部-按钮图标
        width: PixelUtil.size(26),
        height: PixelUtil.size(26),
        marginRight: PixelUtil.size(20),
    },
    rotateListBtmIconToTopOther: {
        width: PixelUtil.size(24),
        height: PixelUtil.size(50),
        marginRight: PixelUtil.size(20),
    },
    rotateListBtmIconOther: {   //轮播设置-底部-按钮图标
        width: PixelUtil.size(24),
        height: PixelUtil.size(30),
        marginRight: PixelUtil.size(20),
    },
    rotateListBtmBtn: {
        marginRight: PixelUtil.size(40),
    },
    rotateListBtmBtnOther: {
        marginRight: PixelUtil.size(98),
    },
    maskbg: {   //排序-遮罩层
        width: '100%',
        height: '97.2%',
        backgroundColor: '#00000050',
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: PixelUtil.size(8),
        paddingBottom: PixelUtil.size(2),
        marginTop: '2.8%',
    },
    maskbgLeftBtn: {   //排序-遮罩层-按钮
        width: PixelUtil.size(100),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(10),
    },
    maskbgRightBtn: {   //排序-遮罩层-按钮
        width: PixelUtil.size(100),
        // height: PixelUtil.size(100),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: PixelUtil.size(10),
    },
    btnIcon: {
        width: PixelUtil.size(60),
        height: PixelUtil.size(60),
    },
    nullBody: {   //缺省-主体
        width: '100%',
        height: '100%',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    nullTextTip: {   //缺省-主体-文字
        fontSize: PixelUtil.size(30),
        color: '#b4b4b4',
        marginTop: PixelUtil.size(40),
        marginBottom: PixelUtil.size(40),
    },
    nullImage: {  //缺省-主体-图片
        width: PixelUtil.size(332),
        height: PixelUtil.size(454),
    },
    nullItem: {
        width: '100%',
        height: PixelUtil.size(518),
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nullItemImage: {  //缺省-主体-图片
        width: PixelUtil.size(204),
        height: PixelUtil.size(252),
    },
    rotateItemCenter: {
        // 卡片中段
        width: PixelUtil.size(254),
        height: PixelUtil.size(226),
        flex: 0,
        alignItems: 'center',
    },
    timeBox: {
        // 卡片时间
        width: '100%',
        height: PixelUtil.size(62),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rotateImgTime: {
        width: PixelUtil.size(30),
        height: PixelUtil.size(30),
        marginRight: PixelUtil.size(12),
    },
    // 轮牌主页标题栏
    scrollContentother: {
        backgroundColor: '#FBFCFF',
        width: '100%',
        height: '92%',
    },
    FlatListTitle: {
        width: '100%',
        height: '8%',
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb'
    },
    FlatListTitleL: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: PixelUtil.size(45),
    },
    titleItem: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: PixelUtil.size(20),
    },
    titleItemL: {
        width: PixelUtil.size(56),
        height: PixelUtil.size(32),
        borderRadius: PixelUtil.size(4),
        marginRight: PixelUtil.size(17),
    },
    titleLService: {  //服务中
        backgroundColor: '#F97E67',
    },
    titleLWait: {  //等待中
        backgroundColor: '#546FCA',
    },
    titleLFurlough: {  //临休
        backgroundColor: '#999',
    },
    titleLUsher: {  //迎宾
        backgroundColor: '#2ABE9E',
    },
    FlatListTitleR: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: PixelUtil.size(45),
    },
    titleRItem: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: PixelUtil.size(65),
    },
    titleRItemImg: {
        width: PixelUtil.size(50),
        height: PixelUtil.size(56),
    },
    titleRText: {
        fontSize: PixelUtil.size(32),
    },
});
