import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {PanelCustomerStyles} from "../../../styles/PanelCustomer";

export const ReserveWidget = React.memo(({reserveInfo, reserveFlag, pagerName, customerPressEvent})=>{
    // 顾客是否已到店 0:否 1:是
    const isStartWork = reserveInfo.isStartWork
    const canCancel = reserveInfo.isDelete

    let sourceName = ''
    if(reserveInfo.sourceShowType == '1'){ // 可编辑
        sourceName = (reserveInfo.reserveResoures.filter(item=>item.value == reserveInfo.source)[0] ||[{name: ''}])['name'] || '--'
    }else{
        sourceName = reserveInfo.sourceShowName && reserveInfo.sourceShowName.length > 0  ?reserveInfo.sourceShowName :  '--'
    }
    const serviceType = (reserveInfo.reserveInfoList.filter(item=>item.reserveId == reserveInfo.reserveProjectId)[0] ||[{reserveName: ''}])['reserveName']
    const [sourceValue, setSourceValue] = useState(reserveInfo.source)
    const [serviceValue, setServiceValue] = useState(reserveInfo.reserveProjectId)
    const [serviceNameValue, setServiceNameValue] = useState(serviceType)
    const [remark, setRemark] = useState('')

    useEffect(()=>{
        setSourceValue(reserveInfo.source)
        setServiceValue(reserveInfo.reserveProjectId)
        setServiceNameValue(serviceType)

        // 处理备注加密的问题
        let memo = ''
        try{
            memo = decodeURIComponent(decodeURIComponent(reserveInfo.remark))
        }catch (e){
            console.log("解码备注失败", e)
            memo = reserveInfo.remark
        }
        setRemark(memo)
    }, [reserveInfo])

    return (
        <View style={PanelCustomerStyles.memberReserveBox}>
            { pagerName != 'CashierBillingActivity' && (<Image
                resizeMode={'contain'}
                source={isStartWork == '0' ? require('@imgPath/reserve_customer_panel_wait.png'):require('@imgPath/reserve_customer_panel_serviced.png')}
                style={PanelCustomerStyles.startWorkStyle}></Image>)
            }
            <View style={PanelCustomerStyles.memberReserveProperty}>
                <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                    预约手机号：
                </Text>
                <Text style={PanelCustomerStyles.memberReservePropertyValue}>
                    {reserveInfo.memberPhoneShow && reserveInfo.memberPhoneShow.length > 0 ? reserveInfo.memberPhoneShow : '暂无'}
                </Text>
                {
                    isStartWork == '0' && canCancel == '1' && pagerName != 'CashierBillingActivity' && (
                        <TouchableOpacity
                            style={PanelCustomerStyles.memberReserveCancel}
                            onPress={()=>{
                                customerPressEvent('cancelReserve', {type: '0', recordId: reserveInfo.reserveId, hideRightPanel: true})
                            }}>
                            <Image
                                resizeMode={'contain'}
                                source={require('@imgPath/reserve_customer_panel_calcel_reserve.png')}
                                style={PanelCustomerStyles.memberReserveCancelImage}></Image>
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={PanelCustomerStyles.memberReserveProperty}>
                <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                    顾客姓名：
                </Text>
                <Text style={PanelCustomerStyles.memberReservePropertyValue}>
                    {decodeURIComponent(reserveInfo.memberName)}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberReserveProperty}>
                <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                    预约员工：
                </Text>
                <Text style={PanelCustomerStyles.memberReservePropertyValue}>
                    {decodeURIComponent(reserveInfo.staffName)}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberReserveProperty}>
                <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                    预约时间：
                </Text>
                <Text style={PanelCustomerStyles.memberReservePropertyValue}>
                    {reserveInfo.reserveTime}
                </Text>
            </View>
            {
                (()=>{
                    if(isStartWork == '1' || reserveFlag != 'valid'){ // 已到店或过期预约
                        return (
                            <View>
                                <View style={PanelCustomerStyles.memberReserveProperty}>
                                    <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                                        预约来源：
                                    </Text>
                                    <Text style={PanelCustomerStyles.memberReservePropertyValue}>
                                        {sourceName}
                                    </Text>
                                </View>
                                <View style={PanelCustomerStyles.memberReserveProperty}>
                                    <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                                        预约服务：
                                    </Text>
                                    <Text style={PanelCustomerStyles.memberReservePropertyValue}>
                                        {serviceType}
                                    </Text>
                                </View>
                                <View style={PanelCustomerStyles.memberReserveProperty}>
                                    <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                                        预约备注：
                                    </Text>
                                    <TextInput
                                        style={PanelCustomerStyles.memberReservePropertyRemark}
                                        editable={false}
                                        multiline={true}
                                        textAlignVertical={'top'}
                                        textAlign={'left'}
                                        value={remark && remark.length > 0 ? remark: '暂无'}>
                                    </TextInput>
                                </View>
                            </View>
                        )
                    }else{
                        return (
                            <View>
                                {
                                    (()=>{
                                        if(reserveInfo.sourceShowType == '0'){ // 不可编辑
                                            return (
                                                <View style={PanelCustomerStyles.memberReserveProperty}>
                                                    <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                                                        预约来源：
                                                    </Text>
                                                    <Text style={PanelCustomerStyles.memberReservePropertyValue}>
                                                        {sourceName}
                                                    </Text>
                                                </View>
                                            )
                                        }else{
                                            return (
                                                <View style={PanelCustomerStyles.memberReservePropertyBtnWrap}>
                                                    <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                                                        预约来源：
                                                    </Text>
                                                    <View style={PanelCustomerStyles.reservePropertyBtnValue}>
                                                        {
                                                            reserveInfo.reserveResoures && reserveInfo.reserveResoures.map(sourceInfo=>{
                                                                if(sourceInfo.value == sourceValue){
                                                                    return (
                                                                        <TouchableOpacity style={PanelCustomerStyles.reservePropertyValueButtonActive}>
                                                                            <Text style={PanelCustomerStyles.reservePropertyValueButtonTxtActive}>
                                                                                {sourceInfo.name}
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                }else{
                                                                    return (
                                                                        <TouchableOpacity
                                                                            style={PanelCustomerStyles.reservePropertyValueButton}
                                                                            onPress={()=>{
                                                                                setSourceValue(sourceInfo.value)
                                                                            }}>
                                                                            <Text style={PanelCustomerStyles.reservePropertyValueButtonTxt}>
                                                                                {sourceInfo.name}
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                            )
                                        }
                                    })()
                                }
                                <View style={PanelCustomerStyles.memberReservePropertyBtnWrap}>
                                    <Text style={PanelCustomerStyles.memberReservePropertyTitle}>
                                        预约服务：
                                    </Text>
                                    <View style={PanelCustomerStyles.reservePropertyBtnValue}>
                                        {
                                            reserveInfo.reserveInfoList && reserveInfo.reserveInfoList.map(typeInfo=>{
                                                if(typeInfo.reserveId == serviceValue){
                                                    return (
                                                        <TouchableOpacity style={PanelCustomerStyles.reservePropertyValueButtonActive}>
                                                            <Text style={PanelCustomerStyles.reservePropertyValueButtonTxtActive}>
                                                                {typeInfo.reserveName}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }else{
                                                    return (
                                                        <TouchableOpacity
                                                            style={PanelCustomerStyles.reservePropertyValueButton}
                                                            onPress={()=>{
                                                                setServiceValue(typeInfo.reserveId)
                                                                setServiceNameValue(typeInfo.reserveName)
                                                            }}>
                                                            <Text style={PanelCustomerStyles.reservePropertyValueButtonTxt}>
                                                                {typeInfo.reserveName}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }

                                            })
                                        }
                                    </View>
                                </View>
                                <View style={PanelCustomerStyles.memberReserveDescProperty}>
                                    <Text  style={PanelCustomerStyles.memberReservePropertyTitle}>
                                        预约备注：
                                    </Text>
                                    <TextInput
                                        style={PanelCustomerStyles.memberReservePropertyDesc}
                                        editable={true}
                                        multiline={true}
                                        textAlignVertical={'top'}
                                        textAlign={'left'}
                                        placeholder={'请输入预约备注，30个文字以内'}
                                        value={remark}
                                        onChange={({nativeEvent})=>{
                                            const remark = nativeEvent.text
                                            setRemark(remark)
                                        }}
                                        maxLength={30}>
                                    </TextInput>

                                </View>
                                <View style={PanelCustomerStyles.memberReservePropertyOperator}>
                                    <TouchableOpacity
                                        style={PanelCustomerStyles.memberReserveModify}
                                        onPress={()=>{
                                            customerPressEvent('updateReserve', {
                                                updateParams: {
                                                    reserveId: reserveInfo.reserveId.toString(),
                                                    reserveSource: sourceValue,
                                                    reserveTypeId: serviceValue,
                                                    reserveType: serviceNameValue,
                                                    reserveTime: reserveInfo.reserveTime,
                                                    storeId:reserveInfo.storeId.toString(),
                                                    remark: remark,
                                                    staffId: reserveInfo.staffId
                                                },
                                                hideRightPanel: true
                                            })
                                        }}>
                                        <Text style={PanelCustomerStyles.memberReserveModifyText}>保存预约</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                })()
            }
        </View>
    )
})
