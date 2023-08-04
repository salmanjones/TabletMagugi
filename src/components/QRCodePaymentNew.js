import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {payForPersonStyle} from '../styles';
import {PaymentResult} from '../components';
import {getPayByCards} from "../services/reserve";

export class QRCodePaymentNew extends React.PureComponent {
    constructor(props, context) {
        super(props);
        this.state = {
            paymentStatus: props.paymentStatus,
            cardList: []
        };
    }

    componentDidMount() {
        const paymentStatus = this.props.paymentStatus
        this.setState({
            paymentStatus: paymentStatus
        }, ()=>{
            if(paymentStatus == 'success'){
                const billingNo = this.props.billingNo
                console.log("billingNo", JSON.stringify(this.props))
                if(billingNo && billingNo.length > 0){
                    getPayByCards({billingNo: billingNo}).then(backData=>{
                        const {data, code} = backData
                        if(code == '6000'){
                            this.setState({
                                cardList: data || []
                            })
                        }else{
                            console.log("获取消费的会员卡失败")
                        }
                    }).catch(e=>{
                        console.log("获取消费的会员卡失败")
                    })
                }
            }
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    onPaymentClose = () => {
        const {onClose} = this.props;
        onClose && onClose();
    };

    render() {
        const {paymentStatus} = this.state;
        const {flowNum, title, type} = this.props;
        const showPaymentResult = paymentStatus.length > 0;
        //const hasTile=
        return (
            <View style={payForPersonStyle.modalBackground}>
                <View style={type == '1' ? [payForPersonStyle.wrapper, {width: '100%'}] : payForPersonStyle.wrapper}>
                    {title && title.length && <View style={payForPersonStyle.headText}>
                        <Text style={payForPersonStyle.payText}>{title}</Text>
                        <Text style={payForPersonStyle.flowNum}>{flowNum ? 'NO：' + flowNum : ''}</Text>
                    </View>}

                    <View style={payForPersonStyle.billInfoOtherBox}>
                        {showPaymentResult && <PaymentResult status={paymentStatus} cardList={this.state.cardList}/>}
                    </View>

                    <View style={payForPersonStyle.MemberQueryBtnBox}>
                        <TouchableOpacity
                            style={payForPersonStyle.MemberQueryConfirmBtn}
                            onPress={this.onPaymentClose}>
                            <Text style={payForPersonStyle.MemberQueryConfirmText}>
                                关闭
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}
