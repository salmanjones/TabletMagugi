// 预约看板
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";
import dayjs from "dayjs";
import {useNavigation, useRoute} from '@react-navigation/native';
import ReduxStore from "../../store/store"
import {ReserveBoardStyles} from "../../styles/ReserveBoard";
import {getReserveInfo, saveReserveVocation, cancelStaffReserve, getReserveInitData, getCustomerDetail} from "../../services/reserve";
import MemberPanel from "../../components/memberPanel/MemberPanel";
import CustomerReservePanel from "../../components/reservePanel/CustomerReservePanel";
import GuestReservePanel from "../../components/reservePanel/GuestReservePanel";
import StylistWidget from "./widgets/StylistFlatList"
import CustomerWidget from "./widgets/CustomerFlatList"
import {showMessageExt} from "../../utils";

export const ReserveBoardActivity = props => {
    // 路由
    const route = useRoute()
    // 导航
    const navigation = useNavigation();
    // redux状态
    const reduxState = ReduxStore.getState()
    // 加载提示信息
    const [isLoading, setLoading] = useState(false)
    // 预约状态切换
    const [reserveFlag, setReserveFlag] = useState('valid')
    // 预约信息
    const [reserveInfoArray, setReserveInfoArray] = useState([
        {
            staffName: "全部",
            staffReseverCount: 0,
            staffNowReseverCount: 0,
            staffPassReseverCount: 0
        }
    ])
    // 选中发型师的数据
    const [stylistCheckedIndex, setStylistCheckedIndex] = useState(0)
    // 会员子组件
    const memberPanelRef = useRef(null);
    // 顾客信息
    const [customerState, setCustomerState] = useState({
    })
    // 顾客预约子组件
    const customerReservePanelRef = useRef(null);
    // 顾客预约基础数据
    const [reserveBaseData, setReserveBaseData] = useState({
        reserveResoures: [],
        reserveInfoList: []
    })
    // 散客预约子组件
    const guestReservePanelRef = useRef(null);

    // 获取预约数据
    const getReserveList = (callBack) => {
        setLoading(true)
        const params = {
            companyId: reduxState.auth.userInfo.companyId,
            storeId: reduxState.auth.userInfo.storeId,
        }
        getReserveInfo(params).then(backData => {
            const {code, data} = backData
            if ("6000" == code) {
                setReserveInfoArray(data)
            } else {
                showToast("信息加载失败")
            }
        }).catch(e => {
            console.log("预约开单数据加载失败", e)
            showToast("信息加载失败")
        }).finally(() => {
            setLoading(false)
            callBack && callBack()
            // 初次加载完毕，不再展示加载信息
            console.log('数据请求完成')
        })
    }

    // 初次加载处理
    useEffect(() => {
        // 准备参数
        const reloadDelay = 1000 * 60 * 10 // 10分钟刷新一次预约列表
        // 首次获取数据
        getReserveList()

        // 定时刷新数据
        const timer = setInterval(() => {
            const memberPanelShow = memberPanelRef.current.getShowState()
            const reserveMemberShow = customerReservePanelRef.current.getShowState()
            const reserveCustomerShow = guestReservePanelRef.current.getShowState()
            // 弹框中不刷新数据
            if(memberPanelShow || reserveMemberShow || reserveCustomerShow){
                return
            }

            // 刷新数据
            getReserveList()
        }, reloadDelay)

        return () => {
            //在组件卸载前执行
            timer && clearInterval(timer)
        }
    }, []) // 如果指定的是[],回调函数只会在第一次render()后执行


    //展示提示信息
    const showToast = (message) => {
        Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }

    // 选择发型师
    const checkStylistEvent = React.useCallback((index) => {
        setStylistCheckedIndex(index)
    }, [])

    // 客户卡片点击
    const customerCardPressEvent = React.useCallback((type, extra, callBack) => {
        const storeId = reduxState.auth.userInfo.storeId

        switch (type) {
            case 'showDetail': // 查看详情
                const customerInfo = extra['customer']
                const args = {
                    appUserId: customerInfo.appUserId,
                    reserveId: customerInfo.recordId
                }

                setLoading(true)
                getCustomerDetail(args).then(backData=>{
                    const {code, data} = backData
                    if(code == '6000'){
                        console.log("data", JSON.stringify(data))
                    }else{
                        showMessageExt("获取顾客信息失败")
                    }
                }).catch(e=>{
                    console.error("获取顾客信息失败", e)
                    showMessageExt("获取顾客信息失败")
                }).finally(_=>{
                    setLoading(false)
                })

                memberPanelRef.current.showRightPanel()
                break
            case 'memberReserve': // 会员预约
                setLoading(true)
                const {staffId, reserveTime} = extra
                getReserveInitData({
                    storeId,
                    staffId
                }).then(backData=>{
                    const {code, data} = backData
                    if(code == '6000'){
                        const timeReserve = dayjs().format("YYYY-MM-DD ") + reserveTime
                        data['reserveTime'] = timeReserve
                        setReserveBaseData(data)
                        customerReservePanelRef.current.showRightPanel()
                    }else{
                        showMessageExt("获取发型师预约信息失败")
                    }
                }).catch(e=>{
                    console.error("获取发型师预约信息失败", e)
                    showMessageExt("获取发型师预约信息失败")
                }).finally(_=>{
                    setLoading(false)
                })
                break;
            case 'guestReserve': // 散客预约
                break;
            case 'addOccupy':  // 时间占用
                Alert.alert('系统提示', "确定要占用该时段吗", [
                    {
                        text: '是',
                        onPress: () => {
                            setLoading(true)
                            const {reserveTime, staffId} = extra
                            saveReserveVocation({storeId, staffId, reserveTime}).then(backData => {
                                const {code, data} = backData
                                if(code != '6000'){ // 占用异常
                                    Alert.alert(
                                        '系统提示',
                                        data || '占用异常',
                                        [
                                            {
                                                text: '知道了',
                                            }
                                        ]
                                    );
                                    callBack && callBack(backData)
                                }else{
                                    callBack && callBack(backData)
                                }
                            }).catch(e => {
                                console.log(e)
                                callBack && callBack({code: '7000', data: ''})
                            }).finally(_ => {
                                setLoading(false)
                            })
                        },
                    },
                    {
                        text: '否',
                    },
                ]);
                break;
            case 'cancelReserve': // 0:取消预约 1:取消占用
                const {type, recordId} = extra
                const tips = type == '0' ? '确定要取消该预约吗?':'确定要取消该占用吗?'
                Alert.alert('系统提示', tips, [
                    {
                        text: '是',
                        onPress: () => {
                            setLoading(true)
                            cancelStaffReserve({type, recordId}).then(backData => {
                                const {code, data} = backData
                                if(code != '6000'){ // 占用异常
                                    Alert.alert(
                                        '系统提示',
                                        data || '取消异常',
                                        [
                                            {
                                                text: '知道了',
                                            }
                                        ]
                                    );
                                    callBack && callBack(backData)
                                }else{
                                    showMessageExt("取消成功", {
                                        position: Toast.positions.CENTER
                                    })
                                    callBack && callBack(backData)
                                }
                            }).catch(e => {
                                console.log(e)
                                callBack && callBack({code: '7000', data: ''})
                            }).finally(_ => {
                                setLoading(false)
                            })

                        },
                    },
                    {
                        text: '否',
                    },
                ]);
                break;
        }
    }, [])

    return (
        <View style={ReserveBoardStyles.boardWrapBox}>
            {/*加载中*/}
            <Spinner visible={isLoading} textContent={'加载中'} textStyle={{color: '#FFF'}}/>
            {/*预约状态切换*/}
            <View style={ReserveBoardStyles.reserveFlagBox}>
                <TouchableOpacity
                    onPress={() => {
                        setReserveFlag('valid')
                    }}
                    style={reserveFlag == 'valid' ? [ReserveBoardStyles.reserveValidActiveStyle] : [ReserveBoardStyles.reserveValidStyle]}>
                    <Text
                        style={reserveFlag == 'valid' ? ReserveBoardStyles.reserveFlagTxtActive : ReserveBoardStyles.reserveFlagTxt}>
                        当前预约
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setReserveFlag('invalid')
                    }}
                    style={reserveFlag == 'invalid' ? [ReserveBoardStyles.reserveInvalidActiveStyle] : [ReserveBoardStyles.reserveInvalidStyle]}>
                    <Text
                        style={reserveFlag == 'invalid' ? ReserveBoardStyles.reserveFlagTxtActive : ReserveBoardStyles.reserveFlagTxt}>
                        过期预约
                    </Text>
                </TouchableOpacity>
            </View>
            {/*预约信息展示*/}
            <View style={ReserveBoardStyles.reserveInfoBox}>
                <View style={ReserveBoardStyles.reserveDetailWrap}>
                    {/*发型师列表*/}
                    <View style={ReserveBoardStyles.reserveStylistBox}>
                        {reserveInfoArray.length > 0 && (
                            <StylistWidget checkStylistEvent={checkStylistEvent}
                                           reserveInfoArray={reserveInfoArray}
                                           reserveFlag={reserveFlag}/>
                        )}
                    </View>
                    {/*顾客预约列表*/}
                    <View style={ReserveBoardStyles.reserveCustomerBox}>
                        {reserveInfoArray.length > 0 && (
                            <CustomerWidget
                                stylistReserveInfo = {reserveInfoArray[stylistCheckedIndex]} // 当前发型师预约数据
                                reserveFlag={reserveFlag}
                                customerCardEvent={customerCardPressEvent}/>
                        )}
                    </View>
                </View>
            </View>
            {/*会员信息面板*/}
            <MemberPanel ref={memberPanelRef} memberInfo={customerState}/>
            {/*顾客预约面板信息*/}
            <CustomerReservePanel ref={customerReservePanelRef} reserveBaseData={reserveBaseData} reloadReserveData={getReserveList}/>
            {/*散客预约*/}
            <GuestReservePanel ref={guestReservePanelRef}/>
        </View>
    )
}
