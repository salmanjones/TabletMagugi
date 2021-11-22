import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import {
  commonStyles,
  RechargeStoredCardStyles,
  amendItemInfoStyle,
} from 'styles';
import { showMessage } from 'utils';
import { SaleCardItem } from 'components';

export class VipcardDetailSection extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      openPrice: 0,
      depositMoney: 0,
      active: false,
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ count: nextProps.count || 1, openPrice: nextProps.data.openPrice || 0, depositMoney: nextProps.data.depositMoney || 0 });
  }

  onNumberChange = number => {
    let count = number == null ? this.state.count : this.state.count + number;
    count = count <= 1 ? 1 : count;
    this.setState({ count, active: false });
    this.props.data.openPrice = this.state.openPrice;
    this.props.setCount(count);
  };

  render() {
    const { data, acl } = this.props;
    const { count, openPrice, depositMoney, active } = this.state;
    const showCard = !!data.id;
    const cardType = data.cardType == 1 ? true : false;
    const consumeMode = data.consumeMode == 2?true :false;


    return (
      <View style={RechargeStoredCardStyles.openCardBox}>
        {showCard && (
          <View style={RechargeStoredCardStyles.openCardInfoBox}>
            <View style={RechargeStoredCardStyles.openCardInfo}>
              <View style={RechargeStoredCardStyles.openCardCategory}>
                <SaleCardItem data={data} />
              </View>
              <View style={RechargeStoredCardStyles.openCardOther}>
                <Text style={RechargeStoredCardStyles.cardOperateT}>开卡金额</Text>
                {
                  (acl && acl.ncashier_opencard_card_money && cardType) ? (
                    <TextInput
                      ref="input"
                      keyboardType={'numeric'}
                      style={amendItemInfoStyle.openCardTextInput}
                      underlineColorAndroid="transparent"
                      maxLength={6}
                      onChangeText={openPrice => {
                        let price = Number(openPrice);
                        price = Number.isNaN(price) ? 0 : Number.parseInt(price);
                        this.setState({
                          openPrice: price + '',
                        }, () => this.onNumberChange(null));
                      }}

                      value={openPrice + ''}
                    />
                  ) : (
                      <Text style={RechargeStoredCardStyles.openCardText}>
                        ￥{data.initialPrice || 0}
                      </Text>
                    )
                }
                {!cardType && !consumeMode && (
                  <View style={amendItemInfoStyle.AmendCardItemCount}>
                    <TouchableOpacity
                      disabled={!data.id}
                      style={amendItemInfoStyle.AmendCardItemCountAdd}
                      onPress={() => this.onNumberChange(-1)}
                    >
                      <Text style={amendItemInfoStyle.AmendCardItemCountMinText}>
                        -
                  </Text>
                    </TouchableOpacity>
                    <View
                      style={
                        active
                          ? amendItemInfoStyle.AmendCardItemCountTextBoxActive
                          : amendItemInfoStyle.AmendCardItemCountTextBox
                      }
                    >
                      <TextInput
                        ref="input"
                        editable={!!data.id}
                        maxLength={2}
                        keyboardType={'numeric'}
                        style={amendItemInfoStyle.AmendCardItemCountTextInput}
                        underlineColorAndroid="transparent"
                        onFocus={() => {
                          this.setState({ active: true });
                        }}
                        onChangeText={count => {
                          let number = Number(count);
                          number = Number.isNaN(number) ? 1 : number;
                          this.setState({
                            count: number,
                          });
                        }}
                        onBlur={() => this.onNumberChange(null)}
                        value={count + ''}
                      />
                    </View>
                    <TouchableOpacity
                      style={amendItemInfoStyle.AmendCardItemCountMin}
                      onPress={() => this.onNumberChange(1)}
                      disabled={!data.id}
                    >
                      <Text style={amendItemInfoStyle.AmendCardItemCountAddText}>
                        +
                  </Text>
                    </TouchableOpacity>
                  </View>
                )
                }

              </View>

            </View>
            {depositMoney != 0 && (
                <Text style={RechargeStoredCardStyles.cardOperateNoneText}>* 需支付 <Text style={RechargeStoredCardStyles.storedCardTipPrice}>工本费 {depositMoney}元</Text> *</Text>
            )}
          </View>
        )}
        {!showCard && (
          <View style={RechargeStoredCardStyles.cardOperateNoneBox}>
            <View>
              <Image resizeMethod="resize"
                source={require('@imgPath/buy-card.png')}
                style={RechargeStoredCardStyles.cardOperateNoneImg}
                resizeMode={'contain'}
              />
              <Text style={RechargeStoredCardStyles.cardOperateNoneT}>请选择您要购买的会员卡</Text>
              {/* <Text style={RechargeStoredCardStyles.cardOperateNoneT}>请选择您要充值的会员卡</Text> */}
            </View>
          </View>
        )}
      </View>
    );
  }
}
