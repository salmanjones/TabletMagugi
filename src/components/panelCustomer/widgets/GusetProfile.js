import {PanelCustomerStyles} from "../../../styles/PanelCustomer";
import {Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import ReduxStore from "../../../store/store"
import {getGuestQRImg, getScanQRState} from "../../../services/reserve";
import {showMessageExt} from "../../../utils";
import Spinner from "react-native-loading-spinner-overlay";
import {getScanQRState} from "../../../services/reserve";

/**
 * 散客开单二维码页面
 * @type {React.NamedExoticComponent<object>}
 */
export const GuestProfileWidget = React.memo(({tabIndex})=>{
    /// 加载中
    const [isLoading, setLoading] = useState(false)
    /// 小程序二维码
    const [wxQRImg, setWxQRImg] = useState(null)
    /// 是否展示清除按钮
    const [showClear, setShowClear] = useState(false)
    /// 查询值
    const [userPhone, setUserPhone] = useState('')
    /// 扫码状态 0:未扫码 1:已扫码 2:已授权 3:授权超时
    const [scanState, setScanState] = useState(0)
    /// 登录用户信息
    const loginUser = ReduxStore.getState().auth.userInfo
    /// 循环的时间id
    let timerID = null

    /// 获取待扫描的二维码
    const getScanCode = ()=>{
        const source = '0' // 来自于平板扫码
        const uniqueId = loginUser.companyId + loginUser.storeId + new Date().getTime() + "" + parseInt(Math.random() * 1000000)
        const scene = loginUser.companyId + "@" + loginUser.storeId + "@" + source + "@" + uniqueId
        const qrArgs = {
            "page":"pages/welcomePage/welcomePage",
            "scene": scene,
            "width":800,
            "auto_color":false,
            "line_color":{"r":0,"g":0,"b":0},
            "is_hyaline": true
        }

        setLoading(true)
        getGuestQRImg({
            args: JSON.stringify(qrArgs)
        }).then(backData=>{
            const {code, data} = backData
            if(code == '6000'){
                setWxQRImg(data)

                // 每隔1.5秒获取扫码状态
                timerID && clearInterval(timerID)
                timerID = setInterval(()=>{
                    getScanQRState({uniqueId: uniqueId}).then(result=>{
                        const resCode = result.code
                        const resStat = result.data
                        if(resCode == '6000'){
                            setScanState(resStat)
                        }else{
                            console.log("获取扫码状态失败", result)
                        }
                    }).catch(e=>{
                        console.log("获取扫码状态失败", e)
                    })
                }, 1500)
            }
        }).catch(e=>{
            showMessageExt("获取小程序码失败")
            console.error("获取小程序码失败", e)
        }).finally(_=>{
            setLoading(false)
        })
    }

    /// 页签变化
    useEffect(()=>{
        // 展示弹层，初始化面板状态
        setScanState(0)

        // 生成参数
        if(tabIndex == 1){
            getScanCode()
        }
    }, [tabIndex])

    /// 扫码状态变化
    useEffect(()=>{
        if(tabIndex == 1 && scanState == 0){
            getScanCode()
        }
    }, [scanState])

    /// 退出时销毁循环计时
    useEffect(()=>{
        return ()=>{
            timerID && clearInterval(timerID)
        }
    }, [])

    return (
        <View style={PanelCustomerStyles.guestProfileBox}>
            <Spinner visible={isLoading} textContent={'加载中'} textStyle={{color: '#FFF'}}/>
            {
                (()=>{
                    if(scanState == 0){ // 未扫码
                        return (
                            <View style={PanelCustomerStyles.guestContentBox}>
                                <Text
                                    style={PanelCustomerStyles.guestProfileTitle}>
                                    亲爱的顾客，请使用微信扫一扫，通过顾客小程序完成会员身份确认!
                                </Text>
                                <Image style={PanelCustomerStyles.guestProfileQRCode} source={{uri: wxQRImg}}/>
                                {/*查询顾客*/}
                                <View style={PanelCustomerStyles.guestProfileSearchBox}>
                                    <Text style={PanelCustomerStyles.guestProfileSearchTitle}>不想扫码，查询顾客</Text>
                                    <View style={PanelCustomerStyles.headSearchBox}>
                                        {/*输入框*/}
                                        <Image
                                            resizeMode={"contain"}
                                            style={PanelCustomerStyles.headSearchIcon}
                                            source={require('@imgPath/reserve_panel_customer_search_icon.png')}></Image>
                                        <TextInput
                                            keyboardType={'phone-pad'}
                                            style={PanelCustomerStyles.headSearchInputEmpty}
                                            placeholder={'请输入预约手机号'}
                                            placeholderTextColor={'#8e8e8e'}
                                            onChange={({nativeEvent})=>{
                                                const phone = nativeEvent.text
                                                setUserPhone(phone)
                                            }}
                                            value={userPhone}
                                            maxLength={11}/>
                                        {/*查询*/}
                                        <TouchableOpacity
                                            onPress={()=>{
                                            }}
                                            style={PanelCustomerStyles.headSearchButton}>
                                            <Image
                                                resizeMode={"contain"}
                                                style={PanelCustomerStyles.headSearchButtonImg}
                                                source={require('@imgPath/reserve_panel_customer_search_btn.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/*直接开单*/}
                                <View style={PanelCustomerStyles.guestProfileOrderBox}>
                                    <TouchableOpacity
                                        style={PanelCustomerStyles.guestProfileOrderWrap}>
                                        <ImageBackground
                                            resizeMode={"contain"}
                                            style={PanelCustomerStyles.guestProfileOrderImg}
                                            source={require('@imgPath/reserve_panel_customer_create_order.png')}>
                                            <Text style={PanelCustomerStyles.guestProfileOrderTxt}>
                                                散客直接开单
                                            </Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }else if(scanState == 1){ // 已扫码
                        return (
                            <View style={PanelCustomerStyles.guestContentWaitBox}>
                                <Image
                                    resizeMode={"contain"}
                                    style={PanelCustomerStyles.guestScanResultBox}
                                    source={require('@imgPath/reserve_panel_customer_scan_seccess.png')}></Image>
                                <Text style={PanelCustomerStyles.guestScanResultTxt}>
                                    扫码成功！
                                </Text>
                                <Text style={PanelCustomerStyles.guestScanResultSubTxt}>
                                    请使用小程序授权手机号登陆…
                                </Text>
                            </View>
                        )
                    }else if(scanState == 2){ // 已授权
                        return (
                            <View style={PanelCustomerStyles.guestContentWaitBox}>
                                <Image
                                    resizeMode={"contain"}
                                    style={PanelCustomerStyles.guestScanResultBox}
                                    source={require('@imgPath/reserve_panel_customer_scan_seccess.png')}></Image>
                                <Text style={PanelCustomerStyles.guestScanResultTxt}>
                                    授权成功！
                                </Text>
                            </View>
                        )
                    }else if(scanState == 3){ // 授权超时
                        return (
                            <View style={PanelCustomerStyles.guestContentWaitBox}>
                                <Image
                                    resizeMode={"contain"}
                                    style={PanelCustomerStyles.guestScanResultBox}
                                    source={require('@imgPath/reserve_panel_customer_scan_seccess.png')}></Image>
                                <Text style={PanelCustomerStyles.guestScanResultTxt}>
                                    授权超时!
                                </Text>
                                <TouchableOpacity
                                    style={PanelCustomerStyles.guestProfileRescanWrap}
                                    onPress={()=>{
                                        setScanState(0)
                                    }}>
                                    <ImageBackground
                                        resizeMode={"contain"}
                                        style={PanelCustomerStyles.guestProfileOrderImg}
                                        source={require('@imgPath/reserve_panel_customer_create_order.png')}>
                                        <Text style={PanelCustomerStyles.guestProfileOrderTxt}>
                                            重新扫码
                                        </Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })()
            }
        </View>
    )
})
