import React, {useEffect, useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {PanelConsumeStyles} from "../../../styles/PanelConsume";
import {ConsumeFlatList} from "./ComsumeFlatList";

export const ConsumeWidget = React.memo(({customerInfo})=>{
    // 选中tab state
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    // tabs
    const tabList = []

    // 消费数据
    if(customerInfo.billingDetailsList && customerInfo.billingDetailsList.length > 0){
        tabList.push({
            title: `开单消费明细`,
            data: customerInfo.billingDetailsList
        })
    }

    if(customerInfo.cardDetailsList && customerInfo.cardDetailsList.length > 0){
        tabList.push({
            title: `办卡充值明细`,
            data: customerInfo.cardDetailsList
        })
    }

    useEffect(()=>{
        setActiveTabIndex(0)
    }, [customerInfo])

    return (
        <View style={PanelConsumeStyles.consumeContentBox}>
            {/*Tab*/}
            <View style={PanelConsumeStyles.consumeTabBox}>
                {
                    tabList && tabList.map((tabInfo, index)=>{
                        return (
                            <TouchableOpacity style={index == activeTabIndex
                                ? PanelConsumeStyles.consumeTabItemActive
                                : PanelConsumeStyles.consumeTabItem}
                                onPress={()=>{
                                    setActiveTabIndex(index)
                                }}>
                                <Text style={index == activeTabIndex
                                    ? PanelConsumeStyles.consumeTabItemTextActive
                                    : PanelConsumeStyles.consumeTabItemText}>
                                    {tabInfo.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {/*卡列表*/}
            {
                tabList[activeTabIndex] && (
                    <View style={PanelConsumeStyles.consumeListWrap}>
                        <ConsumeFlatList consumeArray={tabList[activeTabIndex]['data']}/>
                    </View>
                )
            }
        </View>
    )
})
