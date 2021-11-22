import React from 'react';
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Text, View, Linking, TouchableOpacity,ScrollView} from 'react-native';
//self
import { aboutBeautyStyles } from 'styles'; //升级提示-登录页面
import { systemConfig} from 'utils';

export class AboutBeauty extends React.Component {
    constructor(props) {
        super(props);
    }

    async updateNow(url){
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`版本升级失败！请联系系统管理员`);
        }
    }

    openAuthDesc(type){
        if (type == '1'){
            this.props.openLink('https://www.magugi.com/pv/magugiYS.html', '用户协议与隐私政策');
        }else if (type == '2'){
            this.props.openLink('https://www.magugi.com/pv/appQX.html', '权限声明');
        }else if (type == '3'){
            this.props.openLink('https://bms.magugi.com', '收银系统');
        }
    }

    render() {
        var showBox = this.props.isShow;
        let downloadUrl = this.props.downloadUrl;
        let updateResult = this.props.updateResult;
        let updateResultStatus = this.props.updateResultStatus;

        if (showBox) {
            return (
                <View style={aboutBeautyStyles.container}>
                    <View style={aboutBeautyStyles.content}>
                        {/* 顶部 */}
                        <View style={aboutBeautyStyles.header}>
                            <Text style={aboutBeautyStyles.title}>关于智美人</Text>
                            <TouchableOpacity style={aboutBeautyStyles.closeable} onPress={this.props.closeEvent}>
                                <Image style={aboutBeautyStyles.closeIcon} source={require('@imgPath/close.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        {/* 中间 */}
                        <View style={aboutBeautyStyles.body}>
                            <View style={aboutBeautyStyles.logoWrap}>
                                <ImageBackground style={aboutBeautyStyles.logoImg} resizeMode={'cover'} source={require("@imgPath/logo.png")}/>
                            </View>
                            <ScrollView style={aboutBeautyStyles.scrollWrap} showsVerticalScrollIndicator={false}>
                                <View style={aboutBeautyStyles.scrollItem}>
                                    <Text style={aboutBeautyStyles.descItem}>当前版本</Text>
                                    <Text style={aboutBeautyStyles.descItemRight}>{systemConfig.version}</Text>
                                </View>

                                <View style={aboutBeautyStyles.scrollItem}>
                                    <Text style={aboutBeautyStyles.descItem}>检查更新</Text>
                                    {updateResultStatus == '1' &&(
                                        <Text style={aboutBeautyStyles.descItemRight} onPress={this.updateNow.bind(this, downloadUrl)}>{updateResult}</Text>
                                    )}

                                    {updateResultStatus == '0' &&(
                                        <Text style={aboutBeautyStyles.descItemRight}>{updateResult}</Text>
                                    )}
                                </View>

                                <View style={aboutBeautyStyles.scrollItem}>
                                    <Text style={aboutBeautyStyles.descItem} onPress={this.openAuthDesc.bind(this, '1')}>用户协议</Text>
                                    <TouchableOpacity onPress={this.openAuthDesc.bind(this, '1')}>
                                        <ImageBackground style={aboutBeautyStyles.descItemRightIcon} resizeMode={'cover'} source={require("@imgPath/arrow.png")}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={aboutBeautyStyles.scrollItem}>
                                    <Text style={aboutBeautyStyles.descItem} onPress={this.openAuthDesc.bind(this, '2')}>权限声明</Text>
                                    <TouchableOpacity onPress={this.openAuthDesc.bind(this, '2')}>
                                        <ImageBackground style={aboutBeautyStyles.descItemRightIcon} resizeMode={'cover'} source={require("@imgPath/arrow.png")}/>
                                    </TouchableOpacity>
                                </View>

                                {/*<View style={aboutBeautyStyles.scrollItem}>*/}
                                {/*    <Text style={aboutBeautyStyles.descItem} onPress={this.openAuthDesc.bind(this, '3')}>收银系统</Text>*/}
                                {/*    <TouchableOpacity onPress={this.openAuthDesc.bind(this, '3')}>*/}
                                {/*        <ImageBackground style={aboutBeautyStyles.descItemRightIcon} resizeMode={'cover'} source={require("@imgPath/arrow.png")}/>*/}
                                {/*    </TouchableOpacity>*/}
                                {/*</View>*/}
                            </ScrollView>
                        </View>
                        {/* 声明 */}
                        <View style={aboutBeautyStyles.footer}>
                            <Text style={aboutBeautyStyles.statement}>2020@Magugi Business Mgmt System. </Text>
                        </View>
                    </View>
                </View>
            );
        } else {
            return <View />;
        }

    };
}
