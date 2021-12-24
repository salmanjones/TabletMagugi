import React from 'react';
import {Image, Text, TouchableHighlight, View, Platform} from 'react-native';
import {homeStyles,} from '../../styles';
import {HeaderLogout, HeaderMoments, ToggleImageBackground, AboutBeauty} from '../../components';
import {throttle ,systemConfig} from '../../utils';
import {fetchFindVersionResult} from '../../services';

const initState = {
    reserve: false,
    collect: false,
    hairdresser: false,
    rotate: false,
    consumables: false,
    price: false,
    count: false,
    showAbout: false,
    updateResult: '',
    updateResultStatus: '0',
    downloadUrl: ''
};

export class HomeActivity extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerLeft: <HeaderMoments/>,
            headerRight: <HeaderLogout navigation={navigation}/>,
        };
    };

    constructor(props) {
        super(props);
        this.state = initState;
        this.systemName = Platform.OS === 'ios' ? 'ios' : 'android';
    }

    activeButton(field) {
        let newState = {...initState};
        newState[field] = true;
        this.setState(newState);
    }

    //控制关于是否展示
    toggleAbout() {
        var systemName = this.systemName;
        var version = systemConfig.version;

        var updateResult = '';
        var updateResultStatus = '0';

        fetchFindVersionResult(systemName)
            .then(data => {
                var versionMap = data.data;
                if (versionMap) {
                    var nextVersion = versionMap.versionName;
                    var downloadUrl = versionMap.downloadUrl;

                    if (nextVersion != version) {
                        updateResult = '发现新版本';
                        updateResultStatus = '1';
                    } else {
                        updateResult = '已是最新版本';
                    }

                    this.setState((prevState, props) => {
                        return {
                            ...prevState,
                            showAbout: !prevState.showAbout,
                            updateResult: updateResult,
                            updateResultStatus: updateResultStatus,
                            downloadUrl: downloadUrl
                        };
                    });
                } else {
                    updateResult = '已是最新版本';
                    this.setState((prevState, props) => {
                        return {...prevState, showAbout: !prevState.showAbout, updateResult: updateResult};
                    });
                }
            }).catch(err => {
            updateResult = '已是最新版本';
            this.setState((prevState, props) => {
                return {...prevState, showAbout: !prevState.showAbout, updateResult: updateResult};
            });

            console.log("-----------------");
        });

    }

    //打开隐私声明
    openLink(url, title) {
        this.props.navigation.navigate('GenWebViewActivity', {'url': url, "title": title});
    }

    render() {
        const {showAbout, updateResult, updateResultStatus, downloadUrl} = this.state;
        return (
            <View style={homeStyles.container}>
                <AboutBeauty isShow={showAbout}
                             closeEvent={this.toggleAbout.bind(this)}
                             updateResult={updateResult}
                             updateResultStatus={updateResultStatus}
                             downloadUrl={downloadUrl}
                             openLink={this.openLink.bind(this)}></AboutBeauty>
                <View style={homeStyles.content}>
                    <View style={homeStyles.operateWrap}>
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPressIn={() => this.activeButton('reserve')}>
                                <ToggleImageBackground
                                    disable={true}
                                    isActive={this.state.reserve}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/bill-reverse.png')}
                                           style={homeStyles.imgStyle}/>
                                    <Text style={homeStyles.liText}>预约</Text>
                                </ToggleImageBackground>
                            </TouchableHighlight>
                        </View>
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={() => this.props.navigation.navigate('CashierActivity')}
                                onPressIn={() => this.activeButton('collect')}>
                                <ToggleImageBackground
                                    isActive={this.state.collect}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/index-collect.png')}
                                           style={homeStyles.imgStyle}/>
                                    <Text style={homeStyles.liText}>收银</Text>
                                </ToggleImageBackground>
                            </TouchableHighlight>
                        </View>
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={() =>
                                    this.props.navigation.navigate('RotatePlacardActivity')
                                }
                                onPressIn={() => this.activeButton('rotate')}>
                                <ToggleImageBackground
                                    isActive={this.state.rotate}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/index-rotate.png')}
                                           style={homeStyles.imgStyle}/>
                                    <Text style={homeStyles.liText}>轮牌</Text>
                                </ToggleImageBackground>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={homeStyles.operateWrap}>
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={throttle(() => this.props.navigation.navigate('BillManageActivity'), 600)}
                                onPressIn={() => this.activeButton('consumables')}>
                                <ToggleImageBackground
                                    isActive={this.state.consumables}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/bill-manage.png')}
                                           style={homeStyles.imgStyleOther}/>
                                    <Text style={homeStyles.liText}>结单管理</Text>
                                </ToggleImageBackground>
                            </TouchableHighlight>
                        </View>
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={throttle(() => this.props.navigation.navigate('PriceListActivity'), 600)}
                                onPressIn={() => this.activeButton('price')}>
                                <ToggleImageBackground
                                    isActive={this.state.price}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/index-jmb.png')}
                                           style={[homeStyles.imgStyle, {resizeMode: 'contain'}]}/>
                                    <Text style={homeStyles.liText}>价目表</Text>
                                </ToggleImageBackground>
                            </TouchableHighlight>
                        </View>
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={throttle(() => this.props.navigation.navigate('AnalysisHome'), 600)}
                                onPressIn={() => this.activeButton('count')}>
                                <ToggleImageBackground
                                    // disable={true}
                                    isActive={this.state.count}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/bill-count.png')}
                                           style={homeStyles.imgStyleCount}/>
                                    <Text style={homeStyles.liText}>统计</Text>
                                </ToggleImageBackground>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={homeStyles.footer}>
                    <Image style={homeStyles.footerLogo} source={require('@imgPath/zmr.png')}></Image>
                    <Text style={homeStyles.footerAbout} onPress={this.toggleAbout.bind(this)}>关于智美人</Text>
                </View>
            </View>
        );
    }
}
