import {Animated, Image, ImageBackground, LogBox, PanResponder, Text, TouchableOpacity, View,} from "react-native";
import {decodeContent, getImage, ImageQutity, PixelUtil, showMessageExt} from "../../utils";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {PanelCustomerStyles} from "../../styles/PanelCustomer";
import {ReserveWidget} from "./widgets/ReserveWidget";
import {GuestProfileWidget} from "./widgets/GusetProfile";
import ReduxStore from "../../store/store";
import {getGuestQRImg, getScanQRState} from "../../services/reserve";
import Spinner from "react-native-loading-spinner-overlay";

let loopTimerId = null // 定时器ID
let glUniqueId = null // 唯一ID
/**
 * 散客开单浮动面板
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const maxWaitTime = 1000 * 60 * 2.5 // 最大等待时间为3分钟，比后台多等待30秒
let loopTimeSum = 0 // 累计等待时间
const GuestPanelForwardRef = forwardRef(({customerInfo, reserveFlag, customerPressEvent}, refArgs) => {
    // 左滑动画
    const animateLeft = new Animated.Value(PixelUtil.screenSize.width - PixelUtil.size(120));
    const [animateState, setAnimateState] = useState({
        sliderShow: false,
        sliderLeft: animateLeft
    })
    // 屏蔽动画警告
    LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);

    // 手势处理
    const panResponder = PanResponder.create({
        // 在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互: 需要注意，当水平位移大于10时，才进行后面的操作，不然可能是点击事件
        onMoveShouldSetPanResponder(evt, gestureState) {
            if (gestureState.dx > 15 && Math.abs(gestureState.dy) == 0) { // 右滑手势
                return true;
            } else {
                return false;
            }
        },
        // 滑动响应
        onPanResponderGrant: (evt, gestureState) => {
            hideRightPanel()
        }
    });

    /// 后续动作
    const [actionType, setActionType] = useState('createOrder')
    /// 是否已预约 withReserve:已预约 noReserve:未预约
    const [showMode, setShowMode] = useState('')
    /// 页签数据
    const [tabArray, setTabArray] = useState([])
    /// 命中的页签
    const [tabIndex, setTabIndex] = useState(0)
    /// 加载中
    const [isLoading, setLoading] = useState(false)
    /// 小程序二维码
    const [wxQRImg, setWxQRImg] = useState(null)
    /// 扫码状态 0:未扫码 1:已扫码 2:已授权 3:授权超时
    const [scanState, setScanState] = useState(null)
    /// 来源页面
    const [pagerName, setPagerName] = useState(null)
    /// 登录用户信息
    const loginUser = ReduxStore.getState().auth.userInfo

    /// 生成唯一id
    const getUniqueId = () => {
        // 唯一ID
        glUniqueId = loginUser.storeId + new Date().getTime() + "" + parseInt(Math.random() * 1000)
    }

    /// 展示面板
    const showRightPanel = (mode, actionType, pagerName) => {
        if (mode == 'noReserve') { // 无预约信息
            setTabArray(['基础档案'])
        } else {
            if(customerInfo.reserveInfo){
                setTabArray(['预约信息', '基础档案'])
            }else{
                setTabArray(['基础档案'])
            }
        }
        setActionType(actionType)
        setWxQRImg('')
        setShowMode(mode)
        setTabIndex(0)
        setPagerName(pagerName)

        Animated.timing(animateState.sliderLeft, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
        setAnimateState({
            ...animateState,
            sliderShow: true
        })
    }

    /// 隐藏面板
    const hideRightPanel = () => {
        Animated.timing(animateState.sliderLeft, {
            toValue: animateLeft,
            duration: 500,
            useNativeDriver: false
        }).start(() => {
            setAnimateState({
                ...animateState,
                sliderShow: false
            })
        });
    }

    /// 获取控件展示状态
    const getShowState = () => {
        return animateState.sliderShow
    }

    /// 向父组件开放方法
    useImperativeHandle(refArgs, () => ({
        showRightPanel,
        hideRightPanel,
        getShowState,
    }))

    /// 获取待扫描的二维码
    const getScanCode = (callBack) => {
        const source = '0' // 来自于平板扫码
        const scene = loginUser.companyId + "@" + loginUser.storeId + "@" + source + "@" + glUniqueId
        const qrArgs = {
            "page": "pages/welcomePage/welcomePage",
            "scene": scene,
            "width": 800,
            "auto_color": false,
            "line_color": {"r": 0, "g": 0, "b": 0},
            "is_hyaline": true
        }
        // 预约ID
        const reserveId = customerInfo.reserveInfo && customerInfo.reserveInfo.reserveId ? customerInfo.reserveInfo.reserveId : ''

        setLoading(true)
        getGuestQRImg({
            args: JSON.stringify(qrArgs),
            storeId: loginUser.storeId,
            uniqueId: glUniqueId,
            reserveId: reserveId
        }).then(backData => {
            const {code, data} = backData
            if (code == '6000') {
                setWxQRImg(data)
                callBack && callBack()
            }
        }).catch(e => {
            showMessageExt("获取小程序码失败")
            console.error("获取小程序码失败", e)
        }).finally(_ => {
            setLoading(false)
        })
    }

    /// 展示加载二维码
    useEffect(() => {
        if (animateState.sliderShow) { // 展示请求二维码
            getUniqueId()
            setScanState(null)
            getScanCode(() => {
                if (showMode == 'noReserve') {
                    refreshQRCodeState()
                }
            })
        } else { // 隐藏销毁定时器
            setTabIndex(0)
            clearTimer()
        }
    }, [animateState.sliderShow, showMode])

    /// 刷新二维码状态
    const refreshQRCodeState = () => {
        // 销毁已存在的定时器
        clearTimer()

        // 每隔1.5秒获取扫码状态
        loopTimerId = setInterval(() => {
            loopTimeSum += 1000
            if(loopTimeSum > maxWaitTime){
                clearTimer()
                return
            }

            const args = {uniqueId: glUniqueId}
            getScanQRState(args).then(result => {
                const resCode = result.code
                const {state, appUserId} = result.data // -1 授权超时 0扫码成功 1授权成功
                if (resCode == '6000' && state !== null && state !== undefined) {
                    setScanState(state)
                    if (state == 1) { // 授权成功
                        // 清除循环定时
                        clearTimer()

                        // 进入开单页面
                        let tmpTimerId = setTimeout(() => {
                            if (tmpTimerId !== null && tmpTimerId !== undefined) {
                                clearTimeout(tmpTimerId)
                            }
                            naviToCashier(appUserId)
                        }, 1200)
                    }
                }
            }).catch(e => {
                console.log("获取扫码状态失败", e)
            })
        }, 1000)
    }

    /// 销毁定时器
    const clearTimer = () => {
        if (loopTimerId != null) {
            clearInterval(loopTimerId)
            loopTimerId = null
            loopTimeSum = 0
        }
    }

    /// 点击tab
    const tabPressEvent = (index, actionType = 'createOrder') => {
        setTabIndex(index)
        setActionType(actionType)

        // 扫码标签
        if (index == 1) {
            refreshQRCodeState()
        }
    }

    /// 更新扫码状态
    const rescanQRCode = (state) => {
        // 清除时间循环
        clearTimer()
        // 重新生成二维码
        getUniqueId()
        // 获取新二维码
        getScanCode(() => {
            // 刷新页面状态
            setScanState(state)
            // 重新启动定时
            refreshQRCodeState()
        })
    }

    if(!customerInfo){
        customerInfo = {
            isBmsNew: 0, // 是否是bms的新用户，0否，1是
            memberCountInfo: {},
            reserveInfo: {
                reserveResoures: [],
                reserveInfoList: []
            },
            couponList: [],
            cardsInfo: {},
            czkCount: 0,
            ckCount: 0
        }
    }

    /// 进入开单页面
    const naviToCashier = (appUserId) => {
        let waiterId =  ''
        if(customerInfo['reserveInfo'] && customerInfo['reserveInfo']['staffId']){
            waiterId = customerInfo['reserveInfo']['staffId']
        }

        customerPressEvent('toCreateOrder', {
            queryType: 'appUserId',
            appUserId,
            showType: 'scanCode',
            showMode,
            waiterId,
            actionType
        })
    }

    return (
        <View style={animateState.sliderShow ? PanelCustomerStyles.rightPanelMask : {display: 'none'}}>
            <Spinner visible={isLoading} textContent={'加载中'} textStyle={{color: '#FFF'}}/>
            <Animated.View
                {...panResponder.panHandlers}
                style={animateState.sliderShow ? [PanelCustomerStyles.rightPanelBox, {left: animateState.sliderLeft}] : {display: 'none'}}>
                {/*左侧点击区域*/}
                <TouchableOpacity onPress={() => {
                    hideRightPanel()
                }}
                                  activeOpacity={1}
                                  style={PanelCustomerStyles.leftPanMask}>
                    <View style={PanelCustomerStyles.hideIconBox}>
                        <TouchableOpacity onPress={() => {
                            hideRightPanel()
                        }}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/p-hide-box.png')}
                                   style={[PanelCustomerStyles.hideIconButton, {resizeMode: 'contain'}]}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                {/*右侧*/}
                <View style={PanelCustomerStyles.memberWrapBox}>
                    {/*基本信息*/}
                    <ImageBackground
                        resizeMode={'contain'}
                        source={require('@imgPath/member_panel_info_bg.png')}
                        style={PanelCustomerStyles.memberInfoWrap}>
                        {/*基本信息*/}
                        <View style={PanelCustomerStyles.customerInfoBaseBox}>
                            {/*用户头像*/}
                            <Image
                                style={PanelCustomerStyles.customerAvatar}
                                resizeMethod="resize"
                                source={getImage(customerInfo.imgUrl, ImageQutity.staff, require('@imgPath/reserve_customer_default_avatar.png'))}
                                defaultSource={require('@imgPath/reserve_customer_default_avatar.png')}/>
                            <Text style={PanelCustomerStyles.nameShowTextCustomer}>
                                {customerInfo['reserveInfo'] ? decodeContent(customerInfo['reserveInfo'].memberName):''}
                            </Text>
                        </View>
                        <View style={PanelCustomerStyles.memberInfoSplit}></View>
                    </ImageBackground>
                    {/*资产信息*/}
                    <View style={PanelCustomerStyles.memberExtraInfoWrap}>
                        <View style={PanelCustomerStyles.memberExtraTabWrap}>
                            {/*tab页签*/}
                            <View style={PanelCustomerStyles.memberExtraTabBox}>
                                {
                                    tabArray.map((tab, index) => {
                                        return (
                                            <TouchableOpacity
                                                style={PanelCustomerStyles.memberExtraTabItem}
                                                onPress={() => {
                                                    tabPressEvent(index)
                                                }}>
                                                <Text style={tabIndex == index ? PanelCustomerStyles.memberExtraTabItemTitleActive : PanelCustomerStyles.memberExtraTabItemTitle}>
                                                    {tab}
                                                </Text>
                                                <View style={tabIndex == index ? PanelCustomerStyles.memberExtraTabItemLineActive : PanelCustomerStyles.memberExtraTabItemLine}></View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            {/*tab内容*/}
                            <View style={PanelCustomerStyles.memberExtraTabReserveBox}>
                                {
                                    tabArray[tabIndex] == '预约信息' &&
                                    customerInfo['reserveInfo'] && (
                                        <ReserveWidget reserveInfo={customerInfo['reserveInfo']} reserveFlag={reserveFlag}
                                                       customerPressEvent={customerPressEvent}/>
                                    )
                                }
                                {
                                    tabArray[tabIndex] == '基础档案' && (
                                        <GuestProfileWidget
                                            tabIndex={tabIndex}
                                            sliderShow={animateState.sliderShow}
                                            scanState={scanState}
                                            wxQRImg={wxQRImg}
                                            rescanQREvent={rescanQRCode}
                                            showMode={showMode}
                                            customerPressEvent={customerPressEvent}
                                            reserveInfo={customerInfo['reserveInfo']}
                                            actionType={actionType}
                                            pagerName={pagerName}/>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    {/*操作按钮*/}
                    {
                        showMode != 'noReserve' && tabIndex == 0 && (
                            <ImageBackground
                                resizeMode={'contain'}
                                source={require('@imgPath/guest_panel_operator_bg.png')}
                                style={PanelCustomerStyles.operatorGuestWrap}>
                                <TouchableOpacity
                                    style={PanelCustomerStyles.operatorBtnCard}
                                    onPress={() => {
                                        tabPressEvent(1, 'createOrder')
                                    }}>
                                    <Text style={PanelCustomerStyles.operatorBtnTxt}>开单</Text>
                                </TouchableOpacity>
                            </ImageBackground>
                        )
                    }
                </View>
            </Animated.View>
        </View>
    )
})

// 使用React.memo渲染缓存，防止父组件属性变更导致子组件渲染
export default React.memo(GuestPanelForwardRef)
