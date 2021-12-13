import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { priceIndexStyle } from 'styles';

export class PriceListInfoRight extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity onPress={this.props.route.params?this.props.route.params.toggleModal:null} style={priceIndexStyle.catalogViewBox}>
                <View style={priceIndexStyle.catalogView}>
                    <Image resizeMethod="resize"  source={require('@imgPath/p-catalog-img.png')} style={priceIndexStyle.catalogImg} />
                    <Text style={priceIndexStyle.catalogText}>目录</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
