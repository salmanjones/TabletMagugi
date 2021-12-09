import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {payForPersonStyle} from 'styles';
import {PaymentResult} from 'components';

export class QRCodePaymentNew extends React.PureComponent {
  constructor(props, context) {
    super(props);
    this.state = {
      paymentStatus: '',
    };
  }

  componentWillMount() {
    this.state.paymentStatus = this.props.paymentStatus;
  }

  onPaymentClose = () => {
    const { navigation, onClose } = this.props;
    const { paymentStatus } = this.state;
    //if (paymentStatus === PaymentResultStatus.success) {
      onClose && onClose();
      // navigation.dispatch({
      //   routeName: 'CashierActivity',
      //   type: 'backToRoute',
      // });
    //} else {
      //onClose && onClose();
    //}
  };

  render() {
    const { paymentStatus } = this.state;
    const { flowNum , title, type} = this.props;
    const showPaymentResult = paymentStatus.length > 0;
    //const hasTile=
    return (
      <View style={payForPersonStyle.modalBackground}>
        <View style={type == '1' ? [payForPersonStyle.wrapper,{width: '100%'}] : payForPersonStyle.wrapper} >
          {title && title.length &&<View style={payForPersonStyle.headText}>
            <Text style={payForPersonStyle.payText}>{title}</Text>
            <Text style={payForPersonStyle.flowNum}>{flowNum?'NO：'+flowNum:''}</Text>
          </View>}

          <View style={payForPersonStyle.billInfoOtherBox}>
            {showPaymentResult && <PaymentResult status={paymentStatus} />}
          </View>

          <View style={payForPersonStyle.MemberQueryBtnBox}>
            <TouchableOpacity
              style={payForPersonStyle.MemberQueryConfirmBtn}
              onPress={this.onPaymentClose}
            >
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
