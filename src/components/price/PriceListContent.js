import React, { PureComponent } from 'react';

import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { priceIndexStyle } from 'styles';

export class PriceListContent extends PureComponent {
    render() {
        const { display, data, onAddToShopCart } = this.props;
        return (
            <View style={[priceIndexStyle.jmTrolleyBox, { display: display ? 'flex' : 'none' }]}>
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
                                        <Text style={priceIndexStyle.jmTrolleyLiLText} numberOfLines={2} ellipsizeMode={'tail'}>
                                            {item.serviceName}
                                        </Text>
                                        <Text style={priceIndexStyle.jmTrolleyPrice}>￥{item.servicePrice}</Text>
                                    </View>
                                </View>
                                {item.isStock == '0' ? (
                                    <View style={priceIndexStyle.jmTrolleyLiRO}>
                                        <Text style={priceIndexStyle.jmTrolleyLiRText}>库存不足</Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => onAddToShopCart(item)}
                                        underlayColor="white"
                                        style={priceIndexStyle.jmTrolleyLiR}
                                    >
                                        <Image resizeMethod="resize"
                                            source={require('@imgPath/p-jm-operate-btn.png')}
                                            style={[priceIndexStyle.jmOperateBtn, { resizeMode: 'contain' }]}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}
