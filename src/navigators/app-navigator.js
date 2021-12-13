import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PixelUtil} from '../utils';

import {
    AnalysisHome,
    BillingModifyActivity,
    BillManageActivity,
    CashierActivity,
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
            <NavigationContainer ref={navigationRef}>
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
                                      options={({route}) => ({title: route.params.title.toString()})}
                                      screenOptions={{
                                          headerTitleStyle: {
                                              textAlign: "center",
                                              justifyContent: "center",
                                              width: "100%"
                                          }
                                      }}/>
                    <RootStack.Screen name="HomeActivity"
                                      component={HomeActivity}
                                      options={({route}) => ({title: route.params.title.toString()})}
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
                            <TabStack.Navigator
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
                        )}
                    </RootStack.Screen>
                </RootStack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

/**
 * 页面结构
 */
export const AppNavigation = connect(state => ({userInfo: state.auth.userInfo}))(RootNavigation);

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
    redirect: (name, params = {})=>{
        if (navigationRef.isReady()) {
            let state = navigationRef.getState()
            const routes = [
                ...state.routes.slice(0, -1),
                { name, params },
                state.routes[state.routes.length - 1],
            ];

            return navigationRef.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });
        }
    },
    goBack: ()=>{
        if (navigationRef.isReady()) {
            navigationRef.goBack()
        }
    }
}
