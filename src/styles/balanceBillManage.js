// 单据详情
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const balanceBillManageStyle = StyleSheet.create({
    // 結單管理主頁
    balanceBillBox: {
        flex: 1,
        backgroundColor: '#fff',
    },
    balanceBillTilte: {
        //标题行
        width: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '10%',
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: PixelUtil.size(1),
    },
    balanceBillTilteItem: {
        width: '78%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '2%',
        paddingTop: '2%',
    },
    addTypeItemLi: {
        //内容行
        width: '78%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '2%',
        paddingBottom: PixelUtil.size(30),
        paddingTop: PixelUtil.size(30),
    },
    balanceBillTilteItemOther: {
        width: '22%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: PixelUtil.size(40),
        borderLeftColor: '#d9d9d9',
        borderLeftWidth: PixelUtil.size(1),
        paddingLeft: PixelUtil.size(40),
        paddingTop: '2%',
    },
    addTypeItemLiOther: {
        width: '22%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: PixelUtil.size(40),
        borderLeftColor: '#d9d9d9',
        borderLeftWidth: PixelUtil.size(1),
        paddingLeft: PixelUtil.size(40),
        paddingBottom: PixelUtil.size(30),
        paddingTop: PixelUtil.size(30),
    },
    balanceBillTilteLi: {
        //标题项
        width: PixelUtil.rect(340, 160).width,
        height: '100%',
        textAlign: 'center',
        fontSize: PixelUtil.size(32),
        marginRight: PixelUtil.size(40),
        color: '#333',
    },
    balanceBillTilteLiOther: {
        width: PixelUtil.rect(340, 160).width,
        height: '100%',
        textAlign: 'center',
        fontSize: PixelUtil.size(32),
        color: '#333',
        marginRight: PixelUtil.size(40),
    },
    addTypeList: {
        //内容块
        height: '99%',
        width: '100%',
        flex: 0,
        paddingBottom: '1%'
    },
    addTypeItem: {
        //内容行
        flex: 0,
        width: '100%',
        height: PixelUtil.size(220),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(1),
        borderBottomColor: '#d9d9d9',
    },
    addConsumablesItemBox: {
        //内容列
        width: PixelUtil.rect(340, 160).width,
        height: PixelUtil.rect(340, 160).height,
        marginRight: PixelUtil.size(40),
        flex: 0,
    },
    addTypeItemBox: {
        //内容列
        width: PixelUtil.rect(340, 160).width,
        height: PixelUtil.rect(340, 160).height,
        marginRight: PixelUtil.size(40),
        flex: 0,
    },
    addTypeItemFirstB: {
        //内容盒
        width: PixelUtil.rect(340, 160).width,
        height: PixelUtil.rect(340, 160).height,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: PixelUtil.size(21),
        paddingRight: PixelUtil.size(21),
    },
    addTypeItemB: {
        //内容盒
        width: PixelUtil.rect(340, 160).width,
        height: PixelUtil.rect(340, 160).height,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(21),
        paddingRight: PixelUtil.size(21),
        borderWidth: PixelUtil.size(2),
        borderColor: '#CBCBCB',
        borderRadius: PixelUtil.size(4),
    },
    typeTitle: {
        //项目名
        width: PixelUtil.rect(298, 128).width,
        textAlign: 'left',
        fontSize: PixelUtil.size(28),
        color: '#151515',
        marginBottom: PixelUtil.size(8),
    },
    typeBtmNumBox: {
        //项目数字盒
        width: PixelUtil.rect(298, 128).width,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addTypeItemOtherBox: {
        //服务人内容列-有内筒
        width: PixelUtil.rect(340, 160).width,
        height: PixelUtil.rect(340, 160).height,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F5FF',
        borderRadius: PixelUtil.size(4),
        marginRight: PixelUtil.size(40),
        position: 'relative',
    },
    redactBox: {
        //编辑图标-盒
        position: 'absolute',
        right: 0,
        top: 0,
    },
    redactImg: {
        //编辑图标
        width: PixelUtil.rect(80, 80).width,
        height: PixelUtil.rect(80, 80).height,
    },
    addTypeItemOtherB: {
        //服务人信息
        width: PixelUtil.rect(340, 160).width,
        height: PixelUtil.rect(340, 160).height,
        flex: 0,
        flexDirection: 'row',
        paddingLeft: PixelUtil.size(21),
        paddingRight: PixelUtil.size(21),
        paddingTop: PixelUtil.size(20),
        paddingBottom: PixelUtil.size(20),
        position: 'relative',
    },
    infoBox: {
        width: PixelUtil.rect(340, 128).width,
        height: PixelUtil.rect(340, 128).height,
    },
    infoItem: {
        width: PixelUtil.rect(340, 42).width,
        height: PixelUtil.rect(340, 42).height,
    },
    addSeverImgBox: {
        //服务人头像
        width: PixelUtil.rect(128, 128).width,
        height: PixelUtil.rect(128, 128).height,
        borderWidth: PixelUtil.size(4),
        borderColor: '#C5D3F5',
        borderRadius: PixelUtil.size(4),
        marginLeft: PixelUtil.size(-4),
        marginRight: PixelUtil.size(10),
    },
    addSeverImg: {
        width: PixelUtil.rect(120, 120).width,
        height: PixelUtil.rect(120, 120).height,
    },
    addTypeAssign: {
        //指定图标
        position: 'absolute',
        top: 0,
        left: PixelUtil.size(122),
        width: PixelUtil.rect(39, 39).width,
        height: PixelUtil.rect(39, 39).height,
        zIndex: 5,
    },
    textStyle333: {
        fontSize: PixelUtil.size(28),
        color: '#333',
    },
    sevicerText: {
        fontSize: PixelUtil.size(32),
        color: '#333',
        marginLeft: PixelUtil.size(32),
    },
    sevicerTextOther: {
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
    },
    addIconImg: {
        width: PixelUtil.rect(40, 40).width,
        height: PixelUtil.rect(40, 40).height,
    },
    textStyleBox: {
        fontSize: PixelUtil.size(28),
        color: '#333',
        width: PixelUtil.size(170),
    },

    servicerInfo: {
        //服务人-发型师-信息
        width: PixelUtil.rect(124, 50).width,
        minHeight: PixelUtil.rect(124, 50).height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: PixelUtil.size(-2),
        left: PixelUtil.size(-2),
    },
    servicerItemText: {
        //服务人-发型师-文字
        fontSize: PixelUtil.size(26),
        color: '#fff',
        textAlign: 'center'
    },
});
