import React, {PureComponent} from 'react';
import {Text, View,} from 'react-native';
import {RechargeStoredCardStyles,} from '../../styles';
import {CardItem} from '../../components';

export class CardDetails extends PureComponent {
    render() {
        const {data} = this.props;
        let attachMoney = 0;
        if (data.attachMoneyList) {
            attachMoney = data.attachMoneyList.reduce(
                (pre, cur) => pre + cur.balance || 0,
                0
            )
        }

        return (
            <View style={RechargeStoredCardStyles.cardInfo}>
                <CardItem data={data} onSelected={() => {}}/>
                <View style={RechargeStoredCardStyles.cardOther}>
                    <View style={RechargeStoredCardStyles.cardGivePrice}>
                        <Text style={RechargeStoredCardStyles.cardGivePriceName}>
                            赠金余额：
                        </Text>
                        <Text style={RechargeStoredCardStyles.cardGivePriceNum}>
                            ¥{attachMoney}
                        </Text>
                    </View>
                    <View style={RechargeStoredCardStyles.cardBalancePrice}>
                        <Text style={RechargeStoredCardStyles.cardBalancePriceName}>
                            欠款：
                        </Text>
                        <Text style={RechargeStoredCardStyles.cardBalancePriceNum}>
                            ¥{data.oweMoney}
                        </Text>
                    </View>
                    <Text style={RechargeStoredCardStyles.cardDate}>
                        有效期至：
                        {
                            data.validity ? (data.validity.length > 9 ? data.validity.substring(0, 10) : '无期限')
                                          : '无期限'
                        }
                    </Text>
                </View>
            </View>
        );
    }
}
