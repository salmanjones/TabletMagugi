import React from 'react';
import {Image, View, Text, FlatList} from 'react-native';
import {PaymentResultStatus} from '../utils';
import {payForStyle} from '../styles';

export const PaymentResult = ({status, cardList}) => {
    // 卡消费详情
    const UseCardItem = ({cardInfo})=>{
        return (
            <View style={payForStyle.cardUseBodyItem}>
                <View style={payForStyle.cardUseBodyItemTitle}>
                    <Text style={payForStyle.cardUseBodyItemText}>
                        {cardInfo.cardName}
                    </Text>
                </View>
                <View style={payForStyle.cardUseBodyItemTitle}>
                    <Text style={payForStyle.cardUseBodyItemText}>
                        {cardInfo.cardType == '1' ? '¥' + cardInfo.cardAllBalance: cardInfo.cardAllBalance + '次'}
                    </Text>
                </View>
                <View style={payForStyle.cardUseBodyItemTitle}>
                    <Text style={payForStyle.cardUseBodyItemText}>
                        {cardInfo.cardType == '1' ? '¥' + cardInfo.cardBalance: cardInfo.cardBalance + '次'}
                    </Text>
                </View>
                <View style={payForStyle.cardUseBodyItemTitle}>
                    <Text style={payForStyle.cardUseBodyItemText}>
                        {cardInfo.cardType == '1' ? '¥' + cardInfo.cardAttachMoney: cardInfo.cardAttachMoney + '次'}
                    </Text>
                </View>
            </View>
        )
    }

    if(status == PaymentResultStatus.success){ // 支付成功
        return (
            <View style={payForStyle.payForState}>
                <Image resizeMethod="resize"
                       source={require('@imgPath/pay-finish.png')}
                       style={payForStyle.payStateImgOther}
                />
                {
                    cardList && cardList.length > 0 && (
                        <View style={payForStyle.cardUseBox}>
                            <View style={payForStyle.cardUseHeader}>
                                <View style={payForStyle.cardUseHeaderTitle}>
                                    <Text style={payForStyle.cardUseHeaderTitleTxt}>
                                        会员卡
                                    </Text>
                                </View>
                                <View style={payForStyle.cardUseHeaderTitle}>
                                    <Text style={payForStyle.cardUseHeaderTitleTxt}>
                                        剩余总额/剩余次数
                                    </Text>
                                </View>
                                <View style={payForStyle.cardUseHeaderTitle}>
                                    <Text style={payForStyle.cardUseHeaderTitleTxt}>
                                        本金余额
                                    </Text>
                                </View>
                                <View style={payForStyle.cardUseHeaderTitle}>
                                    <Text style={payForStyle.cardUseHeaderTitleTxt}>
                                        赠金余额
                                    </Text>
                                </View>
                            </View>
                            <View style={payForStyle.cardUseBody}>
                                {
                                    cardList && cardList.length > 0 && (
                                        <FlatList
                                            data={cardList}
                                            keyExtractor={(item)=>item.cardName}
                                            renderItem={
                                                ({item}) => {
                                                    return <UseCardItem cardInfo={item}/>
                                                }
                                            }
                                        />
                                    )
                                }
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }else if(status == PaymentResultStatus.error || status == PaymentResultStatus.timeout){ // 支付失败
        return (
            <View style={payForStyle.payForState}>
                <Image resizeMethod="resize"
                       source={require('@imgPath/pay-defeated.png')}
                       style={payForStyle.payStateImgOther}
                />
            </View>
        )
    }else if(status === PaymentResultStatus.partial){ // 三方异常
        return (
            <View style={payForStyle.payForState}>
                <Image resizeMethod="resize"
                       source={require('@imgPath/pay-unusual.png')}
                       style={payForStyle.payStateImg}
                />
            </View>
        )
    }
}
