import React from 'react';
import {View} from 'react-native';
import {StackNavigator, TabBarTop, TabNavigator} from 'react-navigation';

import {
    MultiPayActivity,
    BillingModifyActivity,
    BillManageActivity,
    CashierActivity,
    CashierBillingActivity,
    ConsumableActivity,
    HomeActivity,
    IdentifyActivity,
    LoginActivity,
    MergeOrderPayActivity,
    PendingOrderActivity,
    PriceListActivity,
    RechargeActivity,
    ResetPwdActivity,
    RotatePlacardActivity,
    RotateSettingActivity,
    RotateSettingIndexActivity,
    RotateSettingStaffActivity,
    SelectCustomerType,
    VipcardActivity,
    GenWebViewActivity,
    AnalysisHome
} from '../activities';

import {PixelUtil} from '../utils';
// 收银
const CashierTabNavigator = TabNavigator(
    {
        CashierActivity: {
            screen: CashierActivity,
            navigationOptions: {
                tabBarLabel: '开单',
            },
        },
        PendingOrderActivity: {
            screen: PendingOrderActivity,
            navigationOptions: {
                tabBarLabel: '取单',
            },
        },
        IdentifyActivity: {
            screen: IdentifyActivity,
            navigationOptions: {
                tabBarLabel: '充值',
            },
        },
        SelectCustomerType: {
            screen: SelectCustomerType,
            navigationOptions: {
                tabBarLabel: '开卡',
            },
        },
    },
    {
        tabBarPosition: 'top',
        tabBarComponent: TabBarTop, //ios必须设置，否则下边线失效
        swipeEnabled: false, //ios必须设置，否则滑动失效
        animationEnabled: false,
        backBehavior: 'none',
        headerBackTitle: null,
        lazy: true,
        tabBarOptions: {
            showLabel: true,
            activeTintColor: '#111c3c',
            inactiveTintColor: '#333',
            activeBackgroundColor: '#fff',
            indicatorStyle: {
                backgroundColor: '#111c3c',
                height: PixelUtil.size(6),
                width: PixelUtil.size(86),
                marginLeft: PixelUtil.size(212),
            },
            style: {
                backgroundColor: '#ffffff',
                elevation: 0,
                shadowOpacity: 0,
                height: PixelUtil.size(86),
                borderBottomWidth: PixelUtil.size(2),
                borderBottomColor: '#cbcbcb'
            },
            labelStyle: {
                fontSize: PixelUtil.size(32),
                height: PixelUtil.size(45),
                marginTop: PixelUtil.size(0),
            },
        },
    }
);

export const AppNavigator = StackNavigator(
    {
        LoginActivity: {
            screen: LoginActivity,
            navigationOptions: {
                headerTitle: '登录',
                headerStyle: {
                    display: 'none',
                },
            },
        },
        ResetPwdActivity: {
            screen: ResetPwdActivity,
            navigationOptions: {
                headerTitle: '重置密码',
            },
        },
        GenWebViewActivity: {
            screen: GenWebViewActivity,
            navigationOptions: ({ navigation }) => {
                return {
                    title: navigation.state.params.title,
                    headerTitleStyle: {
                        textAlign: "center",
                        justifyContent: "center",
                        width: "100%"
                    }
                };
            },
        },
        HomeActivity: {
            screen: HomeActivity,
            navigationOptions: ({ navigation }) => {
                return {
                    title: navigation.state.params.title,
                    headerTitleStyle: {
                        textAlign: "center",
                        justifyContent: "center",
                        width: "100%"
                    }
                };
            },
        },
        CashierActivity: {
            screen: CashierTabNavigator,
            navigationOptions: {
                headerTitle: '收银',
            },
        },
        CashierBillingActivity: {
            screen: CashierBillingActivity,
            navigationOptions: {
                title: '收银',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        RechargeActivity: {
            screen: RechargeActivity,
            navigationOptions: {
                headerTitle: '充值',
            },
        },
        VipcardActivity: {
            screen: VipcardActivity,
            navigationOptions: {
                headerTitle: '售卡',
            },
        },
        RotatePlacardActivity: {
            screen: RotatePlacardActivity,
            navigationOptions: {
                title: '轮牌',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        RotateSettingActivity: {
            screen: RotateSettingActivity,
            navigationOptions: {
                title: '设置',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        RotateSettingIndexActivity: {
            screen: RotateSettingIndexActivity,
            navigationOptions: {
                title: '轮牌设置',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        RotateSettingStaffActivity: {
            screen: RotateSettingStaffActivity,
            navigationOptions: {
                title: '员工轮牌设置',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        ConsumableActivity: {
            screen: ConsumableActivity,
            navigationOptions: {
                title: '修改消耗',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        BillingModifyActivity: {
            screen: BillingModifyActivity,
            navigationOptions: {
                title: '结单管理',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        BillManageActivity: {
            screen: BillManageActivity,
            navigationOptions: {
                title: '结单列表',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        MergeOrderPayActivity: {
            screen: MergeOrderPayActivity,
            navigationOptions: {
                title: '并单结算',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        MultiPayActivity: {
            screen: MultiPayActivity,
            navigationOptions: {
                title: '组合支付',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        PriceListActivity: {
            screen: PriceListActivity,
            navigationOptions: {
                title: '价目单',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        },
        AnalysisHome: {
            screen: AnalysisHome,
            navigationOptions: {
                title: '统计',
                headerTitleStyle: {
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%"
                }
            },
        }
    },
    {
        navigationOptions: {
            mode: 'modal',
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
            headerRight: <View />,
        },
    }
);
