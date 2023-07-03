import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {PanelMultiProfiles} from "../../../styles/panelMultiProfile";
import {getPhoneSecurity} from "../../../utils";

export const MultiProfileItem = React.memo(({profileItem, index, size, customerClickEvent})=>{
    return (
        <View style={PanelMultiProfiles.profileItemBox}>
            <View style={index == size - 1 ? PanelMultiProfiles.profileItemLastWrap:PanelMultiProfiles.profileItemWrap}>
                <View style={PanelMultiProfiles.leftWrap}>
                    <View style={PanelMultiProfiles.nameBox}>
                        <View style={PanelMultiProfiles.nameWrap}>
                            <Text style={PanelMultiProfiles.nameText} ellipsizeMode={"tail"} numberOfLines={1}>
                                {profileItem.bmsName && profileItem.bmsName.length > 0
                                    ? decodeURIComponent(profileItem.bmsName): '未填写姓名'}
                            </Text>
                            <Image
                                source={require('@imgPath/reserve_customer_multi_profile_man.png')}
                                style={PanelMultiProfiles.sexWrap}></Image>
                        </View>
                        <Text style={PanelMultiProfiles.valueText}>
                            {getPhoneSecurity(profileItem.bmsPhone)}
                        </Text>
                    </View>
                    <View style={PanelMultiProfiles.numberBox}>
                        <Text style={PanelMultiProfiles.titleText}>会员号</Text>
                        <Text style={PanelMultiProfiles.valueText}>
                            {profileItem.memberNo}
                        </Text>
                    </View>
                    <View style={PanelMultiProfiles.timeBox}>
                        <Text style={PanelMultiProfiles.titleText}>消费时间</Text>
                        <Text style={PanelMultiProfiles.valueText}>
                            {profileItem.lastTime ? profileItem.lastTime.substring(0,19) : '暂无消费'}
                        </Text>
                    </View>
                </View>
                <View style={PanelMultiProfiles.rightWrap}>
                    <TouchableOpacity
                        style={PanelMultiProfiles.createBtnBox}
                        onPress={()=>{
                            customerClickEvent('naviToCashier', {memberId: profileItem.memberId, imgUrl: profileItem.imgUrl})
                        }}>
                        <Image
                            resizeMode={"contain"}
                            source={require('@imgPath/reserve_customer_multi_profile_btn.png')}
                            style={PanelMultiProfiles.createBtnImg}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})
