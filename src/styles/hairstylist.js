import {StyleSheet} from 'react-native';

export const hairstylistStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    flexBox: {
        flex: 0.9,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 47,
        paddingRight: 47,
        marginTop: 10,
        backgroundColor: '#fff'
    },
    flexLi: {
        width: 180,
        height: 256,
        borderRadius: 2,
        marginBottom: 20,
        backgroundColor: '#fff',
        marginRight: 30
    },
    imgStyle: {
        width: 180,
        height: 180
    },
    personInfo: {
        paddingTop: 6,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 11,
    },
    nameText: {
        fontSize: 16,
        color: '#333'
    },
    dutyText: {
        fontSize: 14,
        color: '#333'
    },
    priceText: {
        fontSize: 16,
        color: '#fe6868'
    },
    tipContent: {
        width: 400,
        flex: 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        position: 'absolute',
        top: 0
    },
    tipText: {
        fontSize: 14,
        color: '#9c9c9c'
    },
});
