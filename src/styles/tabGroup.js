import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const tabGroupStyles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        height: PixelUtil.size(106),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: PixelUtil.size(-2)
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderBottomWidth: PixelUtil.size(4),
        borderBottomColor: '#fff'
    },
    selectedButtonStyle: {
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
