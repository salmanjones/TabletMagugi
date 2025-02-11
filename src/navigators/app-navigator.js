import React, {useState} from 'react';
import {connect} from 'react-redux';
import {AppState, BackHandler, Dimensions, Platform, StatusBar, View} from 'react-native';
import {createNavigationContainerRef, NavigationContainer,} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppConfig, clearFetchCache, desDecrypt, PixelUtil, resetNavigationTo, systemConfig,} from '../utils';

import {
    AnalysisHome,
    BillingModifyActivity,
    BillManageActivity,
    CashierActivity,
    CashierBillingActivity,
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
    ReserveBoardActivity,
    ResetPwdActivity,
    RotatePlacardActivity,
    RotateSettingActivity,
    RotateSettingIndexActivity,
    RotateSettingStaffActivity,
    SelectCustomerType,
    StaffQueueActivity,
    StaffWorksActivity,
    VipcardActivity,
    CashierBillingActivityOld,
    MultiPayActivityOld,
    SelectCustomerTypeOld,
    RechargeActivityOld,
    VipcardActivityOld
} from '../activities';
import {SafeAreaProvider} from 'react-native-safe-area-context/src/SafeAreaContext';
import Orientation from '@spicysparks/react-native-orientation';
import {fetchFindVersionResult} from '../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UpgradeBoxer} from '../components';
import Toast from 'react-native-root-toast';
import {getConfigNewReserve} from "../services/reserve";
import {TimerRightWidget} from "../components/header/TimerRightWidget";

const RootStack = createNativeStackNavigator();
const TabStack = createMaterialTopTabNavigator();
const navigationRef = createNavigationContainerRef();

/**
 * 页面结构
 * @returns {JSX.Element}
 * @constructor
 */
