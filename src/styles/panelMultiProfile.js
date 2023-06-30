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
    contentHeadTitle:{
        width: '100%',
        fontWeight: 700,
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

})
