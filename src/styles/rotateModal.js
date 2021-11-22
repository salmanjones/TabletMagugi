// 轮牌小弹层
import {StyleSheet} from 'react-native';
import {PixelUtil} from 'utils';

export const rotateModalStyle = StyleSheet.create({
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
    rotateTitle: {
        width: '100%',
        height: '10.26%',
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: PixelUtil.size(40),
    },
    rotateModalText: { //文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'normal'
    },
    rotateTitleImgBox: {  //关闭图标
        width: PixelUtil.size(100),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: PixelUtil.size(40),
    },
    rotateTitleImg: {
        width: PixelUtil.size(35),
        height: PixelUtil.size(35),
    },
    rotateBody: {  //主体内容
        flex: 0,
        height: '89.74%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rotateBodyROBox: { //主体内容-右-翻牌
        width: PixelUtil.size(760),
        height: PixelUtil.size(110),
        marginLeft: PixelUtil.size(-40),
        marginBottom: PixelUtil.size(20),
    },
    rotateBodyROBtn: { //主体内容-右-翻牌
        width: PixelUtil.size(600),
        height: PixelUtil.size(110),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rotateBodyROther: { //主体内容-右-按钮行
        flex: 0,
        width: PixelUtil.size(580),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(20),
    },
    rotateBodyRBtn: {//主体内容-右-按钮
        width: PixelUtil.size(270),
        height: PixelUtil.size(110),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rotateItem: {// 卡片-普通
        width: PixelUtil.size(470),
        height: PixelUtil.size(660),
        position: 'relative',
        marginRight: '5.19%',
        borderRadius: PixelUtil.size(4),
        backgroundColor: '#eef3ff'
    },
    rotateItemOther: {// 卡片-站门牌
        width: PixelUtil.size(525),
        height: PixelUtil.size(614),
        position: 'relative',
        marginRight: '5.19%',
        borderRadius: PixelUtil.size(4),
        backgroundColor: '#eef3ff'
    },
    rotateItemText: {  //卡片文字
        fontSize: PixelUtil.size(36),
        color: '#fff'
    },
    rotateItemImgBox: {  //卡片-图片盒子
        width: PixelUtil.size(470),
        height: PixelUtil.size(510),
        position: 'relative',
        overflow: 'hidden',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    marginBtm15: {
        marginBottom: PixelUtil.size(15),
    },
    rotateItemImg: {  //卡片-图片
        width: PixelUtil.size(251),
        height: PixelUtil.size(251),
        borderRadius: PixelUtil.size(125.5),
        marginTop: PixelUtil.size(45),
        marginBottom: PixelUtil.size(40),
        borderWidth: PixelUtil.size(2),
        borderColor: '#fff'
    },
    rotateItemBtm: {  //卡片底部
        height: PixelUtil.size(122),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totateBtmT: { //卡片底部一行
        height: PixelUtil.size(143),
        paddingBottom: PixelUtil.size(30),
        marginLeft: PixelUtil.size(20),
        marginRight: PixelUtil.size(20),
        flex: 0,
        alignItems: 'center',
    },

    totateBtmTOther: { //卡片底部一行
        height: PixelUtil.size(143),
        paddingBottom: PixelUtil.size(30),
        marginLeft: PixelUtil.size(20),
        marginRight: PixelUtil.size(20),
        flex: 0,
        alignItems: 'center',
    },
    rotateBtmB: {  //卡片底部二行
        height: PixelUtil.size(103),
        // paddingTop: PixelUtil.size(30),
        // paddingBottom: PixelUtil.size(30),
        // paddingLeft: PixelUtil.size(20),
        // paddingRight: PixelUtil.size(20),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rotateBtmBOther: {   //卡片底部二行-倒计时
        paddingTop: PixelUtil.size(16),
        paddingBottom: PixelUtil.size(16),
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rotateBtmLabel: {  //拉片-底部标签
        height: PixelUtil.size(103),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rotateBtmLabelT: {
        color: '#fff',
        fontSize: PixelUtil.size(38),
    },
    rotateBtmService: {  //服务中
        backgroundColor: '#ff7149',
    },
    rotateBtmWait: {  //等待中
        backgroundColor: '#111c3c'
    },
    rotateBtmFurlough: {  //临休
        backgroundColor: '#999'
    },

    rotateItemBgOther: {   //站门牌-卡牌
        width: PixelUtil.size(540),
        height: PixelUtil.size(560),
        position: 'relative',
        overflow: 'hidden',
        marginRight: '5.19%',
        paddingLeft: PixelUtil.size(40),
        paddingRight: PixelUtil.size(26),
        paddingTop: PixelUtil.size(4),
    },

    rotateItemImgBoxOther: {  //卡片-图片盒子
        width: PixelUtil.size(456),
        height: PixelUtil.size(456),
        overflow: 'hidden',
    },
    rotateItemImgOther: {  //卡片-图片
        width: PixelUtil.size(456),
        height: PixelUtil.size(456),
    },
    rotateBtmOther: {
        height: PixelUtil.size(100),
        width: PixelUtil.size(460),
        paddingTop: PixelUtil.size(30),
        paddingBottom: PixelUtil.size(30),
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rotateBodyRO: {
        height: PixelUtil.size(400),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rotateBodyROText: {
        fontSize: PixelUtil.size(100),
        color: '#333'
    },
    rotateTitleLTip: {
        marginLeft: PixelUtil.size(30),
        fontSize: PixelUtil.size(32),
        color: '#FF2A39'
    },
    rotateTitleL: { //轮牌组标题-左
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rotateImgTime: {
        height: PixelUtil.size(40),
        width: PixelUtil.size(40),
        marginRight: PixelUtil.size(18),
    },
    rotateTimeT: {
        fontSize: PixelUtil.size(34),
        color: '#fff'
    }
});
