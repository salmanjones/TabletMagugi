import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {MemberPanelStyles} from "../../../styles/MemberPanel";

export const ProfileWidget = React.memo(({profileInfo})=>{
    return (
        <View style={MemberPanelStyles.memberProfileBox}>
            <View style={MemberPanelStyles.memberProfileTitle}>
                <Image
                    style={MemberPanelStyles.contentBodyTitleIcon}
                    resizeMode={"contain"}
                    source={require('@imgPath/reserve_customer_body_title_icon.png')}/>
                <Text style={MemberPanelStyles.contentBodyTitleValue}>消费统计</Text>
            </View>
            <View style={MemberPanelStyles.memberPropertyBox}>
                <Text style={MemberPanelStyles.memberPropertyTitle}>
                    最近一次消费：
                </Text>
                <Text style={MemberPanelStyles.memberPropertyValue}>
                    {profileInfo.lastTime}
                </Text>
            </View>
            <View style={MemberPanelStyles.memberPropertyBox}>
                <Text style={MemberPanelStyles.memberPropertyTitle}>
                    平均消费：
                </Text>
                <Text style={MemberPanelStyles.memberPropertyValue}>
                    ¥{profileInfo.allConsumePricePer}
                </Text>
            </View>
            <View style={MemberPanelStyles.memberPropertyBox}>
                <Text style={MemberPanelStyles.memberPropertyTitle}>
                    累计消费：
                </Text>
                <Text style={MemberPanelStyles.memberPropertyValue}>
                    ¥{profileInfo.allConsumePrice}
                </Text>
            </View>
            <View style={MemberPanelStyles.memberPropertyBox}>
                <Text style={MemberPanelStyles.memberPropertyTitle}>
                    累计结单：
                </Text>
                <Text style={MemberPanelStyles.memberPropertyValue}>
                    {profileInfo.billingNos}
                </Text>
            </View>
        </View>
    )
})
