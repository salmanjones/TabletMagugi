import React from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {payWxAliForCashier} from '../styles';
import {fetchPaymentResult} from '../services';
import {PaymentResultStatus} from '../utils';
import {PaymentResult} from '../components';

const MAX_RETRY_COUNT = 60;

export class QRCodePaymentCashier extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            paymentStatus: '',
        };

        this.timer = 0;
        this.retryCount = 0;
    }

    componentDidMount() {
        this.timer = setInterval(this.checkPaymentResult.bind(this), 2000);
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    clearTimer = () => {
        this.timer && clearInterval(this.timer);
    };

    setPaymentResult = result => {
        this.retryCount = 0;
        this.clearTimer();
        this.setState({paymentStatus: result});
    };

    checkPaymentResult = () => {
        const {tradeNo, payType} = this.props;
        let that = this;
        fetchPaymentResult(tradeNo, payType).then(res => {
            const {code, data} = res;
            // console.error("######################################", JSON.stringify(res))
            let retry = false;
            if (code === '6000') {
                that.setPaymentResult(PaymentResultStatus.success);
            }else if (code === '9002') {
                if (data.buildStat || data.executeStat == 'close') {
                    that.setPaymentResult(PaymentResultStatus.error);
                } else if (data.executeStat == 'thirdPayEnd') {
                    that.setPaymentResult(PaymentResultStatus.partial);
                } else {
                    retry = true;
                }
            } else if (code === '9004') {
                that.setPaymentResult(PaymentResultStatus.error);
            } else if (that.retryCount >= MAX_RETRY_COUNT) {
                that.setPaymentResult(PaymentResultStatus.timeout);
            }

            if (retry) {
                if (that.retryCount >= MAX_RETRY_COUNT) {
                    that.setPaymentResult(PaymentResultStatus.timeout);
                } else {
                    that.retryCount++;
                }
            }
        }).catch(err => {
            // console.error("=================================", err)
            that.setPaymentResult(PaymentResultStatus.error);
        });
    };

    toClosePay() {
        const {paymentStatus} = this.state;
        if (paymentStatus === PaymentResultStatus.success) {
            this.props.onClosePay(0);
        } else {
            Alert.alert(
                '你确定要关闭支付界面？',
                '注意顾客在买单时，请不要关闭该页面',
                [
                    {
                        text: '取消',
                    },
                    {
                        text: '确定',
                        onPress: () => {
                            this.props.onClosePay(1);
                        },
                    },
                ]
            );
        }
    }

    render() {
        const {totalPrice, qrUrl, visible, flowNumber, payType} = this.props;
        const {paymentStatus} = this.state;
        const showPaymentResult = paymentStatus.length > 0;

        return (
            <View style={payWxAliForCashier.modalBackground}>
                <View style={payWxAliForCashier.cashierBillInfoWrapper}>
                    <View style={payWxAliForCashier.MemberQueryTitle}>
                        <Text style={payWxAliForCashier.MemberQueryTitleText}>
                            {
                                'wx' == payType ? '微信支付' : '支付宝支付'
                            }
                        </Text>
                        <Text style={payWxAliForCashier.SingleNum}>NO：{flowNumber}</Text>
                    </View>
                    <View style={payWxAliForCashier.billInfoBox}>
                        {!showPaymentResult &&
                            (

                                <View style={payWxAliForCashier.WeChatForRightBox}>
                                    <View style={payWxAliForCashier.WeChatPayForTitle}>
                                        <Text style={payWxAliForCashier.WeChatPayForText}>
                                            支付金额：{totalPrice}元
                                        </Text>
                                    </View>
                                    <View style={payWxAliForCashier.WeChatForQRcodeBox}>
                                        <QRCode value={qrUrl} size={228}/>
                                    </View>
                                </View>

                            )

                        }
                        {showPaymentResult && <PaymentResult status={paymentStatus}/>}
                    </View>
                    <View style={payWxAliForCashier.MemberQueryBtnBox}>
                        <TouchableOpacity style={payWxAliForCashier.MemberQueryCancelBtn}
                                          onPress={this.toClosePay.bind(this)}>
                            <Text style={payWxAliForCashier.MemberQueryCancelText}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
