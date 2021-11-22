import {StyleSheet} from 'react-native';
import {PixelUtil} from "utils";

export const loginStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6E7EB'
    },
    loginWrapper: {
        flex: 2,
        width: PixelUtil.rect(1920, 1200, 1920).width,
        // height:PixelUtil.rect(1920, 1200, 1920).height,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBox: {
        width: PixelUtil.rect(632, 747, 1920).width,
        height: PixelUtil.rect(632, 747, 1920).height,
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: "relative"
    },
    loginKeyView: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative"
    },
    loginLogo: {
        width: PixelUtil.rect(150, 154, 1920).width,
        height: PixelUtil.rect(150, 154, 1920).height,
        marginTop: PixelUtil.size(124, 1920),
    },
    loginTextBox: {
        flex: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: "relative"
    },
    loginTextTips: {
        fontSize: PixelUtil.size(18, 1920),
        color: "#121c3c",
        textAlign: "right",
        width: PixelUtil.size(360, 1920),
        position: "absolute",
        top: PixelUtil.size(104, 1920),
    },
    loginUserName: {
        width: PixelUtil.rect(360, 60, 1920).width,
        height: PixelUtil.rect(360, 60, 1920).height,
        marginTop: PixelUtil.size(42, 1920),
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(4),
        borderColor: '#ffffff',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        padding: 0,
        paddingLeft: PixelUtil.size(75, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    loginUserNameActive: {
        width: PixelUtil.rect(360, 60, 1920).width,
        height: PixelUtil.rect(360, 60, 1920).height,
        marginTop: PixelUtil.size(42, 1920),
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(4),
        borderColor: '#121c3c',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        padding: 0,
        paddingLeft: PixelUtil.size(75, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    loginUserNameIcon: {
        width: PixelUtil.rect(31, 42, 1920).width,
        height: PixelUtil.rect(31, 42, 1920).height,
        position: "absolute",
        top: PixelUtil.size(52, 1920),
        left: PixelUtil.size(10, 1920)
    },
    loginUserNameLine: {
        width: PixelUtil.rect(4, 42, 1920).width,
        height: PixelUtil.rect(4, 42, 1920).height,
        position: "absolute",
        top: PixelUtil.size(50, 1920),
        left: PixelUtil.size(57, 1920),
        backgroundColor: "#e0e0e0"
    },
    loginPassword: {
        width: PixelUtil.rect(360, 60, 1920).width,
        height: PixelUtil.rect(360, 60, 1920).height,
        marginTop: PixelUtil.size(40, 1920),
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(4),
        borderColor: '#ffffff',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        padding: 0,
        paddingLeft: PixelUtil.size(75, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    loginPasswordActive: {
        width: PixelUtil.rect(360, 60, 1920).width,
        height: PixelUtil.rect(360, 60, 1920).height,
        marginTop: PixelUtil.size(40, 1920),
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(4),
        borderColor: '#121c3c',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        padding: 0,
        paddingLeft: PixelUtil.size(75, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    loginPasswordIcon: {
        width: PixelUtil.rect(34, 37, 1920).width,
        height: PixelUtil.rect(34, 37, 1920).height,
        position: "absolute",
        top: PixelUtil.size(52, 1920),
        left: PixelUtil.size(10, 1920)
    },
    loginPasswordLine: {
        width: PixelUtil.rect(4, 42, 1920).width,
        height: PixelUtil.rect(4, 42, 1920).height,
        position: "absolute",
        top: PixelUtil.size(50, 1920),
        left: PixelUtil.size(56, 1920),
        backgroundColor: "#e0e0e0"
    },
    loginWarningIcon: {
        width: PixelUtil.rect(30, 30, 1920).width,
        height: PixelUtil.rect(30, 30, 1920).height,
        position: "absolute",
        top: PixelUtil.size(55, 1920),
        right: PixelUtil.size(10, 1920)
    },
    loginButton: {
        width: PixelUtil.rect(360, 60, 1920).width,
        height: PixelUtil.rect(360, 60, 1920).height,
        marginTop: PixelUtil.size(40, 1920),
        borderRadius: PixelUtil.size(6),
        backgroundColor: "#121c3c",
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: "#ffffff",
        fontSize: PixelUtil.size(24, 1920),
    },
    loginForgetPwd: {
        fontSize: PixelUtil.size(24, 1920),
        color: "#121c3c",
        textAlign: "right",
        width: PixelUtil.size(360, 1920),
        marginTop: PixelUtil.size(24, 1920)
    },
    copyright: {
        color: "#ffffff",
        fontSize: PixelUtil.size(20, 1920),
        top: PixelUtil.size(131, 1920)
    }
});
