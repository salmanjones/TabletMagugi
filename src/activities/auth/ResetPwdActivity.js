//libs
import React from 'react';
import {connect} from "react-redux";
import {Image, ImageBackground, KeyboardAvoidingView, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {BottomCopyModule, ModalLoadingIndicator} from "../../components";
import {resetPwdStyles} from '../../styles';
import {resetpwdSendCodeAction, resetpwdSubmitAction} from '../../actions';

class ResetPwdView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uname:"",
            unameError:false,
            pwd:"",
            pwdError:false,
            pwdTips:"",
            npwd:"",
            npwdError:false,
            samePwd:true,
            phone:"",
            phoneError:false,
            checkcode:"",
            checkcodeVer:false,
            checkcodeError:false,
            unameBg:TextInputData.unameBg.imgUrl,
            pwdBg:TextInputData.pwdBg.imgUrl,
            npwdBg:TextInputData.npwdBg.imgUrl,
            phoneBg:TextInputData.phoneBg.imgUrl,
            checkcodeBg:TextInputData.checkcodeBg.imgUrl,
            checkCodeBtnBg:TextInputData.checkCodeBtnBg.imgUrl,
            inputWarningIcon:TextInputData.inputWarningIcon.imgUrl,
            timerCount: 60,
            timerTitle: '获取验证码',
            counting: false
        }
    }

    //更换背景
    changeElemBg(name, type){
        if(type=='in'){
            this.setState((prveState, props)=>{
                prveState[name] = TextInputData[name].imgUrlActive;
                return prveState;
            });
        }else{
            this.setState((prveState, props)=>{
                prveState[name] = TextInputData[name].imgUrl;
                return prveState;
            });
        }
    }

    //输入值
    inputChange(name, value){
        let errorKey  = name + "Error";

        if(value.length<1){
            this.setState((prevState, props)=>{
                prevState[name] = value;

                if(name=='checkcode'){
                    if(prevState.checkcodeVer){
                        prevState[errorKey] = true;
                    }
                }else if(name=='pwd'){
                    prevState.pwdTips = "密码不能为空";
                    prevState[errorKey] = true;
                }else{
                    prevState[errorKey] = true;
                }

                return prevState;
            })
        }else{
            if(name=='pwd'){
                if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)){
                    this.setState((prevState, props)=>{
                        prevState.pwdError = true;
                        prevState.pwdTips = "密码为6-20位字母与数字的组合";

                        return prevState;
                    });
                }else{
                    if(this.state.npwd>0){
                        if(this.state.npwd!=value){
                            this.setState((prevState, props)=>{
                                prevState.samePwd = false;
                                prevState.npwdError = true;

                                prevState[name] = value;
                                prevState[errorKey] = false;
                                return prevState;
                            })
                        }else{
                            this.setState((prevState, props)=>{
                                prevState.samePwd = true;
                                prevState.npwdError = false;

                                prevState[name] = value;
                                prevState[errorKey] = false;
                                return prevState;
                            })
                        }
                    }else{
                        this.setState((prevState, props)=>{
                            prevState.samePwd = true;
                            prevState.npwdError = false;

                            prevState[name] = value;
                            prevState[errorKey] = false;
                            return prevState;
                        })
                    }
                }
            }else if(name=='npwd'){//新密码确认
                this.setState((prevState, props)=>{
                    let pwd = prevState.pwd;
                    if(value!=pwd){
                        prevState.samePwd = false;
                        prevState[errorKey] = true;
                    }else{
                        prevState.samePwd = true;
                        prevState[errorKey] = false;
                    }
                    prevState[name] = value;

                    return prevState;
                })
            }else{
                this.setState((prevState, props)=>{
                    prevState[name] = value;
                    prevState[errorKey] = false;

                    return prevState;
                })
            }
        }
    }

    //发送验证码
    sendCheckCode(){
        let self = this;
        let {stateData, valid} = verfyUserInput(self);
        if(!valid){
            self.setState((prevTate, props)=>{
                let finalData = {
                    ...prevTate,
                    unameError:stateData.unameError,
                    pwdError:stateData.pwdError,
                    pwdTips:stateData.pwdTips,
                    npwdError:stateData.npwdError,
                    phoneError:stateData.phoneError,
                    checkcodeError:stateData.checkcodeError,
                    checkcodeVer:false
                };
                return finalData;
            })
        }else{
            const codeTime = this.state.timerCount;
            const isCounting = this.state.counting;
            if(!isCounting){
                const now = Date.now();
                const overTimeStamp = now + codeTime * 1000 + 100; /*过期时间戳（毫秒） +100 毫秒容错*/
                this.interval = setInterval(() =>{
                    /* 切换到后台 timer 停止计时 */
                    const timer = this.state.timerCount - 1
                    if(timer===0){
                        this.interval&&clearInterval(this.interval);
                        this.setState({
                            timerCount: codeTime,
                            timerTitle: '获取验证码',
                            counting: false
                        })
                    }else{
                        this.setState({
                            timerCount: timer,
                            counting: true,
                            timerTitle: `重新获取(${timer}s)`
                        })
                    }
                },1000);

                //发送网络请求
                this.props.sendCode(this.state);
            }
        }
    }

    //重置密码
    resetPasswd(){
        let self = this;
        let {stateData, valid} = verfyUserInput(self, true);
        if(!valid){
            self.setState((prevTate, props)=>{
                let finalData = {
                    ...prevTate,
                    unameError:stateData.unameError,
                    pwdError:stateData.pwdError,
                    pwdTips:stateData.pwdTips,
                    npwdError:stateData.npwdError,
                    phoneError:stateData.phoneError,
                    checkcodeError:stateData.checkcodeError,
                    checkcodeVer:true,
                    samePwd:stateData.samePwd
                };
                return finalData;
            })
        }else{
            this.props.submitForm(this.state);
        }
    }

    //组件移除时调用
    componentWillUnmount(){
        if(this.interval){clearInterval(this.interval)};
    }

    render() {
        return (
            <View style={ resetPwdStyles.container }>
                <ModalLoadingIndicator loading={ this.props.activityStatus.loading } />
                <KeyboardAvoidingView behavior="padding" style={resetPwdStyles.keyboardView}>
                    <ImageBackground style={resetPwdStyles.inputBox} source={this.state.unameBg}>
                        <TextInput style={resetPwdStyles.textInput}
                            keyboardType="default"
                            underlineColorAndroid="transparent"
                            maxLength={20} placeholder="账户名称"
                            placeholderTextColor="#9C9C9C"
                            onFocus={this.changeElemBg.bind(this,'unameBg','in')}
                            onBlur={this.changeElemBg.bind(this,'unameBg','out')}
                            onChangeText={this.inputChange.bind(this, 'uname')}>
                        </TextInput>
                        <Image resizeMethod="resize"  style={ this.state.unameError ? resetPwdStyles.textInputWarningIcon : resetPwdStyles.hidden } source={this.state.inputWarningIcon}/>
                        <Text style={ this.state.unameError ? resetPwdStyles.textInputTips : resetPwdStyles.hidden }>
                            账户名称不能为空
                        </Text>
                    </ImageBackground>
                    <ImageBackground style={resetPwdStyles.inputBoxMargin} source={this.state.pwdBg}>
                        <TextInput style={resetPwdStyles.textInput}
                            secureTextEntry={ true }
                            underlineColorAndroid="transparent"
                            minLength={6}
                            maxLength={20} placeholder="新密码"
                            placeholderTextColor="#9C9C9C"
                            onFocus={this.changeElemBg.bind(this,'pwdBg','in')}
                            onBlur={this.changeElemBg.bind(this,'pwdBg','out')}
                            onChangeText={this.inputChange.bind(this, 'pwd')}>
                        </TextInput>
                        <Image resizeMethod="resize"  style={ this.state.pwdError ? resetPwdStyles.textInputWarningIcon : resetPwdStyles.hidden } source={this.state.inputWarningIcon}></Image>
                        <Text style={ this.state.pwdError ? resetPwdStyles.textInputTips : resetPwdStyles.hidden }>
                            {this.state.pwdTips}
                        </Text>
                    </ImageBackground>
                    <ImageBackground style={resetPwdStyles.inputBoxMargin} source={this.state.npwdBg}>
                        <TextInput style={resetPwdStyles.textInput}
                            secureTextEntry={ true }
                            underlineColorAndroid="transparent"
                            minLength={6}
                            maxLength={20} placeholder="确认密码"
                            placeholderTextColor="#9C9C9C"
                            onFocus={this.changeElemBg.bind(this,'npwdBg','in')}
                            onBlur={this.changeElemBg.bind(this,'npwdBg','out')}
                            onChangeText={this.inputChange.bind(this, 'npwd')}>
                        </TextInput>
                        <Image resizeMethod="resize"  style={ this.state.npwdError ? resetPwdStyles.textInputWarningIcon : resetPwdStyles.hidden } source={this.state.inputWarningIcon}></Image>
                        <Text style={ this.state.npwdError ? resetPwdStyles.textInputTips : resetPwdStyles.hidden }>
                            {this.state.samePwd? "确认密码不能为空":"两次密码不一致"}
                        </Text>
                    </ImageBackground>
                    <ImageBackground style={resetPwdStyles.inputBoxMargin} source={this.state.phoneBg}>
                        <TextInput style={resetPwdStyles.textInput}
                            keyboardType="phone-pad"
                            underlineColorAndroid="transparent"
                            minLength={6}
                            maxLength={11} placeholder="手机号"
                            placeholderTextColor="#9C9C9C"
                            onFocus={this.changeElemBg.bind(this,'phoneBg','in')}
                            onBlur={this.changeElemBg.bind(this,'phoneBg','out')}
                            onChangeText={this.inputChange.bind(this, 'phone')}>
                        </TextInput>
                        <Image resizeMethod="resize"  style={ this.state.phoneError ? resetPwdStyles.textInputWarningIcon : resetPwdStyles.hidden } source={this.state.inputWarningIcon}></Image>
                        <Text style={ this.state.phoneError ? resetPwdStyles.textInputTips : resetPwdStyles.hidden }>
                            手机号不能为空
                        </Text>
                    </ImageBackground>
                    <View style={resetPwdStyles.checkCodeBox}>
                        <ImageBackground style={resetPwdStyles.checkCodeInputBg} source={this.state.checkcodeBg}>
                            <TextInput style={resetPwdStyles.checkCodeInput}
                                keyboardType="numeric"
                                underlineColorAndroid="transparent"
                                minLength={4}
                                maxLength={8} placeholder="验证码"
                                placeholderTextColor="#9C9C9C"
                                onFocus={this.changeElemBg.bind(this,'checkcodeBg','in')}
                                onBlur={this.changeElemBg.bind(this,'checkcodeBg','out')}
                                onChangeText={this.inputChange.bind(this, 'checkcode')}>
                            </TextInput>
                            <Image resizeMethod="resize"  style={ this.state.checkcodeError ? resetPwdStyles.textInputWarningIcon : resetPwdStyles.hidden } source={this.state.inputWarningIcon}></Image>
                            <Text style={ this.state.checkcodeError ? resetPwdStyles.textInputTipsCheckCode : resetPwdStyles.hidden }>
                                验证码不能为空
                            </Text>
                        </ImageBackground>
                        <TouchableHighlight underlayColor="transparent"
                            onPressIn={this.changeElemBg.bind(this,'checkCodeBtnBg','in')}
                            onPressOut={this.changeElemBg.bind(this,'checkCodeBtnBg','out')}
                            onPress={this.sendCheckCode.bind(this)}>
                            <ImageBackground style={resetPwdStyles.checkCodeBtn}  source={this.state.checkCodeBtnBg}>
                                <Text style={ resetPwdStyles.checkCodeBtnText }>{this.state.timerTitle}</Text>
                            </ImageBackground>
                        </TouchableHighlight>
                    </View>

                    <View style={resetPwdStyles.submitBox}>
                        <TouchableHighlight style={resetPwdStyles.submitBtnBack} underlayColor="#aaaaaa" onPress={this.props.backPage}>
                            <Text style={resetPwdStyles.submitBtnBackText}>返回上页</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={resetPwdStyles.submitBtnSave} underlayColor="#162247" onPress={this.resetPasswd.bind(this)}>
                            <Text style={resetPwdStyles.submitBtnSaveText}>重置密码</Text>
                        </TouchableHighlight>
                    </View>
                </KeyboardAvoidingView>
                <BottomCopyModule/>
            </View>
        )
    }
};

