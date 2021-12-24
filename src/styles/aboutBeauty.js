import {Dimensions, StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let screenSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
let contentWidth = screenSize.width * 0.78;
let contentHeight = screenSize.height * 0.76;
let headerHeight = PixelUtil.size(120, 1920);
let footerHeight = PixelUtil.size(150, 1920);
let bodyHeight = contentHeight
    - headerHeight
    - footerHeight;
let logoWrapHeight = bodyHeight * 0.35;
let scrollWrapHeight = bodyHeight - logoWrapHeight;
let scrollItemHeight = scrollWrapHeight / 4;

export const aboutBeautyStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#00000050',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 210,
    },
    content: {
        width: contentWidth,
        height: contentHeight,
        backgroundColor: "#fff",
        borderRadius: PixelUtil.size(18),
        display: "flex",
    },
    header: {
        height: headerHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        borderBottomWidth: PixelUtil.size(2),
        borderBottomColor: '#cbcbcb'
    },
    title: {
        fontSize: PixelUtil.size(32, 1920),
    },
    closeable: {
        top: PixelUtil.size(39.9, 1920),
        right: PixelUtil.size(39.9, 1920),
        position: "absolute",
        zIndex: 99999
    },
    closeIcon: {
        width: PixelUtil.rect(35.1, 35.1, 1920).width,
        height: PixelUtil.rect(35.1, 35.1, 1920).height
    },
    body: {
        height: bodyHeight,
        width: '100%',
    },
    logoWrap: {
        height: logoWrapHeight,
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    logoImg: {
        width: PixelUtil.rect(120, 120, 1920).width,
        height: PixelUtil.rect(120, 120, 1920).height,
    },
    //滚动区域
    scrollWrap: {
        height: scrollWrapHeight,
        paddingLeft: PixelUtil.size(140, 1920),
        paddingRight: PixelUtil.size(140, 1920),
    },
    scrollItem: {
        height: scrollItemHeight,
        position: "relative",
        borderBottomWidth: PixelUtil.size(1),
        borderBottomColor: '#cbcbcb',
        display: 'flex',
        justifyContent: 'flex-end',
    },

    descItem: {
        fontSize: PixelUtil.size(28, 1920),
        color: "#000",
        marginBottom: PixelUtil.size(20, 1920),
    },

    descItemRight: {
        display: 'flex',
        textAlign: 'right',
        fontSize: PixelUtil.size(28, 1920),
        color: "#000",
        position: "absolute",
        right: 0,
        bottom: PixelUtil.size(20, 1920),
    },

    descItemRightIcon: {
        width: PixelUtil.rect(14, 25.8, 1920).width,
        height: PixelUtil.rect(14, 25.8, 1920).height,
        display: 'flex',
        textAlign: 'right',
        position: "absolute",
        right: 0,
        bottom: 0,
        marginBottom: PixelUtil.size(20, 1920),
    },

    footer: {
        width: '100%',
        height: footerHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    // 声明
    statement: {
        fontSize: PixelUtil.size(28, 1920),
        color: "#c9c9c9",
    },
});
