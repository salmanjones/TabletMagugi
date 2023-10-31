import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const PanelConsumeStyles = StyleSheet.create({
    consumeContentBox: {
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#ffffff',
        paddingVertical: PixelUtil.size(32),
        paddingHorizontal: PixelUtil.size(24)
    },
    consumeTabBox: {
        width: '100%',
        height: PixelUtil.size(80),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    consumeTabItem: {
        width: PixelUtil.size(192),
        height: PixelUtil.size(56),
        marginRight: PixelUtil.size(26),
        backgroundColor: '#ebedf2',
        borderRadius: PixelUtil.size(28),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    consumeTabItemText: {
        fontSize: PixelUtil.size(24),
        color: '#2d2d2d',
        fontWeight: '500',
    },
    consumeTabItemActive: {
        width: PixelUtil.size(192),
        height: PixelUtil.size(56),
        marginRight: PixelUtil.size(26),
        backgroundColor: '#f8ecd9',
        borderRadius: PixelUtil.size(28),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    consumeTabItemTextActive: {
        fontSize: PixelUtil.size(24),
        color: '#FFA200',
        fontWeight: '500',
    },
    consumeListWrap: {
        flex: 1,
        width: '100%',
    },
    listItemSeparator: {
        width: PixelUtil.size(1),
        height: PixelUtil.size(24),
        backgroundColor: "#ffffff"
    },
    listItemBox:{
        width: '100%',
        borderRadius: PixelUtil.size(22),
        backgroundColor: "#f9f9f9",
        paddingHorizontal: PixelUtil.size(22),
        paddingTop: PixelUtil.size(26),
        paddingBottom: PixelUtil.size(20),
        display: "flex",
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    itemBaseBox:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    baseStoreInfo:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    baseStoreIcon:{
        width: PixelUtil.size(24),
        height: PixelUtil.size(26),
    },
    baseStoreName:{
        fontSize: PixelUtil.size(24),
        fontWeight: "700",
        color: '#444444',
        marginLeft: PixelUtil.size(14)
    },
    baseStoreDate:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: PixelUtil.size(20)
    },
    baseConsumeDate:{
        fontWeight: "500",
        fontSize: PixelUtil.size(22),
        color: "#858585"
    },
    baseProfileFlow:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        marginTop: PixelUtil.size(20)
    },
    baseProfileNo:{
        fontWeight: "500",
        fontSize: PixelUtil.size(22),
        color: '#858585'
    },
    baseFlowNo:{
        fontWeight: "500",
        fontSize: PixelUtil.size(22),
        color: '#858585',
        marginLeft: PixelUtil.size(120)
    },
    baseServicer:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: PixelUtil.size(20)
    },
    baseServicerNames:{
        fontWeight: "500",
        fontSize: PixelUtil.size(22),
        color: '#858585',
    },
    basePriceBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'baseline',
    },
    basePricePrefix:{
        color: "#2d2d2d",
        fontSize: PixelUtil.size(25),
        fontWeight: "700"
    },
    basePriceValue:{
        color: "#2d2d2d",
        fontSize: PixelUtil.size(42),
        fontWeight: "bold",
        marginLeft: PixelUtil.size(2)
    },
    itemDetailBox:{
        width: '100%',
        marginTop: PixelUtil.size(24),
        backgroundColor: '#ffffff',
        padding: PixelUtil.size(20),
        borderWidth: PixelUtil.size(2),
        borderColor: '#cccccc',
        borderStyle: 'dashed',
        borderRadius: PixelUtil.size(22)
    },
    itemDetailTitle:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    itemDetailTitleDesc:{
        fontWeight: "700",
        fontSize: PixelUtil.size(22),
        color: '#4f4f4f'
    },
    showMoreBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    showMoreBoxHide:{
        display: "none"
    },
    showMoreBoxTitle:{
        fontWeight: "500",
        fontSize: PixelUtil.size(22),
        color: "#3c4c72",
    },
    showMoreIcon:{
        width: PixelUtil.size(26),
        height: PixelUtil.size(26),
        marginLeft: PixelUtil.size(16)
    },
    itemDetailStyle:{
        width: "100%",
        marginTop: PixelUtil.size(20),
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    itemDetailLeft:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    itemDetailCircle:{
        width: PixelUtil.size(8),
        height: PixelUtil.size(8),
        borderRadius: PixelUtil.size(4),
        backgroundColor: '#131418'
    },
    itemDetailName:{
        marginLeft: PixelUtil.size(12),
        fontSize: PixelUtil.size(22),
        color: '#555',
        fontWeight: "500",
        width: PixelUtil.size(238)
    },
    itemDetailCardName:{
        marginLeft: PixelUtil.size(12),
        fontSize: PixelUtil.size(22),
        color: '#555',
        fontWeight: "500",
        width: PixelUtil.size(536)
    },
    itemDetailNum:{
        marginLeft: PixelUtil.size(110),
        fontSize: PixelUtil.size(22),
        color: '#555',
        fontWeight: "500",
        width: PixelUtil.size(70),
    },
    itemDetailPrice:{
        marginLeft: PixelUtil.size(120),
        fontSize: PixelUtil.size(22),
        color: '#8b8b8b',
        fontWeight: "500",
        textDecorationLine:'line-through'
    },
    itemDetailRight:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
        fontSize: PixelUtil.size(22),
        color: '#555',
        fontWeight: "500",
    },
    itemCardDetailBox:{
        width: '100%',
        marginTop: PixelUtil.size(24),
        paddingTop: PixelUtil.size(20),
        borderTopWidth: PixelUtil.size(2),
        borderColor: '#cccccc',
        borderStyle: 'solid',
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    itemCardHeader:{
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    },
    itemCardHeaderLeft:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    itemCardSaleType:{
        width: PixelUtil.size(70),
        height: PixelUtil.size(30),
        backgroundColor: '#E2E3E8',
        transform: [{skewX:'-15deg'}],
        color: '#394B74',
        fontSize: PixelUtil.size(16),
        display: "flex",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        textAlign: 'center',
        marginLeft: PixelUtil.size(4)
    },
    itemCardSaleTypeTxt:{
        color: '#394B74',
        fontSize: PixelUtil.size(18),
        fontWeight: 'bold'
    },
    itemCardSaleName:{
        color: '#4f4f4f',
        fontSize: PixelUtil.size(24),
        fontWeight: '500',
        marginLeft: PixelUtil.size(18),
        width: PixelUtil.size(576)
    },
    itemCardHeaderRight:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    itemCardBody:{
        width: '100%',
        marginTop: PixelUtil.size(20),
        backgroundColor: '#ffffff',
        padding: PixelUtil.size(20),
        paddingTop: 0,
        borderWidth: PixelUtil.size(2),
        borderColor: '#cccccc',
        borderStyle: 'dashed',
        borderRadius: PixelUtil.size(22)
    },
    itemCardBodyHide:{
        display: "none"
    },
})
