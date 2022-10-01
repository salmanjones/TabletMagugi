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
        width: PixelUtil.rect(677, 853, 2048).width,
        height: PixelUtil.rect(677, 853, 2048).height,
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
        width: PixelUtil.rect(509, 237, 2048).width,
        height: PixelUtil.rect(509, 237, 2048).height,
        marginTop: PixelUtil.size(26, 2048),
    },
    // 文本框区域
    loginTextBox: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        width: PixelUtil.rect(536, 81, 2048).width,
        height: PixelUtil.rect(536, 81, 2048).height,
        marginTop: PixelUtil.size(60, 2048),
    },
    // 文本框区域-密码
    loginTextBoxPwd: {
        marginTop: PixelUtil.size(83, 2048),
    },
    // 用户名
    loginUserName: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#ffffff',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 2048),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(61, 2048),
        paddingRight: PixelUtil.size(48, 2048)
    },
    loginUserNameActive: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#8244F1',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 2048),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(61, 2048),
        paddingRight: PixelUtil.size(48, 2048)
    },
    loginUserNameIcon: {
        width: PixelUtil.rect(27, 29, 2048).width,
        height: PixelUtil.rect(27, 29, 2048).height,
        position: "absolute",
        top: PixelUtil.size(26, 2048),
        left: PixelUtil.size(22, 2048)
    },
    // 密码
    loginPassword: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#ffffff',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 2048),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(61, 2048),
        paddingRight: PixelUtil.size(48, 2048)
    },
    loginPasswordActive: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#8244F1',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 2048),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(61, 2048),
        paddingRight: PixelUtil.size(48, 2048)
    },
    loginPasswordIcon: {
        width: PixelUtil.rect(27, 29, 2048).width,
        height: PixelUtil.rect(27, 29, 2048).height,
        position: "absolute",
        top: PixelUtil.size(26, 2048),
        left: PixelUtil.size(22, 2048)
    },
    // 警告框
    loginTextTips: {
        width: PixelUtil.size(536, 2048),
        position: "absolute",
        bottom: PixelUtil.size(-40, 2048),
        right: 0,
        display:"flex",
        flexDirection: "row",
        justifyContent: 'flex-end',
        alignItems: "center",
        zIndex: 10
    },
    loginWarningIcon: {
        marginTop: PixelUtil.size(1),
        width: PixelUtil.rect(18, 18, 2048).width,
        height: PixelUtil.rect(18, 18, 2048).height,
    },
    loginTextContent:{
        color: "#F84C4C",
        fontSize: PixelUtil.size(20, 2048),
        marginLeft: PixelUtil.size(8)
    },
    // 忘记密码
    loginForgetPwd: {
        width: PixelUtil.size(236, 2048),
        position: "absolute",
        bottom: PixelUtil.size(-40, 2048),
        left: PixelUtil.size(20),
        display:"flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        zIndex: 20
    },
    loginForgetPwdTxt:{
        color: '#fff',
        fontSize: PixelUtil.size(20, 2048),
    },
    // 登录按钮
    loginButton: {
        width: PixelUtil.rect(536, 81, 2048).width,
        height: PixelUtil.rect(536, 81, 2048).height,
        marginTop: PixelUtil.size(100, 2048),
        borderRadius: PixelUtil.size(40),
        backgroundColor: "#8244f1",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: "#ffffff",
        fontSize: PixelUtil.size(24, 2048),
    },
    // 品牌
    unionBrands:{
        marginTop: PixelUtil.size(54, 2048),
        width: PixelUtil.rect(646, 37, 2048).width,
        height: PixelUtil.rect(646, 37, 2048).height,
    },
    // 版权
    copyright: {
        width: '100%',
        textAlign: 'center',
        position: 'absolute',
        color: "#79787A",
        fontSize: PixelUtil.size(20, 2048),
        bottom: PixelUtil.size(50, 2048)
    }
});
