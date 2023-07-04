import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {PanelCustomerStyles} from "../../../styles/PanelCustomer";

export const ProfileWidget = React.memo(({profileInfo})=>{
    return (
        <View style={PanelCustomerStyles.memberProfileBox}>
            <View style={PanelCustomerStyles.memberProfileTitle}>
                <Image
                    style={PanelCustomerStyles.contentBodyTitleIcon}
                    resizeMode={"contain"}
                    source={require('@imgPath/reserve_customer_body_title_icon.png')}/>
                <Text style={PanelCustomerStyles.contentBodyTitleValue}>消费统计</Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    最近一次消费：
                </Text>
                <Text style={PanelCustomerStyles.memberPropertyValue}>
                    {profileInfo.lastTime || '暂无消费'}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    平均消费：
                </Text>
                <Text style={PanelCustomerStyles.memberPropertyValue}>
                    ¥{profileInfo.allConsumePricePer || 0.00}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    累计消费：
                </Text>
                <Text style={PanelCustomerStyles.memberPropertyValue}>
                    ¥{profileInfo.allConsumePrice || 0.00}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    累计结单：
                </Text>
                <Text style={PanelCustomerStyles.memberPropertyValue}>
                    {profileInfo.billingNos || 0}
                </Text>
            </View>
        </View>
    )
})
