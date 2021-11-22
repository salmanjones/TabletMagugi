import React from 'react';
import {connect} from 'react-redux';
import {Alert, AppState, BackHandler, Platform, StatusBar, View} from 'react-native';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {createReactNavigationReduxMiddleware, createReduxBoundAddListener,} from 'react-navigation-redux-helpers';
import Orientation from 'react-native-orientation';
import Toast from 'react-native-root-toast';
import {AppNavigator} from './routes';
import {resetNavigationTo, systemConfig} from 'utils';
import {logoutAction} from 'actions';
import {fetchFindVersionResult} from 'services';
import {UpgradeBoxer} from "components";

export const navMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);

let instance = null;

const backToExistAppMsg = '再按一次退出应用';

class RootNavigation extends React.Component {
    constructor(props) {
        super(props);
        if (instance == null && !__DEV__) {
            instance = this;
            this.defaultHandler =
                ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler();
            ErrorUtils.setGlobalHandler(this.wrapGlobalHandler);
        }

        this.state = {
            currentAppState: AppState.currentState,
            updateValue: 0,
            checkVersion: '',
            isForceUpdateValue: 0,
            updateVersionLimitTime: systemConfig.updateVersionLimitTime,
            updateContents: '',
            updateUrl: '',
        };

        this.version = systemConfig.version;
        this.preTimes;
        this.systemName = Platform.OS === 'ios' ? 'ios' : 'android';
    }

    wrapGlobalHandler = () => {
        let {dispatch, userInfo} = this.props;
        Alert.alert('系统提示', '很抱歉，系统发生致命异常，请稍后再试', [
            {
                text: '知道了',
                onPress: () => {
                    resetNavigationTo('HomeActivity', dispatch, {
                        title: userInfo.storeName,
                    });
                },
            },
        ]);
    };

    componentDidMount() {
        this.fetchFindVersionResult(this.version, '0', this.systemName);
        Orientation.lockToLandscape();
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);


        AppState.addEventListener('change', this.handleAppStateChange);
        this.preTimes = -1;
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);

        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index !== 0) {
            dispatch(NavigationActions.back());
        } else {
            if (this.lastBackTime && this.lastBackTime + 2000 >= Date.now()) {
                return false;
            }

            this.lastBackTime = Date.now();
            Toast.show(backToExistAppMsg, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
        }
        return true;
    };

    handleAppStateChange = (nextAppState) => {
        let {dispatch} = this.props;

        if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
            let tempTime = getCurrentTime();
            let waste = tempTime - this.preTimes;


            if (waste > parseFloat(this.state.updateVersionLimitTime)) {
                //校验版本号是否一致
                this.fetchFindVersionResult(this.version, '1', this.systemName);
            }
        } else {
            //前台切换至后台
            this.preTimes = getCurrentTime();
        }
        this.setState({currentAppState: nextAppState});
    };

    fetchFindVersionResult = (version, operType, systemName) => {
        fetchFindVersionResult(systemName)
            .then(data => {
                var versionMap = data.data;
                if (versionMap) {
                    var nextVersion = versionMap.versionName;
                    var nextType = versionMap.type;
                    var versionDesc = versionMap.versionDesc;
                    var downloadUrl = versionMap.downloadUrl;

                    if (operType == '1') {
                        if (nextType == 'unique' && nextVersion != version) {
                            dispatch(logoutAction())
                            resetNavigationTo('LoginActivity', dispatch, null);
                        }

                        if (nextType == 'recommend' && nextVersion != version) {
                            this.setState({
                                updateValue: '1',
                                checkVersion: nextVersion,
                                updateContents: versionDesc,
                                updateUrl: downloadUrl,
                                isForceUpdateValue: '0'
                            });
                        }
                    }

                    if (operType == '0') {
                        if (nextVersion != version && nextType == 'unique') {
                            this.setState({
                                updateValue: '1',
                                checkVersion: nextVersion,
                                updateContents: versionDesc,
                                updateUrl: downloadUrl,
                                isForceUpdateValue: '1'
                            });
                        }
                        if (nextVersion != version && nextType == 'recommend') {
                            this.setState({
                                updateValue: '1',
                                checkVersion: nextVersion,
                                updateContents: versionDesc,
                                updateUrl: downloadUrl,
                                isForceUpdateValue: '0'
                            });
                        }
                    }

                }
            }).catch(err => {
            console.log("-----------------");
        });
    };

    render() {
        const addListener = createReduxBoundAddListener('root');
        const {dispatch, nav} = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav,
            addListener,
        });

        const {checkVersion, isForceUpdateValue, updateContents, updateUrl, updateValue} = this.state;
        let isShowSatusBar = Platform.OS === 'ios' ? false : true;

        return (
            <View style={{flex: 1}}>
                <StatusBar
                    hidden={isShowSatusBar}
                    animated={true}
                    backgroundColor={'#111C3C'}
                    translucent={true}
                    barStyle={'light-content'}
                />
                <AppNavigator navigation={navigation}/>

                {updateValue == 1 && (
                    <UpgradeBoxer style={UpgradeBoxer.hidden}
                                  version={checkVersion}
                                  isForceUpdateValue={isForceUpdateValue}
                                  updateContents={updateContents}
                                  updateUrl={updateUrl}>
                    </UpgradeBoxer>
                )}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
    userInfo: state.auth.userInfo,
});

//返回从1970年1月1日至今的毫秒数
export function getCurrentTime() {
    let date = new Date();
    return date.getTime();
}

export const AppWithNavigationState = connect(mapStateToProps)(RootNavigation);
