import React, {PureComponent} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {multiplyPayStyle} from '../../styles';

export class MemberCardList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {data, selectedCardsId} = this.props;
        const {onSeleted, onEdit} = this.props;
        return (
            <FlatList
                style={multiplyPayStyle.rightWrapperCard}
                data={data}
                extraData={selectedCardsId}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => {

                    console.log(item, 'item')
                    let isSelected = selectedCardsId.findIndex((x) => x == item.id) != -1;
                    let attachBalance = (item.attachMoneyList && item.attachMoneyList.length) ? item.attachMoneyList.reduce((rs, x) => (rs += x.balance), 0) : null;
                    let totalPaidAmt = Number(item.paidAmt || 0) + (item.attachMoneyList || []).reduce((rs, x) => (rs += Number(x.paidAmt || 0)), 0);
                    let isNotDiscountCard = item.consumeMode != 1 && item.consumeMode != 3;
                    return (
                        <TouchableOpacity
                            style={multiplyPayStyle.rightWrapperCardItem}
                            onPress={() => {
                                onSeleted(item);
                            }}
                        >
                            {/*isSelected ? require('@imgPath/pay-multiply-card-checked.png') : require('@imgPath/pay-multiply-card-normal.png')*/}

                            {/**/}
                            <ImageBackground
                                style={multiplyPayStyle.rightWrapperCardImg}
                                source={item.cardStatus == '-2' ? require('@imgPath/member_expired.png') : require('@imgPath/member_storecard.png')}
                                resizeMethod="resize"
                                resizeMode={'stretch'}
                            >
                                <View style={multiplyPayStyle.rightWrapperCardDesc}>

                                    <View style={multiplyPayStyle.rightall}>
                                        <View style={multiplyPayStyle.rightWrapperCardTop}>
                                            <View style={multiplyPayStyle.rightCardName}>
                                                <Text style={multiplyPayStyle.storeCard}>储值卡</Text>
                                                <Text ellipsizeMode={'tail'} numberOfLines={2}
                                                      style={multiplyPayStyle.storeCardname}>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{item.vipCardName}</Text>
                                            </View>

                                            <Image
                                                style={multiplyPayStyle.rightCardConsumeselectImg}
                                                resizeMethod="resize"
                                                resizeMode={'contain'}
                                                source={isSelected ? require('@imgPath/member_select.png') : require('@imgPath/member_noselect.png')}
                                            ></Image>
                                        </View>
                                        <View style={multiplyPayStyle.rightWrappercenter}>
                                            <Text style={multiplyPayStyle.rightcenterleftName}>{item.storeName}</Text>
                                            <View style={multiplyPayStyle.rightcenterInfo}>
                                                {item.cardStatus != '-2' && (
                                                    <Text
                                                        style={multiplyPayStyle.rightcenterrightName}>{item.validityShow}</Text>
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
                                                        <Text style={multiplyPayStyle.rightextension}>延期</Text>
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
                                    {/*储值卡等，至少有本金*/}
                                    {/*<View style={multiplyPayStyle.rightWrapperCardRight}>*/}
                                    {/*    <Text style={multiplyPayStyle.rightCardName} numberOfLines={1}*/}
                                    {/*          ellipsizeMode={'tail'}>*/}
                                    {/*        {item.vipCardName}*/}
                                    {/*    </Text>*/}
                                    {/*    <View style={multiplyPayStyle.rightCardMiddleInfo}>*/}
                                    {/*        <Text style={multiplyPayStyle.rightCardStoreName} numberOfLines={1}*/}
                                    {/*              ellipsizeMode={'tail'}>{item.storeName}</Text>*/}
                                    {/*        <View style={multiplyPayStyle.rightCardConsume}>*/}
                                    {/*            {isNotDiscountCard && <Text*/}
                                    {/*                style={multiplyPayStyle.rightCardConsumeMoney}>已付:{totalPaidAmt}</Text>}*/}
                                    {/*            {isSelected && isNotDiscountCard && (*/}
                                    {/*                <TouchableOpacity*/}
                                    {/*                    style={multiplyPayStyle.rightCardConsumeEditBtn}*/}
                                    {/*                    onPress={() => {*/}
                                    {/*                        onEdit(item);*/}
                                    {/*                    }}*/}
                                    {/*                >*/}
                                    {/*                    <Image*/}
                                    {/*                        style={multiplyPayStyle.rightCardConsumeEditImg}*/}
                                    {/*                        resizeMethod="resize"*/}
                                    {/*                        resizeMode={'contain'}*/}
                                    {/*                        source={require('@imgPath/pay-multiply-edit.png')}*/}
                                    {/*                    ></Image>*/}
                                    {/*                </TouchableOpacity>*/}
                                    {/*            )}*/}
                                    {/*        </View>*/}
                                    {/*    </View>*/}
                                    {/*    <View style={multiplyPayStyle.rightCardMiddleInfo}>*/}
                                    {/*        {isNotDiscountCard && <Text*/}
                                    {/*            style={multiplyPayStyle.rightCardStoreName}>本金:{item.balance}</Text>}*/}
                                    {/*        <View style={multiplyPayStyle.rightCardConsume}>*/}
                                    {/*            {attachBalance != null && (*/}
                                    {/*                <Text*/}
                                    {/*                    style={multiplyPayStyle.rightCardConsumeMoney}>赠金:{attachBalance}</Text>*/}
                                    {/*            )}*/}
                                    {/*            <View style={multiplyPayStyle.rightCardConsumeSpace}></View>*/}
                                    {/*        </View>*/}
                                    {/*    </View>*/}
                                    {/*</View>*/}

                                    {/*折扣卡*/}
                                    {/* {item.moneyInfo.length < 1 && (
                                        <View style={multiplyPayStyle.rightWrapperCardRight}>
                                            <Text style={multiplyPayStyle.rightCardName} numberOfLines={1} ellipsizeMode={'tail'}>
                                                {item.name}
                                            </Text>
                                            <View style={multiplyPayStyle.rightCardMiddleInfo}>
                                                <Text style={multiplyPayStyle.rightCardStoreName}>{item.storeName}</Text>
                                            </View>
                                            <View style={multiplyPayStyle.rightCardMiddleInfo}>
                                                <Text style={multiplyPayStyle.rightCardStoreName}>折扣:9折</Text>
                                            </View>
                                        </View>
                                    )} */}
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }
}
