import {
    Animated,
    Image,
    ImageBackground,
    LogBox,
    PanResponder,
    TouchableOpacity,
    View,
    Text,
    FlatList
} from "react-native";
import {getImage, ImageQutity, PixelUtil} from "../../utils";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import {MemberPanelStyles} from "../../styles/MemberPanel";
import {CouponWidget} from "./widgets/CouponWidget"
import {CardWidget} from "./widgets/CardWidget"

/**
 * 会员右滑组件
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

    /// 向父组件开放方法
    useImperativeHandle(refArgs, () => ({
        showRightPanel,
        hideRightPanel
    }))

    // 页签数据
    const tabArray = ['优惠券', '顾客资产', '消费画像', '基础档案']
    // 命中的页签
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <View style={animateState.sliderShow ? MemberPanelStyles.rightPanelMask : {display: 'none'}}>
            <Animated.View
                {...panResponder.panHandlers}
                style={animateState.sliderShow ? [MemberPanelStyles.rightPanelBox, {left: animateState.sliderLeft}] : {display: 'none'}}>
                {/*左侧点击区域*/}
                <TouchableOpacity onPress={() => {
                    hideRightPanel()
                }}
                                  activeOpacity={1}
                                  style={MemberPanelStyles.leftPanMask}>
                    <View style={MemberPanelStyles.hideIconBox}>
                        <TouchableOpacity onPress={() => {
                            hideRightPanel()
                        }}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/p-hide-box.png')}
                                   style={[MemberPanelStyles.hideIconButton, {resizeMode: 'contain'}]}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                {/*右侧*/}
                <View style={MemberPanelStyles.memberWrapBox}>
                    {/*基本信息*/}
                    <ImageBackground
                        resizeMode={'contain'}
                        source={require('@imgPath/member_panel_info_bg.png')}
                        style={MemberPanelStyles.memberInfoWrap}>
                        {/*基本信息*/}
                        <View style={MemberPanelStyles.memberInfoBaseBox}>
                            <View style={MemberPanelStyles.nameInfoBaseBox}>
                                {/*用户头像*/}
                                <Image
                                    style={MemberPanelStyles.customerAvatar}
                                    resizeMethod="resize"
                                    source={getImage('', ImageQutity.staff, require('@imgPath/reserve_customer_default_avatar.png'))}
                                    defaultSource={require('@imgPath/reserve_customer_default_avatar.png')}/>
                                <View style={MemberPanelStyles.namePhoneBox}>
                                    <View style={MemberPanelStyles.nameWrap}>
                                        <Text style={MemberPanelStyles.nameShowText}>钱嘉乐</Text>
                                        <Image
                                            style={MemberPanelStyles.customerSexIcon}
                                            resizeMode={'contain'}
                                            source={'1' == '1' ? require('@imgPath/reserve_customer_detail_fmale.png') : require('@imgPath/reserve_customer_detail_male.png')}/>
                                    </View>
                                    <Text style={MemberPanelStyles.phoneShowText}>
                                        158****6816
                                    </Text>
                                </View>
                            </View>
                            <View style={MemberPanelStyles.propertyInfoBaseBox}>
                                <View style={MemberPanelStyles.propertyInfoItemBox}>
                                    <Text style={MemberPanelStyles.propertyInfoItemTitle}>
                                        储值卡
                                    </Text>
                                    <Text style={MemberPanelStyles.propertyInfoItemValue}>
                                        3张
                                    </Text>
                                </View>
                                <View style={MemberPanelStyles.propertyInfoItemBox}>
                                    <Text style={MemberPanelStyles.propertyInfoItemTitle}>
                                        次卡
                                    </Text>
                                    <Text style={MemberPanelStyles.propertyInfoItemValue}>
                                        2张
                                    </Text>
                                </View>
                                <View style={MemberPanelStyles.propertyInfoItemBox}>
                                    <Text style={MemberPanelStyles.propertyInfoItemTitle}>
                                        储值卡余额
                                    </Text>
                                    <Text style={MemberPanelStyles.propertyInfoItemValue}>
                                        ¥1282952.00
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={MemberPanelStyles.memberInfoSplit}></View>
                    </ImageBackground>
                    {/*资产信息*/}
                    <View style={MemberPanelStyles.memberExtraInfoWrap}>
                        <View style={MemberPanelStyles.memberExtraTabWrap}>
                            {/*tab页签*/}
                            <View style={MemberPanelStyles.memberExtraTabBox}>
                            {tabArray.map((tab, index)=>{
                                return (
                                    <TouchableOpacity
                                        style={MemberPanelStyles.memberExtraTabItem}
                                        onPress={()=>{
                                            setTabIndex(index)
                                        }}>
                                        <Text style={tabIndex == index ? MemberPanelStyles.memberExtraTabItemTitleActive:MemberPanelStyles.memberExtraTabItemTitle}>{tab}</Text>
                                        <View style={tabIndex == index ? MemberPanelStyles.memberExtraTabItemLineActive : MemberPanelStyles.memberExtraTabItemLine}></View>
                                    </TouchableOpacity>
                                )
                            })}
                            </View>
                            {/*tab内容*/}
                            <View style={MemberPanelStyles.memberExtraTabContentBox}>
                                {
                                    tabIndex == 0 && (
                                        <CouponWidget couponArray={[{id:1, type: '1'},{id:2, type: '2'},{id:3, type: '3'},{id:4, type: '1'},{id:5, type: '2'},{id:6, type: '3'}]}/>
                                    )
                                }
                                {
                                    tabIndex == 1 && (
                                        <CardWidget cardArray={[{id:1, type: '1'},{id:2, type: '2'},{id:3, type: '3'},{id:4, type: '4'},{id:5, type: '1'},{id:6, type: '2'},{id:7, type: '3'},{id:8, type: '4'}]}/>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    {/*操作按钮*/}
                    <ImageBackground
                        resizeMode={'contain'}
                        source={require('@imgPath/member_panel_operator_bg.png')}
                        style={MemberPanelStyles.operatorWrap}>
                    </ImageBackground>
                </View>
            </Animated.View>
        </View>
    )
})

// 使用React.memo渲染缓存，防止父组件属性变更导致子组件渲染
export default React.memo(MemberPanelForwardRef)
