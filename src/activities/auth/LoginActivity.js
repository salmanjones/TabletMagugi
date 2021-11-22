//libs
import React from 'react';
import { connect } from "react-redux";
import { View, ImageBackground, Image, TextInput, KeyboardAvoidingView, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { ModalLoadingIndicator, RemindBoxer, } from "components";
import { loginInputChangeAction, loginInputFoucusinAction, loginInputFoucusoutAction, loginSubmitAction, linkToResetpwdAction } from 'actions';
import { loginStyles } from 'styles';
import { resetNavigationTo,systemConfig } from 'utils';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowRemindBoxer: true,
        };
    }

    componentDidMount() {
        if (this.props.isLoggedIn && this.props.userInfo) {
            resetNavigationTo('HomeActivity', this.props.navigation.dispatch, {
                title: this.props.userInfo.storeName
            });
        }

        // 1:是第一次安装
        AsyncStorage.getItem('isFirstInstall')
            .then((value) => {
                console.log('isFirstInstall:' + value);
                if (value == '0') {
                    this.setState({ isShowRemindBoxer: false });
                } else {
                    this.setState({ isShowRemindBoxer: true });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //打开隐私声明
    openLink(url, title){
        this.props.navigation.navigate('GenWebViewActivity', {'url': url, "title": title});
    }

    render() {
        const { isShowRemindBoxer } = this.state;
        return (
            <View style={ loginStyles.container }>
                <ModalLoadingIndicator loading={ this.props.formValues.loading } />
                { isShowRemindBoxer && (
                    <RemindBoxer style={RemindBoxer.hidden} openLink={this.openLink.bind(this)}></RemindBoxer>
                )}
                <KeyboardAvoidingView behavior="padding" style={ loginStyles.loginKeyView }>
                    <ImageBackground style={ loginStyles.loginWrapper } resizeMode={'cover'} source={ require("@imgPath/login-background.png") }>
                        <ImageBackground style={ loginStyles.loginBox } source={ require("@imgPath/login-box.png") }>
                            <Image resizeMethod="resize"  style={ loginStyles.loginLogo } source={ require("@imgPath/login-logo.png") }></Image>

                                <View style={ loginStyles.loginTextBox }>
                                    <TextInput type="name-phone-pad" keyboardType="email-address"
                                        style={ this.props.formValues.focus == 'username' ? loginStyles.loginUserNameActive : loginStyles.loginUserName }
                                        underlineColorAndroid="transparent"
                                        maxLength={ 20 } placeholder="工号"
                                        placeholderTextColor="#999999" value={ this.props.formValues.username }
                                        onChangeText={ this.props.unameChangeAction }
                                        onFocus={ this.props.unameFoucusinAction }
                                        onBlur={ this.props.unameFoucusoutAction }
                                    />
                                    <Image resizeMethod="resize"  style={ loginStyles.loginUserNameIcon } source={ require("@imgPath/login-uname.png") }></Image>
                                    <View style={ loginStyles.loginUserNameLine }></View>
                                    <Image resizeMethod="resize"  style={ this.props.formValues.usernameValid ? loginStyles.hidden : loginStyles.loginWarningIcon } source={ require("@imgPath/login-warning.png") }></Image>
                                    <Text style={ this.props.formValues.usernameValid ? loginStyles.hidden : loginStyles.loginTextTips }>
                                        { this.props.formValues.usernameTips }
                                    </Text>
                                </View>
                                <View style={ loginStyles.loginTextBox }>
                                    <TextInput style={ this.props.formValues.focus == 'password' ? loginStyles.loginPasswordActive : loginStyles.loginPassword }
                                        underlineColorAndroid="transparent"
                                        maxLength={ 20 } secureTextEntry={ true } placeholder="密码"
                                        placeholderTextColor="#999999" value={ this.props.formValues.password }
                                        onChangeText={ this.props.pwdChangeAction }
                                        onFocus={ this.props.pwdFoucusinAction }
                                        onBlur={ this.props.pwdFoucusoutAction }
                                    />
                                    <Image resizeMethod="resize"  style={ loginStyles.loginPasswordIcon } source={ require("@imgPath/login-pwd.png") }></Image>
                                    <View style={ loginStyles.loginPasswordLine }></View>
                                    <Image resizeMethod="resize"  style={ this.props.formValues.passwordValid ? loginStyles.hidden : loginStyles.loginWarningIcon } source={ require("@imgPath/login-warning.png") }></Image>
                                    <Text style={ this.props.formValues.passwordValid ? loginStyles.hidden : loginStyles.loginTextTips }>
                                        { this.props.formValues.passwordTips }
                                    </Text>
                                </View>

                                <TouchableOpacity style={ loginStyles.loginButton } onPress={ this.props.submitForm } underlayColor="#162247">
                                    <Text style={ loginStyles.loginButtonText }>登录</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.props.formValues.disabledResetPwd ? null:this.props.resetPwd} underlayColor="transparent" hitSlop={{top:0,left:5,right:0,bottom:15}}>
                                    <Text style={ loginStyles.loginForgetPwd }>忘记密码 >></Text>
                                </TouchableOpacity>
                                <Text style={ loginStyles.copyright }>
                                    2018 © Magugi Business Mgmt System. Ver {systemConfig.version}
                                </Text>
                        </ImageBackground>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

//mapping props
const mapStateToProps = (state) => {
    return {
        formValues: state.handleLoginForm,
        isLoggedIn: state.auth.isLoggedIn,
        userInfo: state.auth.userInfo
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        unameFoucusinAction: () => {
            dispatch(loginInputFoucusinAction("username"))
        },
        unameFoucusoutAction: () => {
            dispatch(loginInputFoucusoutAction("username"))
        },
        unameChangeAction: (text) => {
            dispatch(loginInputChangeAction(text, 'username'))
        },
        pwdFoucusinAction: () => {
            dispatch(loginInputFoucusinAction("password"))
        },
        pwdFoucusoutAction: () => {
            dispatch(loginInputFoucusoutAction("password"))
        },
        pwdChangeAction: (text) => {
            dispatch(loginInputChangeAction(text, 'password'))
        },
        submitForm: () => {
            dispatch(loginSubmitAction())
        },
        resetPwd: () => {
            dispatch(linkToResetpwdAction())
        }
    }
};

export const LoginActivity = connect(mapStateToProps, mapDispatchToProps)(Login);