function RootNavigation(props) {
    // 版本号
    const currentVersion = systemConfig.version;
    // 是否开启新预约流程
    const [useNewReserveUI, setUseNewReserveUI] = useState(false)
    // 是否需要更新
    const [needUpdate, setNeedUpdate] = useState(false);
    const [versionInfo, setVersionInfo] = useState({
        checkVersion: '',
        updateContents: '',
        updateUrl: '',
        forceUpdateValue: '0',
    });
    // 当前APP活动状态
    let appState = AppState.currentState;
    // 进入后台的时间
    let backgroundTime = -1;
    // 按下物理返回键的时间
    let lastBackTime;

    // 处理事件监听
    React.useEffect(() => {
        // 锁定横屏
        Orientation.lockToLandscape();

        // 检查是否呈现新UI
        checkUIMode()

        // 检查版本
        checkAppVersion('0');

        // 物理返回键监听
        const backPressListener = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                const {route} = this.props;
                if (route.index !== 0) {
                    AppNavigate.goBack();
                } else {
                    if (lastBackTime && lastBackTime + 2000 >= Date.now()) {
                        return false;
                    }

                    lastBackTime = Date.now();
                    Toast.show('再按一次退出应用', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                    });
                }
                return true;
            },
        );

        // APP前后台状态变更监听
        const stateChangeListener = AppState.addEventListener(
            'change',
            nextState => {
                if (
                    appState.match(/inactive|background/) &&
                    nextState === 'active'
                ) {
                    // 后台切换至前台
                    let swipeTime = new Date().getTime();
                    let wasteTime = swipeTime - backgroundTime;
                    if (wasteTime > systemConfig.updateVersionLimitTime) {
                        checkAppVersion('1');
                    }
                } else {
                    //前台切换至后台
                    backgroundTime = new Date().getTime();
                }

                // 缓存本次状态
                appState = nextState;
            },
        );

        return () => {
            backPressListener.remove();
            stateChangeListener.remove();
        };
    }, []);

    /**
     * 是否需要展示新UI
     */
    const checkUIMode = () => {
        // 检查是否需要开启新UI
        AsyncStorage.getItem(AppConfig.staffRStore).then(userRStore => {
            if (userRStore && userRStore.length > 0) {
                const userInfo = JSON.parse(desDecrypt(userRStore));
                const storeId = userInfo.storeId

                // 检查是否开启新预约流程
                getConfigNewReserve({storeId}).then(backData => {
                    const {code, data} = backData
                    if ("6000" == code) {
                        setUseNewReserveUI(data)
                    } else {
                        console.log("获取新预约流程失败")
                    }
                }).catch(e => {
                    console.log("获取新预约流程失败")
                })

            }
        })
    }

    // 检查版本
    const checkAppVersion = operType => {
        const systemType = Platform.OS === 'ios' ? 'ios' : 'android';
        fetchFindVersionResult(systemType).then(data => {
            let versionMap = data.data;
            if (versionMap) {
                let nextVersion = versionMap.versionName;
                let nextType = versionMap.type;
                let versionDesc = versionMap.versionDesc;
                let downloadUrl = versionMap.downloadUrl;
                let forceUpdate = '0';
                let showUpdate = false;

                // 版本号处理
                let oldVersion = currentVersion.replaceAll(".", "")
                let newVersion = nextVersion.replaceAll(".", "")
                try{
                    oldVersion = parseInt(oldVersion)
                    newVersion = parseInt(newVersion)
                }catch (e){
                    oldVersion = 317
                    newVersion = 317
                    console.log("版本号处理失败", e)
                }

                // 是否强制更新
                if (operType == '1') {
                    if (newVersion > oldVersion &&nextType == 'unique') {
                        if (nextType == 'unique') {
                            clearFetchCache();
                            AsyncStorage.removeItem(AppConfig.staffRStore);
                            AsyncStorage.removeItem(
                                AppConfig.sessionStaffId,
                            );

                            resetNavigationTo('LoginActivity');
                        } else if (nextType == 'recommend') {
                            showUpdate = true;
                        }
                    }
                } else if (operType == '0') {
                    if (newVersion > oldVersion) {
                        showUpdate = true;

                        if (nextType == 'unique') {
                            forceUpdate = '1';
                        }
                    }
                }

                // 更新信息
                setVersionInfo({
                    ...versionInfo,
                    checkVersion: nextVersion,
                    updateContents: versionDesc,
                    updateUrl: downloadUrl,
                    forceUpdateValue: forceUpdate,
                });

                // 是否展示更新弹窗
                setNeedUpdate(showUpdate);
            }
        }).catch(err => {
            console.error('-----------------', err);
        })
    };

    // 返回UI
    return (
        <SafeAreaProvider>
            {/*状态栏*/}
            <StatusBar
                hidden={true}
                translucent={true}
                barStyle="light-content"
                backgroundColor="#111c3c"
            />
            {/*版本更新*/}
            {needUpdate && (
                <UpgradeBoxer
                    version={versionInfo.checkVersion}
                    isForceUpdateValue={versionInfo.forceUpdateValue}
                    updateContents={versionInfo.updateContents}
                    updateUrl={versionInfo.updateUrl}
                />
            )}
            {/*路由*/}
            <NavigationContainer ref={navigationRef}>
                <RootStack.Navigator
                    initialRouteName="LoginActivity"
                    options={{
                        headerBackTitle: null,
                        headerRight: () => {
                            return <View/>;
                        },
                    }}>
                    <RootStack.Screen
                        name="LoginActivity"
                        component={LoginActivity}
                        options={{
                            title: '登录',
                            headerShown: false,
                        }}
                    />
                    <RootStack.Screen
                        name="ResetPwdActivity"
                        component={ResetPwdActivity}
                        options={{
                            title: '重置密码',
                            headerShown: false,
                        }}
                    />
                    <RootStack.Screen
                        name="GenWebViewActivity"
                        component={GenWebViewActivity}
                        options={({route}) => ({
                            title: route.params.title.toString(),
                            headerShown: true,
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        })}
                    />
                    <RootStack.Screen
                        name="HomeActivity"
                        component={HomeActivity}
                        options={({route}) => ({
                            headerShown: true,
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                            title: route.params.title.toString(),
                        })}
                    />
                    {
                        (() => {
                            if (useNewReserveUI) {
                                return (
                                    <RootStack.Screen
                                        name="CashierBillingActivity"
                                        component={CashierBillingActivity}
                                        options={{
                                            title: '收银',
                                            headerTitleAlign: 'center',
                                            headerShown: true,
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                        }}
                                    />
                                )
                            } else {
                                return (
                                    <RootStack.Screen
                                        name="CashierBillingActivity"
                                        component={CashierBillingActivityOld}
                                        options={{
                                            title: '收银',
                                            headerTitleAlign: 'center',
                                            headerShown: true,
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                        }}
                                    />
                                )
                            }
                        })()
                    }

                    {
                        (()=>{
                            if (useNewReserveUI) {
                                return (
                                    <RootStack.Screen
                                        name="VipcardActivity"
                                        component={VipcardActivity}
                                        options={{
                                            title: '售卡',
                                            headerTitleAlign: 'center',
                                            headerShown: true,
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                        }}
                                    />
                                )
                            }else{
                                return (
                                    <RootStack.Screen
                                        name="VipcardActivity"
                                        component={VipcardActivityOld}
                                        options={{
                                            title: '售卡',
                                            headerTitleAlign: 'center',
                                            headerShown: true,
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                        }}
                                    />
                                )
                            }
                        })()
                    }

                    {
                        (()=>{
                            if (useNewReserveUI) {
                                return (
                                    <RootStack.Screen
                                        name="RechargeActivity"
                                        component={RechargeActivity}
                                        options={{
                                            title: '充值',
                                            headerTitleAlign: 'center',
                                            headerShown: true,
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                        }}
                                    />
                                )
                            }else{
                                return (
                                    <RootStack.Screen
                                        name="RechargeActivity"
                                        component={RechargeActivityOld}
                                        options={{
                                            title: '充值',
                                            headerTitleAlign: 'center',
                                            headerShown: true,
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                        }}
                                    />
                                )
                            }
                        })()
                    }
                    <RootStack.Screen
                        name="RotatePlacardActivity"
                        component={RotatePlacardActivity}
                        options={{
                            title: '轮牌',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="RotateSettingActivity"
                        component={RotateSettingActivity}
                        options={{
                            title: '设置',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="RotateSettingIndexActivity"
                        component={RotateSettingIndexActivity}
                        options={{
                            title: '轮牌设置',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="RotateSettingStaffActivity"
                        component={RotateSettingStaffActivity}
                        options={{
                            title: '员工轮牌设置',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="ConsumableActivity"
                        component={ConsumableActivity}
                        options={{
                            title: '修改消耗',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="BillingModifyActivity"
                        component={BillingModifyActivity}
                        options={{
                            title: '结单管理',
                            headerShown: true,
                            headerStyle: {
                                height: PixelUtil.size(132),
                                backgroundColor: '#111C3C',
                            },
                            headerTintColor: '#fff',
                            headerTitleAlign: 'center',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="MergeOrderPayActivity"
                        component={MergeOrderPayActivity}
                        options={{
                            title: '并单结算',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    {
                        (()=>{
                            if(useNewReserveUI){ // 新版UI
                                return (
                                    <RootStack.Screen
                                        name="MultiPayActivity"
                                        component={MultiPayActivity}
                                        options={{
                                            title: '组合支付',
                                            headerTitleAlign: 'center',
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                            headerShown: false,
                                        }}
                                        screenOptions={{presentation: 'modal'}}
                                    />
                                )
                            }else{
                                return (
                                    <RootStack.Screen
                                        name="MultiPayActivity"
                                        component={MultiPayActivityOld}
                                        options={{
                                            title: '组合支付',
                                            headerTitleAlign: 'center',
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                            headerShown: false,
                                        }}
                                        screenOptions={{presentation: 'modal'}}
                                    />
                                )
                            }
                        })()
                    }

                    <RootStack.Screen
                        name="PriceListActivity"
                        component={PriceListActivity}
                        options={{
                            title: '价目单',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="AnalysisHome"
                        component={AnalysisHome}
                        options={{
                            title: '统计',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    {
                        (() => {
                            if (useNewReserveUI) {
                                return (
                                    <RootStack.Screen
                                        name="CashierActivity"
                                        component={TabNavigationNew}
                                        options={{
                                            title: '收银',
                                            headerTitleAlign: 'center',
                                            headerShown: true,
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                            headerRight: () => (
                                                <TimerRightWidget/>
                                            )
                                        }}
                                    />
                                )
                            } else {
                                return (
                                    <RootStack.Screen
                                        name="CashierActivity"
                                        component={TabNavigationOld}
                                        options={{
                                            title: '收银',
                                            headerTitleAlign: 'center',
                                            headerShown: true,
                                            headerStyle: {
                                                backgroundColor: '#111C3C',
                                                height: PixelUtil.size(132),
                                            },
                                            headerTintColor: '#fff',
                                            headerTitleStyle: {
                                                color: 'white',
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: PixelUtil.size(32),
                                            },
                                        }}
                                    />
                                )
                            }
                        })()
                    }
                    <RootStack.Screen
                        name="StaffQueueActivity"
                        component={StaffQueueActivity}
                        options={{
                            title: '选牌',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#111C3C',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                    <RootStack.Screen
                        name="StaffWorksActivity"
                        component={StaffWorksActivity}
                        options={{
                            title: '作品',
                            headerTitleAlign: 'center',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#000000',
                                height: PixelUtil.size(132),
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                color: 'white',
                                textAlign: 'center',
                                alignSelf: 'center',
                                fontSize: PixelUtil.size(32),
                            },
                        }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

/**
 * Tab结构
 * @returns {JSX.Element}
 * @constructor
 */
function TabNavigationOld() {
    // tab栏位数量
    const tabStackSize = 5
    return (
        <TabStack.Navigator
            initialLayout={{width: Dimensions.get('window').width}}
            initialRouteName="ReserveBoardActivity"
            screenOptions={{
                tabBarActiveTintColor: '#2D2D2D',
                tabBarInactiveTintColor: '#6B6B6B',
                tabBarLabelStyle: {
                    fontSize: PixelUtil.size(32),
                    fontWeight: 'bold',
                },
                tabBarItemStyle: {},
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                },
                tabBarIndicatorContainerStyle: {
                    width: '100%',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: PixelUtil.size(2)
                },
                tabBarIndicatorStyle: {
                    width: PixelUtil.size(100),
                    height: PixelUtil.size(4),
                    backgroundColor: '#081539',
                    marginLeft: ((Dimensions.get('window').width) / tabStackSize - PixelUtil.size(100)) / 2
                }
            }}>
            {/*老开单入口*/}
            <TabStack.Screen
                name="CashierActivity"
                component={CashierActivity}
                options={{tabBarLabel: '开单'}}
            />
            <TabStack.Screen
                name="PendingOrderActivity"
                component={PendingOrderActivity}
                options={{tabBarLabel: '取单'}}
            />
            <TabStack.Screen
                name="IdentifyActivity"
                component={IdentifyActivity}
                options={{tabBarLabel: '充值'}}
            />
            <TabStack.Screen
                name="SelectCustomerType"
                component={SelectCustomerTypeOld}
                options={{tabBarLabel: '开卡'}}
            />
            <TabStack.Screen
                name="BillManageActivity"
                component={BillManageActivity}
                options={{tabBarLabel: '已结单据'}}
            />
        </TabStack.Navigator>
    );
}

/**
 * Tab结构
 * @returns {JSX.Element}
 * @constructor
 */
function TabNavigationNew() {
    // tab栏位数量
    const tabStackSize = 3
    return (
        <TabStack.Navigator
            initialLayout={{width: Dimensions.get('window').width}}
            initialRouteName="ReserveBoardActivity"
            screenOptions={{
                tabBarActiveTintColor: '#2D2D2D',
                tabBarInactiveTintColor: '#6B6B6B',
                tabBarLabelStyle: {
                    fontSize: PixelUtil.size(32),
                    fontWeight: 'bold',
                },
                tabBarItemStyle: {},
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                },
                tabBarIndicatorContainerStyle: {
                    width: '100%',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: PixelUtil.size(2)
                },
                tabBarIndicatorStyle: {
                    width: PixelUtil.size(100),
                    height: PixelUtil.size(4),
                    backgroundColor: '#081539',
                    marginLeft: ((Dimensions.get('window').width) / tabStackSize - PixelUtil.size(100)) / 2
                }
            }}>
            <TabStack.Screen
                name="ReserveBoardActivity"
                component={ReserveBoardActivity}
                options={{tabBarLabel: '开单'}}
            />
            <TabStack.Screen
                name="PendingOrderActivity"
                component={PendingOrderActivity}
                options={{tabBarLabel: '取单'}}
            />
            <TabStack.Screen
                name="BillManageActivity"
                component={BillManageActivity}
                options={{tabBarLabel: '已结单据'}}
            />
        </TabStack.Navigator>
    );
}

/**
 * 页面路由
 */
const mapStateToProps = state => ({
    userInfo: state.auth.userInfo,
});
export const AppNavigation = connect(mapStateToProps)(RootNavigation);

/**
 * 页面导航
 * @param name
 * @param params
 */
export const AppNavigate = {
    navigate: (name, params = {}) => {
        if (navigationRef.isReady()) {
            navigationRef.navigate(name, params);
        }
    },
    reset: (name, params) => {
        if (navigationRef.isReady()) {
            navigationRef.reset({
                index: 0,
                routes: [
                    {
                        name,
                        params,
                    },
                ],
            });
        }
    },
    redirect: (name, params = {}) => {
        if (navigationRef.isReady()) {
            let state = navigationRef.getState();
            const routes = [
                ...state.routes.slice(0, -1),
                {name, params},
                state.routes[state.routes.length - 1],
            ];

            return navigationRef.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });
        }
    },
    goBack: () => {
        if (navigationRef.isReady()) {
            navigationRef.goBack();
        }
    },
};
