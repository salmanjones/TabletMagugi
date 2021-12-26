import React from 'react';
import {connect} from 'react-redux';
import {StatusBar, View} from 'react-native';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PixelUtil} from '../utils';

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
    ResetPwdActivity,
    RotatePlacardActivity,
    RotateSettingActivity,
    RotateSettingIndexActivity,
    RotateSettingStaffActivity,
    SelectCustomerType,
    VipcardActivity
} from '../activities';
import {SafeAreaProvider} from "react-native-safe-area-context/src/SafeAreaContext";
import {HeaderLogout, HeaderMoments} from "../components";

const RootStack = createNativeStackNavigator();
const TabStack = createMaterialTopTabNavigator();
const navigationRef = createNavigationContainerRef()

/**
 * 页面结构
 * @returns {JSX.Element}
 * @constructor
 */
function RootNavigation() {
    return (
        <SafeAreaProvider>
            {/*状态栏*/}
            <StatusBar hidden={true}
                       translucent={true}
                       barStyle="light-content"
                       backgroundColor="#6a51ae"/>
            {/*路由*/}
            <NavigationContainer ref={navigationRef}>
                <RootStack.Navigator
                    initialRouteName="LoginActivity"
                    options={{
                        headerBackTitle: null,
                        headerRight: () => {
                            return <View/>
                        }
                    }}
                >
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
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        })}/>
                    <RootStack.Screen
                        name="HomeActivity"
                        component={HomeActivity}
                        options={({route}) => ({
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
                            title: route.params.title.toString(),
                        })}
                    />
                    <RootStack.Screen
                        name="CashierBillingActivity"
                        component={CashierBillingActivity}
                        options={{
                            title: '收银',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="RechargeActivity"
                        component={RechargeActivity}
                        options={{title: '充值'}}
                    />
                    <RootStack.Screen
                        name="VipcardActivity"
                        component={VipcardActivity}
                        options={{title: '售卡'}}
                    />
                    <RootStack.Screen
                        name="RotatePlacardActivity"
                        component={RotatePlacardActivity}
                        options={{
                            title: '轮牌',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="RotateSettingActivity"
                        component={RotateSettingActivity}
                        options={{
                            title: '设置',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="RotateSettingIndexActivity"
                        component={RotateSettingIndexActivity}
                        options={{
                            title: '轮牌设置',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="RotateSettingStaffActivity"
                        component={RotateSettingStaffActivity}
                        options={{
                            title: '员工轮牌设置',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="ConsumableActivity"
                        component={ConsumableActivity}
                        options={{
                            title: '修改消耗',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="BillingModifyActivity"
                        component={BillingModifyActivity}
                        options={{
                            title: '结单管理',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="BillManageActivity"
                        component={BillManageActivity}
                        options={{
                            title: '结单列表',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="MergeOrderPayActivity"
                        component={MergeOrderPayActivity}
                        options={{
                            title: '并单结算',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="MultiPayActivity"
                        component={MultiPayActivity}
                        options={{
                            title: '组合支付',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            },
                            headerShown: false
                        }}
                        screenOptions={{presentation: 'modal'}}
                    />
                    <RootStack.Screen
                        name="PriceListActivity"
                        component={PriceListActivity}
                        options={{
                            title: '价目单',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="AnalysisHome"
                        component={AnalysisHome}
                        options={{
                            title: '统计',
                            headerTitleStyle: {
                                textAlign: "center",
                                justifyContent: "center",
                                width: "100%"
                            }
                        }}
                    />
                    <RootStack.Screen
                        name="CashierActivity"
                        component={TabNavigation}
                        options={{
                            title: '收银',
                        }}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

/**
 * Tab结构
 * @returns {JSX.Element}
 * @constructor
 */
function TabNavigation() {
    return (
        <TabStack.Navigator
            initialRouteName="CashierActivity"
            options={{
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
            <TabStack.Screen name="CashierActivity"
                             component={CashierActivity}
                             options={{tabBarLabel: '开单'}}/>
            <TabStack.Screen name="PendingOrderActivity"
                             component={PendingOrderActivity}
                             options={{tabBarLabel: '取单'}}/>
            <TabStack.Screen name="IdentifyActivity"
                             component={IdentifyActivity}
                             options={{tabBarLabel: '充值'}}/>
            <TabStack.Screen name="SelectCustomerType"
                             component={SelectCustomerType}
                             options={{tabBarLabel: '开卡'}}/>
        </TabStack.Navigator>
    );
}

/**
 * 页面路由
 */
const mapStateToProps = state => ({
    userInfo: state.auth.userInfo
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
            })
        }
    },
    redirect: (name, params = {}) => {
        if (navigationRef.isReady()) {
            let state = navigationRef.getState()
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
            navigationRef.goBack()
        }
    }
}
