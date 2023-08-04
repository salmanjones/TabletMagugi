import {FlatList, Image, Keyboard, Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {PanelMultiProfiles} from "../../styles/PanelMultiProfile";
import {MultiProfileItem} from "./widgets/MultiProfileItem";

/**
 * 多档案会员右侧浮动面板
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const MultiPayProfilePanelForwardRef = forwardRef(({cards, multiProfileData, customerClickEvent}, refArgs) => {
    /// 展示面板
    const showRightPanel = (showMode = 'withReserve', showType = 'member', phone, waiterId, actionType, pagerName) => {
        setShowMode(showMode)
        setShowType(showType)
        setActionType(actionType)
        setUserPhone(phone)
        setWaiterId(waiterId)
        setShowClear(phone && phone.length > 0)
        setPagerName(pagerName)
        setShowState(true)
    }

    /// 隐藏面板
    const hideRightPanel = () => {
        setShowState(false)
    }

    /// 获取状态
    const getShowState = ()=>{
        return showState
    }

    /// 向父组件开放方法
    useImperativeHandle(refArgs, () => ({
        showRightPanel,
        hideRightPanel,
        getShowState
    }))

    /**
     * 跳转来源
     * member:会员面板点击开单->[多档案]
     * scanCode:散客扫码面板->扫码->多档案
     * guestPhone:散客扫码面板->查询手机号
     * searchPhone:多档案面板->查询手机号
     */
    const [showType, setShowType] = useState('member')
    /// 是否展示控件
    const [showState, setShowState] = useState(false)
    /// 是否已预约 withReserve:已预约 noReserve:未预约
    const [showMode, setShowMode] = useState('withReserve')
    /// 去向：createOrder 开单 createCard开卡
    const [actionType, setActionType] = useState('createOrder')
    /// 服务人id
    const [waiterId, setWaiterId] = useState('')
    /// 查询值
    const [userPhone, setUserPhone] = useState('')
    /// 页面来源
    const [pagerName, setPagerName] = useState('')
    /// 是否展示清除按钮
    const [showClear, setShowClear] = useState(false)
    /// 多会员数据
    const [multiProfileArray, setMultiProfileArray] = useState([])
    useEffect(()=>{
        setMultiProfileArray(multiProfileData)
    }, [multiProfileData])

    /// 监听展示状态
    const flatListRef = useRef(null);
    useEffect(()=>{
        if(showState){
            multiProfileArray && multiProfileArray.length > 0 && flatListRef.current?.scrollToIndex({animated: true, index: 0})
        }
    }, [showState])

    // 不展示控件
    if(!showState){
        return (<View></View>)
    }

    // 有卡时，不展示多档
    if(cards.length > 0){
        return (<View></View>)
    }

    // 多档案数据
    return (
        <View style={PanelMultiProfiles.contentWrapOtherBox}>
            <View style={PanelMultiProfiles.headerOtherBox}>
                {
                    (()=>{
                        if(showType == 'query'){
                            return (
                                <View style={PanelMultiProfiles.contentHeadOtherWrap}>
                                    <View style={PanelMultiProfiles.headSearchBox}>
                                        {/*输入框*/}
                                        <Image
                                            resizeMode={"contain"}
                                            style={PanelMultiProfiles.headSearchIcon}
                                            source={require('@imgPath/reserve_panel_customer_search_icon.png')}></Image>
                                        <TextInput
                                            keyboardType={'phone-pad'}
                                            style={showClear ? PanelMultiProfiles.headSearchOtherInputFull:PanelMultiProfiles.headSearchOtherInputEmpty}
                                            placeholder={'请输入顾客手机号'}
                                            placeholderTextColor={'#8e8e8e'}
                                            onChange={({nativeEvent})=>{
                                                const inputText = nativeEvent.text.trim()
                                                const phone = inputText.replace(/[^\d.]/g, "")
                                                const showClear = phone.length > 0
                                                setUserPhone(phone)
                                                setShowClear(showClear)
                                            }}
                                            value={userPhone}
                                            maxLength={11}/>
                                        {/*查询*/}
                                        <TouchableOpacity
                                            onPress={()=>{
                                                //隐藏键盘
                                                Keyboard.dismiss();
                                                customerClickEvent('toCreateOrder', {phone: userPhone, showType:'searchPhone', queryType:'phone', showMode, waiterId, actionType: actionType})
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
                                                        setMultiProfileArray([])
                                                        //隐藏键盘
                                                        Keyboard.dismiss();
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
            </View>
            <View style={PanelMultiProfiles.memberBodyPayWrap}>
                <FlatList
                    ref={flatListRef}
                    data={multiProfileArray}
                    renderItem={
                        ({item, index}) => {
                            return <MultiProfileItem
                                profileItem={item}
                                index={index}
                                size={multiProfileArray.length}
                                customerClickEvent={customerClickEvent}
                                showMode={showMode}
                                waiterId={waiterId}
                                actionType={actionType}
                                pagerName={pagerName}/>
                        }
                    }
                    keyExtractor={(item)=>item.memberNo}
                    ItemSeparatorComponent={()=>{
                        return <View style={PanelMultiProfiles.profileItemSplit}/>
                    }}
                    ListEmptyComponent={()=>{
                        return (
                            <View style={PanelMultiProfiles.memberOtherBodyEmptyWrap}>
                                <Image
                                    resizeMode={"contain"}
                                    source={require('@imgPath/reserve_customer_body_empty.png')}
                                    style={PanelMultiProfiles.memberBodyEmptyImage}/>
                                <Text style={PanelMultiProfiles.memberBodyEmptyTxt}>无符合条件的顾客档案！</Text>
                            </View>
                        )
                    }}/>
            </View>
        </View>
    )
})

// 使用React.memo渲染缓存，防止父组件属性变更导致子组件渲染
export default React.memo(MultiPayProfilePanelForwardRef)
