import {PanelCustomerStyles} from "../../../styles/PanelCustomer";
import {Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";

/**
 * 散客开单二维码页面
 * @type {React.NamedExoticComponent<object>}
 */
export const GuestProfileWidget = React.memo(({tabIndex, scanState, wxQRImg, rescanQREvent, customerPressEvent, showMode, reserveInfo, actionType, pagerName})=>{
    /// 查询值
    const [userPhone, setUserPhone] = useState('')
    /// 服务人ID
    const waiterId = reserveInfo && reserveInfo.staffId  ? reserveInfo.staffId : ''

    return (
        <View style={PanelCustomerStyles.guestProfileBox}>
            {
                scanState == null &&  pagerName != 'CashierBillingActivity' && (
                    <TouchableOpacity
                        style={PanelCustomerStyles.guestProfileCreateOrder}
                        onPress={()=>{
                            customerPressEvent("forwardToCashier", {showMode, waiterId, actionType})
                        }}>
                        <Image
                            resizeMode={"contain"}
                            style={PanelCustomerStyles.guestProfileCreateOrderImg}
                            source={require('@imgPath/reserve_customer_create_order.png')}/>
                    </TouchableOpacity>
                )
            }
            {
                (()=>{
                    if(scanState == null &&  pagerName != 'CashierBillingActivity'){ // 未扫码
                        return (
                            <View style={PanelCustomerStyles.guestContentBox}>
                                <Text
                                    style={PanelCustomerStyles.guestProfileTitle}>
                                    亲爱的顾客，请使用微信扫一扫，完成会员身份确认！
                                </Text>
                                {/*小程序二维码*/}
                                <Image style={PanelCustomerStyles.guestProfileQRCode} source={{uri: wxQRImg}}/>
                                {/*查询顾客*/}
                                <View style={pagerName != 'CashierBillingActivity' ? PanelCustomerStyles.guestProfileSearchBox:PanelCustomerStyles.guestProfileCashierBox}>
                                    {/* 根据最新需求，屏蔽此提示
                                        <Text style={PanelCustomerStyles.guestProfileSearchTitle}>不想扫码，查询顾客</Text>
                                    */}
                                    <TouchableOpacity
                                        style={PanelCustomerStyles.headSearchBoxCustomer}
                                        onPress={()=>{
                                            customerPressEvent("toCreateOrder", {phone: userPhone, queryType: 'phone', showType: 'guestPhone', showMode, waiterId, actionType, pagerName})
                                        }}>
                                        {/*输入框*/}
                                        <Image
                                            resizeMode={"contain"}
                                            style={PanelCustomerStyles.headSearchIcon}
                                            source={require('@imgPath/reserve_panel_customer_search_icon.png')}></Image>
                                        <TextInput
                                            keyboardType={'phone-pad'}
                                            editable={false}
                                            style={PanelCustomerStyles.headSearchInputEmptyWithBorder}
                                            placeholder={'员工端信息查询入口'}
                                            placeholderTextColor={'#8e8e8e'}
                                            onChange={({nativeEvent})=>{
                                                const inputText = nativeEvent.text.trim()
                                                const phone = inputText.replace(/[^\d.]/g, "")
                                                setUserPhone(phone)
                                            }}
                                            onPressIn={()=>{
                                                customerPressEvent("toCreateOrder", {phone: userPhone, queryType: 'phone', showType: 'guestPhone', showMode, waiterId, actionType, pagerName})
                                            }}
                                            value={userPhone}
                                            maxLength={11}/>
                                        {/*查询*/}
                                        <View style={PanelCustomerStyles.headSearchButton}>
                                            <Image
                                                resizeMode={"contain"}
                                                style={PanelCustomerStyles.headSearchButtonImg}
                                                source={require('@imgPath/reserve_panel_customer_search_btn.png')}></Image>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {/*直接开单: 根据最新需求，屏蔽此按钮*/}
                                {/*{*/}
                                {/*    pagerName != 'CashierBillingActivity' && (*/}
                                {/*        <View style={PanelCustomerStyles.guestProfileOrderBox}>*/}
                                {/*            <TouchableOpacity*/}
                                {/*                style={PanelCustomerStyles.guestProfileOrderWrap}*/}
                                {/*                onPress={()=>{*/}
                                {/*                    customerPressEvent("forwardToCashier", {showMode, waiterId, actionType})*/}
                                {/*                }}>*/}
                                {/*                <ImageBackground*/}
                                {/*                    resizeMode={"contain"}*/}
                                {/*                    style={PanelCustomerStyles.guestProfileOrderImg}*/}
                                {/*                    source={require('@imgPath/reserve_panel_customer_create_order.png')}>*/}
                                {/*                    <Text style={PanelCustomerStyles.guestProfileOrderTxt}>*/}
                                {/*                        {actionType == 'createOrder' ? '散客直接开单':'散客直接开卡'}*/}
                                {/*                    </Text>*/}
                                {/*                </ImageBackground>*/}
                                {/*            </TouchableOpacity>*/}
                                {/*        </View>*/}
                                {/*    )*/}
                                {/*}*/}
                            </View>
                        )
                    }else if(scanState == 0){ // 已扫码
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
                                    请使用小程序授权手机号登录…
                                </Text>
                            </View>
                        )
                    }else if(scanState == 1){ // 已授权
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
                    }else if(scanState == -1){ // 授权超时
                        return (
                            <View style={PanelCustomerStyles.guestContentWaitBox}>
                                <Image
                                    resizeMode={"contain"}
                                    style={PanelCustomerStyles.guestScanResultBox}
                                    source={require('@imgPath/reserve_panel_customer_scan_timeout.png')}></Image>
                                <Text style={PanelCustomerStyles.guestScanResultTxt}>
                                    授权超时!
                                </Text>
                                <TouchableOpacity
                                    style={PanelCustomerStyles.guestProfileRescanWrap}
                                    onPress={()=>{
                                        rescanQREvent(null)
                                    }}>
                                    <View style={PanelCustomerStyles.guestProfileTimeout}>
                                        <Text style={PanelCustomerStyles.guestProfileOrderTxt}>
                                            重新扫码
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })()
            }
        </View>
    )
})
