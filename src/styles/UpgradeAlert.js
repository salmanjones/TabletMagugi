import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let boxWidth = PixelUtil.screenSize.width * 0.39;
let boxHeight = PixelUtil.screenSize.height * 0.58;
let bgImgWidth = boxWidth;
let bgImgHeight = boxHeight * 0.45;
let topTitleMargin = bgImgHeight * 0.30
let footerHeight = PixelUtil.size(120);
let descHeight = boxHeight - bgImgHeight - footerHeight;
export const UpgradeAlertStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    //背景层
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#00000060',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 110,
    },
    content: {
        position: "relative",
        width: boxWidth,
        height: boxHeight,
        backgroundColor: "#ffffffff",
        borderRadius: 10
    },
    bgImgWrap: {
        width: bgImgWidth,
        height: bgImgHeight,
        position: "relative",
    },
    bgImgItem: {
        width: '100%',
        height: '100%'
    },
    descTitle: {
        position: 'absolute',
        top: topTitleMargin,
        left: PixelUtil.size(81, 1920)
    },
    descTitleText: {
        fontSize: PixelUtil.size(32, 1920),
        color: "#FFFFFF",
    },
    descTitleNumber: {
        fontSize: PixelUtil.size(32, 1920),
        color: "#FFFFFF",
        marginTop: PixelUtil.size(20, 1920),
    },
    scrollWrap: {
        height: descHeight,
        paddingTop: PixelUtil.size(5, 1920),
        paddingLeft: PixelUtil.size(85, 1920),
        paddingRight: PixelUtil.size(85, 1920),
    },
    descCaption: {
        fontSize: PixelUtil.size(28, 1920),
        color: "#000",
        marginTop: PixelUtil.size(40, 1920),
    },
    descItem: {
        fontSize: PixelUtil.size(28, 1920),
        lineHeight: PixelUtil.size(45, 1920),
        color: "#000",
        marginTop: PixelUtil.size(30, 1920),
    },
    footer: {
        width: '100%',
        height: footerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    footerSingle: {
        width: '100%',
        height: footerHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    laterBtn: {
        width: PixelUtil.rect(230, 68, 1920).width,
        height: PixelUtil.rect(230, 68, 1920).height,
        lineHeight: PixelUtil.size(64, 1920),
        borderRadius: PixelUtil.size(34, 1920),
        backgroundColor: "#999",
        textAlign: 'center',
        fontSize: PixelUtil.size(32, 1920),
        color: "#fff",
        marginLeft: PixelUtil.size(92, 1920),
        overflow: 'hidden'
    },
    upgradeBtn: {
        width: PixelUtil.rect(230, 68, 1920).width,
        height: PixelUtil.rect(230, 68, 1920).height,
        lineHeight: PixelUtil.size(64, 1920),
        fontSize: PixelUtil.size(32, 1920),
        borderRadius: PixelUtil.size(34, 1920),
        backgroundColor: "#111C3C",
        color: "#fff",
        textAlign: 'center',
        marginRight: PixelUtil.size(92, 1920),
        overflow: 'hidden'
    },
    upgradeBtnSingle: {
        width: PixelUtil.rect(230, 68, 1920).width,
        height: PixelUtil.rect(230, 68, 1920).height,
        lineHeight: PixelUtil.size(64, 1920),
        fontSize: PixelUtil.size(32, 1920),
        borderRadius: PixelUtil.size(34, 1920),
        backgroundColor: "#111C3C",
        color: "#fff",
        textAlign: 'center',
        overflow: 'hidden'
    },
});
