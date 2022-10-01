//libs
import React from 'react';
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const modalLoadingStyles = StyleSheet.create({
    modalBackground: {
        flex: 0,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000000',
        zIndex: 65536,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#00040e99',
        height: PixelUtil.size(210),
        width: PixelUtil.size(210),
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center'
    },
    loadingText: {
        color: '#fff',
        fontSize: PixelUtil.size(24),
        marginTop: PixelUtil.size(24)
    }
});
