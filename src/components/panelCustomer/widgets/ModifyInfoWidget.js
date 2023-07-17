import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {PanelCustomerStyles} from "../../../styles/PanelCustomer";

export const ModifyInfoWidget = React.memo(({portraitInfo})=>{
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
                    {portraitInfo.lastTime || '暂无消费'}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    平均消费：
                </Text>
                <Text style={PanelCustomerStyles.memberPropertyValue}>
                    ¥{portraitInfo.allConsumePricePer || 0.00}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    累计消费：
                </Text>
                <Text style={PanelCustomerStyles.memberPropertyValue}>
                    ¥{portraitInfo.allConsumePrice || 0.00}
                </Text>
            </View>
            <View style={PanelCustomerStyles.memberPropertyBox}>
                <Text style={PanelCustomerStyles.memberPropertyTitle}>
                    累计结单：
                </Text>
                <Text style={PanelCustomerStyles.memberPropertyValue}>
                    {portraitInfo.billingNos || 0}
                </Text>
            </View>
        </View>
    )
})
