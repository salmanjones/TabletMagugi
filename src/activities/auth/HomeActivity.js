import React from 'react';
import {Image, Platform, SafeAreaView, Text, TouchableHighlight, View} from 'react-native';
import {homeStyles,} from '../../styles';
import {AboutBeauty, HeaderLogout, HeaderMoments, ToggleImageBackground} from '../../components';
import {systemConfig} from '../../utils';
import {fetchFindVersionResult} from '../../services';
import {connect} from "react-redux";
import {AppNavigate} from "../../navigators";

const initState = {
    staff: false,
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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState;
        this.systemName = Platform.OS === 'ios' ? 'ios' : 'android';
    }

    componentDidMount() {
        let {navigation, dispatch} = this.props
        navigation.setOptions({
            headerLeft: () => (
                <HeaderMoments/>
            ),
            headerRight: () => {
                return  (<HeaderLogout dispatch={dispatch}/>)
            }
        })
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
        AppNavigate.navigate('GenWebViewActivity', {'url': url, "title": title});
    }

    render() {
        const {showAbout, updateResult, updateResultStatus, downloadUrl} = this.state;
        return (
            <SafeAreaView style={homeStyles.container}>
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
                                onPress={() => AppNavigate.navigate('CashierActivity')}
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
                                    AppNavigate.navigate('StaffQueueActivity')
                                }
                                onPressIn={() => this.activeButton('staff')}>
                                <ToggleImageBackground
                                    isActive={this.state.staff}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/staff_list.png')}
                                           style={homeStyles.imgStaffStyle}/>
                                    <Text style={homeStyles.liTextStaff}>选牌</Text>
                                </ToggleImageBackground>
                            </TouchableHighlight>
                        </View>
                        {/*<View style={homeStyles.operateBox}>*/}
                        {/*    <TouchableHighlight*/}
                        {/*        underlayColor="white"*/}
                        {/*        onPressIn={() => this.activeButton('reserve')}>*/}
                        {/*        <ToggleImageBackground*/}
                        {/*            disable={true}*/}
                        {/*            isActive={this.state.reserve}*/}
                        {/*            style={homeStyles.operateBoxItem}>*/}
                        {/*            <Image resizeMethod="resize"*/}
                        {/*                   source={require('@imgPath/bill-reverse.png')}*/}
                        {/*                   style={homeStyles.imgStyle}/>*/}
                        {/*            <Text style={homeStyles.liText}>预约</Text>*/}
                        {/*        </ToggleImageBackground>*/}
                        {/*    </TouchableHighlight>*/}
                        {/*</View>*/}
                    </View>
                    <View style={homeStyles.operateWrap}>
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={() =>
                                    AppNavigate.navigate('RotatePlacardActivity')
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
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                underlayColor="white"
                                onPress={() =>
                                    AppNavigate.navigate('PriceListActivity')
                                }
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
                        {/*<View style={homeStyles.operateBox}>*/}
                        {/*    <TouchableHighlight*/}
                        {/*        underlayColor="white"*/}
                        {/*        onPress={() =>*/}
                        {/*            AppNavigate.navigate('BillManageActivity')*/}
                        {/*        }*/}
                        {/*        onPressIn={() => this.activeButton('consumables')}>*/}
                        {/*        <ToggleImageBackground*/}
                        {/*            isActive={this.state.consumables}*/}
                        {/*            style={homeStyles.operateBoxItem}>*/}
                        {/*            <Image resizeMethod="resize"*/}
                        {/*                   source={require('@imgPath/bill-manage.png')}*/}
                        {/*                   style={homeStyles.imgStyleOther}/>*/}
                        {/*            <Text style={homeStyles.liText}>结单管理</Text>*/}
                        {/*        </ToggleImageBackground>*/}
                        {/*    </TouchableHighlight>*/}
                        {/*</View>*/}

                        {/*<View style={homeStyles.operateBox}>*/}
                        {/*    <TouchableHighlight*/}
                        {/*        underlayColor="white"*/}
                        {/*        onPress={() =>*/}
                        {/*            AppNavigate.navigate('AnalysisHome')*/}
                        {/*        }*/}
                        {/*        onPressIn={() => this.activeButton('count')}>*/}
                        {/*        <ToggleImageBackground*/}
                        {/*            // disable={true}*/}
                        {/*            isActive={this.state.count}*/}
                        {/*            style={homeStyles.operateBoxItem}>*/}
                        {/*            <Image resizeMethod="resize"*/}
                        {/*                   source={require('@imgPath/bill-count.png')}*/}
                        {/*                   style={homeStyles.imgStyleCount}/>*/}
                        {/*            <Text style={homeStyles.liText}>统计</Text>*/}
                        {/*        </ToggleImageBackground>*/}
                        {/*    </TouchableHighlight>*/}
                        {/*</View>*/}
                    </View>
                </View>
                <View style={homeStyles.footer}>
                    <Image style={homeStyles.footerLogo} source={require('@imgPath/zmr.png')}></Image>
                    <Text style={homeStyles.footerAbout} onPress={this.toggleAbout.bind(this)}>关于超级美星</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export const HomeActivity = connect(state => ({
    userInfo: state.auth.userInfo
}))(Home);
