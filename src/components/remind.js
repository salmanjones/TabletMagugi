import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {ScrollView, Text, View} from 'react-native';
import RNExitApp from 'react-native-exit-app';
//self
import {remindStyles} from '../styles'; //升级提示-登录页面


export class RemindBoxer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true
        };
    }

    setStorage = (key , value) =>{
        AsyncStorage.setItem(key, value, (err) => {
            if (err) {
                console.log(key + '存储失败');
            } else {
                console.log(key + '存储成功');
            }
        });
    }

    RemindBoxer() {
        this.setStorage('isFirstInstall', '0');
        this.setState((prevState, props) => {
            return {
                isShow: false
            }
        });
    }

    exitApp() {
        this.setStorage('isFirstInstall', '1');
        RNExitApp.exitApp();
    }

    openAuthDesc(type){
        if (type == '1'){
            this.props.openLink('https://www.magugi.com/pv/magugiYS.html', '用户协议与隐私政策');
        }else{
            this.props.openLink('https://www.magugi.com/pv/appQX.html', '权限声明');
        }
    }

    render() {
        let showBox = this.state.isShow;
        let whiteSpace = '        ';
        if (showBox) {
            return (
                <View style={remindStyles.container}>
                    <View style={remindStyles.content}>
                        <View style={remindStyles.remindHeader}>
                            <Text style={remindStyles.remindTitle}>温馨提醒</Text>
                        </View>
                        <ScrollView style={remindStyles.scrollWrap} showsVerticalScrollIndicator={false}>
                            <Text style={remindStyles.thanksText}>亲，感谢您对美聚集的信任：</Text>
                            <Text style={remindStyles.notice}>
                                 {whiteSpace}请注意，在您使用本软件过程中我们会按照
                                 <Text style={remindStyles.highLight} onPress={this.openAuthDesc.bind(this, '1')}>《用户协议与隐私政策》</Text>、
                                 <Text style={remindStyles.highLight} onPress={this.openAuthDesc.bind(this, '2')}>《权限声明》</Text>
                                 收集、使用和共享您的个人信息，请认真阅读并充分理解。
                            </Text>
                            <Text style={remindStyles.thanksText}>特别提示：</Text>
                            <Text style={remindStyles.notice}>
                                {whiteSpace}1.为向您提供交易相关基本功能，我们会收集、使用必要的信息；
                            </Text>
                            <Text style={remindStyles.notice}>
                                {whiteSpace}2.基于您的授权，我们可能会获取您的位置等信息，您有权拒绝或取消授权；
                            </Text>
                            <Text style={remindStyles.notice}>
                                {whiteSpace}3.我们会采取业界先进的安全措施保护您的信息安全；
                            </Text>
                            <Text style={remindStyles.notice}>
                                {whiteSpace}4.未经您同意，我们不会从第三方处获取、共享或向其提供您的信息；
                            </Text>
                            <Text style={remindStyles.notice}>
                                {whiteSpace}5.您可以查询、更正、删除您的个人信息，我们也提供账户注销的渠道。
                            </Text>
                        </ScrollView>
                        <View style={remindStyles.footer}>
                            <Text style={remindStyles.laterButtonText} onPress={this.exitApp.bind(this)}>不同意并退出</Text>
                            <Text style={remindStyles.nowButtonText} onPress={this.RemindBoxer.bind(this)}>同意</Text>
                        </View>
                    </View>
                </View>
            );
        } else {
            return <View />
        };
    };
}

