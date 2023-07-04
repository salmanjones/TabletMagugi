import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {PanelMultiProfiles} from "../../../styles/panelMultiProfile";
import {getPhoneSecurity} from "../../../utils";

/**
 * 多档案单项展示组件
 * @type {React.NamedExoticComponent<{readonly size?: *, readonly customerClickEvent?: *, readonly index?: *, readonly profileItem?: *}>}
 */
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
                                source={profileItem.bmsSex == '1' ? require('@imgPath/reserve_customer_multi_profile_man.png'):require('@imgPath/reserve_customer_multi_profile_woman.png')}
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
                        <Text style={PanelMultiProfiles.titleText}>最近消费时间</Text>
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
