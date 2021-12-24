//libs
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const selectCustomerTypeStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
    },
    openOrderBox: {
        width: PixelUtil.size(1300),
        height: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
    },
    orderGenre: {
        marginLeft: '2%',
        flex: 1,
        textAlign: 'right',
        width: PixelUtil.rect(376, 376).width,
        height: PixelUtil.rect(376, 376).height,
    },
});
