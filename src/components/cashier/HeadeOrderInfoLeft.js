import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import {commonStyles} from '../../styles';
import {AppNavigate} from "../../navigators";

class HeadeOrderInfoLeftCmpt extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let hiddenOrderInfo = this.props.hiddenOrderInfo || false;
        let hiddenPriceOrder = this.props.hiddenPriceOrder || false;
        let hairIcon = require('@imgPath/order-genre-jf.png');
        let manicureIcon = require('@imgPath/order-genre-mj.png');
        let beautifyIcon = require('@imgPath/order-genre-mr.png');
        let broderRight = require('@imgPath/border-right.png');
        let showModifyBill = null;
        let orderInfoData = this.props.orderInfo.orderData;
        let {router} = this.props

        if (this.props.navigation) {
            showModifyBill = router.params.showModifyBill;
            orderInfoData = router.params.orderInfoLeftData || this.props.orderInfo.orderData;

            if (this.props.orderInfo.orderData && this.props.orderInfo.orderData.flowNumber) {
                orderInfoData.flowNumber = this.props.orderInfo.orderData.flowNumber;
            }
        }

        var flowNumber = orderInfoData.flowNumber;
        if (flowNumber == '') {
            flowNumber = this.props.orderInfo.orderData.flowNumber;
        }

        orderInfoData.flowNumber = flowNumber;

        let iconShow = hairIcon;
        if (router.params.operatorText == '美容') {
            iconShow = beautifyIcon;
        } else if (router.params.operatorText == '美甲') {
            iconShow = manicureIcon;
        }

        return (
            <View style={commonStyles.headOrderBox}>
                <TouchableOpacity onPress={this.props.backPage}
                                  underlayColor="transparent"
                                  style={commonStyles.back}
                                  hitSlop={{top: 40, left: 40, bottom: 40, right: 0}}>
                    <Image resizeMethod="resize" source={require('@imgPath/back.png')} style={commonStyles.backImg}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={showModifyBill}
                    underlayColor="transparent"
                    style={hiddenOrderInfo ? commonStyles.hidden : commonStyles.headOrderInfoBox}>
                    <View style={commonStyles.headOrderInfoBox}>
                        <Image resizeMethod="resize" source={iconShow} style={commonStyles.headOrderGenre}
                               resizeMode={'contain'}/>
                        <Image resizeMethod="resize" source={broderRight} style={commonStyles.borderRightImg}
                               resizeMode={'contain'}/>
                        <View style={commonStyles.headOrderInfo}>
                            <Text style={commonStyles.headOrderNumber} numberOfLines={1}
                                  ellipsizeMode={'tail'}>NO：{orderInfoData.flowNumber}</Text>
                            <View style={commonStyles.headOrderOther}>
                                <Text style={commonStyles.headGuestNumber}>{orderInfoData.isOldCustomer == 1 ? '老客' : '新客'}：{orderInfoData.customerNumber}</Text>
                                <ImageBackground
                                    style={orderInfoData.handNumber ? commonStyles.headOrderHand : commonStyles.hidden}
                                    source={require('@imgPath/hand-FC9A1F.png')}>
                                    <View style={commonStyles.headOrderHandBox}><Text
                                        style={commonStyles.headOrderHandText}>{orderInfoData.handNumber}</Text></View>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._onPressButton}
                    underlayColor="transparent"
                    style={hiddenOrderInfo || hiddenPriceOrder ? commonStyles.hidden : commonStyles.headOrderPriceLi}>
                    <View style={commonStyles.headOrderPriceLi}>
                        <Image resizeMethod="resize" source={require('@imgPath/price-list.png')}
                               style={commonStyles.headOrderPriceLiImg}/>
                        <Text style={commonStyles.headOrderPriceLiText}>价目单</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

//mapping props
const mapStateToProps = (state) => {
    return {
        orderInfo: state.billingOrder
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        backPage: () => {
            AppNavigate.goBack()
        },
    };
};

export const HeadeOrderInfoLeft = connect(mapStateToProps, mapDispatchToProps)(
    HeadeOrderInfoLeftCmpt
);
