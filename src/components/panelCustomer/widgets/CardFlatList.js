import React from "react";
import {FlatList, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {PanelCustomerStyles} from "../../../styles/PanelCustomer";

export const CardFlatList = React.memo(({cardArray, cardType, extendsInfo, customerPressEvent})=>{
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
            cardModeStyle = PanelCustomerStyles.cardItemModeNameWuXiao
            cardNameStyle = PanelCustomerStyles.cardItemWuXiaoName
            cardBalanceStyle = PanelCustomerStyles.cardItemWuXiaoBalance
            cardButtonStyle = PanelCustomerStyles.cardItemYanQiOperator
            cardButtonTxtStyle = PanelCustomerStyles.cardItemOperatorYanQiText
            cardDateStyle = PanelCustomerStyles.cardItemWuXiaoDate
        }else if(cardTypeId == '1'){ // 储值卡
            cardBackGround = require('@imgPath/member_panel_card_bg_chuzhi.png')
            cardModeStyle = PanelCustomerStyles.cardItemModeName
            cardNameStyle = PanelCustomerStyles.cardItemChuZhiName
            cardBalanceStyle = PanelCustomerStyles.cardItemChuZhiBalance
            cardButtonStyle = PanelCustomerStyles.cardItemChuZhiOperator
            cardButtonTxtStyle = PanelCustomerStyles.cardItemOperatorText
            cardDateStyle = PanelCustomerStyles.cardItemDate
        }else{ // 套餐卡
            cardBackGround = require('@imgPath/member_panel_card_bg_taocan.png')
            cardModeStyle = PanelCustomerStyles.cardItemModeName
            cardNameStyle = PanelCustomerStyles.cardItemTaoCanName
            cardBalanceStyle = PanelCustomerStyles.cardItemTaoCanBalance
            cardButtonStyle = PanelCustomerStyles.cardItemTaoCanOperator
            cardButtonTxtStyle = PanelCustomerStyles.cardItemOperatorText
            cardDateStyle = PanelCustomerStyles.cardItemDate
        }

        // 是否要隐藏次数
        let hideCardBalance = false
        if((cardTypeId == '2' && cardMode == '2')// 时间卡
            ||(cardTypeId == '1' && cardMode == '1')){  // 折扣卡
            hideCardBalance = true
        }

        return (
            <ImageBackground
                resizeMode={"contain"}
                style={isEvenElement ? PanelCustomerStyles.cardItemBackground : PanelCustomerStyles.cardItemBackground2N}
                source={cardBackGround}>
                {/*卡类型*/}
                <Text style={cardModeStyle}>
                    {cardModeName}
                </Text>
                <View style={PanelCustomerStyles.cardItemContentBox}>
                    <Text
                        style={cardNameStyle}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}>
                        {cardItem.cardName}
                    </Text>
                    <View style={PanelCustomerStyles.cardItemOperatorBox}>
                        <Text style={hideCardBalance ? PanelCustomerStyles.cardItemYinCangBalance: cardBalanceStyle}>
                            {
                                cardTypeId == '1'
                                    ? `¥${cardItem.cardBalance.toString().indexOf(".") != -1 ? cardItem.cardBalance.toFixed(1):cardItem.cardBalance}`
                                    :`余${cardItem.cardBalance}次`
                            }
                        </Text>
                        {
                            (()=>{
                                if(isInvalidCard) { // 无效卡
                                    return (
                                        <TouchableOpacity style={cardButtonStyle} onPress={
                                            ()=>{
                                                customerPressEvent('editCardValidity', {
                                                    cardId: cardItem.cardId,
                                                    appUserId: extendsInfo.appUserId,
                                                    reserveId: extendsInfo.reserveId
                                                })
                                            }
                                        }>
                                            <Text style={cardButtonTxtStyle}>
                                                {'延期'}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }else if(cardItem.allowRecharge == '1'){ // 有效卡，可充值 allowRecharge:0不可充值 1：可充值
                                    return (
                                        <TouchableOpacity style={cardButtonStyle} onPress={
                                            ()=>{
                                                customerPressEvent('rechargeCardItem', {memberId: cardItem['cardMemberId'], cardId: cardItem.cardId, waiterId: extendsInfo.waiterId})
                                            }
                                        }>
                                            <Text style={cardButtonTxtStyle}>
                                                {'充值'}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }else{
                                    return <View></View>
                                }
                            })()
                        }
                    </View>
                </View>
                <View style={PanelCustomerStyles.cardItemOtherBox}>
                    <View style={PanelCustomerStyles.cardItemOtherWrap}>
                        <Text style={PanelCustomerStyles.cardItemStore} numberOfLines={1} ellipsizeMode={'tail'}>
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
                return <View style={PanelCustomerStyles.cardItemSeparator}></View>
            }}
            keyExtractor={card=>{
                return card.cardId
            }}
        />
    )
})
