//libs
import React from 'react';
import {Image, Text, TouchableOpacity, View,} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
//self
import {vipPayForStyle} from '../../styles';

export class OtherPayFor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let qcUrlPath = 'https://magi.magugi.com/publicDir/billingList?type=wxAppScanStoreQueue&storeId=' + this.props.storeId + '&companyId=' + this.props.companyId + '&billingNo=' + this.props.billingNo;
        return (
            <View style={vipPayForStyle.modalBackground}>
                <View style={vipPayForStyle.cashierBillInfoWrapper}>
                    <View style={vipPayForStyle.MemberQueryTitle}>
                        <Text style={vipPayForStyle.MemberQueryTitleText}>
                            散客支付
                        </Text>
                        <Text style={vipPayForStyle.SingleNum}>NO：{this.props.flowNumber}</Text>
                    </View>
                    <View style={vipPayForStyle.billInfoBox}>
                        <View style={vipPayForStyle.vipPayForLeft}>
                            <View style={vipPayForStyle.vipPayForLeftText}>
                                <Text style={vipPayForStyle.vipPayForText}>
                                    亲爱的顾客，
                                </Text>
                                <Text style={vipPayForStyle.vipPayForText}>
                                    您的支付订单已经生成，
                                </Text>
                                <Text style={vipPayForStyle.vipPayForText}>
                                    请使用微信扫描 支付二维码或桌号二维码进行支付！
                                </Text>
                            </View>
                            <Image source={require('@imgPath/app-desc.png')}
                                   resizeMode={'contain'}
                                   resizeMethod="resize"
                                   style={vipPayForStyle.vipPayForLImg}
                            />
                        </View>
                        <View style={vipPayForStyle.vipPayForRight}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/magugi-big-text.png')}
                                   style={vipPayForStyle.vipPayForImg}
                                   resizeMode={'contain'}
                            />
                            <View style={vipPayForStyle.vipPayQRCodeViewCenter}>
                                <QRCode value={qcUrlPath} size={160}/>
                                <View style={vipPayForStyle.vipPayForRightText}>
                                    <Text style={vipPayForStyle.vipPayForText}>
                                        小程序支付
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={vipPayForStyle.MemberQueryBtnBox}>
                        <TouchableOpacity style={vipPayForStyle.MemberQueryCancelBtn} onPress={this.props.onClose}>
                            <Text style={vipPayForStyle.MemberQueryCancelText}>关闭</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
