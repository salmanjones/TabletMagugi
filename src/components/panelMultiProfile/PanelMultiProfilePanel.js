import {Animated, FlatList, Image, LogBox, PanResponder, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {PixelUtil} from "../../utils";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {PanelMultiProfiles} from "../../styles/PanelMultiProfile";
import {BackgroundImage} from "react-native-elements/dist/config";
import {MultiProfileItem} from "./widgets/MultiProfileItem";

/**
 * 多档案会员右侧浮动面板
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const PanelMultiProfilePanelForwardRef = forwardRef(({multiProfileData, customerClickEvent}, refArgs) => {
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
    const showRightPanel = (showType = 'member') => {
        setShowType(showType)
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

    /// 展示类型
    const [showType, setShowType] = useState('member') // 当前控件展示类型
    /// 查询值
    const [userPhone, setUserPhone] = useState('')
    /// 是否展示清除按钮
    const [showClear, setShowClear] = useState(false)
    /// 会员列表
    const [memberProfileList, setMemberProfileList] = useState(null)
    /// 多会员数据
    const [multiProfileArray, setMultiProfileArray] = useState([])
    useEffect(()=>{
        setMultiProfileArray(multiProfileData)
    }, [multiProfileData])

    // 多档案数据
    return (
        <View style={animateState.sliderShow ? PanelMultiProfiles.rightPanelMask : {display: 'none'}}>
            <Animated.View
                {...panResponder.panHandlers}
                style={animateState.sliderShow ? [PanelMultiProfiles.rightPanelBox, {left: animateState.sliderLeft}] : {display: 'none'}}>
                {/*左侧点击区域*/}
                <TouchableOpacity
                    onPress={() => {hideRightPanel()}}
                    activeOpacity={1}
                    style={PanelMultiProfiles.leftPanMask}>
                    <View style={PanelMultiProfiles.hideIconBox}>
                        <TouchableOpacity onPress={() => {hideRightPanel()}}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/p-hide-box.png')}
                                   style={[PanelMultiProfiles.hideIconButton, {resizeMode: 'contain'}]}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                {/*右侧内容区域*/}
                <View style={PanelMultiProfiles.contentWrapBox}>
                    <BackgroundImage
                        resizeMode={'stretch'}
                        style={PanelMultiProfiles.headerBox}
                        source={showType == 'query' ? require('@imgPath/reserve_customer_multi_profile_bg.png') : require('@imgPath/reserve_customer_multi_profile_exist_bg.png')}>
                        {
                            (()=>{
                                if(showType == 'query'){
                                    return (
                                        <View style={PanelMultiProfiles.contentHeadWrap}>
                                            <Text style={PanelMultiProfiles.contentHeadTitle}>查询顾客</Text>
                                            <View style={PanelMultiProfiles.headSearchBox}>
                                                {/*输入框*/}
                                                <Image
                                                    resizeMode={"contain"}
                                                    style={PanelMultiProfiles.headSearchIcon}
                                                    source={require('@imgPath/reserve_panel_customer_search_icon.png')}></Image>
                                                <TextInput
                                                    keyboardType={'phone-pad'}
                                                    style={showClear ? PanelMultiProfiles.headSearchInputFull:PanelMultiProfiles.headSearchInputEmpty}
                                                    placeholder={'请输入预约手机号'}
                                                    placeholderTextColor={'#8e8e8e'}
                                                    onChange={({nativeEvent})=>{
                                                        const phone = nativeEvent.text
                                                        const showClear = phone.trim().length > 0
                                                        setUserPhone(phone)
                                                        setShowClear(showClear)
                                                    }}
                                                    value={userPhone}
                                                    maxLength={11}/>
                                                {/*查询*/}
                                                <TouchableOpacity
                                                    onPress={()=>{
                                                        queryCustomerInfo()
                                                    }}
                                                    style={PanelMultiProfiles.headSearchButton}>
                                                    <Image
                                                        resizeMode={"contain"}
                                                        style={PanelMultiProfiles.headSearchButtonImg}
                                                        source={require('@imgPath/reserve_panel_customer_search_btn.png')}></Image>
                                                </TouchableOpacity>
                                                {/*清除*/}
                                                {
                                                    showClear && (
                                                        <TouchableOpacity
                                                            style={PanelMultiProfiles.headClearButton}
                                                            onPress={()=>{
                                                                setUserPhone('')
                                                                setMemberProfileList(null)
                                                            }}>
                                                            <Image
                                                                resizeMode={"contain"}
                                                                style={PanelMultiProfiles.headClearButtonImg}
                                                                source={require('@imgPath/reserve_panel_customer_search_reset.png')}></Image>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            </View>
                                        </View>
                                    )
                                }else if(showType == 'member'){
                                    return (
                                        <View style={PanelMultiProfiles.contentHeadTxtWrap}>
                                            <Text style={PanelMultiProfiles.contentHeadTitleTxt}>该手机号下有多个顾客档案，请选择~</Text>
                                        </View>
                                    )
                                }
                            })()
                        }
                    </BackgroundImage>
                    <View style={PanelMultiProfiles.memberBodyWrap}>
                        <FlatList
                            data={multiProfileArray}
                            renderItem={
                                ({item, index}) => {
                                    return <MultiProfileItem profileItem={item} index={index} size={multiProfileArray.length} customerClickEvent={customerClickEvent}/>
                                }
                            }
                            keyExtractor={(item)=>item.memberNo}
                            ItemSeparatorComponent={()=>{
                                return <View style={PanelMultiProfiles.profileItemSplit}/>
                            }}/>
                    </View>
                </View>
            </Animated.View>
        </View>
    )
})

// 使用React.memo渲染缓存，防止父组件属性变更导致子组件渲染
export default React.memo(PanelMultiProfilePanelForwardRef)
