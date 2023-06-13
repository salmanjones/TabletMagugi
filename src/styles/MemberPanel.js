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
    }
})
