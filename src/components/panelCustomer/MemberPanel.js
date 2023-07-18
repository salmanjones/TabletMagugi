import {Animated, Image, ImageBackground, LogBox, PanResponder, Text, TouchableOpacity, View} from "react-native";
import {getImage, ImageQutity, PixelUtil} from "../../utils";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {PanelCustomerStyles} from "../../styles/PanelCustomer";
import {CouponWidget} from "./widgets/CouponWidget"
import {CardWidget} from "./widgets/CardWidget"
import {ReserveWidget} from "./widgets/ReserveWidget"
import {ProfileWidget} from "./widgets/ProfileWidget"
import {PortraitWidget} from "./widgets/PortraitWidget"
import {ModifyInfoWidget} from "./widgets/ModifyInfoWidget";

/**
 * 会员预约详情、档案信息浮动面板
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const MemberPanelForwardRef = forwardRef((props, refArgs) => {
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

    /// 页面来源
    const [pagerName, setPagerName] = useState('ReserveBoardActivity')

    /// 展示面板
    const showRightPanel = (pager = 'ReserveBoardActivity') => {
        // 记录页面来源
        setPagerName(pager)

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

    // 预约顾客信息
    const customerInfo = props['memberInfo']
    // 服务人ID
    const waiterId = customerInfo['reserveInfo']['staffId']
    // 页签数据
    // let tabArray = ['预约信息', '优惠券', '顾客资产', '消费画像', '基础档案']
    let tabArray = ['预约信息', '优惠券', '顾客资产', '基础档案']
    if(customerInfo.couponList.length < 1){
        tabArray = tabArray.filter(item=> item != '优惠券')
    }
    if((customerInfo.czkCount + customerInfo.ckCount) < 1){
        tabArray = tabArray.filter(item=> item != '顾客资产')
    }
    if(pagerName == 'CashierBillingActivity' && customerInfo.isBmsNew == '0'){
        tabArray = tabArray.filter(item=> item == '基础档案')
    }
    // 命中的页签
    const [tabIndex, setTabIndex] = useState(0)
    // 当前页签
    const reserveFlag = props['reserveFlag']

    // 打开时，重置tab
    useEffect(()=>{
        setTabIndex(0)
    }, [animateState.sliderShow])

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
                        <View style={PanelCustomerStyles.memberInfoBaseBox}>
                            <View style={PanelCustomerStyles.nameInfoBaseBox}>
                                {/*用户头像*/}
                                <Image
                                    style={PanelCustomerStyles.customerAvatar}
                                    resizeMethod="resize"
                                    source={getImage(customerInfo.imgUrl, ImageQutity.staff, require('@imgPath/reserve_customer_default_avatar.png'))}
                                    defaultSource={require('@imgPath/reserve_customer_default_avatar.png')}/>
                                <View style={PanelCustomerStyles.namePhoneBox}>
                                    <View style={PanelCustomerStyles.nameWrap}>
                                        <Text style={PanelCustomerStyles.nameShowText}>{customerInfo.nickName ? decodeURIComponent(customerInfo.nickName) : '未填写姓名'}</Text>
                                        <Image
                                            style={PanelCustomerStyles.customerSexIcon}
                                            resizeMode={'contain'}
                                            source={customerInfo.sex == '1' ? require('@imgPath/reserve_customer_detail_fmale.png') : require('@imgPath/reserve_customer_detail_male.png')}/>
                                    </View>
                                    <Text style={PanelCustomerStyles.phoneShowText}>
                                        {customerInfo.reserveInfo.memberPhoneShow}
                                    </Text>
                                </View>
                            </View>
                            <View style={PanelCustomerStyles.propertyInfoBaseBox}>
                                <View style={pagerName == 'CashierBillingActivity' ? PanelCustomerStyles.propertyInfoItemBtnBox: PanelCustomerStyles.propertyInfoItemBox}>
                                    <Text style={PanelCustomerStyles.propertyInfoItemTitle}>
                                        储值卡
                                    </Text>
                                    <Text style={PanelCustomerStyles.propertyInfoItemValue}>
                                        {customerInfo.czkCount}张
                                    </Text>
                                </View>
                                <View style={pagerName == 'CashierBillingActivity' ? PanelCustomerStyles.propertyInfoItemBtnBox: PanelCustomerStyles.propertyInfoItemBox}>
                                    <Text style={PanelCustomerStyles.propertyInfoItemTitle}>
                                        次卡
                                    </Text>
                                    <Text style={PanelCustomerStyles.propertyInfoItemValue}>
                                        {customerInfo.ckCount}张
                                    </Text>
                                </View>
                                <View style={pagerName == 'CashierBillingActivity' ? PanelCustomerStyles.propertyInfoItemBtnBox: PanelCustomerStyles.propertyInfoItemBox}>
                                    <Text style={PanelCustomerStyles.propertyInfoItemTitle}>
                                        储值卡余额
                                    </Text>
                                    <Text style={PanelCustomerStyles.propertyInfoItemValue}>
                                        ¥{customerInfo.czkPriceSum}
                                    </Text>
                                </View>
                                {
                                    pagerName == 'CashierBillingActivity' && (<View style={pagerName == 'CashierBillingActivity' ? PanelCustomerStyles.propertyInfoItemBtnBox: PanelCustomerStyles.propertyInfoItemBox}>
                                        <TouchableOpacity
                                            style={PanelCustomerStyles.propertyInfoItemBtn}
                                            onPress={()=>{

                                            }}>
                                            <Image
                                                style={PanelCustomerStyles.propertyInfoItemBtn}
                                                resizeMode={'contain'}
                                                source={require("@imgPath/cashier_billing_customer_newcard.png")}></Image>
                                        </TouchableOpacity>
                                    </View>)
                                }
                            </View>
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
                            <View style={tabArray[tabIndex] == '预约信息' || tabArray[tabIndex] == '消费画像' || tabArray[tabIndex] == '基础档案'
                                ? PanelCustomerStyles.memberExtraTabReserveBox
                                : PanelCustomerStyles.memberExtraTabContentBox}>
                                {
                                    tabArray[tabIndex] == '预约信息' && (
                                        <ReserveWidget reserveInfo={customerInfo['reserveInfo']} reserveFlag={reserveFlag} customerPressEvent={props.customerPressEvent}/>
                                    )
                                }
                                {
                                    tabArray[tabIndex] == '优惠券' && (
                                        <CouponWidget couponList={customerInfo['couponList']}/>
                                    )
                                }
                                {
                                    tabArray[tabIndex] == '顾客资产' && (
                                        <CardWidget
                                            cardsInfo={customerInfo['cardsInfo']}
                                            customerPressEvent={props.customerPressEvent}
                                            extendsInfo={{
                                                appUserId: customerInfo.appUserId,
                                                reserveId: customerInfo['reserveInfo']['reserveId'],
                                                waiterId
                                            }}
                                        />
                                    )
                                }
                                {
                                    tabArray[tabIndex] == '消费画像' && (
                                        <ProfileWidget profileInfo={customerInfo['memberCountInfo']}/>
                                    )
                                }
                                {
                                    (()=>{
                                        if(tabArray[tabIndex] == '基础档案'){
                                            if(pagerName == 'CashierBillingActivity' && customerInfo.isBmsNew == '0'){
                                                return (
                                                    <ModifyInfoWidget portraitInfo={customerInfo} customerPressEvent={props.customerPressEvent}/>
                                                )
                                            }else{
                                                return (
                                                    <PortraitWidget portraitInfo={customerInfo}/>
                                                )
                                            }
                                        }
                                    })()
                                }
                            </View>
                        </View>
                    </View>
                    {/*操作按钮*/}
                    {
                        pagerName != 'CashierBillingActivity' && (
                            <ImageBackground
                                resizeMode={'contain'}
                                source={require('@imgPath/member_panel_operator_bg.png')}
                                style={PanelCustomerStyles.operatorWrap}>
                                <TouchableOpacity
                                    onPress={()=>{
                                        props['customerPressEvent']("toCreateOrder", {appUserId: customerInfo.appUserId, queryType:'appUserId', showType: 'member', waiterId, actionType: 'createCard'})
                                    }}
                                    style={PanelCustomerStyles.operatorBtnCashier}>
                                    <Text style={PanelCustomerStyles.operatorBtnTxt}>办卡</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={PanelCustomerStyles.operatorBtnCard}
                                    onPress={()=>{
                                        props['customerPressEvent']("toCreateOrder", {appUserId: customerInfo.appUserId, queryType:'appUserId', showType: 'member', waiterId, actionType: 'createOrder'})
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
export default React.memo(MemberPanelForwardRef)
