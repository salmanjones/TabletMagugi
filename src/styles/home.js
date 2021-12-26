//libs
import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let naviBarHeight = PixelUtil.size(136, 1920);
let footerHeight = PixelUtil.size(170, 1920);
let bodyHeight = PixelUtil.screenSize.height - naviBarHeight - footerHeight;
let operateBoxHeight = bodyHeight * 0.30;
let operateBoxMargin = operateBoxHeight * 0.20;
export const homeStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    logoutWrapper: {
        display: 'flex',
        //首页头部
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: naviBarHeight,
        marginTop:  PixelUtil.size(-50, 2548),
        marginLeft: PixelUtil.size(75, 2548),
        marginRight: PixelUtil.size(75, 2548),
    },
    logoutText: {
        //首页头部
        fontSize: PixelUtil.size(36, 2548),
        color: 'white',
    },
    logout: {
        //首页头部-图标
        width: PixelUtil.rect(52.3, 62, 2548).width,
        height: PixelUtil.rect(57.2, 523, 2548).height,
        marginRight: 10,
        resizeMode: 'contain',
    },
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        width: '100%',
        height: bodyHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    operateWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    operateBox: {
        width: operateBoxHeight,
        height: operateBoxHeight,
        borderRadius: PixelUtil.size(49.77, 2548),
        marginLeft: operateBoxMargin / 2,
        marginRight: operateBoxMargin / 2,
        marginTop: operateBoxMargin / 2,
        marginBottom: operateBoxMargin / 2
    },
    operateBoxItem: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    liText: {
        //首页版块-文字
        fontSize: PixelUtil.size(35),
        color: '#04172B',
        textAlign: 'center',
        marginTop: PixelUtil.size(20),
    },
    imgStyle: {
        //首页版块-图标
        width: PixelUtil.rect(48, 48).width,
        height: PixelUtil.rect(48, 48).height,
    },
    imgStyleOther: {
        //首页版块-图标
        width: PixelUtil.rect(48, 48).width,
        height: PixelUtil.rect(48, 48).height,
    },
    imgStyleCount: {
        //首页版块-图标
        width: PixelUtil.rect(58, 58).width,
        height: PixelUtil.rect(58, 58).height,
    },
    footer: {
        width: '100%',
        height: footerHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    footerLogo: {
        width: PixelUtil.rect(40, 40, 1920).width,
        height: PixelUtil.rect(40, 40, 1920).height,
    },
    footerAbout: {
        fontSize: PixelUtil.size(44.79, 2548),
        color: '#4F546C',
        marginLeft: PixelUtil.size(20, 1920)
    },

    //以下样式应用在开下主界面的下方
    logoContent: {
        //首页版权-主体
        width: PixelUtil.rect(523, 62, 2548).width,
        height: PixelUtil.rect(523, 62, 2548).height,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: PixelUtil.size(47, 2548),
        position: 'absolute',
        bottom: 0,
    },
    copyText: {
        //首页版权-文字
        fontSize: PixelUtil.size(44.79, 2548),
        color: '#4F546C',
    },
});
