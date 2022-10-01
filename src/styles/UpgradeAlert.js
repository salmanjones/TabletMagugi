import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

let boxWidth = PixelUtil.screenSize.width * 0.3852;
let boxHeight = PixelUtil.screenSize.height * 0.571;
let bgImgWidth = boxWidth;
let bgImgHeight = boxHeight * 0.45;
let topTitleMargin = bgImgHeight * 0.30
let footerHeight = PixelUtil.size(180);
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
        height: '100%',
        marginTop: PixelUtil.size(-26)
    },
    descTitle: {
        position: 'absolute',
        top: topTitleMargin,
        left: PixelUtil.size(81, 2048)
    },
    descTitleText: {
        fontSize: PixelUtil.size(32, 2048),
        color: "#FFFFFF",
    },
    descTitleNumber: {
        width: PixelUtil.rect(101, 44, 2048).width,
        height: PixelUtil.rect(101, 44, 2048).height,
        marginLeft: PixelUtil.size(22),
        lineHeight: PixelUtil.size(44, 2048),
        fontSize: PixelUtil.size(22, 2048),
        borderRadius: PixelUtil.size(22, 2048),
        backgroundColor: "#FFDB27",
        color: "#333",
        textAlign: 'center',
        overflow: 'hidden'
    },
    scrollWrap: {
        height: descHeight,
        // paddingTop: PixelUtil.size(5, 2048),
        paddingLeft: PixelUtil.size(85, 2048),
        paddingRight: PixelUtil.size(85, 2048),
    },
    titleWrap:{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    descCaption: {
        fontSize: PixelUtil.size(44, 2048),
        color: "#333",
        fontWeight:"500",
        letterSpacing: 2
    },
    descItem: {
        fontSize: PixelUtil.size(28, 2048),
        lineHeight: PixelUtil.size(45, 2048),
        color: "#333",
        marginTop: PixelUtil.size(30, 2048),
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
        width: PixelUtil.rect(230, 68, 2048).width,
        height: PixelUtil.rect(230, 68, 2048).height,
        lineHeight: PixelUtil.size(64, 2048),
        borderRadius: PixelUtil.size(34, 2048),
        backgroundColor: "#c5c5c5",
        textAlign: 'center',
        fontSize: PixelUtil.size(26, 2048),
        color: "#333",
        marginLeft: PixelUtil.size(92, 2048),
        overflow: 'hidden'
    },
    upgradeBtn: {
        width: PixelUtil.rect(230, 68, 2048).width,
        height: PixelUtil.rect(230, 68, 2048).height,
        lineHeight: PixelUtil.size(64, 2048),
        fontSize: PixelUtil.size(26, 2048),
        borderRadius: PixelUtil.size(34, 2048),
        backgroundColor: "#9963f9",
        color: "#fff",
        textAlign: 'center',
        marginRight: PixelUtil.size(92, 2048),
        overflow: 'hidden'
    },
    upgradeBtnSingle: {
        width: PixelUtil.rect(230, 68, 2048).width,
        height: PixelUtil.rect(230, 68, 2048).height,
        lineHeight: PixelUtil.size(64, 2048),
        fontSize: PixelUtil.size(26, 2048),
        borderRadius: PixelUtil.size(34, 2048),
        backgroundColor: "#9963f9",
        color: "#fff",
        textAlign: 'center',
        overflow: 'hidden'
    },
});
