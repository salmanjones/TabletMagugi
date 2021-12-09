import {StyleSheet, Platform} from 'react-native';
import {PixelUtil} from 'utils';

export const pendingStyles = StyleSheet.create({
    statisticsTextBox: {
        //单据个数
        position: 'absolute',
        top: PixelUtil.size(-40),
        right: '3.8%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    statisticsText: {
        //描述文字
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    statisticsTextRed: {
        //总数
        fontSize: PixelUtil.size(32),
        color: '#FF4660',
        paddingLeft: PixelUtil.size(6),
        paddingRight: PixelUtil.size(6),
        marginTop: Platform.OS === 'ios' ? PixelUtil.size(-6) : 0,
    },
    singleBox: {
        marginTop: PixelUtil.size(40),
        position: 'relative',
        marginLeft: '-1%',
    },
    swiperList: {
        //取单-每页
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginLeft: '2.5%',
        marginRight: '2.5%',
    },
    swiperLi: {
        //取单-单据
        width: '23%',
        height: Platform.OS === 'ios' ? '46%' : '44%',
        borderColor: '#d7d9dd',
        borderWidth: PixelUtil.size(4),
        borderStyle: 'solid',
        borderRadius: PixelUtil.size(20),
        paddingLeft: '2%',
        paddingRight: '2%',
        marginBottom: '1.5%',
        marginLeft: '2%',
    },
    swiperLiTop: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    settingCheckBoxO: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        padding: 0,
        width: '20%',
        height: PixelUtil.size(40),
    },
    swiperMemo: {
        //取单-单据-水单号
        width: '83%',
        color: '#FF4660',
        fontSize: PixelUtil.size(32),
        fontWeight: 'bold',
        lineHeight: PixelUtil.size(36),
    },
    swiperMemoO: {
        //取单-单据-水单号
        width: '100%',
        color: '#FF4660',
        fontSize: PixelUtil.size(32),
        fontWeight: 'bold',
        lineHeight: PixelUtil.size(36),
    },
    swiperInfo: {
        //取单-单据-信息
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4%',
        height: '12%',
    },

    swiperInfoMemo0: {
        //取单-单据-信息(电话行)
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: PixelUtil.rect(380, 48).width,
        height: '12%',
    },
    swiperLeft: {
        //取单-单据-信息-左侧
        color: '#333',
        fontSize: PixelUtil.size(28),
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2%',
    },
    swiperRight: {
        //取单-单据-信息-右侧
        color: '#333',
        marginBottom: '10%',
        fontSize: PixelUtil.size(28),
        height: '12%',
        paddingTop: '2%',
    },
    swiperPrice: {
        //取单-单据-信息-金额
        color: '#ff4660',
        paddingTop: '8%',
        height: '100%',
        width: '50%',
        textAlign: 'right',
        marginTop: '4%',
    },
    swiperHand: {
        //取单-单据-信息-手牌背景
        width: '35%',
        height: '100%',
        paddingTop: '1%',
    },
    swiperHandBg: {
        //取单-单据-信息-手牌背景
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    swiperHandText: {
        //取单-单据-信息-手牌内容
        color: '#fff',
        fontSize: PixelUtil.size(28),
        marginLeft: '8%',
        marginBottom: '2%',
    },
    swiperTelphone: {
        //取单-单据-信息-手机号
        color: '#333',
        fontSize: PixelUtil.size(32),
        fontWeight: 'bold',
        // marginBottom: '4%',
        // height: '12%',
        // paddingTop: '2%',
    },
    swiperNameBox: {
        //取单-单据-信息-姓名
        height: PixelUtil.size(52),
        width: '46%',
        marginRight: '2%',
        overflow: 'hidden',
        paddingTop: '2%',
    },
    swiperName: {
        //取单-单据-信息-类型
        color: '#333',
        fontSize: PixelUtil.size(32),
        fontWeight: 'bold',
        height: PixelUtil.size(44),
    },
    swiperInfoMemo: {
        //取单-单据-信息(姓名行)
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4%',
        width: PixelUtil.rect(380, 48).width,
        height: '12%',

    },
    swiperPeoPel:{
        width: '54%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    swiperPeopel:{
        //取单-单据-信息-姓名图片
        width: '45%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiperName0: {
        //取单-单据-信息-姓名
        color: '#333',
        fontSize: PixelUtil.size(32),
        fontWeight: 'bold',
        width:PixelUtil.size(150),
        height: PixelUtil.size(44),
        marginLeft:'-20%',
        marginTop:'4%',
        overflow: 'hidden',
    },

    swiperDate: {
        //取单-单据-信息-时间
        position: 'relative',
        top: '1%',
        marginTop: '8%',
        height: '100%',
    },
    singleBoxTop: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    singlePayment: {
        width: '20%',
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: PixelUtil.size(30),
    },
    settingCheckBox: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        paddingLeft: 0,
        marginLeft: 0,
    },
    rotateModalText: { //文字
        fontSize: PixelUtil.size(32),
        color: '#333',
        fontWeight: 'normal'
    },
    settlementBtnBox: {
        height: PixelUtil.size(68),
        backgroundColor: '#111C3C',
        borderRadius: PixelUtil.size(34),
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
    },
    settlementBtnText: {
        fontSize: PixelUtil.size(32),
        color: '#FFFFFF'
    },
    settlementBtnTextT: {
        fontSize: PixelUtil.size(28),
        color: '#FFFFFF'
    },
});
