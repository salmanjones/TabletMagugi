import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { openCardAccountStyle } from 'styles';

export class PaymentTypeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      select: 'wx',
    };
  }

  componentDidMount() {
    const { onSelected } = this.props;
    onSelected && onSelected(this.state.select);
  }

  onSelected = type => {
    this.setState({ select: type });
    const { onSelected } = this.props;
    onSelected && onSelected(type);
  };

  render() {
    const { select } = this.state;
    return (
      <View style={openCardAccountStyle.accountBox}>
        <TouchableOpacity
          style={
            select === 'wx'
              ? openCardAccountStyle.accountListActive
              : openCardAccountStyle.accountList
          }
          onPress={() => {
            this.onSelected('wx');
          }}
        >
          <View style={openCardAccountStyle.accountListBox}>
            <Image resizeMethod="resize"
              source={require('@imgPath/WeChat.png')}
              style={openCardAccountStyle.accountListImg}
            />
            <Text style={openCardAccountStyle.accountListText}>微信支付</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            select === 'ali'
              ? openCardAccountStyle.accountListActive
              : openCardAccountStyle.accountList
          }
          onPress={() => {
            this.onSelected('ali');
          }}
        >
          <View style={openCardAccountStyle.accountListBox}>
            <Image resizeMethod="resize"
              source={require('@imgPath/alipay.png')}
              style={openCardAccountStyle.accountListImg}
            />
            <Text style={openCardAccountStyle.accountListText}>支付宝支付</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
