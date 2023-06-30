import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useEffect, useState} from "react";
import {MemberPanelStyles} from "../../../styles/MemberPanel";

export const ReserveWidget = React.memo(({reserveInfo, reserveFlag, customerPressEvent})=>{
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
        setRemark(decodeURIComponent(reserveInfo.remark) || '')
    }, [reserveInfo])

    return (
        <View style={MemberPanelStyles.memberReserveBox}>
            <Image
                resizeMode={'contain'}
                source={isStartWork == '0' ? require('@imgPath/reserve_customer_panel_wait.png'):require('@imgPath/reserve_customer_panel_serviced.png')}
                style={MemberPanelStyles.startWorkStyle}></Image>
            <View style={MemberPanelStyles.memberReserveProperty}>
                <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                    预约手机号：
                </Text>
                <Text style={MemberPanelStyles.memberReservePropertyValue}>
                    {reserveInfo.memberPhoneShow}
                </Text>
                {
                    isStartWork == '0' && canCancel == '1' && (
                        <TouchableOpacity
                            style={MemberPanelStyles.memberReserveCancel}
                            onPress={()=>{
                                customerPressEvent('cancelReserve', {type: '0', recordId: reserveInfo.reserveId, hideRightPanel: true})
                            }}>
                            <Image
                                resizeMode={'contain'}
                                source={require('@imgPath/reserve_customer_panel_calcel_reserve.png')}
                                style={MemberPanelStyles.memberReserveCancelImage}></Image>
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={MemberPanelStyles.memberReserveProperty}>
                <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                    顾客姓名：
                </Text>
                <Text style={MemberPanelStyles.memberReservePropertyValue}>
                    {decodeURIComponent(reserveInfo.memberName)}
                </Text>
            </View>
            <View style={MemberPanelStyles.memberReserveProperty}>
                <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                    预约员工：
                </Text>
                <Text style={MemberPanelStyles.memberReservePropertyValue}>
                    {decodeURIComponent(reserveInfo.staffName)}
                </Text>
            </View>
            <View style={MemberPanelStyles.memberReserveProperty}>
                <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                    预约时间：
                </Text>
                <Text style={MemberPanelStyles.memberReservePropertyValue}>
                    {reserveInfo.reserveTime}
                </Text>
            </View>
            {
                (()=>{
                    if(isStartWork == '1' || reserveFlag != 'valid'){ // 已到店或过期预约
                        return (
                            <View>
                                <View style={MemberPanelStyles.memberReserveProperty}>
                                    <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                                        预约来源：
                                    </Text>
                                    <Text style={MemberPanelStyles.memberReservePropertyValue}>
                                        {sourceName}
                                    </Text>
                                </View>
                                <View style={MemberPanelStyles.memberReserveProperty}>
                                    <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                                        预约服务：
                                    </Text>
                                    <Text style={MemberPanelStyles.memberReservePropertyValue}>
                                        {serviceType}
                                    </Text>
                                </View>
                                <View style={MemberPanelStyles.memberReserveProperty}>
                                    <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                                        预约备注：
                                    </Text>
                                    <TextInput
                                        style={MemberPanelStyles.memberReservePropertyRemark}
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
                                                <View style={MemberPanelStyles.memberReserveProperty}>
                                                    <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                                                        预约来源：
                                                    </Text>
                                                    <Text style={MemberPanelStyles.memberReservePropertyValue}>
                                                        {sourceName}
                                                    </Text>
                                                </View>
                                            )
                                        }else{
                                            return (
                                                <View style={MemberPanelStyles.memberReservePropertyBtnWrap}>
                                                    <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                                                        预约来源：
                                                    </Text>
                                                    <View style={MemberPanelStyles.reservePropertyBtnValue}>
                                                        {
                                                            reserveInfo.reserveResoures && reserveInfo.reserveResoures.map(sourceInfo=>{
                                                                if(sourceInfo.value == sourceValue){
                                                                    return (
                                                                        <TouchableOpacity style={MemberPanelStyles.reservePropertyValueButtonActive}>
                                                                            <Text style={MemberPanelStyles.reservePropertyValueButtonTxtActive}>
                                                                                {sourceInfo.name}
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                }else{
                                                                    return (
                                                                        <TouchableOpacity
                                                                            style={MemberPanelStyles.reservePropertyValueButton}
                                                                            onPress={()=>{
                                                                                setSourceValue(sourceInfo.value)
                                                                            }}>
                                                                            <Text style={MemberPanelStyles.reservePropertyValueButtonTxt}>
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
                                <View style={MemberPanelStyles.memberReservePropertyBtnWrap}>
                                    <Text style={MemberPanelStyles.memberReservePropertyTitle}>
                                        预约服务：
                                    </Text>
                                    <View style={MemberPanelStyles.reservePropertyBtnValue}>
                                        {
                                            reserveInfo.reserveInfoList && reserveInfo.reserveInfoList.map(typeInfo=>{
                                                if(typeInfo.reserveId == serviceValue){
                                                    return (
                                                        <TouchableOpacity style={MemberPanelStyles.reservePropertyValueButtonActive}>
                                                            <Text style={MemberPanelStyles.reservePropertyValueButtonTxtActive}>
                                                                {typeInfo.reserveName}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }else{
                                                    return (
                                                        <TouchableOpacity
                                                            style={MemberPanelStyles.reservePropertyValueButton}
                                                            onPress={()=>{
                                                                setServiceValue(typeInfo.reserveId)
                                                                setServiceNameValue(typeInfo.reserveName)
                                                            }}>
                                                            <Text style={MemberPanelStyles.reservePropertyValueButtonTxt}>
                                                                {typeInfo.reserveName}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    )
                                                }

                                            })
                                        }
                                    </View>
                                </View>
                                <View style={MemberPanelStyles.memberReserveDescProperty}>
                                    <Text  style={MemberPanelStyles.memberReservePropertyTitle}>
                                        预约备注：
                                    </Text>
                                    <TextInput
                                        style={MemberPanelStyles.memberReservePropertyDesc}
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
                                <View style={MemberPanelStyles.memberReservePropertyOperator}>
                                    <TouchableOpacity
                                        style={MemberPanelStyles.memberReserveModify}
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
                                        <Text style={MemberPanelStyles.memberReserveModifyText}>保存预约</Text>
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
