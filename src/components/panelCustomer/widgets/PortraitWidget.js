import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {PanelCustomerStyles} from "../../../styles/PanelCustomer";
import {decodeContent} from "../../../utils";

export const PortraitWidget = React.memo(({portraitInfo})=>{
    return (
        <View style={PanelCustomerStyles.memberPortraitBox}>
            <View style={PanelCustomerStyles.memberPortraitTitle}>
                <Image
                    style={PanelCustomerStyles.contentBodyTitleIcon}
                    resizeMode={"contain"}
                    source={require('@imgPath/reserve_customer_body_title_icon.png')}/>
                <Text style={PanelCustomerStyles.contentBodyTitleValue}>基础档案</Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                    手机号码：
                </Text>
                <Text style={PanelCustomerStyles.memberPortraitPValue}>
                    {portraitInfo.phoneShow}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                    顾客姓名：
                </Text>
                <Text style={PanelCustomerStyles.memberPortraitPValue}>
                    { portraitInfo.nickName ? decodeContent(portraitInfo.nickName) : '未填写姓名'}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                    性别：
                </Text>
                <Text style={PanelCustomerStyles.memberPortraitPValue}>
                    {portraitInfo.sex == '1' ? '男':'女'}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                    生日：
                </Text>
                <Text style={PanelCustomerStyles.memberPortraitPValue}>
                    {portraitInfo.birthday && portraitInfo.birthday.length > 0 ? portraitInfo.birthday: '暂无'}
                </Text>
            </View>
        </View>
    )
})
