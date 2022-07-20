import {StyleSheet} from 'react-native';
import {PixelUtil} from '../utils';

export const resetPwdStyles = StyleSheet.create({
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
    keyboardView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        width: '100%',
        height: '100%'
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
        width: PixelUtil.rect(677, 1142, 1920).width,
        height: PixelUtil.rect(677, 1142, 1920).height,
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
    // 标题
    titleWrap:{
        width: '100%',
        marginTop: PixelUtil.size(60, 1920),
        fontWeight: 'bold',
        fontSize: PixelUtil.size(44, 1920),
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    // 文本输入区域
    inputBox: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative",
        width: PixelUtil.rect(536, 81, 1920).width,
        height: PixelUtil.rect(536, 81, 1920).height,
    },
    inputBoxFirst: {
        marginTop: PixelUtil.size(61, 1920),
    },
    inputBoxOthers: {
        marginTop: PixelUtil.size(80, 1920),
    },
    // 文本框样式
    textInput: {
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
    textInputIcon: {
        width: PixelUtil.rect(27, 29, 1920).width,
        height: PixelUtil.rect(27, 29, 1920).height,
        position: "absolute",
        top: PixelUtil.size(26, 1920),
        left: PixelUtil.size(22, 1920)
    },
    // 警告框
    textInputTips: {
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
    textInputWarningIcon: {
        marginTop: PixelUtil.size(1),
        width: PixelUtil.rect(18, 18, 1920).width,
        height: PixelUtil.rect(18, 18, 1920).height,
    },
    inputTextContent:{
        color: "#F84C4C",
        fontSize: PixelUtil.size(20, 1920),
        marginLeft: PixelUtil.size(8)
    },
    // 验证码区域
    checkCodeBox: {
        width: PixelUtil.rect(536, 81, 1920).width,
        height: PixelUtil.rect(536, 81, 1920).height,
        marginTop: PixelUtil.size(80),
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkCodeInputBg: {
        width: PixelUtil.rect(303, 80, 1920).width,
        height: PixelUtil.rect(303, 80, 1920).height,
        position: "relative",
    },
    checkCodeInput: {
        width: '100%',
        height: '100%',
        borderWidth: PixelUtil.size(2),
        borderRadius: PixelUtil.size(40),
        borderColor: '#ffffff',
        borderStyle: 'solid',
        fontSize: PixelUtil.size(24, 1920),
        color: '#fff',
        padding: 0,
        paddingLeft: PixelUtil.size(23, 1920),
        paddingRight: PixelUtil.size(48, 1920)
    },
    checkCodeBtn: {
        width: PixelUtil.rect(200, 80, 1920).width,
        height: PixelUtil.rect(200, 80, 1920).height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9fa0a3',
        borderRadius: PixelUtil.size(40)
    },
    checkCodeBtnText: {
        fontSize: PixelUtil.size(26),
        color: "#FFF",
    },
    // 返回上一页
    submitBtnBack: {
        width: PixelUtil.rect(47, 47).width,
        height: PixelUtil.rect(47, 47).height,
        borderRadius: PixelUtil.size(47),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: PixelUtil.size(2),
        borderColor: '#ffffff',
        borderStyle: 'solid',
        position: "absolute",
        top: 0,
        right: PixelUtil.size(-92),
    },
    submitBtnBackText: {
        fontSize: PixelUtil.size(30),
        color: "#FFF",
        marginTop: PixelUtil.size(-4)
    },
    // 重置
    submitBox: {
        width: PixelUtil.rect(536, 81, 1920).width,
        height: PixelUtil.rect(536, 81, 1920).height,
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center'
    },
    submitBtnSave: {
        width: '100%',
        height: '100%',
        borderRadius: PixelUtil.size(40),
        backgroundColor: "#8244f1",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnSaveText: {
        fontSize: PixelUtil.size(26),
        color: "#FFF"
    },
    // 品牌
    unionBrands:{
        marginTop: PixelUtil.size(54, 1920),
        width: PixelUtil.rect(646, 37, 1920).width,
        height: PixelUtil.rect(646, 37, 1920).height,
    },
});
