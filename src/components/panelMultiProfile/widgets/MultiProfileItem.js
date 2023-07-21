import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {PanelMultiProfiles} from "../../../styles/PanelMultiProfile";
import {getPhoneSecurity} from "../../../utils";
import {BackgroundImage} from "react-native-elements/dist/config";

/**
 * 多档案单项展示组件
 * @type {React.NamedExoticComponent<{readonly size?: *, readonly customerClickEvent?: *, readonly index?: *, readonly profileItem?: *}>}
 */
export const MultiProfileItem = React.memo(({
    profileItem,
    index,
    size,
    customerClickEvent,
    showMode,
    waiterId,
    actionType,
    pagerName
}) => {

    return (
        <View style={PanelMultiProfiles.profileItemBox}>
            <View style={index == size - 1 ? PanelMultiProfiles.profileItemLastOtherWrap : PanelMultiProfiles.profileItemOtherWrap}>
                <View style={PanelMultiProfiles.leftWrap}>
                    <View style={PanelMultiProfiles.nameBox}>
                        <View style={PanelMultiProfiles.nameWrap}>
                            <Text style={PanelMultiProfiles.nameText} ellipsizeMode={"tail"} numberOfLines={1}>
                                {profileItem.bmsName && profileItem.bmsName.length > 0
                                    ? decodeURIComponent(profileItem.bmsName) : '未填写姓名'}
                            </Text>
                            <Image
                                source={profileItem.bmsSex == '1' ? require('@imgPath/reserve_customer_multi_profile_man.png') : require('@imgPath/reserve_customer_multi_profile_woman.png')}
                                style={PanelMultiProfiles.sexWrap}></Image>
                        </View>
                        <Text style={PanelMultiProfiles.valueText}>
                            {getPhoneSecurity(profileItem.bmsPhone)}
                        </Text>
                    </View>
                    <View style={pagerName == 'MultiPayActivity' ? PanelMultiProfiles.numberOtherBox : PanelMultiProfiles.numberBox}>
                        <Text style={PanelMultiProfiles.titleText}>会员号</Text>
                        <Text style={PanelMultiProfiles.valueText} ellipsizeMode={"tail"} numberOfLines={1}>
                            {profileItem.memberNo}
                        </Text>
                    </View>
                    <View style={PanelMultiProfiles.timeBox}>
                        <Text style={PanelMultiProfiles.titleText}>最近消费时间</Text>
                        <Text style={PanelMultiProfiles.valueText}>
                            {profileItem.lastTime ? profileItem.lastTime.substring(0, 19) : '暂无消费'}
                        </Text>
                    </View>
                </View>
                <View style={PanelMultiProfiles.rightWrap}>
                    <TouchableOpacity
                        style={pagerName == 'MultiPayActivity' ? PanelMultiProfiles.createBtnOtherBox : PanelMultiProfiles.createBtnBox}
                        onPress={() => {
                            if (showMode == 'noReserve') { // 未预约，跳转选牌
                                customerClickEvent('forwardToCashier', {
                                    showMode,
                                    memberId: profileItem.memberId,
                                    actionType
                                })
                            } else { // 已预约，直接进入开单页面
                                customerClickEvent('naviToCashier', {
                                    memberId: profileItem.memberId,
                                    imgUrl: profileItem.imgUrl,
                                    showMode,
                                    waiterId: waiterId,
                                    actionType
                                })
                            }
                        }}>
                        <BackgroundImage
                            resizeMode={"contain"}
                            source={require('@imgPath/reserve_customer_multi_profile_btn.png')}
                            style={PanelMultiProfiles.createBtnImg}>
                            <Text style={PanelMultiProfiles.createBtnTxt}>
                                {(pagerName == 'CashierBillingActivity' || pagerName == 'MultiPayActivity') ? '确定':actionType == 'createOrder' ? '开单' : '办卡'}
                            </Text>
                        </BackgroundImage>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})
