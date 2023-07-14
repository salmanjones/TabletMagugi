import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';
import {rgbaColor} from "react-native-reanimated/src";

export const cardInfoStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000060',
    },
    cashierBillInfoWrapper: {
        backgroundColor: '#ffffff',
        height: PixelUtil.size(1364),
        width: PixelUtil.size(1968),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    containerStyle: {
        width: PixelUtil.rect(480, 68).width,
        height: PixelUtil.rect(480, 68).height,
        backgroundColor: '#ffffff',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 0,
        marginTop: PixelUtil.size(22),
        marginBottom: PixelUtil.size(26),
    },
    MemberQueryContainer: {
        width: PixelUtil.size(1968),
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    buttonStyle: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        marginRight: PixelUtil.size(40),
        backgroundColor: '#fff',
        borderRadius: PixelUtil.size(200),
    },
    selectedButtonStyle: {
        width: PixelUtil.rect(172, 68).width,
        height: PixelUtil.rect(172, 68).height,
        backgroundColor: '#111c3c',
        borderRadius: PixelUtil.size(200),
    },
    textStyle: {
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    selectedTextStyle: {
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    titleBox: {
        width: '100%',
        height: PixelUtil.size(178),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    cardInfoBox: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 1
    },
    cardDetailBgBox:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    cardDetailBgImg:{
        width: PixelUtil.size(1748),
        height: PixelUtil.size(986),
        position: 'relative'
    },
    cardStoreageDetailTitle:{
        fontSize: PixelUtil.size(28),
        fontWeight: '700',
        color: '#FFEFD5',
        marginLeft: PixelUtil.size(86),
        marginTop: PixelUtil.size(10)
    },
    cardDetailHeader:{
        width: '100%',
        marginTop: PixelUtil.size(42),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDetailHeaderBox:{
        width: PixelUtil.size(1634),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardDetailStorageName:{
        fontSize: PixelUtil.size(30),
        fontWeight: '700',
        lineHeight: PixelUtil.size(48),
        color: '#5E3F20'
    },
    cardDetailStoragePrice:{
        fontSize: PixelUtil.size(40),
        fontWeight: '500',
        color: '#5E3F20'
    },
    cardDetailTimesName:{
        fontSize: PixelUtil.size(30),
        fontWeight: '700',
        lineHeight: PixelUtil.size(48),
        color: '#3C4C72'
    },
    cardDetailTimesPrice:{
        fontSize: PixelUtil.size(40),
        fontWeight: '500',
        color: '#3C4C72'
    },
    cardDetailBody:{
        width: '100%',
        marginTop: PixelUtil.size(42),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDetailBodyBox:{
        width: PixelUtil.size(1634),
        height: PixelUtil.size(684),
        borderRadius: PixelUtil.size(24),
        marginTop: PixelUtil.size(80),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#ffffff52',
        padding: PixelUtil.size(50),
        paddingTop: PixelUtil.size(80)
    },
    cardTimesDetailBodyBox:{
        width: PixelUtil.size(1634),
        height: PixelUtil.size(684),
        borderRadius: PixelUtil.size(24),
        marginTop: PixelUtil.size(80),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff52',
        padding: PixelUtil.size(50),
        paddingTop: PixelUtil.size(80)
    },
    cardDetailTimesLeft:{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cardDetailTimesRow:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: PixelUtil.size(66),
    },
    cardDetailTimesRight:{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: PixelUtil.size(100)
    },
    cardDetailRightItems:{
        marginTop: PixelUtil.size(-22),
        width: '100%',
        height: PixelUtil.size(430)
    },
    cardDetailStorageRow:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: PixelUtil.size(86)
    },
    cardDetailStorageRowLeft:{
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cardDetailStorageRowRight:{
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: PixelUtil.size(100)
    },
    cardDetailTimesRowRight:{
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: PixelUtil.size(100),
    },
    cardDetailStoragePTitle:{
        fontSize: PixelUtil.size(26),
        color: '#898888',
        textAlign: 'left',
        fontWeight: '500'
    },
    cardDetailStoragePValue:{
        fontSize: PixelUtil.size(26),
        color: '#2D2D2D',
        textAlign: 'left',
        fontWeight: '700'
    },
    cardDetailStoragePKey:{
        width: PixelUtil.size(164),
        height: PixelUtil.size(48),
        backgroundColor: '#6075a8',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '700',
        color: '#ffffff',
        fontSize: PixelUtil.size(30),
        lineHeight: PixelUtil.size(46)
    },
    cardImg: {
        //储值卡
        width: '100%',
        height: '37.45%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: PixelUtil.size(20),
    },
    cardInfoItemBox: {
        width: '100%',
        height: '62.55%',
        paddingLeft: PixelUtil.size(60),
        paddingRight: PixelUtil.size(60),
    },
    cardInfo: {
        //信息
        width: '100%',
        height: '33.3%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomColor: '#CFDDFF',
        borderBottomWidth: PixelUtil.size(2),
    },
    cardInfoLast: {
        //信息
        width: '100%',
        height: '33.3%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardInfoItem: {
        //信息-项
        width: '18%',
        height: '100%',
        overflow: 'hidden',
    },
    cardInfoDiscount: {
        width: '38.4%',
        height: '100%',
        overflow: 'hidden',
    },
    cardInfoNote: {
        //信息-备注
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    cardInfoText: {
        //信息-文字
        height: PixelUtil.size(45),
        fontSize: PixelUtil.size(32),
        color: '#333',
        textAlign: 'left',
        marginTop: PixelUtil.size(12),
        overflow: 'hidden',
    },
    MemberQueryBtnBox: {
        //操作区域
        width: '100%',
        height: PixelUtil.size(150),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: PixelUtil.size(2),
        borderTopColor: '#cbcbcb',
    },
    cardDetailLeftButton:{
        width: PixelUtil.size(290),
        height: PixelUtil.size(78),
        borderTopLeftRadius: PixelUtil.size(40),
        borderBottomLeftRadius: PixelUtil.size(40),
        borderColor: '#111C3C',
        borderWidth: PixelUtil.size(2),
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAF0FF'
    },
    cardDetailRightButton:{
        width: PixelUtil.size(290),
        height: PixelUtil.size(78),
        borderTopRightRadius: PixelUtil.size(40),
        borderBottomRightRadius: PixelUtil.size(40),
        borderColor: '#111C3C',
        borderWidth: PixelUtil.size(2),
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EAF0FF'
    },
    cardDetailActiveButton:{
        backgroundColor: '#111C3C'
    },
    cardDetailButtonTxt:{
        fontSize: PixelUtil.size(32),
        color: '#111C3C',
        fontWeight: '700'
    },
    cardDetailButtonActiveTxt:{
        fontSize: PixelUtil.size(32),
        color: '#ffffff',
        fontWeight: '700'
    }
});
