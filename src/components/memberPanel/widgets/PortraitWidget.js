import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from "react";
import {MemberPanelStyles} from "../../../styles/MemberPanel";

export const PortraitWidget = React.memo(({portraitInfo})=>{
    return (
        <View style={MemberPanelStyles.memberPortraitBox}>
            <View style={MemberPanelStyles.memberPortraitTitle}>
                <Image
                    style={MemberPanelStyles.contentBodyTitleIcon}
                    resizeMode={"contain"}
                    source={require('@imgPath/reserve_customer_body_title_icon.png')}/>
                <Text style={MemberPanelStyles.contentBodyTitleValue}>基础档案</Text>
            </View>
            <View style={MemberPanelStyles.memberPropertyBox}>
                <Text style={MemberPanelStyles.memberPortraitPTitle}>
                    手机号码：
                </Text>
                <Text style={MemberPanelStyles.memberPortraitPValue}>
                    {portraitInfo.reserveInfo.memberPhoneShow}
                </Text>
            </View>
            <View style={MemberPanelStyles.memberPropertyBox}>
                <Text style={MemberPanelStyles.memberPortraitPTitle}>
                    顾客姓名：
                </Text>
                <Text style={MemberPanelStyles.memberPortraitPValue}>
                    {decodeURIComponent(decodeURIComponent(portraitInfo.nickName))}
                </Text>
            </View>
            <View style={MemberPanelStyles.memberPropertyBox}>
                <Text style={MemberPanelStyles.memberPortraitPTitle}>
                    性别：
                </Text>
                <Text style={MemberPanelStyles.memberPortraitPValue}>
                    {portraitInfo.sex == '1' ? '男':'女'}
                </Text>
            </View>
            <View style={MemberPanelStyles.memberPropertyBox}>
                <Text style={MemberPanelStyles.memberPortraitPTitle}>
                    生日：
                </Text>
                <Text style={MemberPanelStyles.memberPortraitPValue}>
                    {portraitInfo.birthday && portraitInfo.birthday.length > 0 ? portraitInfo.birthday: '暂无'}
                </Text>
            </View>
        </View>
    )
})
