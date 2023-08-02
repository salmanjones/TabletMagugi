import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const PanelCustomerStyles = StyleSheet.create({
    rightPanelMask: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        zIndex: 2000
    },
    rightPanelBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        zIndex: 2001,
    },
    leftPanMask: {
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
        zIndex: 2002,
    },
    hideIconBox: {
        width: PixelUtil.rect(84, 168).width,
        height: PixelUtil.rect(84, 168).height,
    },
    hideIconButton: {
        width: PixelUtil.rect(84, 168).width,
        height: PixelUtil.rect(84, 168).height,
    },
    memberWrapBox: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#f4f4f4',
    },
    memberInfoWrap: {
        width: '100%',
        height: PixelUtil.size(190),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    memberInfoBaseBox: {
        width: '100%',
        height: PixelUtil.size(164),
        paddingHorizontal: PixelUtil.size(50),
        paddingVertical: PixelUtil.size(36),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },
    customerInfoBaseBox: {
        width: '100%',
        height: PixelUtil.size(164),
        paddingHorizontal: PixelUtil.size(66),
        paddingVertical: PixelUtil.size(36),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
    },
    memberInfoSplit: {
        width: '100%',
        height: PixelUtil.size(56),
        backgroundColor: '#f7f8fc',
        borderTopLeftRadius: PixelUtil.size(28),
        borderTopRightRadius: PixelUtil.size(28),
    },
    nameInfoBaseBox: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    customerAvatar: {
        width: PixelUtil.size(82),
        height: PixelUtil.size(82),
        overflow: 'hidden',
        borderRadius: PixelUtil.size(42)
    },
    namePhoneBox: {
        height: '100%',
        marginLeft: PixelUtil.size(22),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    nameWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    nameShowText: {
        fontSize: PixelUtil.size(30),
        fontWeight: '700',
        color: '#ffffff',
        maxWidth: PixelUtil.size(150),
    },
    nameShowTextCustomer: {
        fontSize: PixelUtil.size(34),
        fontWeight: '700',
        color: '#ffffff',
        marginLeft: PixelUtil.size(20)
    },
    customerSexIcon: {
        marginLeft: PixelUtil.size(12),
        width: PixelUtil.size(42),
        height: PixelUtil.size(42),
    },
    phoneShowText: {
        fontSize: PixelUtil.size(26),
        fontWeight: '400',
        color: '#ffffff'
    },
    propertyInfoBaseBox: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    propertyInfoItemBox: {
        width: PixelUtil.size(170),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    propertyInfoItemBtnBox: {
        marginLeft: PixelUtil.size(50),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    propertyInfoItemBtn: {
        width: PixelUtil.size(146),
        height: PixelUtil.size(56),
    },
    propertyInfoItemTitle: {
        fontSize: PixelUtil.size(26),
        fontWeight: '400',
        color: '#ffffff'
    },
    propertyInfoItemValue: {
        fontSize: PixelUtil.size(26),
        fontWeight: '400',
        color: '#ffffff',
        marginTop: PixelUtil.size(14)
    },
    memberExtraInfoWrap: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
    },
    memberExtraTabWrap: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f8fc',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    memberExtraTabBox: {
        width: '100%',
        height: PixelUtil.size(60),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#e2e3e4',
        borderBottomWidth: PixelUtil.size(2),
        paddingHorizontal: PixelUtil.size(38),
    },
    memberExtraTabItem: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        marginRight: PixelUtil.size(70)
    },
    memberExtraTabItemTitle: {
        fontSize: PixelUtil.size(28),
        fontWeight: '700',
        color: '#1e1e1e'
    },
    memberExtraTabItemTitleActive: {
        fontSize: PixelUtil.size(28),
        fontWeight: '700',
        color: '#ffa200'
    },
    memberExtraTabItemLine: {
        width: PixelUtil.size(60),
        height: PixelUtil.size(4),
        borderRadius: PixelUtil.size(2),
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    memberExtraTabItemLineActive: {
        width: PixelUtil.size(60),
        height: PixelUtil.size(4),
        borderRadius: PixelUtil.size(2),
        backgroundColor: '#ffa200',
        overflow: 'hidden',
    },
    memberExtraTabReserveBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: PixelUtil.size(40),
        paddingVertical: PixelUtil.size(32),
        paddingTop: PixelUtil.size(0)
    },
    memberExtraTabContentBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: PixelUtil.size(40),
        paddingVertical: PixelUtil.size(32),
    },
    operatorWrap: {
        width: '100%',
        height: PixelUtil.size(150),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    operatorGuestWrap: {
        width: '100%',
        height: PixelUtil.size(150),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    operatorBtnCashier: {
        width: '50%',
        height: PixelUtil.size(150),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    operatorBtnCard: {
        width: '50%',
        height: PixelUtil.size(150),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    operatorBtnTxt: {
        fontSize: PixelUtil.size(38),
        color: '#ffffff',
        fontWeight: "900"
    },
    memberReserveBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: PixelUtil.size(26),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: PixelUtil.size(40),
        paddingTop: PixelUtil.size(40),
        position: 'relative'
    },
    startWorkStyle: {
        position: 'absolute',
        width: PixelUtil.size(146),
        height: PixelUtil.size(146),
        right: PixelUtil.size(32),
        top: PixelUtil.size(32),
    },
    memberReserveProperty: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(36)
    },
    memberReservePropertyOperator: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(48)
    },
    memberEditPropertyOperator: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(48),
        marginTop: PixelUtil.size(48),
    },
    memberReservePropertyBtnWrap: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(48)
    },
    memberReserveDescProperty: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(48)
    },
    memberReservePropertyTitle: {
        color: '#898888',
        fontSize: PixelUtil.size(26),
        fontWeight: '500',
        width: PixelUtil.size(158)
    },
    memberReservePropertyValue: {
        color: '#2D2D2D',
        fontSize: PixelUtil.size(26),
        fontWeight: '700',
    },
    memberReservePropertyRemark: {
        color: '#2d2d2d',
        fontSize: PixelUtil.size(26),
        padding: 0,
        fontWeight: '700',
        marginTop: PixelUtil.size(-8),
        width: PixelUtil.size(694),
    },
    memberReservePropertyDesc: {
        color: '#2d2d2d',
        fontSize: PixelUtil.size(26),
        padding: PixelUtil.size(24),
        fontWeight: '500',
        width: PixelUtil.size(694),
        height: PixelUtil.size(100),
        borderStyle: 'dashed',
        borderWidth: PixelUtil.size(2),
        borderColor: '#cdcdcd',
        backgroundColor: '#f9fafb',
        borderRadius: PixelUtil.size(10)
    },
    reservePropertyBtnValue: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        flexWrap: 'wrap',
        marginTop: PixelUtil.size(-20)
    },
    reservePropertyValueButton: {
        width: PixelUtil.size(146),
        height: PixelUtil.size(50),
        borderRadius: PixelUtil.size(26),
        backgroundColor: '#fff7ea',
        overflow: 'hidden',
        marginRight: PixelUtil.size(32),
        marginBottom: PixelUtil.size(20),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",

    },
    reservePropertyValueButtonActive: {
        width: PixelUtil.size(146),
        height: PixelUtil.size(50),
        borderRadius: PixelUtil.size(26),
        backgroundColor: '#FFA200',
        overflow: 'hidden',
        marginRight: PixelUtil.size(32),
        marginBottom: PixelUtil.size(20),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
    },
    reservePropertyValueButtonTxt: {
        fontWeight: '500',
        fontSize: PixelUtil.size(24),
        color: '#ffa200'
    },
    reservePropertyValueButtonTxtActive: {
        fontWeight: '500',
        fontSize: PixelUtil.size(24),
        color: '#FFFFFF'
    },
    memberReserveCancel: {
        width: PixelUtil.size(142),
        height: PixelUtil.size(36),
    },
    memberReserveCancelImage: {
        width: PixelUtil.size(142),
        height: PixelUtil.size(36),
        marginLeft: PixelUtil.size(20)
    },
    memberReserveCancelText: {
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
        fontWeight: '500'
    },
    memberReserveModify: {
        width: PixelUtil.size(200),
        height: PixelUtil.size(68),
        marginLeft: PixelUtil.size(32),
        borderRadius: PixelUtil.size(34),
        borderStyle: 'solid',
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        backgroundColor: '#111c3c',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    memberInfoModify: {
        width: PixelUtil.size(200),
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(34),
        borderStyle: 'solid',
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        backgroundColor: '#111c3c',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    memberReserveModifyText: {
        fontSize: PixelUtil.size(32),
        color: '#ffffff',
        fontWeight: '500'
    },
    memberCouponBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: PixelUtil.size(24)
    },
    memberCouponBg: {
        width: PixelUtil.size(778),
        height: PixelUtil.size(204),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    memberCouponPriceBox: {
        width: PixelUtil.size(212),
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
    },
    memberCouponPriceWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    memberCouponPrice: {
        fontSize: PixelUtil.size(36),
        fontWeight: '700',
        color: '#ffffff'
    },
    memberCouponPriceUnit: {
        fontSize: PixelUtil.size(26),
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: PixelUtil.size(4)
    },
    memberCouponDetailBox: {
        width: PixelUtil.size(566),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'center',
        padding: PixelUtil.size(18)
    },
    memberCouponDetailNameBox: {
        width: '100%',
        height: PixelUtil.size(64),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
    },
    memberCouponDetailNameTypeXJ: {
        width: PixelUtil.size(92),
        height: PixelUtil.size(30),
        borderRadius: PixelUtil.size(15),
        backgroundColor: '#ff6726',
        color: '#ffffff',
        fontSize: PixelUtil.size(20),
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: PixelUtil.size(4),
        position: 'absolute'
    },
    memberCouponDetailNameTypeZK: {
        width: PixelUtil.size(92),
        height: PixelUtil.size(30),
        borderRadius: PixelUtil.size(15),
        backgroundColor: '#A09AFD',
        color: '#ffffff',
        fontSize: PixelUtil.size(20),
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: PixelUtil.size(4),
        position: 'absolute'
    },
    memberCouponDetailNameTypeDK: {
        width: PixelUtil.size(92),
        height: PixelUtil.size(30),
        borderRadius: PixelUtil.size(15),
        backgroundColor: '#63D477',
        color: '#ffffff',
        fontSize: PixelUtil.size(20),
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: PixelUtil.size(4),
        position: 'absolute'
    },
    memberCouponDetailNameText: {
        width: '100%',
        lineHeight: PixelUtil.size(32),
        color: '#1a1a1a',
        fontSize: PixelUtil.size(24)
    },
    memberCouponDetailValidDateTxt: {
        width: '100%',
        textAlign: 'left',
        fontSize: PixelUtil.size(18),
        fontWeight: '500',
        color: '#b2b2b2',
        marginTop: PixelUtil.size(30)
    },
    memberCouponDetailDescBox: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginTop: PixelUtil.size(30)
    },
    memberCouponDetailDescLeftBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    memberCouponDetailDescLeftIcon: {
        width: PixelUtil.size(24),
        height: PixelUtil.size(24),
    },
    memberCouponDetailDescLeftText: {
        textAlign: 'left',
        fontSize: PixelUtil.size(18),
        fontWeight: '500',
        color: '#929292',
        marginLeft: PixelUtil.size(8),
        lineHeight: PixelUtil.size(36),
        width: PixelUtil.size(360),
        maxWidth: PixelUtil.size(360),
        overflow: 'hidden'
    },
    memberCouponDetailDescRightBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    memberCouponDetailDescRightText: {
        textAlign: 'right',
        fontSize: PixelUtil.size(18),
        fontWeight: '500',
        color: '#C49544',
        lineHeight: PixelUtil.size(36)
    },
    memberCouponDetailDescRightIcon: {
        marginLeft: PixelUtil.size(8),
        width: PixelUtil.size(24),
        height: PixelUtil.size(24),
        marginTop: PixelUtil.size(2)
    },
    memberCouponRuleBox: {
        width: PixelUtil.size(764),
        padding: PixelUtil.size(32),
        backgroundColor: '#fff',
        marginLeft: PixelUtil.size(9),
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    memberCouponSourceBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    memberCouponSourceTitle: {
        textAlign: 'left',
        fontSize: PixelUtil.size(22),
        color: '#363636',
        fontWeight: '500'
    },
    memberCouponSourceValue: {
        textAlign: 'left',
        fontSize: PixelUtil.size(22),
        color: '#9a9a9a',
        fontWeight: '500'
    },
    memberCouponRuleMargin: {
        marginTop: PixelUtil.size(16)
    },
    memberCouponRuleDetailWrap: {
        width: '100%',
        marginTop: PixelUtil.size(16),
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    memberCouponRuleDetailValue: {
        marginTop: PixelUtil.size(6),
        width: '100%',
    },
    memberProfileBox: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: PixelUtil.size(26),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: PixelUtil.size(50),
        paddingBottom: 0,
        position: 'relative'
    },
    memberModifyBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: PixelUtil.size(26),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: PixelUtil.size(50),
        paddingBottom: 0,
        position: 'relative'
    },
    memberProfileTitle: {
        width: '100%',
        display: "flex",
        justifyContent: "flex-start",
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(40)
    },
    memberPortraitBox: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: PixelUtil.size(26),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: PixelUtil.size(50),
        paddingBottom: 0,
        position: 'relative'
    },
    memberPortraitTitle: {
        width: '100%',
        display: "flex",
        justifyContent: "flex-start",
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(40)
    },
    contentBodyTitleIcon: {
        width: PixelUtil.size(20),
        height: PixelUtil.size(20),
        marginLeft: PixelUtil.size(-30)
    },
    contentBodyTitleValue: {
        fontSize: PixelUtil.size(34),
        color: '#2d2d2d',
        fontWeight: '900',
        marginLeft: PixelUtil.size(10)
    },
    memberPropertyBox: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(48)
    },
    memberPropertyTitle: {
        width: PixelUtil.size(184),
        fontSize: PixelUtil.size(26),
        color: '#898888',
        fontWeight: '500',
    },
    memberPropertyValue: {
        color: '#2D2D2D',
        fontSize: PixelUtil.size(26),
        fontWeight: '700',
    },
    memberPropertyValueBox: {
        height: PixelUtil.size(50),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        position: "relative"
    },
    memberPropertyValueInput: {
        color: '#2D2D2D',
        fontSize: PixelUtil.size(24),
        fontWeight: '700',
        backgroundColor: '#F9FAFB',
        borderRadius: PixelUtil.size(26),
        width: PixelUtil.size(440),
        height: PixelUtil.size(50),
        paddingLeft: PixelUtil.size(14)
    },
    contentBodyCalendarIcon: {
        width: PixelUtil.size(30),
        height: PixelUtil.size(26),
        marginLeft: PixelUtil.size(-56)
    },
    memberPropertyButtons: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    memberSexButton: {
        width: PixelUtil.size(146),
        height: PixelUtil.size(50),
        backgroundColor: '#FFF7EA',
        borderRadius: PixelUtil.size(25),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: PixelUtil.size(32)
    },
    memberSexActiveButton: {
        width: PixelUtil.size(146),
        height: PixelUtil.size(50),
        backgroundColor: '#FFA200',
        borderRadius: PixelUtil.size(25),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: PixelUtil.size(32)
    },
    memberSexButtonTxt: {
        fontSize: PixelUtil.size(24),
        fontWeight: '700',
        color: '#FFA200'
    },
    memberSexActiveButtonTxt: {
        fontSize: PixelUtil.size(24),
        fontWeight: '700',
        color: '#ffffff'
    },
    memberPortraitPTitle: {
        width: PixelUtil.size(132),
        fontSize: PixelUtil.size(26),
        color: '#898888',
        fontWeight: '500',
    },
    memberPortraitPValue: {
        color: '#2D2D2D',
        fontSize: PixelUtil.size(26),
        fontWeight: '700',
    },
    memberCardsBox: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    memberCardsTabBox: {
        width: '100%',
        height: PixelUtil.size(80),
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    memberCardsTabItem: {
        width: PixelUtil.size(168),
        height: PixelUtil.size(56),
        marginRight: PixelUtil.size(26),
        backgroundColor: '#ebedf2',
        borderRadius: PixelUtil.size(28),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    memberCardsTabItemText: {
        fontSize: PixelUtil.size(24),
        color: '#2d2d2d',
        fontWeight: '500',
    },
    memberCardsTabItemActive: {
        width: PixelUtil.size(168),
        height: PixelUtil.size(56),
        marginRight: PixelUtil.size(26),
        backgroundColor: '#f8ecd9',
        borderRadius: PixelUtil.size(28),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    memberCardsTabItemTextActive: {
        fontSize: PixelUtil.size(24),
        color: '#FFA200',
        fontWeight: '500',
    },
    memberCardsWrap: {
        flex: 1,
        width: '100%',
    },
    cardItemSeparator: {
        width: PixelUtil.size(1),
        height: PixelUtil.size(14)
    },
    cardItemBackground: {
        width: PixelUtil.size(472),
        height: PixelUtil.size(307),
        borderRadius: PixelUtil.size(20),
        marginRight: PixelUtil.size(14),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: "relative"
    },
    cardItemBackground2N: {
        width: PixelUtil.size(472),
        height: PixelUtil.size(307),
        borderRadius: PixelUtil.size(20),
        marginRight: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: "relative"
    },
    cardItemModeName: {
        color: "#ffefd5",
        fontSize: PixelUtil.size(20),
        marginLeft: PixelUtil.size(50),
        marginTop: PixelUtil.size(10)
    },
    cardItemModeNameWuXiao: {
        color: "#ffffff",
        fontSize: PixelUtil.size(20),
        marginLeft: PixelUtil.size(50),
        marginTop: PixelUtil.size(10)
    },
    cardItemContentBox: {
        marginTop: PixelUtil.size(12),
        width: PixelUtil.size(472),
        height: PixelUtil.size(172),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: "relative",
    },
    cardItemOtherBox: {
        marginTop: PixelUtil.size(0),
        width: PixelUtil.size(472),
        height: PixelUtil.size(72),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardItemOtherWrap: {
        width: PixelUtil.size(412),
        height: PixelUtil.size(72),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardItemChuZhiName: {
        width: PixelUtil.size(412),
        height: PixelUtil.size(96),
        color: '#5E3F20',
        lineHeight: PixelUtil.size(48),
        fontSize: PixelUtil.size(24),
        fontWeight: '700',
    },
    cardItemTaoCanName: {
        width: PixelUtil.size(412),
        height: PixelUtil.size(96),
        color: '#3C4C72',
        lineHeight: PixelUtil.size(48),
        fontSize: PixelUtil.size(24),
        fontWeight: '700',
    },
    cardItemWuXiaoName: {
        width: PixelUtil.size(412),
        height: PixelUtil.size(96),
        color: '#1A1A1A',
        lineHeight: PixelUtil.size(48),
        fontSize: PixelUtil.size(24),
        fontWeight: '700',
    },
    cardItemOperatorBox: {
        width: PixelUtil.size(412),
        height: PixelUtil.size(76),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardItemChuZhiBalance: {
        fontSize: PixelUtil.size(45),
        fontWeight: '700',
        color: '#5E3F20'
    },
    cardItemTaoCanBalance: {
        fontSize: PixelUtil.size(45),
        fontWeight: '700',
        color: '#081539'
    },
    cardItemWuXiaoBalance: {
        fontSize: PixelUtil.size(45),
        fontWeight: '700',
        color: '#5A5A5A'
    },
    cardItemYinCangBalance: {
        fontSize: PixelUtil.size(45),
        fontWeight: '700',
        color: '#5A5A5A00',
    },
    cardItemChuZhiOperator: {
        width: PixelUtil.size(130),
        height: PixelUtil.size(52),
        borderRadius: PixelUtil.size(26),
        backgroundColor: '#5E3F20',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardItemTaoCanOperator: {
        width: PixelUtil.size(130),
        height: PixelUtil.size(52),
        borderRadius: PixelUtil.size(26),
        backgroundColor: '#3C4C72',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardItemYanQiOperator: {
        width: PixelUtil.size(130),
        height: PixelUtil.size(52),
        borderRadius: PixelUtil.size(26),
        backgroundColor: '#353535',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardItemOperatorText: {
        fontSize: PixelUtil.size(30),
        fontWeight: '700',
        color: '#FFF2DC'
    },
    cardItemOperatorYanQiText: {
        fontSize: PixelUtil.size(30),
        fontWeight: '700',
        color: '#ffffff'
    },
    cardItemStore: {
        width: PixelUtil.size(186),
        fontSize: PixelUtil.size(20),
        fontWeight: '500',
        color: '#858585'
    },
    cardItemDate: {
        fontSize: PixelUtil.size(20),
        fontWeight: '500',
        color: '#858585'
    },
    cardItemWuXiaoDate: {
        fontSize: PixelUtil.size(20),
        fontWeight: '500',
        color: '#FF3636'
    },
    guestProfileBox: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: PixelUtil.size(26),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingHorizontal: PixelUtil.size(50),
        paddingVertical: PixelUtil.size(50),
        position: 'relative'
    },
    guestContentBox: {
        width: '100%',
        height: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    guestContentWaitBox: {
        width: '100%',
        height: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    guestScanResultBox: {
        width: PixelUtil.size(440),
        height: PixelUtil.size(440),
        marginTop: PixelUtil.size(110)
    },
    guestScanResultTxt: {
        fontSize: PixelUtil.size(44),
        color: '#1f1f1f',
        fontWeight: '700',
    },
    guestScanResultSubTxt: {
        fontSize: PixelUtil.size(32),
        color: '#5d5d5d',
        fontWeight: '500',
        marginTop: PixelUtil.size(20)
    },
    guestProfileTitle: {
        width: PixelUtil.size(608),
        fontWeight: '700',
        fontSize: PixelUtil.size(34),
        textAlign: 'center',
        lineHeight: PixelUtil.size(56)
    },
    guestProfileQRCode: {
        width: PixelUtil.size(390),
        height: PixelUtil.size(390),
        marginTop: PixelUtil.size(40)
    },
    guestProfileSearchBox: {
        marginTop: PixelUtil.size(60),
        width: '100%',
        height: PixelUtil.size(236),
        backgroundColor: '#F7F9FF',
        borderRadius: PixelUtil.size(28),
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    guestProfileCashierBox: {
        marginTop: PixelUtil.size(80),
        width: '100%',
        height: PixelUtil.size(236),
        backgroundColor: '#F7F9FF',
        borderRadius: PixelUtil.size(28),
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    guestProfileSearchTitle: {
        fontSize: PixelUtil.size(34),
        textAlign: 'center',
        fontWeight: '700',
        marginTop: PixelUtil.size(32),
    },
    headSearchBox: {
        width: '100%',
        height: PixelUtil.size(68),
        marginTop: PixelUtil.size(44),
        marginLeft: PixelUtil.size(82),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative'
    },
    headSearchIcon: {
        position: "absolute",
        left: PixelUtil.size(20),
        width: PixelUtil.size(42),
        height: PixelUtil.size(42),
        zIndex: 2002
    },
    headSearchInputEmpty: {
        width: PixelUtil.size(560),
        height: PixelUtil.size(68),
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: PixelUtil.size(34),
        paddingLeft: PixelUtil.size(72),
        color: '#292929',
        fontSize: PixelUtil.size(30)
    },
    headSearchButton: {
        marginLeft: PixelUtil.size(36),
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
        overflow: "hidden",
        borderRadius: PixelUtil.size(34)
    },
    headSearchButtonImg: {
        width: '100%',
        height: '100%',
        overflow: "hidden",
        borderRadius: PixelUtil.size(34)
    },
    guestProfileOrderBox: {
        width: '100%',
        height: PixelUtil.size(144),
        marginTop: PixelUtil.size(32),
        backgroundColor: '#F7F9FF',
        borderRadius: PixelUtil.size(28),
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    guestProfileOrderBoxNoBg: {
        width: '100%',
        height: PixelUtil.size(144),
        marginTop: PixelUtil.size(32),
        borderRadius: PixelUtil.size(28),
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    guestProfileOrderWrap: {
        width: PixelUtil.size(290),
        height: PixelUtil.size(80),
        borderRadius: PixelUtil.size(40),
    },
    guestProfileRescanWrap: {
        width: PixelUtil.size(200),
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(40),
        marginTop: PixelUtil.size(98)
    },
    guestProfileOrderImg: {
        width: PixelUtil.size(290),
        height: PixelUtil.size(80),
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    guestProfileTimeout: {
        width: PixelUtil.size(200),
        height: PixelUtil.size(68),
        backgroundColor: '#111c3c',
        borderRadius: PixelUtil.size(34),
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    guestProfileOrderTxt: {
        fontSize: PixelUtil.size(32),
        color: '#ffffff',
        fontWeight: '400',
        textAlign: "center",
        textAlignVertical: 'center',
    }
})
