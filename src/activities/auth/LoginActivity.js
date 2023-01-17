//libs
import React from 'react';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {RemindBoxer} from '../../components';
import {
    loginInputChangeAction,
    loginInputFoucusinAction,
    loginInputFoucusoutAction,
    loginSubmitAction,
    loginSuccessAction,
} from '../../actions';
import {loginStyles} from '../../styles';
import {AppConfig, resetNavigationTo, systemConfig} from '../../utils';
import {desDecrypt} from '../../utils/encrypt/encrypt';
import {AppNavigate} from '../../navigators';
import Spinner from 'react-native-loading-spinner-overlay';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowRemindBoxer: true,
        };
    }

    componentDidMount() {
        // 0自动登录
        const {autoLogin} = this.props;
        AsyncStorage.getItem(AppConfig.staffRStore).then(userRStore => {
            if (userRStore && userRStore.length > 0) {
                const userInfo = JSON.parse(desDecrypt(userRStore));
                const lastLogin = userInfo._loginTime;
                const maxValidTime = 5 * 24 * 3600 * 1000;
                const timeNow = new Date().getTime();

                if (timeNow - lastLogin <= maxValidTime) {
                    //5天内登录
                    userInfo._loginTime = timeNow;
                    autoLogin(userInfo);
                }
            }
        });

        // 1:是第一次安装
        AsyncStorage.getItem('isFirstInstall')
            .then(value => {
                console.log('isFirstInstall:' + value);
                if (value == '0') {
                    this.setState({isShowRemindBoxer: false});
                } else {
                    this.setState({isShowRemindBoxer: true});
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    //打开隐私声明
    openLink(url, title) {
        AppNavigate.navigate('GenWebViewActivity', {url: url, title: title});
    }

    render() {
        const {isShowRemindBoxer} = this.state;
        return (
            <View style={loginStyles.container}>
                <Spinner
                    visible={this.props.formValues.loading}
                    textContent={'加载中'}
                    textStyle={{
                        color: '#FFF',
                    }}
                />
                {isShowRemindBoxer && (
                    <RemindBoxer
                        style={RemindBoxer.hidden}
                        openLink={this.openLink.bind(this)}
                    />
                )}
                <KeyboardAvoidingView
                    behavior="padding"
                    style={loginStyles.loginKeyView}>
                    <ImageBackground
                        style={loginStyles.loginWrapper}
                        resizeMode={'cover'}
                        source={require('@imgPath/login-background.png')}>
                        <ImageBackground style={loginStyles.loginBox}>
                            {/*logo*/}
                            <Image
                                resizeMethod="resize"
                                style={loginStyles.loginLogo}
                                source={require('@imgPath/login-logo.png')}
                            />
                            {/*用户名*/}
                            <View style={loginStyles.loginTextBox}>
                                <TextInput
                                    type="name-phone-pad"
                                    keyboardType="email-address"
                                    style={
                                        this.props.formValues.focus ==
                                        'username'
                                            ? loginStyles.loginUserNameActive
                                            : loginStyles.loginUserName
                                    }
                                    underlineColorAndroid="transparent"
                                    maxLength={20}
                                    placeholder="工号"
                                    placeholderTextColor="#fff"
                                    value={this.props.formValues.username}
                                    onChangeText={this.props.unameChangeAction}
                                    onFocus={this.props.unameFoucusinAction}
                                    onBlur={this.props.unameFoucusoutAction}
                                />
                                <Image
                                    resizeMethod="resize"
                                    style={loginStyles.loginUserNameIcon}
                                    source={require('@imgPath/login-uname.png')}
                                />
                                <View
                                    style={
                                        this.props.formValues.usernameValid
                                            ? loginStyles.hidden
                                            : loginStyles.loginTextTips
                                    }>
                                    <Image
                                        resizeMethod="resize"
                                        style={
                                            this.props.formValues.usernameValid
                                                ? loginStyles.hidden
                                                : loginStyles.loginWarningIcon
                                        }
                                        source={require('@imgPath/login-warning.png')}
                                    />
                                    <Text style={loginStyles.loginTextContent}>
                                        {this.props.formValues.usernameTips}
                                    </Text>
                                </View>
                            </View>
                            {/*密码*/}
                            <View
                                style={[
                                    loginStyles.loginTextBox,
                                    loginStyles.loginTextBoxPwd,
                                ]}>
                                <TextInput
                                    style={
                                        this.props.formValues.focus ==
                                        'password'
                                            ? loginStyles.loginPasswordActive
                                            : loginStyles.loginPassword
                                    }
                                    underlineColorAndroid="transparent"
                                    maxLength={20}
                                    secureTextEntry={true}
                                    placeholder="密码"
                                    placeholderTextColor="#fff"
                                    value={this.props.formValues.password}
                                    onChangeText={this.props.pwdChangeAction}
                                    onFocus={this.props.pwdFoucusinAction}
                                    onBlur={this.props.pwdFoucusoutAction}
                                />
                                <Image
                                    resizeMethod="resize"
                                    style={loginStyles.loginPasswordIcon}
                                    source={require('@imgPath/login-pwd.png')}
                                />
                                <View
                                    style={
                                        this.props.formValues.passwordValid
                                            ? loginStyles.hidden
                                            : loginStyles.loginTextTips
                                    }>
                                    <Image
                                        resizeMethod="resize"
                                        style={
                                            this.props.formValues.passwordValid
                                                ? loginStyles.hidden
                                                : loginStyles.loginWarningIcon
                                        }
                                        source={require('@imgPath/login-warning.png')}
                                    />
                                    <Text style={loginStyles.loginTextContent}>
                                        {this.props.formValues.passwordTips}
                                    </Text>
                                </View>

                                {/*忘记密码*/}
                                <TouchableOpacity
                                    underlayColor="transparent"
                                    hitSlop={{
                                        top: 0,
                                        left: 5,
                                        right: 0,
                                        bottom: 15,
                                    }}
                                    style={loginStyles.loginForgetPwd}
                                    onPress={() => {
                                        AppNavigate.navigate(
                                            'ResetPwdActivity',
                                        );
                                    }}>
                                    <Text style={loginStyles.loginForgetPwdTxt}>
                                        忘记密码？
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/*登录按钮*/}
                            <TouchableOpacity
                                style={loginStyles.loginButton}
                                onPress={this.props.submitForm}
                                underlayColor="#162247">
                                <Text style={loginStyles.loginButtonText}>
                                    登录
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                        {/*联合品牌*/}
                        <Image
                            resizeMethod="resize"
                            style={loginStyles.unionBrands}
                            source={require('@imgPath/login-brands.png')}
                        />
                    </ImageBackground>
                </KeyboardAvoidingView>
                {/*版权*/}
                <Text style={loginStyles.copyright}>
                    2022 © MAGI Business Mgmt System. Ver {systemConfig.version}
                </Text>
            </View>
        );
    }
}

//mapping props
const mapStateToProps = state => {
    return {
        formValues: state.login,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        unameFoucusinAction: () => {
            dispatch(loginInputFoucusinAction('username'));
        },
        unameFoucusoutAction: () => {
            dispatch(loginInputFoucusoutAction('username'));
        },
        unameChangeAction: text => {
            dispatch(loginInputChangeAction(text, 'username'));
        },
        pwdFoucusinAction: () => {
            dispatch(loginInputFoucusinAction('password'));
        },
        pwdFoucusoutAction: () => {
            dispatch(loginInputFoucusoutAction('password'));
        },
        pwdChangeAction: text => {
            dispatch(loginInputChangeAction(text, 'password'));
        },
        submitForm: () => {
            dispatch(loginSubmitAction());
        },
        autoLogin: data => {
            //更新store用户信息
            dispatch(loginSuccessAction(data));

            resetNavigationTo('HomeActivity', {
                title: data.storeName,
            });
        },
    };
};

export const LoginActivity = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