const TextInputData = {
    unameBg:{
        "imgUrl":require("@imgPath/resetpwd-username.png"),
        "imgUrlActive":require("@imgPath/resetpwd-username-active.png"),
    },
    pwdBg:{
        "imgUrl":require("@imgPath/resetpwd-pwd.png"),
        "imgUrlActive":require("@imgPath/resetpwd-pwd-active.png"),
    },
    npwdBg:{
        "imgUrl":require("@imgPath/resetpwd-pwd.png"),
        "imgUrlActive":require("@imgPath/resetpwd-pwd-active.png"),
    },
    phoneBg:{
        "imgUrl":require("@imgPath/resetpwd-username.png"),
        "imgUrlActive":require("@imgPath/resetpwd-username-active.png"),
    },
    checkcodeBg:{
        "imgUrl":require("@imgPath/resetpwd-checkcode.png"),
        "imgUrlActive":require("@imgPath/resetpwd-checkcode-active.png"),
    },
    checkCodeBtnBg:{
        "imgUrl":require("@imgPath/resetpwd-checkcode-btn.png"),
        "imgUrlActive":require("@imgPath/resetpwd-checkcode-btn-active.png"),
    },
    inputWarningIcon:{
        "imgUrl":require("@imgPath/login-warning.png"),
    }
};

