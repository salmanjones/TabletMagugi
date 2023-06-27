import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const MemberPanelStyles = StyleSheet.create({
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
        paddingHorizontal: PixelUtil.size(66),
        paddingVertical: PixelUtil.size(36),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden'
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
        fontSize: PixelUtil.size(32),
        fontWeight: 700,
        color: '#ffffff'
    },
    customerSexIcon: {
        marginLeft: PixelUtil.size(12),
        width: PixelUtil.size(42),
        height: PixelUtil.size(42),
    },
    phoneShowText: {
        fontSize: PixelUtil.size(26),
        fontWeight: 400,
        color: '#ffffff'
    },
    propertyInfoBaseBox: {
        width: PixelUtil.size(510),
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
    propertyInfoItemTitle: {
        fontSize: PixelUtil.size(26),
        fontWeight: 400,
        color: '#ffffff'
    },
    propertyInfoItemValue: {
        fontSize: PixelUtil.size(26),
        fontWeight: 400,
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
        fontWeight: 700,
        color: '#1e1e1e'
    },
    memberExtraTabItemTitleActive: {
        fontSize: PixelUtil.size(28),
        fontWeight: 700,
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
    operatorBtnTxt:{
        fontSize: PixelUtil.size(38),
        color: '#ffffff',
        fontWeight: "900"
    },
    memberReserveBox:{
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
    startWorkStyle:{
        position: 'absolute',
        width: PixelUtil.size(146),
        height: PixelUtil.size(146),
        right: PixelUtil.size(32),
        top: PixelUtil.size(32),
    },
    memberReserveProperty:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(54)
    },
    memberReservePropertyBtnWrap:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(54)
    },
    memberReserveDescProperty:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(54)
    },
    memberReservePropertyTitle:{
        color: '#898888',
        fontSize: PixelUtil.size(26),
        fontWeight: 500
    },
    memberReservePropertyValue:{
        color: '#2D2D2D',
        fontSize: PixelUtil.size(26),
        fontWeight: 700
    },
    memberReservePropertyRemark:{
        color: '#2d2d2d',
        fontSize: PixelUtil.size(26),
        padding: 0,
        fontWeight: '700',
        marginTop: PixelUtil.size(-8)
    },
    memberReservePropertyDesc:{
        color: '#2d2d2d',
        fontSize: PixelUtil.size(26),
        padding: PixelUtil.size(24),
        fontWeight: '500',
        width: PixelUtil.size(694),
        height: PixelUtil.size(130),
        borderStyle: 'dashed',
        borderWidth: PixelUtil.size(2),
        borderColor: '#cdcdcd',
        backgroundColor: '#f9fafb',
        borderRadius: PixelUtil.size(10)
    },
    reservePropertyBtnValue:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        flexWrap: 'wrap',
        marginTop: PixelUtil.size(-20)
    },
    reservePropertyValueButton:{
        width: PixelUtil.size(146),
        height: PixelUtil.size(50),
        borderRadius: PixelUtil.size(26),
        backgroundColor : '#fff7ea',
        overflow: 'hidden',
        marginRight: PixelUtil.size(32),
        marginBottom: PixelUtil.size(20),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",

    },
    reservePropertyValueButtonActive:{
        width: PixelUtil.size(146),
        height: PixelUtil.size(50),
        borderRadius: PixelUtil.size(26),
        backgroundColor : '#FFA200',
        overflow: 'hidden',
        marginRight: PixelUtil.size(32),
        marginBottom: PixelUtil.size(20),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
    },
    reservePropertyValueButtonTxt:{
        fontWeight: 500,
        fontSize: PixelUtil.size(24),
        color: '#ffa200'
    },
    reservePropertyValueButtonTxtActive:{
        fontWeight: 500,
        fontSize: PixelUtil.size(24),
        color: '#FFFFFF'
    },
    memberReserveCancel:{
        width: PixelUtil.size(200),
        height: PixelUtil.size(68),
        marginLeft: PixelUtil.size(134),
        borderRadius: PixelUtil.size(34),
        borderStyle: 'solid',
        borderWidth: PixelUtil.size(2),
        borderColor: '#111c3c',
        backgroundColor: '#eaf0ff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    memberReserveCancelText:{
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
        fontWeight: '500'
    },
    memberReserveModify:{
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
    memberReserveModifyText:{
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
    memberCouponPriceWrap:{
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'baseline'
    },
    memberCouponPrice:{
        fontSize: PixelUtil.size(36),
        fontWeight: 700,
        color: '#ffffff'
    },
    memberCouponPriceUnit:{
        fontSize: PixelUtil.size(26),
        fontWeight: 700,
        color: '#ffffff',
        letterSpacing: PixelUtil.size(4)
    },
    memberCouponDetailBox:{
        width: PixelUtil.size(566),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: 'center',
        padding: PixelUtil.size(18)
    },
    memberCouponDetailNameBox:{
        width: '100%',
        height: PixelUtil.size(64),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
    },
    memberCouponDetailNameTypeXJ:{
        width: PixelUtil.size(92),
        height: PixelUtil.size(30),
        borderRadius: PixelUtil.size(15),
        backgroundColor:'#ff6726',
        color: '#ffffff',
        fontSize: PixelUtil.size(20),
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: PixelUtil.size(4),
        position: 'absolute'
    },
    memberCouponDetailNameTypeZK:{
        width: PixelUtil.size(92),
        height: PixelUtil.size(30),
        borderRadius: PixelUtil.size(15),
        backgroundColor:'#A09AFD',
        color: '#ffffff',
        fontSize: PixelUtil.size(20),
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: PixelUtil.size(4),
        position: 'absolute'
    },
    memberCouponDetailNameTypeDK:{
        width: PixelUtil.size(92),
        height: PixelUtil.size(30),
        borderRadius: PixelUtil.size(15),
        backgroundColor:'#63D477',
        color: '#ffffff',
        fontSize: PixelUtil.size(20),
        overflow: 'hidden',
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: PixelUtil.size(4),
        position: 'absolute'
    },
    memberCouponDetailNameText:{
        width: '100%',
        lineHeight: PixelUtil.size(32)
    },
    memberCouponDetailValidDateTxt:{
        width: '100%',
        textAlign: 'left',
        fontSize: PixelUtil.size(18),
        fontWeight: 500,
        color: '#b2b2b2',
        marginTop: PixelUtil.size(30)
    },
    memberCouponDetailDescBox:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        marginTop: PixelUtil.size(30)
    },
    memberCouponDetailDescLeftBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    memberCouponDetailDescLeftIcon:{
        width: PixelUtil.size(24),
        height: PixelUtil.size(24),
    },
    memberCouponDetailDescLeftText:{
        textAlign: 'left',
        fontSize: PixelUtil.size(18),
        fontWeight: 500,
        color: '#929292',
        marginLeft: PixelUtil.size(8),
        lineHeight: PixelUtil.size(36)
    },
    memberCouponDetailDescRightBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },
    memberCouponDetailDescRightText:{
        textAlign: 'right',
        fontSize: PixelUtil.size(18),
        fontWeight: 500,
        color: '#C49544',
        lineHeight: PixelUtil.size(36)
    },
    memberCouponDetailDescRightIcon:{
        marginLeft: PixelUtil.size(8),
        width: PixelUtil.size(24),
        height: PixelUtil.size(24),
        marginTop: PixelUtil.size(2)
    },
    memberCouponRuleBox:{
        width: PixelUtil.size(764),
        padding: PixelUtil.size(32),
        backgroundColor: '#fff',
        marginLeft: PixelUtil.size(9),
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    memberCouponSourceBox:{
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    memberCouponSourceTitle:{
        textAlign: 'left',
        fontSize: PixelUtil.size(22),
        color: '#363636',
        fontWeight: 500
    },
    memberCouponSourceValue:{
        textAlign: 'left',
        fontSize: PixelUtil.size(22),
        color: '#9a9a9a',
        fontWeight: 500
    },
    memberCouponRuleMargin:{
        marginTop: PixelUtil.size(16)
    },
    memberCouponRuleDetailWrap:{
        width: '100%',
        marginTop: PixelUtil.size(16),
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    memberCouponRuleDetailValue:{
        marginTop: PixelUtil.size(6),
        width: '100%',
    }
})
