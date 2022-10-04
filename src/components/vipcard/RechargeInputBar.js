import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {amendItemInfoStyle, RechargeStoredCardStyles} from '../../styles';

export class RechargeInputBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            amt: '',
            count: 1,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.card != this.props.card) {
            this.setState({count: nextProps.card.allowRecharge ? 1 : 0, amt: ''});
        }
    }

    onNumberChange = (number, minimal) => {
        let count = number == null ? this.state.count : this.state.count + number;
        count = count <= 1 ? 1 : count;
        let amt = count * minimal;
        this.setState({count, amt});
        this.props.onEndEditing(amt, count);
        //this.props.setCount(count);
    };

    onChangeText = text => {
        if (isNumber(text) || text === '') {
            this.setState({amt: text});
            this.props.onAmtChanged && this.props.onAmtChanged(text, 1);
        }
        ;
    };

    render() {
        const {amt} = this.state;
        const {onEndEditing, card, onAmtChanged} = this.props;
        const cardType = card.cardType;

        let content = '尊敬的顾客您好，本卡不参与充值业务';
        if (!card.allowOweMoneyRecharge) {
            content = '尊敬的顾客您好，本卡有欠款，不参与充值业务';
            return this.renderUnrechargeableInput(content)
        } else {
            if (!card.allowRecharge) return this.renderUnrechargeableInput(content);
        }

        let minimal = cardType == 1 ? card.rechargePrice : card.initialPrice;
        return cardType == 1
            ? this.renderStoreageCardInput(onEndEditing, minimal, card)
            : this.renderTimeCardInput(minimal, card);
    }

    renderUnrechargeableInput = (content) => {
        return (
            <View style={RechargeStoredCardStyles.tipTextBox}>
                <Text style={RechargeStoredCardStyles.tipText}>{content}</Text>
            </View>
        );
    };

    renderStoreageCardInput = (onEndEditing, minimal, card) => {
        return (
            <View style={RechargeStoredCardStyles.storedCardBox}>
                <View style={RechargeStoredCardStyles.storedCardInfo}>
                    <Text style={RechargeStoredCardStyles.storedCardText}>充值：</Text>

                    <View style={RechargeStoredCardStyles.storedCardInpBox}>
                        <TextInput
                            editable={card.allowRecharge}
                            onChangeText={this.onChangeText}
                            style={RechargeStoredCardStyles.storedCardInp}
                            placeholder="充值金额"
                            placeholderTextColor="#9c9c9c"
                            onEndEditing={() => onEndEditing(this.state.amt, 1)}
                            keyboardType="numeric"
                            value={this.state.amt}
                        />
                    </View>
                </View>
                <Text style={RechargeStoredCardStyles.storedCardTip}>
                    *最低充值金额<Text
                    style={RechargeStoredCardStyles.storedCardTipPrice}
                >
                    &nbsp;&nbsp;不能低于{minimal}元&nbsp;&nbsp;
                </Text>*
                </Text>
            </View>
        );
    };

    renderTimeCardInput = (minimal, card) => {
        return (
            <View style={RechargeStoredCardStyles.openCardOtheBox}>
                <View style={RechargeStoredCardStyles.openCardOtherTextBox}>
                    <Text style={RechargeStoredCardStyles.openCardText}>
                        ￥{minimal || '--'}
                    </Text>
                </View>
                <View style={amendItemInfoStyle.AmendCardItemCount}>
                    <TouchableOpacity
                        style={amendItemInfoStyle.AmendCardItemCountAdd}
                        onPress={() => this.onNumberChange(-1, minimal)}
                        disabled={!card.allowRecharge}
                    >
                        <Text style={amendItemInfoStyle.AmendCardItemCountMinText}>-</Text>
                    </TouchableOpacity>
                    <View style={amendItemInfoStyle.AmendCardItemCountTextBox}>
                        <TextInput
                            ref="input"
                            editable={false}
                            style={amendItemInfoStyle.AmendCardItemCountTextInput}
                            underlineColorAndroid="transparent"
                            value={this.state.count + ''}
                        />
                    </View>
                    <TouchableOpacity
                        style={amendItemInfoStyle.AmendCardItemCountMin}
                        onPress={() => this.onNumberChange(1, minimal)}
                        disabled={!card.allowRecharge}
                    >
                        <Text style={amendItemInfoStyle.AmendCardItemCountAddText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
