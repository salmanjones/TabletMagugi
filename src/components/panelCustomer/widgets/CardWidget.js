import React, {useEffect, useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {MemberPanelStyles} from "../../../styles/MemberPanel";
import {CardFlatList} from "./CardFlatList";

export const CardWidget = React.memo(({extendsInfo, cardsInfo, customerPressEvent})=>{
    // 选中tab state
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    // tabs
    const tabList = []
    // 会员卡信息
    const validCardList = cardsInfo.card1List || []       // 可用余额
    const invalidCardList = cardsInfo.card2List || []     // 过期卡
    const storageCardList = cardsInfo.card3List || []     // 储值卡
    const timeCardList = cardsInfo.card4List || []        // 次卡
    const zeroCardList = cardsInfo.card5List || []        // 0元卡

    if(validCardList.length > 0){
        tabList.push({
            title: `可用余额(${validCardList.length})`,
            data: validCardList
        })
    }

    if(invalidCardList.length > 0){
        tabList.push({
            title: `过期卡(${invalidCardList.length})`,
            data: invalidCardList
        })
    }

    if(storageCardList.length > 0){
        tabList.push({
            title: `储值卡(${storageCardList.length})`,
            data: storageCardList
        })
    }

    if(timeCardList.length > 0){
        tabList.push({
            title: `次卡(${timeCardList.length})`,
            data: timeCardList
        })
    }

    if(zeroCardList.length > 0){
        tabList.push({
            title: `0元卡(${zeroCardList.length})`,
            data: zeroCardList
        })
    }

    useEffect(()=>{
        setActiveTabIndex(0)
    }, [cardsInfo])

    return (
        <View style={MemberPanelStyles.memberCardsBox}>
            {/*Tab*/}
            <View style={MemberPanelStyles.memberCardsTabBox}>
                {
                    tabList && tabList.map((tabInfo, index)=>{
                        return (
                            <TouchableOpacity style={index == activeTabIndex
                                ? MemberPanelStyles.memberCardsTabItemActive
                                : MemberPanelStyles.memberCardsTabItem}
                                onPress={()=>{
                                    setActiveTabIndex(index)
                                }}>
                                <Text style={index == activeTabIndex
                                    ? MemberPanelStyles.memberCardsTabItemTextActive
                                    : MemberPanelStyles.memberCardsTabItemText}>
                                    {tabInfo.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            {/*卡列表*/}
            <View style={MemberPanelStyles.memberCardsWrap}>
                <CardFlatList
                    cardArray={tabList[activeTabIndex]['data']}
                    cardType={tabList[activeTabIndex]['title']}
                    customerPressEvent={customerPressEvent}
                    extendsInfo={extendsInfo}/>
            </View>
        </View>
    )
})
