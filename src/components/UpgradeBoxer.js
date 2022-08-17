import React from 'react';
import {Alert, Image, Linking, ScrollView, Text, View} from 'react-native';

//self
import {UpgradeAlertStyles} from '../styles'; //升级提示-登录页面

export class UpgradeBoxer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            updateContentArray: []
        };
    }

    componentDidMount() {
        let updateContents = this.props.updateContents;
        if (updateContents != '') {
            this.setState({
                updateContentArray: updateContents.split("$")
            });
        }
    };

    async updateNow(url) {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`版本升级失败！请联系系统管理员`);
        }
    }

    closeBoxer() {
        this.setState((prevState, props) => {
            return {
                isShow: false
            }
        });
    }

    render() {
        let showBox = this.state.isShow;
        let isForceUpdateValue = this.props.isForceUpdateValue;
        let updateUrl = this.props.updateUrl;
        let version = this.props.version;
        const {updateContentArray} = this.state;

        if (showBox) {
            return (
                <View style={UpgradeAlertStyles.container}>
                    <View style={UpgradeAlertStyles.content}>
                        <View style={UpgradeAlertStyles.bgImgWrap}>
                            <Image style={UpgradeAlertStyles.bgImgItem} resizeMode={'stretch'} resizeMethod="resize" source={require('@imgPath/upgrade-boxer-bg.png')}></Image>
                            {/*<View style={UpgradeAlertStyles.descTitle}>*/}
                            {/*    <Text style={UpgradeAlertStyles.descTitleText}>发现新版本啦</Text>*/}
                            {/*    <Text style={UpgradeAlertStyles.descTitleNumber}>V {version}</Text>*/}
                            {/*</View>*/}
                        </View>
                        <ScrollView style={UpgradeAlertStyles.scrollWrap} showsVerticalScrollIndicator={false}>
                            <View style={UpgradeAlertStyles.titleWrap}>
                                <Text style={UpgradeAlertStyles.descCaption}>升级到新版本</Text>
                                <Text style={UpgradeAlertStyles.descTitleNumber}>V {version}</Text>
                            </View>
                            {
                                updateContentArray.map((item, index) => {
                                    return (
                                        <Text key={index} style={UpgradeAlertStyles.descItem}>{item}</Text>
                                    )
                                })
                            }
                        </ScrollView>
                        <View
                            style={isForceUpdateValue == 0 ? UpgradeAlertStyles.footer : UpgradeAlertStyles.footerSingle}>
                            {isForceUpdateValue == 0 && (
                                <Text style={UpgradeAlertStyles.laterBtn} onPress={this.closeBoxer.bind(this)}>稍后</Text>
                            )}
                            <Text
                                style={isForceUpdateValue == 0 ? UpgradeAlertStyles.upgradeBtn : UpgradeAlertStyles.upgradeBtnSingle}
                                onPress={this.updateNow.bind(this, updateUrl)}>立即升级</Text>
                        </View>
                    </View>
                </View>
            );
        } else {
            return <View/>;
        }
    };
}
