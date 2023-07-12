import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const PanelReserveStyles = StyleSheet.create({
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
    contentWrapBox: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#f4f4f4',
    },
    contentHeadBox:{
        width: '100%',
        height: PixelUtil.size(364),
    },
    contentHeadWrap:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: PixelUtil.size(24),
        paddingHorizontal: PixelUtil.size(30)
    },
    contentHeadTitle:{
        width: '100%',
        fontWeight: '700',
        fontSize: PixelUtil.size(32),
        color: '#ffffff',
        textAlign: 'left'
    },
    headSearchBox:{
        width: '100%',
        height: PixelUtil.size(68),
        marginTop: PixelUtil.size(16),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative'
    },
    headSearchIcon:{
        position: "absolute",
        left: PixelUtil.size(20),
        width: PixelUtil.size(42),
        height: PixelUtil.size(42),
        zIndex: 2002
    },
    headSearchInput:{

    },
    headSearchInputEmpty:{
        width: PixelUtil.size(752),
        height: PixelUtil.size(68),
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: PixelUtil.size(34),
        paddingLeft: PixelUtil.size(72),
        color: '#292929',
        fontSize: PixelUtil.size(30)
    },
    headSearchInputFull:{
        width: PixelUtil.size(560),
        height: PixelUtil.size(68),
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: PixelUtil.size(34),
        paddingLeft: PixelUtil.size(72),
        color: '#292929',
        fontSize: PixelUtil.size(30)
    },
    headSearchButton:{
        marginLeft: PixelUtil.size(36),
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
        overflow: "hidden",
        borderRadius: PixelUtil.size(34)
    },
    headSearchButtonImg:{
        width: '100%',
        height: '100%',
        overflow: "hidden",
        borderRadius: PixelUtil.size(34)
    },
    headClearButton:{
        marginLeft: PixelUtil.size(20),
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
        overflow: "hidden",
        borderRadius: PixelUtil.size(34)
    },
    headClearButtonImg:{
        width: '100%',
        height: '100%',
        overflow: "hidden",
        borderRadius: PixelUtil.size(34)
    },
    userInfoEmptyBox:{
        width: '100%',
        height: PixelUtil.size(130),
        marginTop: PixelUtil.size(24),
        borderRadius: PixelUtil.size(24),
        borderStyle: 'dashed',
        borderWidth: PixelUtil.size(2),
        borderColor: '#58595f',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    searchUserInfoTips:{
        width: PixelUtil.size(384),
        height: PixelUtil.size(38),
    },
    searchUserInfoEmptyTips:{
        width: PixelUtil.size(644),
        height: PixelUtil.size(38),
    },
    userInfoFullBox:{
        width: '100%',
        height: PixelUtil.size(130),
        marginTop: PixelUtil.size(24),
        borderRadius: PixelUtil.size(24),
        borderStyle: 'dashed',
        borderWidth: PixelUtil.size(2),
        borderColor: '#58595f',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: PixelUtil.size(44),
        paddingVertical: PixelUtil.size(16)
    },
    userInfoWrapBox:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfoLeftBox:{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    customerAvatar: {
        width: PixelUtil.size(80),
        height: PixelUtil.size(80),
        overflow: 'hidden',
        borderRadius: PixelUtil.size(40)
    },
    customerEasyInfo: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: PixelUtil.size(22)
    },
    customerEasyNameSex:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    nameShowText: {
        fontSize: PixelUtil.size(32),
        fontWeight: '700',
        color: '#ffffff'
    },
    sexShowText:{
        fontSize: PixelUtil.size(26),
        fontWeight: '400',
        color: '#ffffff',
        marginLeft: PixelUtil.size(8)
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
    userInfoRightBox:{
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    chuzhikaBox:{
        height: PixelUtil.size(72),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: PixelUtil.size(70)
    },
    cikaBox:{
        height: PixelUtil.size(72),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: PixelUtil.size(70)
    },
    yueBox:{
        height: PixelUtil.size(72),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    propertyInfoItemTitle: {
        fontSize: PixelUtil.size(26),
        fontWeight: '400',
        color: '#ffffff'
    },
    propertyInfoItemValue: {
        fontSize: PixelUtil.size(26),
        fontWeight: '400',
        color: '#ffffff'
    },
    contentBodyBox:{
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff'
    },
    contentBodyWrap:{
        width: '100%',
        height: '100%',
        paddingHorizontal: PixelUtil.size(50),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    contentBodyTitle:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    contentBodyTitleIcon:{
        width: PixelUtil.size(20),
        height: PixelUtil.size(20),
        marginLeft: PixelUtil.size(-30)
    },
    contentBodyTitleValue:{
        fontSize: PixelUtil.size(34),
        color: '#2d2d2d',
        fontWeight: '900',
        marginLeft: PixelUtil.size(10)
    },
    customerReserveDetailBox:{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: PixelUtil.size(32),
    },
    reservePropertyBox:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: "relative",
    },
    reservePropertyMiddleBox:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: "relative",
    },
    reservePropertyRequired:{
        color: '#F50000',
        fontSize: PixelUtil.size(22),
        position: "absolute",
        left: PixelUtil.size(-14)
    },
    reservePropertyTitle: {
        fontWeight: '500',
        fontSize: PixelUtil.size(26),
        color: '#898888',
        width: PixelUtil.size(134)
    },
    reservePropertyValue:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        flexWrap: 'wrap',
    },
    reservePropertyCustomerName:{
        width: PixelUtil.size(738),
        height: PixelUtil.size(56),
        borderRadius: PixelUtil.size(28),
        backgroundColor: '#F9FAFB',
        color: '#292929',
        paddingHorizontal: PixelUtil.size(24)
    },
    reservePropertyMarginTop:{
        marginTop: PixelUtil.size(50)
    },
    reservePropertyRemarkTop:{
        marginTop: PixelUtil.size(24)
    },
    reservePropertyText:{
        fontWeight: '700',
        fontSize: PixelUtil.size(26),
        color: '#2d2d2d'
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
        fontWeight: '500',
        fontSize: PixelUtil.size(24),
        color: '#ffa200'
    },
    reservePropertyValueButtonTxtActive:{
        fontWeight: '500',
        fontSize: PixelUtil.size(24),
        color: '#FFFFFF'
    },
    reservePropertyRemark:{
        width: '100%',
        height: PixelUtil.size(130),
        justifyContent:'flex-start',
        color: '#292929',
        fontSize: PixelUtil.size(24),
        backgroundColor: '#f9fafb',
        borderRadius: PixelUtil.size(12),
        borderStyle: 'dashed',
        borderWidth: PixelUtil.size(2),
        borderColor: '#cdcdcd',
        paddingHorizontal: PixelUtil.size(24),
        paddingVertical: PixelUtil.size(24)
    },
    contentFootBox:{
        width: '100%',
        height: PixelUtil.size(150)
    },
    contentFootBoxImg:{
        width: '100%',
        height: PixelUtil.size(150)
    }
})
