import {FlatList, ImageBackground, View, Text, Image, TouchableOpacity, TextInput, ScrollView} from "react-native";
import React, {useState} from "react";
import {PanelCustomerStyles} from "../../../styles/PanelCustomer";
import {decodeContent} from "../../../utils";

export const PortraitWidget = React.memo(({portraitInfo})=>{
    const lastConsumeInfo = portraitInfo.lastConsumeInfo
    let hasConsume = false
    if(lastConsumeInfo && lastConsumeInfo.lastConsumeTime && lastConsumeInfo.lastConsumeTime.length > 0){
        hasConsume = true
    }

    let hasMapping = false
    const mappingCustomerList = portraitInfo.mappingCustomeList
    if(mappingCustomerList && mappingCustomerList.length > 0){
        hasMapping = true
    }

    return (
        <ScrollView style={PanelCustomerStyles.memberPortraitBox}>
            {
                hasConsume && (
                    <View style={PanelCustomerStyles.memberPortraitConsume}>
                        <View style={PanelCustomerStyles.memberPortraitTitle}>
                            <Text style={PanelCustomerStyles.contentBodyTitleValue}>最近消费</Text>
                        </View>
                        <View style={PanelCustomerStyles.memberPropertyBox}>
                            <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                                消费时间：
                            </Text>
                            <Text style={PanelCustomerStyles.memberPortraitPValue}>
                                {lastConsumeInfo.lastConsumeTime}
                            </Text>
                        </View>
                        <View style={PanelCustomerStyles.memberPropertyBox}>
                            <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                                消费门店：
                            </Text>
                            <Text style={PanelCustomerStyles.memberPortraitPValue}>
                                {lastConsumeInfo.lastStoreName}
                            </Text>
                        </View>
                        <View style={PanelCustomerStyles.memberPropertyBox}>
                            <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                                服&ensp;务&ensp;人：
                            </Text>
                            <Text style={PanelCustomerStyles.memberPortraitPValue}>
                                {lastConsumeInfo.lastServers}
                            </Text>
                        </View>
                        <View style={PanelCustomerStyles.memberPropertyVBox}>
                            <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                                消费品项：
                            </Text>
                            <View style={PanelCustomerStyles.memberPortraitVPValue}>
                                {
                                    lastConsumeInfo.lastBillingItems && lastConsumeInfo.lastBillingItems.map(item=>{
                                        return (
                                            <View style={PanelCustomerStyles.memberPortraitVPItem}>
                                                <View style={PanelCustomerStyles.memberPortraitVPItemRowTitle}>
                                                    <View style={PanelCustomerStyles.memberPortraitCircle}></View>
                                                    <Text style={PanelCustomerStyles.memberPortraitVPItemRowVal} numberOfLines={1} ellipsizeMode={"tail"}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                )
            }
            <View style={PanelCustomerStyles.memberPortraitBase}>
                <View style={PanelCustomerStyles.memberPortraitTitle}>
                    <Text style={PanelCustomerStyles.contentBodyTitleValue}>档案信息</Text>
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
                        性&ensp;&ensp;&ensp;&ensp;别：
                    </Text>
                    <Text style={PanelCustomerStyles.memberPortraitPValue}>
                        {portraitInfo.sex == '1' ? '男':'女'}
                    </Text>
                </View>
                <View style={PanelCustomerStyles.memberPropertyBox}>
                    <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                        生&ensp;&ensp;&ensp;&ensp;日：
                    </Text>
                    <Text style={PanelCustomerStyles.memberPortraitPValue}>
                        {portraitInfo.birthday && portraitInfo.birthday.length > 0 && portraitInfo.birthday != 'Invalid Date' ? portraitInfo.birthday: '暂无'}
                    </Text>
                </View>
                {
                    hasMapping && (
                        <View style={PanelCustomerStyles.memberPropertyVProfileBox}>
                            <Text style={PanelCustomerStyles.memberPortraitPTitle}>
                                关联档案：
                            </Text>
                            <View style={PanelCustomerStyles.memberPortraitVPValue}>
                                {
                                    mappingCustomerList && mappingCustomerList.map(item=>{
                                        return (
                                            <View style={PanelCustomerStyles.memberPortraitVPItem}>
                                                <View style={PanelCustomerStyles.memberPortraitVPItemRowProj}>
                                                    <View style={PanelCustomerStyles.memberPortraitCircle}></View>
                                                    <Text style={PanelCustomerStyles.memberPortraitVPItemRowVal} numberOfLines={1} ellipsizeMode={"tail"}>
                                                        {item.memberNo}
                                                    </Text>
                                                </View>
                                                <View style={PanelCustomerStyles.memberPortraitVPItemRowNo}>
                                                    <Text style={PanelCustomerStyles.memberPortraitVPItemRowDesc}> {item.memberPhone}</Text>
                                                </View>
                                                <View style={PanelCustomerStyles.memberPortraitVPItemRowName}>
                                                    <Text style={PanelCustomerStyles.memberPortraitVPItemRowDesc}>{item.memberName}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
})
