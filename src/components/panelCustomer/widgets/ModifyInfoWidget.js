import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {PanelCustomerStyles} from "../../../styles/PanelCustomer";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";

export const ModifyInfoWidget = React.memo(({portraitInfo, customerPressEvent})=>{
    const [memberName, setMemberName] = useState(decodeURIComponent(portraitInfo.nickName))
    const [memberSex, setMemberSex] = useState(portraitInfo.sex)
    const [memberBirthday, setMemberBirthday] = useState(
        portraitInfo.birthday && portraitInfo.birthday.length > 0
            ? new Date(portraitInfo.birthday)
            : new Date())
    const [open, setOpen] = useState(false)

    return (
        <View style={PanelCustomerStyles.memberModifyBox}>
            <View style={PanelCustomerStyles.memberProfileTitle}>
                <Image
                    style={PanelCustomerStyles.contentBodyTitleIcon}
                    resizeMode={"contain"}
                    source={require('@imgPath/reserve_customer_body_title_icon.png')}/>
                <Text style={PanelCustomerStyles.contentBodyTitleValue}>该顾客为新客，请确认信息！</Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    手机号：
                </Text>
                <Text style={PanelCustomerStyles.memberPropertyValue}>
                    {portraitInfo.phoneShow}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    顾客姓名：
                </Text>
                <TextInput
                    style={PanelCustomerStyles.memberPropertyValueInput}
                    multiline={1}
                    maxLength={10}
                    value={memberName}
                    onChange={({nativeEvent})=>{
                        const name = nativeEvent.text
                        setMemberName(name)
                    }}/>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    性别：
                </Text>
                <View style={PanelCustomerStyles.memberPropertyButtons}>
                    <TouchableOpacity
                        onPress={()=>{setMemberSex(1)}}
                        style={memberSex == '0' ? PanelCustomerStyles.memberSexButton:PanelCustomerStyles.memberSexActiveButton}>
                        <Text style={memberSex == '0' ?  PanelCustomerStyles.memberSexButtonTxt: PanelCustomerStyles.memberSexActiveButtonTxt}>男</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{setMemberSex(0)}}
                        style={memberSex == '0' ? PanelCustomerStyles.memberSexActiveButton:PanelCustomerStyles.memberSexButton}>
                        <Text style={memberSex == '0' ? PanelCustomerStyles.memberSexActiveButtonTxt:PanelCustomerStyles.memberSexButtonTxt}>女</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    生日：
                </Text>
                <View style={PanelCustomerStyles.memberPropertyValueBox}>
                    <TextInput
                        style={PanelCustomerStyles.memberPropertyValueInput}
                        multiline={false}
                        value={dayjs(memberBirthday).format("YYYY-MM-DD")}
                        editable={false}
                        onPressIn={()=>{setOpen(true)}}/>
                    <Image
                        style={PanelCustomerStyles.contentBodyCalendarIcon}
                        resizeMode={"contain"}
                        source={require('@imgPath/cashier_billing_customer_birthday.png')}/>
                </View>
            </View>

            <View style={PanelCustomerStyles.memberEditPropertyOperator}>
                <TouchableOpacity
                    style={PanelCustomerStyles.memberInfoModify}
                    onPress={()=>{
                        customerPressEvent('updateProfile', {
                            memberName,
                            memberSex,
                            birthday: memberBirthday,
                            memberId: portraitInfo.memberId
                        })
                    }}>
                    <Text style={PanelCustomerStyles.memberReserveModifyText}>确定</Text>
                </TouchableOpacity>
            </View>

            <DatePicker
                modal
                title={'选择会员生日'}
                confirmText={'确定'}
                mode={'date'}
                locale={'zh-Hans'}
                open={open}
                date={memberBirthday}
                onConfirm={(date) => {
                    setOpen(false)
                    setMemberBirthday(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </View>
    )
})
