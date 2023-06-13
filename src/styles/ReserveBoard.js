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
        backgroundColor: '#ffffff'
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
        width: PixelUtil.size(308),
        height: '100%',
        backgroundColor: '#ccffcc'
    },
    reserveCustomerBox:{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffcccc'
    }
})
