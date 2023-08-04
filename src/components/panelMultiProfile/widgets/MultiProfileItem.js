import React, {useEffect} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {PanelMultiProfiles} from "../../../styles/PanelMultiProfile";
import {decodeContent, getPhoneSecurity} from "../../../utils";
import {BackgroundImage} from "react-native-elements/dist/config";

/**
 * 多档案单项展示组件
 * @type {React.NamedExoticComponent<{readonly size?: *, readonly customerClickEvent?: *, readonly index?: *, readonly profileItem?: *}>}
 */
export const MultiProfileItem = React.memo(({
    profileItem,
    customerClickEvent,
    showMode,
    waiterId,
    actionType,
    pagerName,
}) => {
    // 距今消费时间
    let showDayTips = ''
    try{
        let lastTimeToNowDays = parseInt(profileItem.lastTimeToNowDays)
        if(lastTimeToNowDays >= 365){
            showDayTips = '(距今'+1+'年+)'
        }else{
            showDayTips = '(距今'+lastTimeToNowDays+'天)'
        }
    }catch (e){
        console.log("处理距今消费失败")
    }

    return (
        <View style={PanelMultiProfiles.profileItemBox}>
            <TouchableOpacity
                style={PanelMultiProfiles.profileItemWrap}
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
                <View style={PanelMultiProfiles.createBtnBox}>
                    <BackgroundImage
                        resizeMode={"contain"}
                        source={require('@imgPath/reserve_customer_multi_operator.png')}
                        style={PanelMultiProfiles.createBtnImg}>
                        <Text style={PanelMultiProfiles.createBtnTxt}>
                            {(pagerName == 'CashierBillingActivity' || pagerName == 'MultiPayActivity') ? '确定':actionType == 'createOrder' ? '开单' : '办卡'}
                        </Text>
                    </BackgroundImage>
                </View>
                <View style={PanelMultiProfiles.profileItemInnerBox}>
                    <View style={PanelMultiProfiles.profileItemRender}>
                        <View style={PanelMultiProfiles.nameBox}>
                            <Text style={PanelMultiProfiles.nameBoxText} numberOfLines={1} ellipsizeMode={'tail'}>
                                {profileItem.bmsName && profileItem.bmsName.length > 0 ? decodeContent(profileItem.bmsName) : '未填写姓名'}
                            </Text>
                            <Image source={profileItem.bmsSex == '1'
                                ? require('@imgPath/reserve_customer_multi_profile_man.png')
                                : require('@imgPath/reserve_customer_multi_profile_woman.png')}
                                style={PanelMultiProfiles.sexWrap}/>
                        </View>
                        <View style={PanelMultiProfiles.customerDetailBox}>
                            <Image style={PanelMultiProfiles.customerDetailIcon} source={require('@imgPath/reserve_customer_multi_phone.png')}></Image>
                            <Text style={PanelMultiProfiles.customerDetailTextPhone}>
                                {getPhoneSecurity(profileItem.bmsPhone)}
                            </Text>
                            <Image style={PanelMultiProfiles.customerDetailIcon} source={require('@imgPath/reserve_customer_multi_no.png')}></Image>
                            <Text style={PanelMultiProfiles.customerDetailTextNo} numberOfLines={1}>
                                {profileItem.memberNo}
                            </Text>
                            <Image style={PanelMultiProfiles.customerDetailIcon} source={require('@imgPath/reserve_customer_multi_time.png')}></Image>
                            <Text style={PanelMultiProfiles.customerDetailTextTime}>
                                最近消费:{profileItem.lastTime ? profileItem.lastTime.substring(0, 10) + showDayTips : '暂无消费'}
                            </Text>
                        </View>
                        <View style={PanelMultiProfiles.customerDetailCard}>
                            <View style={PanelMultiProfiles.customerDetailCardItem}>
                                <Text style={PanelMultiProfiles.customerDetailCardItemTitle}>
                                    储值卡
                                </Text>
                                <Text style={PanelMultiProfiles.customerDetailCardItemValue}>
                                    {profileItem.czkCount}张
                                </Text>
                            </View>
                            <View style={PanelMultiProfiles.customerDetailCardItem}>
                                <Text style={PanelMultiProfiles.customerDetailCardItemTitle}>
                                    次卡
                                </Text>
                                <Text style={PanelMultiProfiles.customerDetailCardItemValue}>
                                    {profileItem.ckCount}张
                                </Text>
                            </View>
                            <View style={PanelMultiProfiles.customerDetailCardItem}>
                                <Text style={PanelMultiProfiles.customerDetailCardItemTitle}>
                                    储值余额
                                </Text>
                                <Text style={PanelMultiProfiles.customerDetailCardItemValue}>
                                    ¥{profileItem.czkPriceSum}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
})
