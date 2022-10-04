//libs
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let naviBarHeight = PixelUtil.size(120, 2048)
let footerHeight = 0
let bodyHeight = PixelUtil.screenSize.height - naviBarHeight - footerHeight

export const staffWorksStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    content: {
        flex: 1,
        position: "relative",
    },
    iconImg: {
        width: PixelUtil.size(130, 2048),
        height: PixelUtil.size(130, 2048)
    },
    imgBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },
    workImg: {
        width: '100%',
        height: '100%',
    },
    dotsWrapperStyle: {
        bottom: PixelUtil.size(273, 2048),
        backgroundColor: '#00000030',
        paddingTop: PixelUtil.size(20),
        paddingBottom: PixelUtil.size(20),
        paddingLeft: PixelUtil.size(34, 2048),
        paddingRight: PixelUtil.size(24, 2048),
        borderRadius: PixelUtil.size(20, 2048),
        borderWidth: PixelUtil.size(2, 2048),
        borderColor: '#00000000'
    },
    activeDot:{
        width: PixelUtil.size(16, 2048),
        height: PixelUtil.size(16, 2048),
        borderWidth: PixelUtil.size(2, 2048),
        borderColor: '#00000000',
        borderRadius: PixelUtil.size(20, 2048),
        backgroundColor: '#111f3c',
        marginRight: PixelUtil.size(10, 2048)
    },
    normalDot:{
        width: PixelUtil.size(16, 2048),
        height: PixelUtil.size(16, 2048),
        borderWidth: PixelUtil.size(2, 2048),
        borderColor: '#00000000',
        borderRadius: PixelUtil.size(20, 2048),
        backgroundColor: '#ffffff',
        marginRight: PixelUtil.size(10, 2048)
    },
    footerWrap:{
        width: '100%',
        height: PixelUtil.size(148, 2048),
        backgroundColor: '#00000040',
        position: "absolute",
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: PixelUtil.size(40, 2048),
        paddingRight: PixelUtil.size(40, 2048),
        zIndex: 200
    },
    footerLeft:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    staffPhoto:{
        width: PixelUtil.size(94, 2048),
        height: PixelUtil.size(94, 2048),
        borderRadius: PixelUtil.size(94, 2048),
        backgroundColor: '#ffffff',
        borderWidth: PixelUtil.size(3, 2048),
        borderColor: '#ffffff',
    },
    staffName:{
        fontSize: PixelUtil.size(34, 2048),
        fontWeight: "bold",
        color: '#ffffff',
        marginLeft: PixelUtil.size(24, 2048)
    },
    likeCountImg:{
        marginLeft: PixelUtil.size(44, 2048),
        width: PixelUtil.size(34, 2048),
        height: PixelUtil.size(34, 2048)
    },
    likeCountTxt:{
        fontSize: PixelUtil.size(34, 2048),
        color: '#fff',
        marginLeft: PixelUtil.size(10, 2048)
    },
    footerRight:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    cashierBtn: {
        paddingLeft: PixelUtil.size(40, 2048),
        paddingRight: PixelUtil.size(40, 2048),
        paddingTop: PixelUtil.size(20, 2048),
        paddingBottom: PixelUtil.size(20, 2048),
        backgroundColor: '#ffffff40',
        borderWidth: PixelUtil.size(3, 2048),
        borderColor: '#ffffff00',
        borderRadius: PixelUtil.size(40, 2048),
    },
    cashierBtnTxt:{
        fontSize: PixelUtil.size(30, 2048),
        color: '#fff',
    },
    videoBox:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
});
