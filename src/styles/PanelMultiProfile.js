import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const PanelMultiProfiles = StyleSheet.create({
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
        backgroundColor: '#F7F8FC',
    },
    contentWrapOtherBox: {
        flex:1,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: '#F7F8FC',
    },
    headerBox:{
        width: '100%',
        height: PixelUtil.size(210),
    },
    headerOtherBox:{
        width: '100%',
        height: PixelUtil.size(130),
        backgroundColor: '#ffffff'
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
    contentHeadOtherWrap:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: PixelUtil.size(24),
        paddingHorizontal: PixelUtil.size(40)
    },
    contentHeadTxtWrap:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: PixelUtil.size(30)
    },
    contentHeadTitle:{
        width: '100%',
        fontWeight: '700',
        fontSize: PixelUtil.size(32),
        color: '#ffffff',
        textAlign: 'left'
    },
    contentHeadTitleTxt:{
        width: '100%',
        fontWeight: '700',
        fontSize: PixelUtil.size(32),
        color: '#ffffff',
        textAlign: 'left',
        marginTop: PixelUtil.size(-27)
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
    headSearchOtherInputEmpty:{
        width: PixelUtil.size(692),
        height: PixelUtil.size(68),
        backgroundColor: '#F2F6FC',
        overflow: 'hidden',
        borderRadius: PixelUtil.size(34),
        paddingLeft: PixelUtil.size(72),
        color: '#292929',
        fontSize: PixelUtil.size(30),
        borderColor: '#CBCBCB',
        borderWidth: PixelUtil.size(2)
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
    headSearchOtherInputFull:{
        width: PixelUtil.size(500),
        height: PixelUtil.size(68),
        backgroundColor: '#F2F6FC',
        overflow: 'hidden',
        borderRadius: PixelUtil.size(34),
        paddingLeft: PixelUtil.size(72),
        color: '#292929',
        fontSize: PixelUtil.size(30),
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
    memberBodyWrap: {
        flex: 1,
        width: '100%',
        position: 'relative',
        paddingBottom: PixelUtil.size(30)
    },
    memberBodyPayWrap:{
        flex: 1,
        width: '100%',
        position: 'relative',
        paddingVertical: PixelUtil.size(30)
    },
    memberBodyEmptyWrap: {
        width: '100%',
        height: PixelUtil.size(200),
        marginTop: PixelUtil.size(180),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    memberOtherBodyEmptyWrap: {
        width: '100%',
        height: PixelUtil.size(200),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: PixelUtil.size(80),
    },
    memberBodyEmptyImage:{
        width: PixelUtil.size(440),
        height: PixelUtil.size(440),
    },
    memberBodyEmptyTxt: {
        textAlign: 'center',
        fontSize: PixelUtil.size(30),
        color: '#aeaeae'
    },
    profileItemSplit:{
        width: '100%',
        height: PixelUtil.size(24),
        backgroundColor: '#F7F8FC'
    },
    profileItemBox: {
        width: '100%',
        height: PixelUtil.size(284),
        paddingHorizontal: PixelUtil.size(30),
        backgroundColor: '#F7F8FC',
    },
    profileItemWrap:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: PixelUtil.size(18)
    },
    createBtnBox: {
        width: PixelUtil.size(160),
        height: PixelUtil.size(60),
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 100
    },
    createBtnImg:{
        width: '100%',
        height: '100%',
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    createBtnTxt:{
        fontSize: PixelUtil.size(32),
        color: '#ffffff',
        fontWeight: "700"
    },
    profileItemInnerBox:{
        width: '100%',
        height: '100%',
        paddingTop: PixelUtil.size(30),
        paddingHorizontal: PixelUtil.size(30),
        paddingBottom: PixelUtil.size(24)
    },
    profileItemRender:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    nameBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    nameBoxText:{
        fontSize: PixelUtil.size(34),
        color: '#3A3A3A',
        fontWeight: "700",
        maxWidth: PixelUtil.size(236),
    },
    sexWrap:{
        width: PixelUtil.size(40),
        height: PixelUtil.size(40),
        marginLeft: PixelUtil.size(12)
    },
    customerDetailBox:{
        marginTop: PixelUtil.size(12),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    customerDetailIcon:{
        width: PixelUtil.size(28),
        height: PixelUtil.size(28),
        marginRight: PixelUtil.size(8)
    },
    customerDetailText:{
        marginRight: PixelUtil.size(30),
        fontSize: PixelUtil.size(24),
        color: '#636363',
        fontWeight: "500",
    },
    customerDetailCard:{
        marginTop: PixelUtil.size(24),
        width: '100%',
        height: PixelUtil.size(112),
        borderRadius: PixelUtil.size(20),
        borderWidth: PixelUtil.size(2),
        borderStyle: 'dashed',
        borderColor: '#D6D6D6',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    customerDetailCardItem:{
        width: '33.3333333%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    customerDetailCardItemTitle:{
        fontSize:  PixelUtil.size(26),
        color: '#9d9d9d',
        fontWeight: "500"
    },
    customerDetailCardItemValue:{
        fontSize:  PixelUtil.size(30),
        color: '#3A3A3A',
        fontWeight: "900",
        marginTop: PixelUtil.size(12)
    }
})
