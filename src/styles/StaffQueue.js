//libs
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let naviBarHeight = PixelUtil.size(120, 2048)
let headerHeight = PixelUtil.size(108, 2048)
let filterHeight = PixelUtil.size(128, 2048)
let lineHeight = PixelUtil.size(2, 2048)
let footerHeight = 0
let bodyHeight = PixelUtil.screenSize.height - naviBarHeight - footerHeight
let listHeight = bodyHeight - headerHeight - filterHeight - lineHeight
// 员工cell宽度
let staffCellWidth = PixelUtil.screenSize.width * 0.37 - PixelUtil.size(40, 2048) * 2
let staffRightWidth = staffCellWidth - PixelUtil.size(203, 2048) - PixelUtil.size(4, 2048)
// 作品cell宽度
let worksBoxHeight =  bodyHeight - PixelUtil.size(100, 2048)
let worksListHeight =  worksBoxHeight
let worksListWidth = PixelUtil.screenSize.width * 0.63
let worksCellWidth = (PixelUtil.screenSize.width * 0.63 - PixelUtil.size(40, 2048) * 2  -  PixelUtil.size(8, 2048) * 3)/4
let worksCellHeight = worksCellWidth * (4/3)

export const staffQueueStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    content: {
        width: '100%',
        height: bodyHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#FBF9F7',
        position: 'relative'
    },
    floatButtonBox:{
        position: 'absolute',
        right: PixelUtil.size(-18),
        bottom: PixelUtil.size(52),
        width: PixelUtil.size(160),
        height: PixelUtil.size(480),
        zIndex: 1000,
    },
    reserveButtonKaiDan:{
        position: "absolute",
        right: PixelUtil.size(32),
        bottom: PixelUtil.size(360),
        width: PixelUtil.size(160),
        height: PixelUtil.size(160),
        zIndex: 1001
    },
    reserveButtonKaiDanIcon:{
        width: '100%',
        height: '100%'
    },
    containerList: {
        width: '37%',
        height: '100%',
        backgroundColor: '#f1f2f4'
    },
    HeaderTxt:{
        fontSize: PixelUtil.size(32, 2048),
        color: '#333'
    },
    ListHeader: {
        width: '100%',
        height: PixelUtil.size(100),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2, 2048),
        borderColor:'#cbcbcb',
        borderRightWidth: PixelUtil.size(2, 2048)
    },
    FilterPosBox: {
        width: '100%',
        height: PixelUtil.size(128)
    },
    filterPosItem0: {
        height: PixelUtil.size(64),
        marginTop: PixelUtil.size(32, 2048),
        marginLeft: PixelUtil.size(26, 2048),
        marginRight: PixelUtil.size(26, 2048),
    },
    filterPosItem: {
        height: PixelUtil.size(64),
        marginTop: PixelUtil.size(32, 2048),
        marginRight: PixelUtil.size(26, 2048),
    },
    filterPosItemText:{
        paddingTop: PixelUtil.size(12, 2048),
        paddingRight: PixelUtil.size(22, 2048),
        paddingBottom: PixelUtil.size(12, 2048),
        paddingLeft: PixelUtil.size(22, 2048),
        fontSize: PixelUtil.size(30),
        color: '#222222',
        backgroundColor: '#ffffff',
        display: 'flex'
    },
    filterPosItemTextActive:{
        paddingTop: PixelUtil.size(12, 2048),
        paddingRight: PixelUtil.size(22, 2048),
        paddingBottom: PixelUtil.size(12, 2048),
        paddingLeft: PixelUtil.size(22, 2048),
        fontSize: PixelUtil.size(30),
        color: '#FFFFFF',
        fontWeight: 500,
        backgroundColor: '#101B3C',
        display: 'flex'
    },
    ListBox:{
        width: '100%',
        height: listHeight
    },
    ListEmptyBox:{
        width: '100%',
        height: listHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemCell: {
        paddingLeft: PixelUtil.size(40, 2048),
        paddingRight: PixelUtil.size(40, 2048),
        marginTop: PixelUtil.size(24, 2048),
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemCellWrap:{
        width: '100%',
        height: PixelUtil.size(215, 2048),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: PixelUtil.size(2, 2048),
        borderRadius: PixelUtil.size(25, 2048),
        borderColor: '#00000000',
        shadowColor: '#eee',
    },
    itemSelectedCellWrap:{
        width: '100%',
        height: PixelUtil.size(215, 2048),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: PixelUtil.size(25, 2048),
        shadowColor: '#eee',
        borderWidth: PixelUtil.size(2, 2048),
        borderColor: '#ff770f'
    },
    itemLeft:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: PixelUtil.size(203, 2048),
        height: '100%',
        borderWidth: PixelUtil.size(1),
        borderColor: '#f1f1f1',
        borderBottomLeftRadius: PixelUtil.size(25, 2048),
        borderTopLeftRadius: PixelUtil.size(25, 2048),
    },
    itemRight: {
        position: 'relative',
        width: staffRightWidth,
        height: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemInfo: {
        height: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: PixelUtil.size(24, 2048)
    },
    NickName: {
        width: staffRightWidth - PixelUtil.size(230,2048),
        fontSize: PixelUtil.size(28, 2048),
        color: '#333',
        fontWeight: 'bold',
    },
    PositionName:{
        fontSize: PixelUtil.size(18, 2048),
        color: '#333',
        marginTop: PixelUtil.size(14, 2048),
        marginBottom: PixelUtil.size(10, 2048),
        fontWeight: 'bold',
        // backgroundColor:'pink',
    },
    priceBox:{
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: PixelUtil.size(34, 2048)
    },
    priceWrap: {
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceTxt:{
        fontWeight: 'bold',
        fontSize: PixelUtil.size(51, 2048),
        letterSpacing: PixelUtil.size(0.02, 2048),
        color: '#ff770f'
    },
    priceDesc: {
        fontSize: PixelUtil.size(18, 2048),
        color: '#333'
    },
    popularityBox:{
        position: 'absolute',
        zIndex: 2,
        right: 0,
        top: -1,
        width: PixelUtil.size(176, 2048),
        height: PixelUtil.size(40.97, 2048),
        backgroundColor: '#FF770F',
        borderBottomLeftRadius: PixelUtil.size(25, 2048),
        borderTopRightRadius: PixelUtil.size(25, 2048),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    iconPopularity: {
        width: PixelUtil.size(24, 2048),
        height: PixelUtil.size(24, 2048),
    },
    popularityTxt: {
        fontSize: PixelUtil.size(18, 2048),
        letterSpacing: PixelUtil.size(0.02, 2048),
        color: '#fff',
        marginLeft: PixelUtil.size(4, 2048)
    },
    containerWorks: {
        width: '63%',
        height: '100%',
        backgroundColor: '#fff'
    },
    WorksHeader: {
        width: '100%',
        height: PixelUtil.size(100),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: PixelUtil.size(2, 2048),
        borderColor:'#cbcbcb'
    },
    WorksBox:{
        width: '100%',
        height: worksBoxHeight
    },
    WorksEmptyBox:{
        width: '100%',
        height: listHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    WorksEmptyImg:{
        width: PixelUtil.size(403, 2048),
        height: PixelUtil.size(426, 2048),
    },
    staffEmptyImg:{
        width: PixelUtil.size(560),
        height: PixelUtil.size(433),
    },
    cashierBtn: {
        paddingLeft: PixelUtil.size(28, 2048),
        paddingRight: PixelUtil.size(28, 2048),
        paddingTop: PixelUtil.size(10, 2048),
        paddingBottom: PixelUtil.size(10, 2048),
        backgroundColor: '#FF770F',
        borderWidth: PixelUtil.size(2, 2048),
        borderColor: '#FF770F',
        borderRadius: PixelUtil.size(40, 2048),
    },
    cashierBtnTxt:{
        fontSize: PixelUtil.size(26, 2048),
        color: '#fff',
    },
    WorksListBox:{
        width: worksListWidth,
        height: worksListHeight,
        paddingLeft: PixelUtil.size(40, 2048),
        paddingRight: PixelUtil.size(40, 2048),
        paddingTop: PixelUtil.size(24, 2048),
        paddingBottom: PixelUtil.size(24, 2048)
    },
    workCell: {
        marginBottom: PixelUtil.size(8, 2048),
        marginRight: PixelUtil.size(8, 2048),
        width: worksCellWidth,
        height: worksCellHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: PixelUtil.size(2, 2048),
        borderRadius: PixelUtil.size(12, 2048),
        borderColor: '#00000000',
    },
    workSelectedCell: {
        marginBottom: PixelUtil.size(8, 2048),
        marginRight: PixelUtil.size(8, 2048),
        width: worksCellWidth,
        height: worksCellHeight,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderWidth: PixelUtil.size(4, 2048),
        borderRadius: PixelUtil.size(12, 2048),
        borderColor: '#ff770f'
    },
    lastChild:{
        marginBottom: PixelUtil.size(40, 2048)
    },
    normalChild:{
        marginBottom: PixelUtil.size(0, 2048)
    },
    workImg:{
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2, 2048),
        borderRadius: PixelUtil.size(12, 2048),
        borderColor: '#00000000',
        backgroundColor: '#f1f1f1'
    },
    likeCountBox:{
        borderRadius: PixelUtil.size(20, 2048),
        borderWidth: PixelUtil.size(2, 2048),
        borderColor: '#00000000',
        paddingTop: PixelUtil.size(10, 2048),
        paddingBottom: PixelUtil.size(10, 2048),
        paddingLeft: PixelUtil.size(20, 2048),
        paddingRight: PixelUtil.size(20, 2048),
        position: "absolute",
        left: PixelUtil.size(10, 2048),
        bottom: PixelUtil.size(10, 2048),
        backgroundColor: '#00000055',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 100
    },
    videoImg: {
        width: PixelUtil.size(50, 2048),
        height: PixelUtil.size(50, 2048),
        position: "absolute",
        zIndex: 200,
        opacity: 0.95
    },
    likeCountImg:{
        width: PixelUtil.size(26, 2048),
        height: PixelUtil.size(26, 2048)
    },
    likeCountTxt:{
        fontSize: PixelUtil.size(24, 2048),
        color: '#fff',
        marginLeft: PixelUtil.size(24, 2048)
    }
});
