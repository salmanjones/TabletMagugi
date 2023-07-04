import {Animated, Image, ImageBackground, LogBox, PanResponder, Text, TouchableOpacity, View,} from "react-native";
import {getImage, ImageQutity, PixelUtil} from "../../utils";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import {PanelCustomerStyles} from "../../styles/PanelCustomer";
import {ReserveWidget} from "./widgets/ReserveWidget";
import {CouponWidget} from "./widgets/CouponWidget";
import {CardWidget} from "./widgets/CardWidget";
import {ProfileWidget} from "./widgets/ProfileWidget";
import {PortraitWidget} from "./widgets/PortraitWidget";

/**
 * 散客开单浮动面板
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
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

    /// 展示面板
    const showRightPanel = () => {
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
    const getShowState = ()=>{
        return animateState.sliderShow
    }

    /// 向父组件开放方法
    useImperativeHandle(refArgs, () => ({
        showRightPanel,
        hideRightPanel,
        getShowState,
    }))

    // 页签数据
    let tabArray = ['预约信息', '基础档案']
    // 命中的页签
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <View style={animateState.sliderShow ? PanelCustomerStyles.rightPanelMask : {display: 'none'}}>
            <Animated.View
                {...panResponder.panHandlers}
                style={animateState.sliderShow ? [PanelCustomerStyles.rightPanelBox, {left: animateState.sliderLeft}] : {display: 'none'}}>
                {/*左侧点击区域*/}
                <TouchableOpacity onPress={() => {hideRightPanel()}}
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
                            <Text style={PanelCustomerStyles.nameShowTextCustomer}>{decodeURIComponent(customerInfo['reserveInfo'].memberName)}</Text>
                        </View>
                        <View style={PanelCustomerStyles.memberInfoSplit}></View>
                    </ImageBackground>
                    {/*资产信息*/}
                    <View style={PanelCustomerStyles.memberExtraInfoWrap}>
                        <View style={PanelCustomerStyles.memberExtraTabWrap}>
                            {/*tab页签*/}
                            <View style={PanelCustomerStyles.memberExtraTabBox}>
                                {
                                    tabArray.map((tab, index)=>{
                                        return (
                                            <TouchableOpacity
                                                style={PanelCustomerStyles.memberExtraTabItem}
                                                onPress={()=>{
                                                    setTabIndex(index)
                                                }}>
                                                <Text style={tabIndex == index ? PanelCustomerStyles.memberExtraTabItemTitleActive:PanelCustomerStyles.memberExtraTabItemTitle}>{tab}</Text>
                                                <View style={tabIndex == index ? PanelCustomerStyles.memberExtraTabItemLineActive : PanelCustomerStyles.memberExtraTabItemLine}></View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            {/*tab内容*/}
                            <View style={PanelCustomerStyles.memberExtraTabReserveBox}>
                                {
                                    tabArray[tabIndex] == '预约信息' && (
                                        <ReserveWidget reserveInfo={customerInfo['reserveInfo']} reserveFlag={reserveFlag} customerPressEvent={customerPressEvent}/>
                                    )
                                }
                                {
                                    tabArray[tabIndex] == '基础档案' && (
                                        <View></View>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    {/*操作按钮*/}
                    {
                        tabIndex == 0 && (
                            <ImageBackground
                                resizeMode={'contain'}
                                source={require('@imgPath/member_panel_operator_bg.png')}
                                style={PanelCustomerStyles.operatorWrap}>
                                <TouchableOpacity style={PanelCustomerStyles.operatorBtnCashier}>
                                    <Text style={PanelCustomerStyles.operatorBtnTxt}>办卡</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={PanelCustomerStyles.operatorBtnCard}
                                    onPress={()=>{
                                        customerPressEvent("toCreateOrder", {appUserId: customerInfo.appUserId})
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
