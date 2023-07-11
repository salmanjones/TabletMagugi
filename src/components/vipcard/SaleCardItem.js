import React from "react";
import {ImageBackground, Text, TouchableOpacity, View,} from 'react-native';
import {commonStyles} from "../../styles";

const storageCardBgImg = require("@imgPath/vipcard_storeage_bg.png");
const timeCardBgImg = require("@imgPath/vipcard_times_bg.png");
const activeCardBgImg = require("@imgPath/vipcard_storeage_active_bg.png");
const activeTimeCardBgImg = require("@imgPath/vipcard_times_active_bg.png");

const getValidity = (endDate, validTime) => {
    let validity = "";
    switch (validTime) {
        case 1:
            validity = "月卡";
            break;
        case 3:
            validity = "季卡";
            break;
        case 6:
            validity = "半年卡";
            break;
        case 12:
            validity = "年卡";
            break;
        case -2:
            validity = "有效期 " + endDate;
            break;
        case 0:
            validity = "无期限";
            break;
    }
    return validity;
};

// 获取次卡标题
const getCardTitle = (card) =>{
    let cardTitle = '次卡'
    const cardType = card.cardType
    const consumeMode = card.consumeMode

    if(cardType == '1'){
        cardTitle = '储值卡'
    }else if(cardType == '2'){
        cardTitle = '次卡'

        if(consumeMode == '0'){
            cardTitle = '疗程卡'
        }else if(consumeMode == '1'){
            cardTitle = '套餐卡'
        }else if(consumeMode == '2'){
            cardTitle = '时间卡'
        }else if(consumeMode == '3'){
            cardTitle = '护理卡'
        }
    }
    return cardTitle
}

export class SaleCardItem extends React.PureComponent {
    render() {
        const {data, selected, onSelected, cardPay} = this.props;
        // 是否为储值卡
        const isStorageCard = data.cardType == 1;
        // 获取标题
        const cardTitle = getCardTitle(data)

        return (
            <TouchableOpacity
                onPress={() => {
                    onSelected && onSelected(data);
                }}>
                <View>
                    {/*储值卡*/}
                    {isStorageCard && (
                        <View style={commonStyles.cardBox}>
                            <ImageBackground
                                source={selected ? activeCardBgImg : storageCardBgImg}
                                style={commonStyles.cardBoxBg}>
                                <Text style={commonStyles.cardSaleTitle}>{cardTitle}</Text>
                                <View style={commonStyles.cardName}>
                                    <Text style={commonStyles.cardNameText} numberOfLines={2} ellipsizeMode={"tail"}>
                                        {data.vipCardName}
                                    </Text>
                                </View>
                                <View style={commonStyles.cardPrice}>
                                    <Text style={commonStyles.cardPricePreText}>
                                        ￥
                                    </Text>
                                    <Text style={commonStyles.cardPriceText}>
                                        {data.initialPrice}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </View>
                    )}

                    {/*次卡*/}
                    {!isStorageCard && (
                        <View style={commonStyles.cardBox}>
                            <ImageBackground
                                source={selected ? activeTimeCardBgImg : timeCardBgImg}
                                style={commonStyles.cardBoxBg}>
                                <Text style={commonStyles.cardSaleTitle}>{cardTitle}</Text>
                                <View style={commonStyles.timeCardName}>
                                    <Text style={commonStyles.timeCardNameText} numberOfLines={2} ellipsizeMode={"tail"}>
                                        {data.vipCardName}
                                    </Text>
                                </View>
                                <View style={commonStyles.timeCardOtherBody}>
                                    <Text style={commonStyles.timeCardPriceBigAfterText}>
                                        {data.consumeMode == 2 ? getValidity(data.endDate, data.validTime): data.times  ? data.times + '次' : ''}
                                    </Text>
                                    <View  style={commonStyles.timeCardOtherBodyRight}>
                                        <Text style={commonStyles.timeCardPriceBigPreText}>
                                            ￥
                                        </Text>
                                        <Text style={commonStyles.timeCardPriceBigText}>
                                            {data.initialPrice}
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        )
    }
}
