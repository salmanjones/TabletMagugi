import {
    Animated,
    Image,
    ImageBackground,
    LogBox,
    PanResponder,
    TouchableOpacity,
    View,
    Text, Alert, TextInput,
} from "react-native";
import {getImage, ImageQutity, PixelUtil, showMessageExt} from "../../utils";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {ReservePanelStyles} from "../../styles/ReservePanel";
import {getAppUserInfo, saveCustomerReserve} from "../../services/reserve";
import Spinner from "react-native-loading-spinner-overlay";
import ReduxStore from "../../store/store"

/**
 * 会员右滑组件
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const CustomerReservePanelForwardRef = forwardRef((props, refArgs) => {
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

    /// 处理页面数据
    useEffect(()=>{
        if(animateState.sliderShow){

            setUserPhone('')
            setShowClear(false)
            setCustomerInfo(null)
            setUserName('')
            setReserveTypeIndex(0)
            setReserveSourceIndex(0)
            setReserveRemark('')
        }
    }, [animateState.sliderShow])


    // 加载提示信息
    const [isLoading, setLoading] = useState(false)
    /// 查询值
    const [userPhone, setUserPhone] = useState('')
    /// 顾客姓名
    const [userName, setUserName] = useState('')
    /// 是否展示清除按钮
    const [showClear, setShowClear] = useState(false)
    /// 顾客信息
    const [customerInfo, setCustomerInfo] = useState(null)
    /// 预约来源
    const [reserveSourceIndex, setReserveSourceIndex] = useState(0)
    /// 服务类型
    const [reserveTypeIndex, setReserveTypeIndex] = useState(0)
    /// 服务备注
    const [reserveRemark, setReserveRemark] = useState('')
    /// 保存按钮是否可用
    const [canSave, setCanSava] = useState(false)
    /// 开始保存
    const saveReserve = ()=>{
        if(canSave){
            // 组装参数
            const storeId = ReduxStore.getState().auth.userInfo.storeId
            const staffId = reserveBaseData.staffId
            const reserveTime = reserveBaseData.reserveTime
            const reserveSource = reserveBaseData['reserveResoures'][reserveSourceIndex]['value']
            const reserveType = reserveBaseData['reserveInfoList'][reserveTypeIndex]['reserveName']
            const reserveTypeId = reserveBaseData['reserveInfoList'][reserveTypeIndex]['reserveId']
            const reservedTypeId = '' // Lex修改，防止后台多端同时点击导致判定失败

            const params = {
                storeId,
                staffId,
                reserveTime,
                reserveSource,
                reserveType,
                reserveTypeId,
                reservedTypeId,
                appUserId: customerInfo.appUserId,
                appUserName: customerInfo != null && customerInfo.result == 'empty' ? userName : customerInfo.nickName,
                appUserPhone: customerInfo.phone,
                appUserSex: customerInfo.sex,
                remark: reserveRemark
            }

            setLoading(true)
            saveCustomerReserve(params).then(backData=>{
                const {code, data} = backData
                if(code == '6000'){
                    setLoading(false)
                    props.reloadReserveData(()=>{
                        hideRightPanel()
                        showMessageExt("预约成功")
                    })
                }else{
                    setLoading(false)
                    Alert.alert(
                        '系统提示',
                        data || "预约保存失败",
                        [
                            {
                                text: '知道了',
                            }
                        ]
                    )
                }
            }).catch(e=>{
                console.error(e)
                setLoading(false)
                Alert.alert(
                    '系统提示',
                    "预约保存失败",
                    [
                        {
                            text: '知道了',
                        }
                    ]
                )
            })
        }else{
            Alert.alert(
                '系统提示',
                "预约信息不能为空",
                [
                    {
                        text: '知道了',
                    }
                ]
            )
        }
    }

    /// 获取手机号的顾客信息
    const queryCustomerInfo = ()=>{
        if(userPhone.trim().length > 1){
            setLoading(true)
            getAppUserInfo({phone: userPhone}).then(backdata=>{
                const {code, data} = backdata
                if(code == '6000'){
                    if(data.appUserId && data.appUserId.length > 0){
                        data['result'] = 'success'
                    }else{
                        data['result'] = 'empty'
                    }
                    setCustomerInfo(data)
                }else{
                    setCustomerInfo({result: 'empty'})
                    showMessageExt("获取顾客信息失败")
                }
                console.log(backdata)
            }).catch(e=>{
                setCustomerInfo({result: 'empty'})
                showMessageExt("获取顾客信息失败")
                console.error("通过手机号获取客户信息失败", e)
            }).finally(_=>{
                setLoading(false)
            })
        }
    }

    useEffect(()=>{
        if(animateState.sliderShow == true){
            let requiredName = true
            if(customerInfo != null && customerInfo.result == 'empty' && userName.trim().length < 1){
                requiredName = false
            }

            let requiredAppUser = true
            if(customerInfo == null){
                requiredAppUser = false
            }

            if(requiredName === true && requiredAppUser === true){
                setCanSava(true)
            }else{
                setCanSava(false)
            }
        }
    }, [userName, customerInfo])

    // 预约基础数据
    const {reserveBaseData} = props
    return (
        <View style={animateState.sliderShow ? ReservePanelStyles.rightPanelMask : {display: 'none'}}>
            {/*加载中*/}
            <Spinner visible={isLoading} textContent={'加载中'} textStyle={{color: '#FFF'}}/>
            <Animated.View
                {...panResponder.panHandlers}
                style={animateState.sliderShow ? [ReservePanelStyles.rightPanelBox, {left: animateState.sliderLeft}] : {display: 'none'}}>
                {/*左侧点击区域*/}
                <TouchableOpacity
                    onPress={() => {hideRightPanel()}}
                    activeOpacity={1}
                    style={ReservePanelStyles.leftPanMask}>
                    <View style={ReservePanelStyles.hideIconBox}>
                        <TouchableOpacity onPress={() => {hideRightPanel()}}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/p-hide-box.png')}
                                   style={[ReservePanelStyles.hideIconButton, {resizeMode: 'contain'}]}/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                {/*右侧内容区域*/}
                <View style={ReservePanelStyles.contentWrapBox}>
                    {/*客户信息*/}
                    <ImageBackground
                        style={ReservePanelStyles.contentHeadBox}
                        resizeMode={"contain"}
                        source={require('@imgPath/reserve_panel_customer_header_bg.png')}>
                        <View style={ReservePanelStyles.contentHeadWrap}>
                            <Text style={ReservePanelStyles.contentHeadTitle}>添加新预约</Text>
                            <View style={ReservePanelStyles.headSearchBox}>
                                {/*输入框*/}
                                <Image
                                    resizeMode={"contain"}
                                    style={ReservePanelStyles.headSearchIcon}
                                    source={require('@imgPath/reserve_panel_customer_search_icon.png')}></Image>
                                <TextInput
                                    keyboardType={'phone-pad'}
                                    style={showClear ? ReservePanelStyles.headSearchInputFull:ReservePanelStyles.headSearchInputEmpty}
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
                                    style={ReservePanelStyles.headSearchButton}>
                                    <Image
                                        resizeMode={"contain"}
                                        style={ReservePanelStyles.headSearchButtonImg}
                                        source={require('@imgPath/reserve_panel_customer_search_btn.png')}></Image>
                                </TouchableOpacity>
                                {/*清除*/}
                                {
                                    showClear && (
                                        <TouchableOpacity
                                            style={ReservePanelStyles.headClearButton}
                                            onPress={()=>{
                                                setUserPhone('')
                                                setCustomerInfo(null)
                                            }}>
                                            <Image
                                                resizeMode={"contain"}
                                                style={ReservePanelStyles.headClearButtonImg}
                                                source={require('@imgPath/reserve_panel_customer_search_reset.png')}></Image>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                            {/*客户信息展示*/}
                            {
                                // 空信息
                                customerInfo == null && (
                                    <View style={ReservePanelStyles.userInfoEmptyBox}>
                                        <Image
                                            resizeMode={"contain"}
                                            source={require('@imgPath/reserve_panel_customer_search_tips.png')}
                                            style={ReservePanelStyles.searchUserInfoTips}></Image>
                                    </View>
                                )
                            }
                            {
                                // 未查询到信息
                                customerInfo != null && customerInfo.result == 'empty' &&(
                                    <View style={ReservePanelStyles.userInfoEmptyBox}>
                                        <Image
                                            resizeMode={"contain"}
                                            source={require('@imgPath/reserve_panel_customer_search_tips_error.png')}
                                            style={ReservePanelStyles.searchUserInfoEmptyTips}></Image>
                                    </View>
                                )
                            }
                            {
                                // 查询到信息
                                customerInfo != null && customerInfo.result == 'success' &&(
                                    <View style={ReservePanelStyles.userInfoFullBox}>
                                        <View style={ReservePanelStyles.userInfoWrapBox}>
                                            <View style={ReservePanelStyles.userInfoLeftBox}>
                                                {/*用户头像*/}
                                                <Image
                                                    style={ReservePanelStyles.customerAvatar}
                                                    resizeMethod="resize"
                                                    source={getImage(customerInfo.imgUrl, ImageQutity.staff, require('@imgPath/reserve_customer_default_avatar.png'))}
                                                    defaultSource={require('@imgPath/reserve_customer_default_avatar.png')}/>
                                                <View style={ReservePanelStyles.customerEasyInfo}>
                                                    <View style={ReservePanelStyles.customerEasyNameSex}>
                                                        <Text style={ReservePanelStyles.nameShowText}>
                                                            {decodeURIComponent(customerInfo.nickName)}
                                                        </Text>
                                                        <Image
                                                            style={ReservePanelStyles.customerSexIcon}
                                                            resizeMode={'contain'}
                                                            source={customerInfo.sex == '1' ? require('@imgPath/reserve_customer_detail_fmale.png') : require('@imgPath/reserve_customer_detail_male.png')}/>
                                                        <Text style={ReservePanelStyles.sexShowText}>{customerInfo.sex == '1'? '男':'女'}</Text>
                                                    </View>
                                                    <Text style={ReservePanelStyles.phoneShowText}>
                                                        {customerInfo.phoneShow}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={ReservePanelStyles.userInfoRightBox}>
                                                <View style={ReservePanelStyles.chuzhikaBox}>
                                                    <Text style={ReservePanelStyles.propertyInfoItemTitle}>
                                                        储值卡
                                                    </Text>
                                                    <Text style={ReservePanelStyles.propertyInfoItemValue}>
                                                        {customerInfo.cardCZKCount}张
                                                    </Text>
                                                </View>
                                                <View style={ReservePanelStyles.cikaBox}>
                                                    <Text style={ReservePanelStyles.propertyInfoItemTitle}>
                                                        次卡
                                                    </Text>
                                                    <Text style={ReservePanelStyles.propertyInfoItemValue}>
                                                        {customerInfo.cardCKCount}张
                                                    </Text>
                                                </View>
                                                <View style={ReservePanelStyles.yueBox}>
                                                    <Text style={ReservePanelStyles.propertyInfoItemTitle}>
                                                        储值卡余额
                                                    </Text>
                                                    <Text style={ReservePanelStyles.propertyInfoItemValue}>
                                                        ¥{customerInfo.cardBalanceSum.toFixed(2)}
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    </ImageBackground>
                    {/*预约信息*/}
                    <View style={ReservePanelStyles.contentBodyBox}>
                        <View style={ReservePanelStyles.contentBodyWrap}>
                            {/*预约标题*/}
                            <View style={ReservePanelStyles.contentBodyTitle}>
                                <Image
                                    style={ReservePanelStyles.contentBodyTitleIcon}
                                    resizeMode={"contain"}
                                    source={require('@imgPath/reserve_customer_body_title_icon.png')}/>
                                <Text style={ReservePanelStyles.contentBodyTitleValue}>预约信息</Text>
                            </View>
                            {/*预约详情*/}
                            <View style={ReservePanelStyles.customerReserveDetailBox}>
                                {
                                    customerInfo != null && customerInfo.result == 'empty' &&(
                                        <View style={ReservePanelStyles.reservePropertyBox}>
                                            <Text style={ReservePanelStyles.reservePropertyRequired}>*</Text>
                                            <Text style={ReservePanelStyles.reservePropertyTitle}>
                                                顾客姓名：
                                            </Text>
                                            <View style={ReservePanelStyles.reservePropertyValue}>
                                                <TextInput
                                                    style={ReservePanelStyles.reservePropertyCustomerName}
                                                    placeholder={'请输入顾客姓名'}
                                                    placeholderTextColor={'#8e8e8e'}
                                                    onChange={({nativeEvent})=>{
                                                        const name = nativeEvent.text.trim()
                                                        setUserName(name)
                                                    }}
                                                    value={userName}
                                                    maxLength={20}/>
                                            </View>
                                        </View>
                                    )
                                }

                                <View style={ customerInfo != null && customerInfo.result == 'empty'
                                    ? [ReservePanelStyles.reservePropertyBox, ReservePanelStyles.reservePropertyMarginTop]
                                    : ReservePanelStyles.reservePropertyBox}>
                                    <Text style={ReservePanelStyles.reservePropertyTitle}>
                                        预约员工：
                                    </Text>
                                    <View style={ReservePanelStyles.reservePropertyValue}>
                                        <Text style={ReservePanelStyles.reservePropertyText}>
                                            {reserveBaseData.staffName}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[ReservePanelStyles.reservePropertyBox, ReservePanelStyles.reservePropertyMarginTop]}>
                                    <Text style={ReservePanelStyles.reservePropertyTitle}>
                                        预约时间：
                                    </Text>
                                    <View style={ReservePanelStyles.reservePropertyValue}>
                                        <Text style={ReservePanelStyles.reservePropertyText}>
                                            {reserveBaseData.reserveTime}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[ReservePanelStyles.reservePropertyBox, ReservePanelStyles.reservePropertyMarginTop]}>
                                    <Text style={ReservePanelStyles.reservePropertyTitle}>
                                        预约来源：
                                    </Text>
                                    <View style={ReservePanelStyles.reservePropertyValue}>
                                        {
                                            reserveBaseData['reserveResoures'].map((item, index)=>{
                                                if (index == reserveSourceIndex) {
                                                    return (
                                                        <TouchableOpacity
                                                            style={ReservePanelStyles.reservePropertyValueButtonActive}>
                                                            <Text style={ReservePanelStyles.reservePropertyValueButtonTxtActive}>
                                                                {item.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }else {
                                                    return (
                                                        <TouchableOpacity
                                                            style={ReservePanelStyles.reservePropertyValueButton}
                                                            onPress={()=>{
                                                                setReserveSourceIndex(index)
                                                            }}>
                                                            <Text style={ReservePanelStyles.reservePropertyValueButtonTxt}>
                                                                {item.name}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={[ReservePanelStyles.reservePropertyBox, ReservePanelStyles.reservePropertyMarginTop]}>
                                    <Text style={ReservePanelStyles.reservePropertyTitle}>
                                        预约服务：
                                    </Text>
                                    <View style={ReservePanelStyles.reservePropertyValue}>
                                        {
                                            reserveBaseData['reserveInfoList'].map((item, index)=>{
                                                if (index == reserveTypeIndex) {
                                                    return (
                                                        <TouchableOpacity
                                                            style={ReservePanelStyles.reservePropertyValueButtonActive}>
                                                            <Text style={ReservePanelStyles.reservePropertyValueButtonTxtActive}>
                                                                {item.reserveName}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }else {
                                                    return (
                                                        <TouchableOpacity
                                                            style={ReservePanelStyles.reservePropertyValueButton}
                                                            onPress={()=>{
                                                                setReserveTypeIndex(index)
                                                            }}>
                                                            <Text style={ReservePanelStyles.reservePropertyValueButtonTxt}>
                                                                {item.reserveName}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={[ReservePanelStyles.reservePropertyBox, ReservePanelStyles.reservePropertyMarginTop]}>
                                    <Text style={ReservePanelStyles.reservePropertyTitle}>
                                        预约备注：
                                    </Text>
                                </View>
                                <View style={[ReservePanelStyles.reservePropertyBox, ReservePanelStyles.reservePropertyRemarkTop]}>
                                    <TextInput
                                        style={ReservePanelStyles.reservePropertyRemark}
                                        editable={true}
                                        multiline={true}
                                        textAlignVertical={'top'}
                                        textAlign={'left'}
                                        value={reserveRemark}
                                        placeholder={'请输入预约备注，30个文字以内'}
                                        onChange={({nativeEvent})=>{
                                            const remark = nativeEvent.text
                                            setReserveRemark(remark)
                                        }}
                                        maxLength={30}>
                                    </TextInput>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/*按钮*/}
                    <TouchableOpacity
                        style={ReservePanelStyles.contentFootBox}
                        onPress={()=>{
                            saveReserve()
                        }}>
                        <ImageBackground
                            style={ReservePanelStyles.contentFootBoxImg}
                            resizeMode={"contain"}
                            source={canSave ? require('@imgPath/reserve_panel_customer_foot_enable.png') : require('@imgPath/reserve_panel_customer_foot_disable.png')}>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    )
})

// 使用React.memo渲染缓存，防止父组件属性变更导致子组件渲染
export default React.memo(CustomerReservePanelForwardRef)
