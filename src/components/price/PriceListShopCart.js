import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableHighlight, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { priceIndexStyle } from '../../styles';

export class PriceListShopCart extends PureComponent {
    render() {
        const { display, data, onChangeCount, onClear, onSettle } = this.props;
        const totalPrice = (data || []).reduce((result, item) => result + item.servicePrice * item.count, 0);
        return (
            <View style={[priceIndexStyle.gmTrolleyBox, { display: display ? 'flex' : 'none' }]}>
                <View style={priceIndexStyle.gmTrolleyBoxT}>
                    {data.length ? (
                        <FlatList
                            data={data}
                            keyExtractor={item => item.serviceId}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={priceIndexStyle.jmTrolleyLi} key={item.serviceId}>
                                        <View style={priceIndexStyle.jmTrolleyLiL}>
                                            <Image resizeMethod="resize"
                                                source={item.servicePic}
                                                style={[priceIndexStyle.jmTrolleyLiLImg, { resizeMode: 'cover' }]}
                                            />
                                            <View style={priceIndexStyle.jmTrolleyLiLRight}>
                                                <Text style={priceIndexStyle.jmTrolleyLiLText} numberOfLines={2}>
                                                    {item.serviceName}
                                                </Text>
                                                <Text style={priceIndexStyle.jmTrolleyPrice}>￥{item.servicePrice}</Text>
                                            </View>
                                        </View>
                                        <View style={priceIndexStyle.gmTrolleyLiR}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    onChangeCount(index, -1);
                                                }}
                                                underlayColor="white"
                                                style={priceIndexStyle.jmTrolleyLiRBtnL}
                                            >
                                                <Text style={priceIndexStyle.jmTrolleyLiRBtnText}>-</Text>
                                            </TouchableOpacity>
                                            <TextInput
                                                keyboardType={'numeric'}
                                                style={priceIndexStyle.openCardTextInput}
                                                underlineColorAndroid="transparent"
                                                maxLength={6}
                                                editable={false}
                                                value={item.count.toString()}
                                                textAlign={'center'}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    onChangeCount(index, 1);
                                                }}
                                                underlayColor="white"
                                                style={priceIndexStyle.jmTrolleyLiRBtnR}
                                            >
                                                <Text style={priceIndexStyle.jmTrolleyLiRBtnText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    ) : (
                        <View style={priceIndexStyle.nullBox}>
                            <Image resizeMethod="resize"
                                source={require('@imgPath/none-type.png')}
                                style={[priceIndexStyle.nullImg, { resizeMode: 'contain' }]}
                            />
                            <Text style={priceIndexStyle.nullText}>还未添加内容</Text>
                        </View>
                    )}
                </View>

                <View style={priceIndexStyle.gmTrolleyBoxB}>
                    <Text style={priceIndexStyle.totalText}>总计：￥{totalPrice}</Text>
                    <View style={priceIndexStyle.btmRight}>
                        <TouchableHighlight onPress={onClear} underlayColor="white" style={priceIndexStyle.deletrBox}>
                            <View style={priceIndexStyle.deletrBox}>
                                <Image resizeMethod="resize"
                                    source={require('@imgPath/delete-icon-red.png')}
                                    style={[priceIndexStyle.delelteImg, { resizeMode: 'contain' }]}
                                />
                                <Text style={priceIndexStyle.deleteText}>清空</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={onSettle} underlayColor="white" style={priceIndexStyle.gmBtnBox}>
                            <Text style={priceIndexStyle.btnText}>结算</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
