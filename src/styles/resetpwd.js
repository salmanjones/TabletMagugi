import {StyleSheet} from 'react-native';
import {PixelUtil} from "utils";

export const resetPwdStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    inputBox: {
        width: PixelUtil.rect(610, 70).width,
        height: PixelUtil.rect(610, 70).height,
        position: "relative"
    },
    inputBoxMargin: {
        width: PixelUtil.rect(610, 70).width,
        height: PixelUtil.rect(610, 70).height,
        position: "relative",
        marginTop: PixelUtil.size(40)
    },
    textInput: {
        width: PixelUtil.rect(450, 70).width,
        height: PixelUtil.rect(450, 70).height,
        backgroundColor: 'transparent',
        fontSize: PixelUtil.size(32),
        padding: 0,
        position: "absolute",
        top: 0,
        left: PixelUtil.size(120),
    },
    textInputWarningIcon: {
        width: PixelUtil.rect(30, 30, 1920).width,
        height: PixelUtil.rect(30, 30, 1920).height,
        position: "absolute",
        top: PixelUtil.size(18, 1920),
        right: PixelUtil.size(10, 1920)
    },
    textInputTips: {
        fontSize: PixelUtil.size(18),
        color: "#121c3c",
        textAlign: "right",
        width: PixelUtil.rect(610, 70).width,
        position: "absolute",
        top: PixelUtil.size(72),
    },
    textInputTipsCheckCode: {
        fontSize: PixelUtil.size(18),
        color: "#121c3c",
        textAlign: "right",
        width: PixelUtil.rect(417, 70).width,
        position: "absolute",
        top: PixelUtil.size(72),
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    checkCodeBox: {
        width: PixelUtil.rect(610, 70).width,
        height: PixelUtil.rect(610, 70).height,
        marginTop: PixelUtil.size(80),
        flex: 0,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    checkCodeInputBg: {
        width: PixelUtil.rect(417, 70).width,
        height: PixelUtil.rect(417, 70).height,
        position: "relative",
        marginRight: PixelUtil.size(18),
    },
    checkCodeInput: {
        width: PixelUtil.rect(417, 70).width,
        height: PixelUtil.rect(417, 70).height,
        backgroundColor: 'transparent',
        fontSize: PixelUtil.size(32),
        padding: 0,
        position: "absolute",
        top: 0,
        paddingLeft: PixelUtil.size(20),
        paddingRight: PixelUtil.size(20),
    },
    checkCodeBtn: {
        width: PixelUtil.rect(174, 70).width,
        height: PixelUtil.rect(174, 70).height,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkCodeBtnText: {
        fontSize: PixelUtil.size(23),

        color: "#FFF",
    },
    submitBox: {
        width: PixelUtil.rect(556, 70).width,
        height: PixelUtil.rect(556, 70).height,
        flex: 0,
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: PixelUtil.size(92)
    },
    submitBtnBack: {
        width: PixelUtil.rect(228, 96).width,
        height: PixelUtil.rect(228, 96).height,
        backgroundColor: "#999",
        borderWidth: PixelUtil.size(2),
        borderStyle: "solid",
        borderColor: "#999",
        borderRadius: PixelUtil.size(8),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnBackText: {
        fontSize: PixelUtil.size(32),

        color: "#FFF"
    },
    submitBtnSave: {
        width: PixelUtil.rect(228, 96).width,
        height: PixelUtil.rect(228, 96).height,
        backgroundColor: "#111C3C",
        borderWidth: PixelUtil.size(2),
        borderStyle: "solid",
        borderColor: "#111C3C",
        borderRadius: PixelUtil.size(8),
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnSaveText: {
        fontSize: PixelUtil.size(32),

        color: "#FFF"
    }
});
