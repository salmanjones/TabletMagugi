import React from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { payForPersonStyle, openCardAccountStyle } from '../styles';
import { fetchPaymentResult } from 'services';
import {
  showMessage,
  displayError,
  PaymentResultStatus,
  resetNavigationTo,
} from 'utils';
import { PaymentResult, ModalLoadingIndicator, MemberInfoNew } from 'components';

const MAX_RETRY_COUNT = 100;

export class QRCodePayment extends React.PureComponent {
  constructor(props, context) {
    super(props);
    this.state = {
      paymentStatus: '',
    };

    this.timer = 0;
    this.retryCount = 0;
  }

  componentDidMount() {
    this.timer = setInterval(this.checkPaymentResult, 2000);
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
    this.setState({ paymentStatus: result });
  };

  checkPaymentResult = () => {
    const { tradeNo, payType } = this.props;
    let that = this;
    fetchPaymentResult(tradeNo, payType)
      .then(res => {
        that.setPaymentResult(PaymentResultStatus.success);
      })
      .catch(err => {
        const { code, data } = err;
        let retry = false;
        if (code === '9002') {
          if (data.buildStat || data.executeStat == 'close') {
            that.setPaymentResult(PaymentResultStatus.error);
          } else if (data.executeStat == 'thirdPayEnd') {
            that.setPaymentResult(PaymentResultStatus.partial);
          } else {
            retry = true;
          }
        } else if (code === '9004') {
          that.setPaymentResult(PaymentResultStatus.error);
        }

        if (retry) {
          if (that.retryCount >= MAX_RETRY_COUNT) {
            that.setPaymentResult(PaymentResultStatus.timeout);
          } else {
            that.retryCount++;
          }
        }
      });
  };

  onPaymentClose = () => {
    const { model, navigation, onClose } = this.props;
    const { paymentStatus } = this.state;
    if (paymentStatus === PaymentResultStatus.success) {
      onClose && onClose();
      navigation.dispatch({
        routeName: 'CashierActivity',
        type: 'backToRoute',
      });
    } else if (!paymentStatus) {
      Alert.alert(
        '你确定要关闭支付界面？',
        '注意顾客在买单时，请不要关闭该页面',
        [
          {
            text: '确定',
            onPress: () => {
              onClose && onClose();
            },
          },
          {
            text: '取消',
          },
        ]
      );
    } else {
      onClose && onClose();
    }
  };

  render() {
    const { member, totalPrice, qrUrl } = this.props;
    const { paymentStatus } = this.state;
    const showMember = !!member;
    const showPaymentResult = paymentStatus.length > 0;

    return (
      <View style={{ height: '90%' }}>
        <View style={payForPersonStyle.billInfoOtherBox}>
          {!showPaymentResult && (
            <View style={payForPersonStyle.WeChatPayFor}>
              {showMember && (
                <View style={payForPersonStyle.WeChatPayPerson}>
                  <MemberInfoNew data={member} />
                </View>
              )}
              <View style={payForPersonStyle.WeChatForRightBox}>
                <View>
                  <View style={payForPersonStyle.WeChatPayForTitle}>
                    <Text style={payForPersonStyle.WeChatPayForText}>
                      支付金额：{totalPrice}元
                    </Text>
                  </View>
                  <View style={payForPersonStyle.WeChatForQRcodeBox}>
                    <QRCode value={qrUrl} size={200} />
                  </View>
                  <Text style={payForPersonStyle.WeChatForQRcodeT}>
                    扫二维码支付
                  </Text>
                </View>
              </View>
            </View>
          )}

          {showPaymentResult && <PaymentResult status={paymentStatus} />}
        </View>

        <View style={openCardAccountStyle.MemberQueryBtnBox}>
          <TouchableOpacity
            style={openCardAccountStyle.MemberQueryConfirmBtn}
            onPress={this.onPaymentClose}
          >
            <Text style={openCardAccountStyle.MemberQueryConfirmText}>
              关闭
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
