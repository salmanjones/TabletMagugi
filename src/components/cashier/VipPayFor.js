//libs
import React from 'react';
import {Image, Text, TouchableOpacity, View,} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
//self
import {vipPayForStyle} from 'styles';

export class VipPayFor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={vipPayForStyle.modalBackground}>
                <View style={vipPayForStyle.cashierBillInfoWrapper}>
                    <View style={vipPayForStyle.MemberQueryTitle}>
                        <Text style={vipPayForStyle.MemberQueryTitleText}>
                            会员卡支付
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
                                    您的订单已经存入美聚集APP，
                                </Text>
                                <Text style={vipPayForStyle.vipPayForText}>
                                    请使用APP或小程序完成支付！
                                </Text>
                            </View>
                            <Image source={require('@imgPath/app-desc.png')}
                                   resizeMode={'contain'}
                                   resizeMethod="resize"
                                   style={vipPayForStyle.vipPayForLImg}/>
                        </View>
                        <View style={vipPayForStyle.vipPayForRight}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/magugi-big-text.png')}
                                   style={vipPayForStyle.vipPayForImg}
                                   resizeMode={'contain'}
                            />
                            <View style={vipPayForStyle.QRCodeBox}>
                                <View style={vipPayForStyle.vipPayQRCodeViewCenter}>
                                    <QRCode value={`https://sj.qq.com/myapp/detail.htm?apkName=com.magugi.enterprise`}
                                        size={160}/>
                                    <View style={vipPayForStyle.vipPayForRightText}>
                                        <Text style={vipPayForStyle.vipPayForText}>
                                            下载APP
                                        </Text>
                                    </View>
                                </View>
                                <View style={vipPayForStyle.vipPayQRCodeViewCenter}>
                                    <QRCode value={`https://op.magugi.com/publicDir/billingList`} size={160}/>
                                    <View style={vipPayForStyle.vipPayForRightText}>
                                        <Text style={vipPayForStyle.vipPayForText}>
                                            小程序支付
                                        </Text>
                                    </View>
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
