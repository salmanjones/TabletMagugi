import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const ReserveBoardStyles = StyleSheet.create({
    boardWrapBox: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    reserveFlagBox:{
        width: '100%',
        height: PixelUtil.size(142),
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(36)
    },
    reserveValidStyle:{
        width: PixelUtil.size(290),
        height: PixelUtil.size(80),
        overflow: 'hidden',
        borderTopLeftRadius: PixelUtil.size(40),
        borderBottomLeftRadius: PixelUtil.size(40),
        backgroundColor: '#eaf0ff',
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        borderStyle: 'solid',
        borderRightWidth: 0,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reserveValidActiveStyle:{
        width: PixelUtil.size(290),
        height: PixelUtil.size(80),
        overflow: 'hidden',
        borderTopLeftRadius: PixelUtil.size(40),
        borderBottomLeftRadius: PixelUtil.size(40),
        backgroundColor: '#111c3c',
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        borderStyle: 'solid',
        borderRightWidth: 0,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reserveInvalidStyle:{
        width: PixelUtil.size(290),
        height: PixelUtil.size(80),
        overflow: 'hidden',
        borderTopRightRadius: PixelUtil.size(40),
        borderBottomRightRadius: PixelUtil.size(40),
        backgroundColor: '#eaf0ff',
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        borderStyle: 'solid',
        borderLeftWidth: 0,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reserveInvalidActiveStyle:{
        width: PixelUtil.size(290),
        height: PixelUtil.size(80),
        overflow: 'hidden',
        borderTopRightRadius: PixelUtil.size(40),
        borderBottomRightRadius: PixelUtil.size(40),
        backgroundColor: '#111c3c',
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        borderStyle: 'solid',
        borderLeftWidth: 0,
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reserveFlagTxt:{
        fontWeight: '400',
        fontSize: PixelUtil.size(32),
        color: '#111c3c'
    },
    reserveFlagTxtActive:{
        fontWeight: '400',
        fontSize: PixelUtil.size(32),
        color: '#ffffff'
    },
    reserveInfoBox:{
        flex: 1,
        position: 'relative',
        backgroundColor: '#ffffff'
    },
    reserveDetailWrap:{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    reserveStylistBox:{
        width: PixelUtil.size(306),
        height: '100%',
        borderRightWidth: PixelUtil.size(2),
        borderColor: '#cbcbcb',
        borderStyle: 'solid',
    },
    reserveStylistItemBox:{
        width: '100%',
        height: PixelUtil.size(124),
        display: "flex",
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    reserveStylistItem:{
        width: PixelUtil.size(236),
        height: PixelUtil.size(100),
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderRadius: PixelUtil.size(20),
        borderWidth: PixelUtil.size(2),
        borderColor: '#cecece',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reserveStylistItemActive:{
        width: PixelUtil.size(236),
        height: PixelUtil.size(100),
        backgroundColor: '#111c3c',
        overflow: 'hidden',
        borderRadius: PixelUtil.size(20),
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        borderStyle: 'solid',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reserveStylistItemText:{
        fontSize: PixelUtil.size(28),
        color: '#2d2d2d',
        fontWeight: "700"
    },
    reserveStylistItemTextActive:{
        fontSize: PixelUtil.size(30),
        color: '#ffffff',
        fontWeight: "500"
    },
    reserveCustomerBox:{
        flex: 1,
        position: 'relative'
    },
    reserveCustomersWrap:{
        width: '100%',
        marginBottom: PixelUtil.size(24),
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    reserveCustomersBox:{
        width: PixelUtil.size(1676),
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    reserveCustomerTimersBox:{
        width: '100%',
        height: PixelUtil.size(60),
        borderRadius: PixelUtil.size(6),
        backgroundColor: '#f5f8ff',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    reserveTimerRecent:{
        marginLeft: PixelUtil.size(16),
        width: PixelUtil.size(36),
        height: PixelUtil.size(36)
    },
    reserveTimerPass:{
        marginLeft: PixelUtil.size(16),
        width: PixelUtil.size(36),
        height: PixelUtil.size(36)
    },
    reserveCustomerTimerRecentTxt:{
        width: PixelUtil.size(98),
        fontWeight: '700',
        fontSize: PixelUtil.size(32),
        color: '#ffa200',
        marginLeft: PixelUtil.size(12),
    },
    reserveCustomerTimerWaitTxt:{
        width: PixelUtil.size(98),
        fontWeight: '700',
        fontSize: PixelUtil.size(32),
        color: '#111C3C',
        marginLeft: PixelUtil.size(12)
    },
    reserveCustomerRecentTips:{
        width: PixelUtil.size(134),
        height: PixelUtil.size(44),
        borderRadius: PixelUtil.size(6),
        backgroundColor: '#ffa200',
        marginLeft: PixelUtil.size(42),
        overflow: 'hidden',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    reserveCustomerRecentTipsTxt:{
        fontWeight: '700',
        fontSize: PixelUtil.size(27),
        color: '#ffffff',
    },
    reserveCustomerListRecentWrap:{
        marginTop: PixelUtil.size(24),
        width: PixelUtil.size(1614),
        padding: PixelUtil.size(30),
        backgroundColor: '#ecf0ff',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    reserveCustomerListWaitWrap:{
        marginTop: PixelUtil.size(24),
        width: PixelUtil.size(1614),
        padding: PixelUtil.size(30),
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    reserveCustomerDetailWrap:{
        position:"relative"
    },
    reserveCustomerDetailBox:{
        width: PixelUtil.size(496),
        height: PixelUtil.size(164),
        paddingHorizontal: PixelUtil.size(20),
        paddingVertical: PixelUtil.size(24),
        borderRadius: PixelUtil.size(22),
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        position:"relative"
    },
    reserveCustomerDetailMiddleBox:{
        width: PixelUtil.size(496),
        height: PixelUtil.size(164),
        marginLeft: PixelUtil.size(32),
        marginRight: PixelUtil.size(32),
        paddingHorizontal: PixelUtil.size(20),
        paddingVertical: PixelUtil.size(24),
        borderRadius: PixelUtil.size(22),
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        position:"relative"
    },
    reserveCustomerDelIconBox:{
        width: PixelUtil.size(48),
        height: PixelUtil.size(48),
        position: 'absolute',
        top: PixelUtil.size(20),
        left: PixelUtil.size(430),
        zIndex: 2000
    },
    reserveCustomerDelIcon:{
        width: PixelUtil.size(44),
        height: PixelUtil.size(44),
    },
    reserveCustomerAvatar: {
        width: PixelUtil.size(62),
        height: PixelUtil.size(62),
        overflow: 'hidden',
        borderRadius: PixelUtil.size(32)
    },
    reserveCustomerInfo: {
        width: PixelUtil.size(382),
        height: '100%',
        marginLeft: PixelUtil.size(12),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    reserveCustomerNameBox: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    reserveCustomerNameNoPhoneBox:{
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: PixelUtil.size(12)
    },
    reserveCustomerBlackTxt:{
        color: '#4D4D4D',
    },
    reserveCustomerNameTxt:{
        fontWeight: '700',
        fontSize: PixelUtil.size(28),
        color: '#ffffff',
        maxWidth: PixelUtil.size(140),
    },
    reserveCustomerSexIcon:{
        marginLeft: PixelUtil.size(12),
        width: PixelUtil.size(38),
        height: PixelUtil.size(38),
        marginTop: PixelUtil.size(4)
    },
    reserveCustomerPhoneBox:{
        width: '100%',
        marginTop: PixelUtil.size(10)
    },
    reserveCustomerPhoneText:{
        color: '#ffffff',
        fontSize: PixelUtil.size(20)
    },
    reserveCustomerTypeBox: {
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    reserveCustomerTypeNoPhoneBox:{
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: PixelUtil.size(30)
    },
    reserveCustomerTypeIcon: {
        width: PixelUtil.size(40),
        height: PixelUtil.size(40),
    },
    reserveCustomerTypeText:{
        fontWeight: '500',
        fontSize: PixelUtil.size(26),
        color: '#ffffff',
        marginLeft: PixelUtil.size(10)
    },
    reserveCustomerTypeSplit:{
        marginLeft: PixelUtil.size(10),
        width: PixelUtil.size(2),
        height: PixelUtil.size(18),
        backgroundColor: '#fff'
    },
    reserveCustomerTypeSplitBlack:{
        marginLeft: PixelUtil.size(10),
        width: PixelUtil.size(2),
        height: PixelUtil.size(18),
        backgroundColor: '#4d4d4d'
    },
    reserveCustomerTypeStaff:{
        fontWeight: '500',
        fontSize: PixelUtil.size(26),
        color: '#ffffff',
        marginLeft: PixelUtil.size(10)
    }
})
