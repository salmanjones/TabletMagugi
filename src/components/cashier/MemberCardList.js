import React, {PureComponent} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {multiplyPayStyle} from '../../styles';

export class MemberCardList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // 获取次卡标题
    getCardTitle(card){
        let cardTitle = '次卡'
        const cardType = card.cardType
        const consumeMode = card.consumeMode

        if(cardType == '1'){
            cardTitle = '储值卡'
            if(consumeMode == '2'){
                cardTitle = '定向卡'
            }else if(consumeMode == '1'){
                cardTitle = '折扣卡'
            }
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

    render() {
        const {data, selectedCardsId} = this.props;
        const {onSeleted, onEdit, onValiDity} = this.props;


        return (
            <FlatList
                style={multiplyPayStyle.rightWrapperCard}
                data={data}
                extraData={selectedCardsId}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => {
                    let isSelected = selectedCardsId.findIndex((x) => x == item.id) != -1;
                    let attachBalance = (item.attachMoneyList && item.attachMoneyList.length) ? item.attachMoneyList.reduce((rs, x) => (rs += x.balance), 0) : null;
                    let totalPaidAmt = Number(item.paidAmt || 0) + (item.attachMoneyList || []).reduce((rs, x) => (rs += Number(x.paidAmt || 0)), 0);
                    let isNotDiscountCard = item.consumeMode != 1 && item.consumeMode != 3;
                    return (
                        <TouchableOpacity
                            style={multiplyPayStyle.rightWrapperCardItem}
                            onPress={() => {
                                if(item.cardStatus != '-2') {
                                    onSeleted(item);
                                }
                            }}>
                            <ImageBackground
                                style={multiplyPayStyle.rightWrapperCardImg}
                                source={item.cardStatus == '-2' ? require('@imgPath/member_expired.png') : require('@imgPath/member_storecard.png')}
                                resizeMethod="resize"
                                resizeMode={'stretch'}>
                                <View style={multiplyPayStyle.rightWrapperCardDesc}>
                                    <View style={multiplyPayStyle.rightall}>
                                        <View style={multiplyPayStyle.rightWrapperCardTop}>
                                            <View style={multiplyPayStyle.rightCardName}>
                                                <Text style={multiplyPayStyle.storeCard}>
                                                    {this.getCardTitle(item)}
                                                </Text>
                                                <Text ellipsizeMode={'tail'} numberOfLines={2}
                                                      style={multiplyPayStyle.storeCardname}>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{item.vipCardName}</Text>
                                            </View>

                                            {
                                                item.cardStatus != '-2' && (
                                                    <Image
                                                        style={multiplyPayStyle.rightCardConsumeselectImg}
                                                        resizeMethod="resize"
                                                        resizeMode={'contain'}
                                                        source={isSelected ? require('@imgPath/member_select.png') : require('@imgPath/member_noselect.png')}
                                                    ></Image>
                                                )
                                            }
                                        </View>
                                        <View style={multiplyPayStyle.rightWrappercenter}>
                                            <Text style={multiplyPayStyle.rightcenterleftName} ellipsizeMode={"tail"} numberOfLines={1}>
                                                {item.storeName}
                                            </Text>
                                            <View style={multiplyPayStyle.rightcenterInfo}>
                                                {item.cardStatus != '-2' && (
                                                    <Text style={multiplyPayStyle.rightcenterrightName}>{item.validityShow}</Text>
                                                )}
                                                {
                                                    item.cardStatus == '-2' && (
                                                        <Text
                                                            style={multiplyPayStyle.rightcenterextensionName}>已过期
                                                            {item.validityShow}</Text>
                                                    )
                                                }
                                                {
                                                    item.cardStatus == '-2' && (
                                                        <TouchableOpacity
                                                            onPress={()=>{
                                                                onValiDity(item.id)
                                                            }}>
                                                            <Text style={multiplyPayStyle.rightextension}>延期</Text>
                                                        </TouchableOpacity>
                                                    )
                                                }

                                            </View>
                                        </View>
                                    </View>
                                    <View style={multiplyPayStyle.rightWrapperBottom}>
                                        {isNotDiscountCard && <Text
                                            style={multiplyPayStyle.rightBalance}>余额:¥ {item.balance}</Text>}

                                        <View style={multiplyPayStyle.rightpaid}>
                                            {isNotDiscountCard &&
                                                <Text style={multiplyPayStyle.rightpaidName}>已付:{totalPaidAmt}</Text>}

                                            {isSelected && isNotDiscountCard && (
                                                <TouchableOpacity
                                                    style={multiplyPayStyle.rightCardConsumeEditBtn}
                                                    onPress={() => {
                                                        onEdit(item);
                                                    }}
                                                >
                                                    <Image
                                                        style={multiplyPayStyle.rightCardConsumeEditImg}
                                                        resizeMethod="resize"
                                                        resizeMode={'contain'}
                                                        source={require('@imgPath/member_edit.png')}
                                                    ></Image>
                                                </TouchableOpacity>
                                            )}

                                        </View>
                                    </View>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }
}
