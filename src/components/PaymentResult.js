import React from 'react';
import { Image, View } from 'react-native';
import { PaymentResultStatus } from '../utils';
import { payForStyle } from '../styles';

export const PaymentResult = ({ status }) => (
  <View style={payForStyle.payForState}>
    {status == PaymentResultStatus.success && (
      <Image resizeMethod="resize"
        source={require('@imgPath/pay-finish.png')}
        style={payForStyle.payStateImgOther}
      />
    )}

    {(status == PaymentResultStatus.error ||status == PaymentResultStatus.timeout)
     && (
        <Image resizeMethod="resize"
          source={require('@imgPath/pay-defeated.png')}
          style={payForStyle.payStateImgOther}
        />
      )}

    {status === PaymentResultStatus.partial && (
      <Image resizeMethod="resize"
        source={require('@imgPath/pay-unusual.png')}
        style={payForStyle.payStateImg}
      />
    )}
  </View>
);
