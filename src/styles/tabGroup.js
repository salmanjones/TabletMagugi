import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const tabGroupStyles = StyleSheet.create({

    containerStyle: {
        width: '100%',
        height: PixelUtil.size(66),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'none',
        borderWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
    },
    selectedButtonStyle: {
        width: PixelUtil.size(177),
        height: PixelUtil.size(66),
        borderRadius: PixelUtil.size(100),
        textAlign: 'center',
        lineHeight: PixelUtil.size(66),
        backgroundColor: '#fff',
        marginLeft: PixelUtil.size(80),
    },
    textStyle: {
        fontSize: PixelUtil.size(32),
        color: '#fff',
    },
    selectedTextStyle: {
        fontSize: PixelUtil.size(32),
        color: '#FFA200',
    },
});
