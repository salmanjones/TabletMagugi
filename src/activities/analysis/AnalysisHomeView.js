import React from 'react';
import {Image, Platform, Text, TouchableHighlight, View} from 'react-native';
import {homeStyles,} from '../../styles';
import {AboutBeauty, ToggleImageBackground} from '../../components';
import {systemConfig} from '../../utils';
import {connect} from 'react-redux';
import {fetchFindVersionResult, getDayCountPager} from '../../services';

const initState = {
    operator: false,
    employee: false,
    showAbout: false,
    updateResult: '',
    updateResultStatus: '0',
    downloadUrl: ''
};

export class AnalysisHomeView extends React.Component {
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
        });

    }

    //打开隐私声明
    openLink(url, title) {
        let companyId = this.props.auth.userInfo.companyId;
        let storeId = this.props.auth.userInfo.storeId;

        url = url+"?companyId="+companyId+"&storeId="+storeId;
        this.props.navigation.navigate('GenWebViewActivity', {'url': url, "title": title});
    }

    render() {
        const {showAbout, updateResult, updateResultStatus, downloadUrl} = this.state;
        var pagerUrl = getDayCountPager;
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
                                onPressIn={() => this.activeButton('operator')}
                                onPress={this.openLink.bind(this, pagerUrl, '营业汇总')}>
                                <ToggleImageBackground
                                    isActive={this.state.operator}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/bill-operator.png')}
                                           style={homeStyles.imgStyle}/>
                                    <Text style={homeStyles.liText}>营业汇总</Text>
                                </ToggleImageBackground>
                            </TouchableHighlight>
                        </View>
                        <View style={homeStyles.operateBox}>
                            <TouchableHighlight
                                disable={true}
                                underlayColor="white"
                                onPressIn={() => this.activeButton('employee')}>
                                <ToggleImageBackground
                                    disable={true}
                                    isActive={this.state.employee}
                                    style={homeStyles.operateBoxItem}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/bill-employee.png')}
                                           style={homeStyles.imgStyle}/>
                                    <Text style={homeStyles.liText}>员工业绩</Text>
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

//mapping props
const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export const AnalysisHome = connect(mapStateToProps)(
    AnalysisHomeView
);
