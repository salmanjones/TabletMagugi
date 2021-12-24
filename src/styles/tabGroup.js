import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const tabGroupStyles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        height: PixelUtil.size(106),
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 0,
        borderRadius: 0,
    },
    buttonStyle: {
        width: PixelUtil.size(220),
        height: '100%',
        backgroundColor: '#fff',
        borderBottomWidth: PixelUtil.size(4),
        borderBottomColor: '#fff'
    },
    selectedButtonStyle: {
        width: PixelUtil.size(220),
        height: '100%',
        backgroundColor: '#EAF0FF',
        borderBottomWidth: PixelUtil.size(4),
        borderBottomColor: '#B8CBFF'
    },
    textStyle: {
        fontSize: PixelUtil.size(32),
        color: '#333',
    },
    selectedTextStyle: {
        fontSize: PixelUtil.size(32),
        color: '#111c3c',
    },
});
