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
        backgroundColor: '#f4f4f4',
    },
    headerBox:{
        width: '100%',
        height: PixelUtil.size(210),
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
    memberBodyWrap: {
        flex: 1,
        width: '100%',
        position: 'relative',
        backgroundColor: '#ffffff'
    },
    memberBodyEmptyWrap: {
        width: '100%',
        height: PixelUtil.size(200),
        marginTop: PixelUtil.size(254),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        height: PixelUtil.size(0),
    },
    profileItemBox: {
        width: '100%',
        height: PixelUtil.size(146),
        paddingHorizontal: PixelUtil.size(40)
    },
    profileItemWrap:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        borderBottomWidth: PixelUtil.size(2),
        borderColor: '#e3e3e3',
        borderStyle: 'solid'
    },
    profileItemLastWrap:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    leftWrap:{
        height: PixelUtil.size(98),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative'
    },
    rightWrap:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    nameBox:{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative'
    },
    nameWrap:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    numberBox:{
        marginLeft: PixelUtil.size(70),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    timeBox:{
        marginLeft: PixelUtil.size(60),
        width: PixelUtil.size(280),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    nameText:{
        fontSize: PixelUtil.size(34),
        fontWeight: '700',
        color: '#000000',
        width: PixelUtil.size(184),
    },
    sexWrap:{
        width: PixelUtil.size(40),
        height: PixelUtil.size(40),
    },
    titleText:{
        marginTop: PixelUtil.size(6),
        fontSize: PixelUtil.size(26),
        fontWeight: '500',
        color: '#7C7C7C'
    },
    valueText:{
        fontSize: PixelUtil.size(26),
        fontWeight: '700',
        color: '#2E2E2E'
    },
    createBtnBox:{
        width: PixelUtil.size(172),
        height: PixelUtil.size(68),
        borderRadius: PixelUtil.size(34)
    },
    createBtnImg:{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createBtnTxt:{
        fontSize: PixelUtil.size(32),
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center'
    }
})
