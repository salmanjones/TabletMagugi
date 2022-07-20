import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const loginStyles = StyleSheet.create({
    hidden: {
        display: "none"
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6E7EB',
        width: '100%',
        height: '100%'
    },
    // 自动收缩键盘
    loginKeyView: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
    },
    // 登录背景层
    loginWrapper: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 登录框
    loginBox: {
        width: PixelUtil.rect(677, 853, 1920).width,
        height: PixelUtil.rect(677, 853, 1920).height,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: "relative",
        backgroundColor: 'rgba(70, 70, 70, 0.76)',
        borderRadius: PixelUtil.size(20),
        borderWidth: PixelUtil.size(2),
        borderStyle: 'solid',
        borderColor: '#fff'
    },
    // Logo
    loginLogo: {
        width: PixelUtil.rect(509, 237, 1920).width,
        height: PixelUtil.rect(509, 237, 1920).height,
        marginTop: PixelUtil.size(26, 1920),
    },
    // 文本框区域
    loginTextBox: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        width: PixelUtil.rect(536, 81, 1920).width,
        height: PixelUtil.rect(536, 81, 1920).height,
        marginTop: PixelUtil.size(60, 1920),
    },
    // 文本框区域-密码
    loginTextBoxPwd: {
        marginTop: PixelUtil.size(83, 1920),
    },
    // 用户名
    loginUserName: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#ffffff',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(61, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    loginUserNameActive: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#8244F1',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(61, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    loginUserNameIcon: {
        width: PixelUtil.rect(27, 29, 1920).width,
        height: PixelUtil.rect(27, 29, 1920).height,
        position: "absolute",
        top: PixelUtil.size(26, 1920),
        left: PixelUtil.size(22, 1920)
    },
    // 密码
    loginPassword: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#ffffff',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(61, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    loginPasswordActive: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#8244F1',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(61, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    loginPasswordIcon: {
        width: PixelUtil.rect(27, 29, 1920).width,
        height: PixelUtil.rect(27, 29, 1920).height,
        position: "absolute",
        top: PixelUtil.size(26, 1920),
        left: PixelUtil.size(22, 1920)
    },
    // 警告框
    loginTextTips: {
        width: PixelUtil.size(536, 1920),
        position: "absolute",
        bottom: PixelUtil.size(-40, 1920),
        right: 0,
        display:"flex",
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: "center",
        zIndex: 10
    },
    loginWarningIcon: {
        marginTop: PixelUtil.size(1),
        width: PixelUtil.rect(18, 18, 1920).width,
        height: PixelUtil.rect(18, 18, 1920).height,
    },
    loginTextContent:{
        color: "#F84C4C",
        fontSize: PixelUtil.size(20, 1920),
        marginLeft: PixelUtil.size(8)
    },
    // 忘记密码
    loginForgetPwd: {
        width: PixelUtil.size(236, 1920),
        position: "absolute",
        bottom: PixelUtil.size(-40, 1920),
        left: PixelUtil.size(20),
        display:"flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        zIndex: 20
    },
    loginForgetPwdTxt:{
        color: '#fff',
        fontSize: PixelUtil.size(20, 1920),
    },
    // 登录按钮
    loginButton: {
        width: PixelUtil.rect(536, 81, 1920).width,
        height: PixelUtil.rect(536, 81, 1920).height,
        marginTop: PixelUtil.size(100, 1920),
        borderRadius: PixelUtil.size(40),
        backgroundColor: "#8244f1",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: "#ffffff",
        fontSize: PixelUtil.size(24, 1920),
    },
    // 品牌
    unionBrands:{
        marginTop: PixelUtil.size(54, 1920),
        width: PixelUtil.rect(646, 37, 1920).width,
        height: PixelUtil.rect(646, 37, 1920).height,
    },
    // 版权
    copyright: {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        color: "#79787A",
        fontSize: PixelUtil.size(20, 1920),
        bottom: PixelUtil.size(50, 1920)
    }
});
