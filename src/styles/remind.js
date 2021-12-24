import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let boxWidth = PixelUtil.screenSize.width * 0.39;
let boxHeight = PixelUtil.screenSize.height * 0.60;
let topheight = PixelUtil.size(90, 1920);
let footerHeight = PixelUtil.size(105, 1920);
;
let descheight = boxHeight - topheight - footerHeight;

export const remindStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 99
    },

    content: {
        position: "relative",
        width: boxWidth,
        height: boxHeight,
        backgroundColor: "#fff",
        borderRadius: PixelUtil.size(18),
    },
    remindHeader: {
        position: "relative",
        backgroundColor: "#fff",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: topheight,
        borderRadius: PixelUtil.size(18),
    },
    remindTitle: {
        fontSize: PixelUtil.size(32, 1920),
        fontWeight: 'bold'
    },
    //可滚动文字
    scrollWrap: {
        height: descheight,
        paddingTop: PixelUtil.size(10, 1920),
        paddingBottom: PixelUtil.size(10, 1920),
        paddingRight: PixelUtil.size(47, 1920),
        paddingLeft: PixelUtil.size(47, 1920),
    },
    thanksText: {
        lineHeight: PixelUtil.size(42, 1920),
        fontSize: PixelUtil.size(28, 1920),
        color: "#333",
    },
    notice: {
        lineHeight: PixelUtil.size(42, 1920),
        fontSize: PixelUtil.size(28, 1920),
        color: "#333",
    },
    highLight: {
        fontSize: PixelUtil.size(28, 1920),
        lineHeight: PixelUtil.size(36, 1920),
        color: "#2688ED",
        fontWeight: 'bold'
    },
    footer: {
        width: '100%',
        height: footerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    laterButtonText: {
        width: PixelUtil.rect(230, 68, 1920).width,
        height: PixelUtil.rect(230, 68, 1920).height,
        fontSize: PixelUtil.size(30, 1920),
        lineHeight: PixelUtil.size(68, 1920),
        borderRadius: PixelUtil.size(34),
        backgroundColor: "#999999",
        color: "#fff",
        textAlign: 'center',
        marginLeft: PixelUtil.size(92, 1920),
        overflow: 'hidden'
    },
    nowButtonText: {
        width: PixelUtil.rect(230, 68, 1920).width,
        height: PixelUtil.rect(230, 68, 1920).height,
        fontSize: PixelUtil.size(30, 1920),
        lineHeight: PixelUtil.size(68, 1920),
        borderRadius: PixelUtil.size(34),
        backgroundColor: "#111C3C",
        color: "#fff",
        textAlign: 'center',
        marginRight: PixelUtil.size(92, 1920),
        overflow: 'hidden'
    },
});