//验证用户输入
const verfyUserInput = (self, toCheckCode=false)=>{
    let backData = {};
    let valid = true;
    if(self.state.uname.length<1){
        backData.unameError = true;
        valid = false;
    }else{
        backData.unameError = false;
    }

    if(self.state.pwd.length<1){
        backData.pwdError = true;
        valid = false;
        backData.pwdTips = "密码不能为空";
    }else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(self.state.pwd)){
        backData.pwdTips = "密码为6-20位字母与数字的组合";
        backData.pwdError = true;
        valid = false;
    }else{
        backData.pwdError = false;
    }

    if(self.state.npwd.length<1){
        backData.npwdError = true;
        valid = false;
    }else{
        backData.npwdError = false;
    }

    if((self.state.npwd.length>0&&self.state.pwd.length)&&(self.state.npwd!=self.state.pwd)){
        backData.npwdError = true;
        backData.samePwd = false;
        valid = false;
    }

    if(self.state.phone.length<1){
        backData.phoneError = true;
        valid = false;
    }else{
        backData.phoneError = false;
    }

    if(toCheckCode){
        if(self.state.checkcode.length<1){
            backData.checkcodeError = true;
            valid = false;
        }else{
            backData.checkcodeError = false;
        }

    }

    return {"stateData":backData, "valid":valid}
}

//mapping props
const mapStateToProps = (state) => {
    return {
        activityStatus:state.resetPwd
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        backPage:()=>{dispatch(CommonActions.goBack())},
        sendCode:(state)=>(dispatch(resetpwdSendCodeAction(state))),
        submitForm:(state)=>(dispatch(resetpwdSubmitAction(state))),
    }
};

export const ResetPwdActivity = connect(mapStateToProps, mapDispatchToProps)(ResetPwdView);

