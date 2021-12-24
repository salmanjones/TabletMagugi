import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image,ImageBackground } from 'react-native';
import { multiplyPayStyle } from '../../styles';

export class CouponList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data,selectedCoupons } = this.props;
        const {onSeleted} =this.props;
        return (
            <FlatList
                style={multiplyPayStyle.rightWrapperCoupon}
                data={data}
                extraData={selectedCoupons}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                    let isSelected= selectedCoupons.indexOf(item)!=-1;
                    return (
                        <TouchableOpacity style={multiplyPayStyle.rightWrapperCouponItem} onPress={()=>{onSeleted(item)}}>
                            <ImageBackground
                                style={multiplyPayStyle.rightWrapperCouponImg}
                                source={
                                    isSelected
                                        ? require('@imgPath/pay-multiply-coupon-checked.png')
                                        : require('@imgPath/pay-multiply-coupon-normal.png')
                                }
                                resizeMethod="resize"
                                resizeMode={'stretch'}
                            >
                                <View style={multiplyPayStyle.rightWrapperCouponDesc}>
                                    <View style={multiplyPayStyle.rightWrapperCouponDiscount}>
                                        <Text style={multiplyPayStyle.rightWrapperCouponPrefix}>¥</Text>
                                        <Text style={multiplyPayStyle.rightWrapperCouponValue}>{item.couponPrice}</Text>
                                    </View>
                                    <View style={multiplyPayStyle.rightWrapperCouponWhite}></View>
                                    <Text style={multiplyPayStyle.rightWrapperCouponName} ellipsizeMode={'tail'} numberOfLines={2}>
                                        {item.name}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                }}
            />
        );
    }
}
