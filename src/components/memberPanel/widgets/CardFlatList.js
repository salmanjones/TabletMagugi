import React from "react";
import {FlatList, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {MemberPanelStyles} from "../../../styles/MemberPanel";

export const CardFlatList = React.memo(({cardArray, cardType})=>{
    const CardFlatItem = React.memo(({cardItem, index})=>{
        // 是否为偶数
        const isEvenElement = index % 2 == 0
        const {cardTypeId, cardModeName, cardMode} = cardItem
        const isInvalidCard = cardType.indexOf("过期卡") != -1
        // 卡背景图
        let cardBackGround = null
        let cardModeStyle = null
        let cardNameStyle = null
        let cardBalanceStyle = null
        let cardButtonStyle = null
        let cardButtonTxtStyle = null
        let cardDateStyle = null
        if(isInvalidCard){ // 无效卡
            cardBackGround = require('@imgPath/member_panel_card_bg_wuxiao.png')
            cardModeStyle = MemberPanelStyles.cardItemModeNameWuXiao
            cardNameStyle = MemberPanelStyles.cardItemWuXiaoName
            cardBalanceStyle = MemberPanelStyles.cardItemWuXiaoBalance
            cardButtonStyle = MemberPanelStyles.cardItemYanQiOperator
            cardButtonTxtStyle = MemberPanelStyles.cardItemOperatorYanQiText
            cardDateStyle = MemberPanelStyles.cardItemWuXiaoDate
        }else if(cardTypeId == '1'){ // 储值卡
            cardBackGround = require('@imgPath/member_panel_card_bg_chuzhi.png')
            cardModeStyle = MemberPanelStyles.cardItemModeName
            cardNameStyle = MemberPanelStyles.cardItemChuZhiName
            cardBalanceStyle = MemberPanelStyles.cardItemChuZhiBalance
            cardButtonStyle = MemberPanelStyles.cardItemChuZhiOperator
            cardButtonTxtStyle = MemberPanelStyles.cardItemOperatorText
            cardDateStyle = MemberPanelStyles.cardItemDate
        }else{ // 套餐卡
            cardBackGround = require('@imgPath/member_panel_card_bg_taocan.png')
            cardModeStyle = MemberPanelStyles.cardItemModeName
            cardNameStyle = MemberPanelStyles.cardItemTaoCanName
            cardBalanceStyle = MemberPanelStyles.cardItemTaoCanBalance
            cardButtonStyle = MemberPanelStyles.cardItemTaoCanOperator
            cardButtonTxtStyle = MemberPanelStyles.cardItemOperatorText
            cardDateStyle = MemberPanelStyles.cardItemDate
        }

        // 是否要隐藏次数

        let hideCardBalance = false
        if(cardTypeId == '2' && cardMode == '2'){ // 时间卡
            hideCardBalance = true
        }

        return (
            <ImageBackground
                resizeMode={"contain"}
                style={isEvenElement ? MemberPanelStyles.cardItemBackground : MemberPanelStyles.cardItemBackground2N}
                source={cardBackGround}>
                {/*卡类型*/}
                <Text style={cardModeStyle}>
                    {cardModeName}
                </Text>
                <View style={MemberPanelStyles.cardItemContentBox}>
                    <Text
                        style={cardNameStyle}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}>
                        {cardItem.cardName}
                    </Text>
                    <View style={MemberPanelStyles.cardItemOperatorBox}>
                        <Text style={hideCardBalance ? MemberPanelStyles.cardItemYinCangBalance: cardBalanceStyle}>
                            {
                                cardTypeId == '1' ? `¥${cardItem.cardBalance}`:`${cardItem.cardBalance}次`
                            }
                        </Text>
                        <TouchableOpacity style={cardButtonStyle}>
                            <Text style={cardButtonTxtStyle}>
                                {isInvalidCard ? '延期':'充值'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={MemberPanelStyles.cardItemOtherBox}>
                    <View style={MemberPanelStyles.cardItemOtherWrap}>
                        <Text style={MemberPanelStyles.cardItemStore} numberOfLines={1} ellipsizeMode={'tail'}>
                            {cardItem.cardStoreName}
                        </Text>
                        <Text style={cardDateStyle}>
                            {isInvalidCard ? '已过期' :cardItem.cardValidity}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        )
    })

    return (
        <FlatList
            data={cardArray}
            renderItem={
                ({item, index}) => {
                    return <CardFlatItem cardItem={item} index={index}/>
                }
            }
            numColumns={2}
            ItemSeparatorComponent={()=>{
                return <View style={MemberPanelStyles.cardItemSeparator}></View>
            }}
            keyExtractor={card=>{
                return card.cardId
            }}
        />
    )
})
