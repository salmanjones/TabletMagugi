import React from 'react';
import {Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SimulateKeyboardPay} from '../../components';
import {CheckBox} from 'react-native-elements';
import {multiplyPayStyle} from '../../styles';
import {clone} from '../../utils';
import Dash from 'react-native-dash';

/**
 * 组合支付-会员卡支付-编辑
 */
export class EditCardPay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            card: {},
            currentEditItem: null,
        };
    }

    UNSAFE_componentWillMount() {
        if (this.props.card) {
            let cardState = clone(this.props.card);
            this.setState({
                card: cardState,
                waitPayMoney: this.props.waitPayMoney,
                usedOtherPay: this.props.usedOtherPay
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.card != nextProps.card) {
            let cardState = clone(nextProps.card);
            this.setState({ card: cardState });
        }

        this.setState({
            waitPayMoney: this.props.waitPayMoney,
            usedOtherPay: this.props.usedOtherPay
        });
    }
    onCardBalanceEdit = () => {
        this.setState({
            currentEditItem: { id: -1, cardName: this.state.card.vipCardName, balance: this.state.card.balance, typeName: '本金支付' },
        });
    };

    onCardBalanceSelected = () => {
        if (this.state.card.paidAmt === null || this.state.card.paidAmt === undefined) {
            let card = { ...this.state.card, paidAmt: '' };
            this.props.onConfirm(clone(card));
        } else {
            let card = { ...this.state.card, paidAmt: null };
            this.props.onConfirm(clone(card));
        }
    };

    onCardBalanceChecked = () => {
        this.onCardBalanceSelected();
    };

    onAttachBalanceEdit(attachItem) {
        this.setState({
            currentEditItem: { id: attachItem.id, cardName: this.state.card.vipCardName, balance: attachItem.balance, typeName: attachItem.cardName },
        });
    }

    onAttachBalanceSelected(attachItem) {
        let card = clone(this.state.card);
        let newAttach = card.attachMoneyList.find((x) => x.id == attachItem.id);
        if (!newAttach) return;
        if (attachItem.paidAmt === null || attachItem.paidAmt === undefined) {
            newAttach.paidAmt = '';
            this.props.onConfirm(card);
        } else {
            newAttach.paidAmt = null;
            this.props.onConfirm(clone(card));
        }
    }

    onAttachBalanceChecked(attachItem) {
        this.onAttachBalanceSelected(attachItem);
    }

    onConfirmKeyboard(amt) {
        if (amt === null || amt === undefined || amt === '') return;

        if (this.state.currentEditItem.id == -1) {
            //本金支付
            let card
            if(this.state.waitPayMoney > 0 || this.state.usedOtherPay == 'used'){
                card = { ...this.state.card, paidAmt: amt };
            }else{
                card = { ...this.state.card, paidAmt: 0}
            }

            this.props.onConfirm(clone(card));
            this.setState({
                currentEditItem: null,
            });
        } else {
            //赠金支付
            let card = clone(this.state.card);
            let newAttach = card.attachMoneyList.find((x) => x.id == this.state.currentEditItem.id);
            if(this.state.waitPayMoney > 0 || this.state.usedOtherPay == 'used'){
                newAttach.paidAmt = amt;
            }else{
                newAttach.paidAmt = 0
            }
            this.props.onConfirm(card);
            this.setState({
                currentEditItem: null,
            });
        }
    }

    onCancelKeyboard() {
        this.setState({
            currentEditItem: null,
        });
    }

    onConfirm() {
        this.props.onConfirm(clone(this.state.card));
    }

    onCancel(){
        this.props.onCancel(this.state.card);
    }

    // 获取次卡标题
    getCardTitle(card){
        let cardTitle = '次卡'
        const cardType = card.cardType
        const consumeMode = card.consumeMode

        if(cardType == '1'){
            cardTitle = '储值卡'
            if(consumeMode == '2'){
                cardTitle = '定向卡'
            }else if(consumeMode == '1'){
                cardTitle = '折扣卡'
            }
        }else if(cardType == '2'){
            cardTitle = '次卡'

            if(consumeMode == '0'){
                cardTitle = '疗程卡'
            }else if(consumeMode == '1'){
                cardTitle = '套餐卡'
            }else if(consumeMode == '2'){
                cardTitle = '时间卡'
            }else if(consumeMode == '3'){
                cardTitle = '护理卡'
            }
        }
        return cardTitle
    }

    render() {
        const { currentEditItem } = this.state;
        const { balance, vipCardName, storeName, attachMoneyList, paidAmt } = this.state.card;
        //const { onCancel, onConfirm } = this.props;
        let attachBalance = attachMoneyList && attachMoneyList.length ? attachMoneyList.reduce((rs, x) => (rs += x.balance), 0) : null;
        let totalPaidAmt = Number(paidAmt || 0) + (attachMoneyList || []).reduce((rs, x) => (rs += Number(x.paidAmt || 0)), 0);
        return (
            <View style={multiplyPayStyle.editCardWrap}>
                {/*卡信息展示*/}
                <ImageBackground
                    style={!currentEditItem ? multiplyPayStyle.rightWrapperCardImg:multiplyPayStyle.hide}
                    source={require('@imgPath/member_storecard.png')}
                    resizeMethod="resize"
                    resizeMode={'stretch'}>
                    <View style={multiplyPayStyle.rightWrapperCardDesc}>
                        <View style={multiplyPayStyle.rightall}>
                            <View style={multiplyPayStyle.rightWrapperCardTop}>
                                <View style={multiplyPayStyle.rightCardName}>
                                    <Text style={multiplyPayStyle.storeCard}>
                                        {this.getCardTitle(this.state.card)}
                                    </Text>
                                    <Text ellipsizeMode={'tail'} numberOfLines={2} style={multiplyPayStyle.storeCardname}>&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{vipCardName}</Text>
                                </View>
                            </View>
                            <View style={multiplyPayStyle.rightWrappercenter}>
                                <Text style={multiplyPayStyle.rightcenterleftName}>{storeName}</Text>
                                <View style={multiplyPayStyle.rightcenterInfo}>
                                    {
                                        (()=>{
                                            if(attachBalance != null && attachBalance!= undefined){
                                                return (
                                                    <Text style={multiplyPayStyle.rightcenterrightName}>
                                                        赠金:{attachBalance}
                                                    </Text>
                                                )
                                            }
                                        })()
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={multiplyPayStyle.rightWrapperBottom}>
                            <Text style={multiplyPayStyle.rightBalance}>余额:¥ {balance}</Text>
                            <View style={multiplyPayStyle.rightpaid}>
                                <Text style={multiplyPayStyle.rightpaidName}>已付:{totalPaidAmt}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                {!currentEditItem && (
                    <ScrollView style={multiplyPayStyle.editCardList}>
                        <TouchableOpacity onPress={this.onCardBalanceSelected}>
                            <View style={multiplyPayStyle.bodyLeftItem}>
                                <View style={multiplyPayStyle.bodyLeftItemContent}>
                                    <View style={multiplyPayStyle.bodyLeftItemLeft}>
                                        <CheckBox
                                            iconType="materialdesignicons"
                                            checkedIcon="check-box"
                                            uncheckedIcon="check-box-outline-blank"
                                            containerStyle={multiplyPayStyle.itemLeftCheckBox}
                                            checkedColor={'#86a2f1'}
                                            uncheckedColor={'#979797'}
                                            checked={paidAmt != null && paidAmt != undefined}
                                            onPress={this.onCardBalanceChecked}
                                        />
                                        <Text style={multiplyPayStyle.editCardItemTitleGroup}>{'使用 本金支付 ' + '余额：' + balance}</Text>
                                    </View>
                                    <View style={multiplyPayStyle.bodyLeftItemRight}>
                                        {paidAmt !== undefined && paidAmt !== null && (
                                            <Text style={multiplyPayStyle.itemRightTxt}>已付:{paidAmt}元</Text>
                                        )}
                                        <TouchableOpacity onPress={this.onCardBalanceEdit} style={multiplyPayStyle.itemRightEdit}>
                                            <Image
                                                style={multiplyPayStyle.itemRightImg}
                                                resizeMethod="resize"
                                                source={require('@imgPath/edit_pencil.png')}
                                            ></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <Dash style={multiplyPayStyle.bodyLeftItemSplit} dashColor="#cbcbcb" dashLength={4} dashGap={4} dashThickness={1} />
                        </TouchableOpacity>

                        {attachMoneyList &&
                            attachMoneyList.map((attachItem, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={this.onAttachBalanceSelected.bind(this, attachItem)}>
                                        <View style={multiplyPayStyle.bodyLeftItem}>
                                            <View style={multiplyPayStyle.bodyLeftItemContent}>
                                                <View style={multiplyPayStyle.bodyLeftItemLeft}>
                                                    <CheckBox
                                                        iconType="materialdesignicons"
                                                        checkedIcon="check-box"
                                                        uncheckedIcon="check-box-outline-blank"
                                                        containerStyle={multiplyPayStyle.itemLeftCheckBox}
                                                        checkedColor={'#86a2f1'}
                                                        uncheckedColor={'#979797'}
                                                        checked={attachItem.paidAmt != null && attachItem.paidAmt != undefined}
                                                        onPress={this.onAttachBalanceChecked.bind(this, attachItem)}
                                                    />
                                                    <Text style={multiplyPayStyle.editCardItemTitleGroup}>
                                                        {'使用 ' + attachItem.cardName + '余额：' + attachItem.balance}
                                                    </Text>
                                                </View>
                                                <View style={multiplyPayStyle.bodyLeftItemRight}>
                                                    {attachItem.paidAmt !== undefined && attachItem.paidAmt !== null && (
                                                        <Text style={multiplyPayStyle.itemRightTxt}>已付:{attachItem.paidAmt}元</Text>
                                                    )}
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={this.onAttachBalanceEdit.bind(this, attachItem)}
                                                        style={multiplyPayStyle.itemRightEdit}
                                                    >
                                                        <Image
                                                            style={multiplyPayStyle.itemRightImg}
                                                            resizeMethod="resize"
                                                            source={require('@imgPath/edit_pencil.png')}
                                                        ></Image>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <Dash
                                            style={multiplyPayStyle.bodyLeftItemSplit}
                                            dashColor="#cbcbcb"
                                            dashLength={4}
                                            dashGap={4}
                                            dashThickness={1}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        <View style={multiplyPayStyle.editCardFooter}>
                            <TouchableOpacity style={multiplyPayStyle.canelBtn} onPress={this.onCancel.bind(this)}>
                                <Text style={multiplyPayStyle.btnText}>返回</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={multiplyPayStyle.confirmBtn} onPress={this.onConfirm.bind(this)}>
                                <Text style={multiplyPayStyle.btnText}>确认</Text>
                            </TouchableOpacity> */}
                        </View>
                    </ScrollView>
                )}

                {
                    /*卡编辑键盘*/
                    currentEditItem && (
                        <ScrollView style={multiplyPayStyle.keyBoardScroll}>
                            <View style={multiplyPayStyle.keyBoardWrap}>
                                <Text style={multiplyPayStyle.keyBoardTopTxt} ellipsizeMode={'tail'} numberOfLines={1}>
                                    {currentEditItem.cardName}
                                </Text>
                                <Text style={multiplyPayStyle.keyBoardTopTxt}>
                                    {'使用 ' + currentEditItem.typeName + '，余额:¥' + currentEditItem.balance + '元'}
                                </Text>
                                <SimulateKeyboardPay
                                    showInput={true}
                                    showCanel={true}
                                    onCanel={this.onCancelKeyboard.bind(this)}
                                    onConfirm={this.onConfirmKeyboard.bind(this)}
                                />
                            </View>
                        </ScrollView>
                    )
                }
            </View>
        );
    }
}
