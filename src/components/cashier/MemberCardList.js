import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { multiplyPayStyle } from '../../styles';

export class MemberCardList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data, selectedCardsId } = this.props;
        const { onSeleted, onEdit } = this.props;
        return (
            <FlatList
                style={multiplyPayStyle.rightWrapperCard}
                data={data}
                extraData={selectedCardsId}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    let isSelected = selectedCardsId.findIndex((x) => x == item.id) != -1;
                    let attachBalance = (item.attachMoneyList && item.attachMoneyList.length)?item.attachMoneyList.reduce((rs, x) => (rs += x.balance), 0):null;
                    let totalPaidAmt = Number(item.paidAmt || 0) + (item.attachMoneyList || []).reduce((rs, x) => (rs += Number(x.paidAmt || 0)), 0);
                    let isNotDiscountCard=item.consumeMode!=1 && item.consumeMode!=3;
                    return (
                        <TouchableOpacity
                            style={multiplyPayStyle.rightWrapperCardItem}
                            onPress={() => {
                                onSeleted(item);
                            }}
                        >
                            <ImageBackground
                                style={multiplyPayStyle.rightWrapperCardImg}
                                source={
                                    isSelected ? require('@imgPath/pay-multiply-card-checked.png') : require('@imgPath/pay-multiply-card-normal.png')
                                }
                                resizeMethod="resize"
                                resizeMode={'stretch'}
                            >
                                <View style={multiplyPayStyle.rightWrapperCardDesc}>
                                    <Image
                                        style={multiplyPayStyle.rightWrapperCardLeft}
                                        resizeMethod="resize"
                                        source={require('@imgPath/logo_gray.png')}
                                    ></Image>
                                    {/*储值卡等，至少有本金*/}
                                    <View style={multiplyPayStyle.rightWrapperCardRight}>
                                        <Text style={multiplyPayStyle.rightCardName} numberOfLines={1} ellipsizeMode={'tail'}>
                                            {item.vipCardName}
                                        </Text>
                                        <View style={multiplyPayStyle.rightCardMiddleInfo}>
                                            <Text style={multiplyPayStyle.rightCardStoreName} numberOfLines={1} ellipsizeMode={'tail'}>{item.storeName}</Text>
                                            <View style={multiplyPayStyle.rightCardConsume}>
                                                {isNotDiscountCard && <Text style={multiplyPayStyle.rightCardConsumeMoney}>已付:{totalPaidAmt}</Text>}
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
                                                            source={require('@imgPath/pay-multiply-edit.png')}
                                                        ></Image>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </View>
                                        <View style={multiplyPayStyle.rightCardMiddleInfo}>
                                            {isNotDiscountCard &&<Text style={multiplyPayStyle.rightCardStoreName}>本金:{item.balance}</Text>}
                                            <View style={multiplyPayStyle.rightCardConsume}>
                                                {attachBalance !=null && (
                                                    <Text style={multiplyPayStyle.rightCardConsumeMoney}>赠金:{attachBalance}</Text>
                                                )}
                                                <View style={multiplyPayStyle.rightCardConsumeSpace}></View>
                                            </View>
                                        </View>
                                    </View>

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
