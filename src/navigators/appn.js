import React from 'react';
import {connect} from 'react-redux';
import {Alert, AppState, BackHandler, Platform, View} from 'react-native';
import Orientation from 'react-native-orientation';
import Toast from 'react-native-root-toast';
import {CommonActions, NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PixelUtil, resetNavigationTo, systemConfig} from '../utils';
import {logoutAction} from '../actions';
import {fetchFindVersionResult} from '../services';

import {
    AnalysisHome,
    BillingModifyActivity,
    BillManageActivity,
    ConsumableActivity,
    GenWebViewActivity,
    HomeActivity,
    IdentifyActivity,
    LoginActivity,
    MergeOrderPayActivity,
    MultiPayActivity,
    PendingOrderActivity,
    PriceListActivity,
    RechargeActivity,
    ResetPwdActivity,
    RotatePlacardActivity,
    RotateSettingActivity,
    RotateSettingIndexActivity,
    RotateSettingStaffActivity,
    SelectCustomerType,
    VipcardActivity
} from '../activities';
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";

let instance = null;
const backToExistAppMsg = '再按一次退出应用';
const RootStack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

class RootNavigation extends React.Component {
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

    constructor(props) {
        super(props);
        if (instance == null && !__DEV__) {
            instance = this;
            this.defaultHandler = ErrorUtils.getGlobalHandler && ErrorUtils.getGlobalHandler();
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
        this.preTimes = -1;
        this.systemName = Platform.OS === 'ios' ? 'ios' : 'android';
    }

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
        const {dispatch, route} = this.props;
        if (route.index !== 0) {
            dispatch(CommonActions.goBack());
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
        if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
            let tempTime = new Date().getTime();
            let waste = tempTime - this.preTimes;
            if (waste > parseFloat(this.state.updateVersionLimitTime)) {
                //校验版本号是否一致
                this.fetchFindVersionResult(this.version, '1', this.systemName);
            }
        } else {
            //前台切换至后台
            this.preTimes = new Date().getTime();
        }
        this.setState({currentAppState: nextAppState});
    };

    fetchFindVersionResult = (version, operType, systemName) => {
        fetchFindVersionResult(systemName).then(data => {
            let versionMap = data.data;
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
            console.error("-----------------", err);
        });
    };

    render() {
        const {checkVersion, isForceUpdateValue, updateContents, updateUrl, updateValue} = this.state;
        let isShowSatusBar = Platform.OS === 'ios' ? false : true;

        return (
            <View>
                <StatusBar
                    hidden={isShowSatusBar}
                    animated={true}
                    backgroundColor={'#111C3C'}
                    translucent={true}
                    barStyle={'light-content'}>
                </StatusBar>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <RootStack.Navigator
                            initialRouteName="LoginActivity"
                            screenOptions={{
                                headerShown: false,
                                headerStyle: {
                                    backgroundColor: '#111C3C',
                                    height: PixelUtil.size(132),
                                },
                                headerTitleStyle: {
                                    color: 'white',
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    fontSize: PixelUtil.size(36),
                                },
                                headerTintColor: 'white',
                                headerBackTitle: null,
                                headerRight: () => {
                                    return <View/>
                                }
                            }}>
                            <RootStack.Screen name="LoginActivity"
                                              component={LoginActivity}
                                              options={{title: '登录'}}/>
                            <RootStack.Screen name="ResetPwdActivity"
                                              component={ResetPwdActivity}
                                              options={{title: '重置密码'}}/>
                            <RootStack.Screen name="GenWebViewActivity"
                                              component={GenWebViewActivity}
                                              options={({route}) => ({title: route.params.count.toString()})}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="HomeActivity"
                                              component={HomeActivity}
                                              options={({route}) => ({title: route.params.count.toString()})}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="RechargeActivity"
                                              component={RechargeActivity}
                                              options={{title: '充值'}}/>
                            <RootStack.Screen name="VipcardActivity"
                                              component={VipcardActivity}
                                              options={{title: '售卡'}}/>
                            <RootStack.Screen name="RotatePlacardActivity"
                                              component={RotatePlacardActivity}
                                              options={{title: '轮牌'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="RotateSettingActivity"
                                              component={RotateSettingActivity}
                                              options={{title: '设置'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="RotateSettingIndexActivity"
                                              component={RotateSettingIndexActivity}
                                              options={{title: '轮牌设置'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="RotateSettingStaffActivity"
                                              component={RotateSettingStaffActivity}
                                              options={{title: '员工轮牌设置'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="ConsumableActivity"
                                              component={ConsumableActivity}
                                              options={{title: '修改消耗'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="BillingModifyActivity"
                                              component={BillingModifyActivity}
                                              options={{title: '结单管理'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="BillManageActivity"
                                              component={BillManageActivity}
                                              options={{title: '结单列表'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="MergeOrderPayActivity"
                                              component={MergeOrderPayActivity}
                                              options={{title: '并单结算'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="MultiPayActivity"
                                              component={MultiPayActivity}
                                              options={{title: '组合支付'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="PriceListActivity"
                                              component={PriceListActivity}
                                              options={{title: '价目单'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="AnalysisHome"
                                              component={AnalysisHome}
                                              options={{title: '统计'}}
                                              screenOptions={{
                                                  headerTitleStyle: {
                                                      textAlign: "center",
                                                      justifyContent: "center",
                                                      width: "100%"
                                                  }
                                              }}/>
                            <RootStack.Screen name="CashierActivity" options={{title: '收银'}}>
                                {() => (
                                    <Tab.Navigator
                                        initialRouteName="CashierActivity"
                                        tabBar={() => null}
                                        screenOptions={{
                                            headerShown: false,
                                            tabBarIndicatorStyle: {
                                                backgroundColor: '#111c3c',
                                                height: PixelUtil.size(6),
                                                width: PixelUtil.size(86),
                                                marginLeft: PixelUtil.size(212),
                                            },
                                            tabBarStyle: {
                                                backgroundColor: '#ffffff',
                                                elevation: 0,
                                                shadowOpacity: 0,
                                                height: PixelUtil.size(86),
                                                borderBottomWidth: PixelUtil.size(2),
                                                borderBottomColor: '#cbcbcb'
                                            },
                                            tabBarLabelStyle: {
                                                fontSize: PixelUtil.size(32),
                                                height: PixelUtil.size(45),
                                                marginTop: PixelUtil.size(0),
                                            }
                                        }}>
                                        <Tab.Screen name="CashierActivity"
                                                    component={CashierActivity}
                                                    options={{tabBarLabel: '开单'}}/>
                                        <Tab.Screen name="PendingOrderActivity"
                                                    component={PendingOrderActivity}
                                                    options={{tabBarLabel: '取单'}}/>
                                        <Tab.Screen name="IdentifyActivity"
                                                    component={IdentifyActivity}
                                                    options={{tabBarLabel: '充值'}}/>
                                        <Tab.Screen name="SelectCustomerType"
                                                    component={SelectCustomerType}
                                                    options={{tabBarLabel: '开卡'}}/>
                                    </Tab.Navigator>
                                )}
                            </RootStack.Screen>¬
                        </RootStack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
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

export const AppNavigationBak = connect(state => ({userInfo: state.auth.userInfo}))(RootNavigation);
