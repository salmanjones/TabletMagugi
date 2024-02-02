import React from 'react';
import {Image, Text, TextInput, TouchableOpacity, View,} from 'react-native';

import {amendItemInfoStyle, RechargeStoredCardStyles,} from '../../styles';
import {SaleCardItem} from '../../components';

export class VipcardDetailSection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            openPrice: 0,
            depositMoney: 0,
            active: false,
            smsType: '0', // 0正常获取，1:正在倒计时
            smsCountDown: 60, // 倒计时总时长
        }
        this.smsTimer = null
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            count: nextProps.count || 1,
            openPrice: nextProps.data.openPrice || 0,
            depositMoney: nextProps.data.depositMoney || 0
        });
    }

    onNumberChange = number => {
        let count = number == null ? this.state.count : this.state.count + number;
        count = count <= 1 ? 1 : count;
        this.setState({count, active: false});
        this.props.data.openPrice = this.state.openPrice;
        this.props.setCount(count);
    };

    // 开始倒计时
    getSmsCode = ()=>{
        // 清空缓存的timerId
        if(this.smsTimer){
            clearInterval(this.smsTimer)
            this.smsTimer = null
        }

        // 开启倒计时
        this.setState({
            smsType: '1',
        })

        // 开始倒计时
        let smsCountDown = 60
        this.smsTimer = setInterval(()=>{
            smsCountDown = smsCountDown - 1
            if(smsCountDown < 1){ // 为0倒计时结束
                this.smsTimer && clearInterval(this.smsTimer)
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        smsType: '0',
                        smsCountDown: 60
                    }
                })
            }else{
                this.setState((prevState)=>{
                    return {
                        ...prevState,
                        smsCountDown
                    }
                })
            }
        }, 1000)

        // 获取验证码
        this.props.getSmsCode()
    }

    componentWillUnmount() {
        // 清除计时器
        if(this.smsTimer){
            clearInterval(this.smsTimer)
            this.smsTimer = null
        }
    }

    render() {
        const {data, acl, password, confirmPassWord, portrait, smsCode, changeSmsCode, enableCheckSms, onShowSimKeyboard, showSimKeyboard} = this.props;
        const {count, openPrice, depositMoney, active, smsType, smsCountDown} = this.state;
        const showCard = !!data.id;
        const cardType = data.cardType == 1 ? true : false;
        const consumeMode = data.consumeMode == 2 ? true : false;
        // 处理验证码展示
        let smsTips = '获取验证码'
        if(smsType == '0'){
            smsTips = '获取验证码'
        }else if(smsType == '1'){
            smsTips = '重新获取('+smsCountDown+')'
        }

        if(showCard){
            return (
                <View style={RechargeStoredCardStyles.openCardBox}>
                    <View style={RechargeStoredCardStyles.openCardInfoBox}>
                        {/*基本信息*/}
                        <View style={RechargeStoredCardStyles.openCardInfo}>
                            {/*选择的会员卡*/}
                            <SaleCardItem data={data}/>
                            {/*会员卡附加信息*/}
                            <View style={RechargeStoredCardStyles.openCardOther}>
                                {/*总金额*/}
                                <Text style={RechargeStoredCardStyles.cardOperateT}>开卡金额</Text>
                                {
                                    (acl && acl.ncashier_opencard_card_money && cardType) ? (
                                        <TextInput
                                            ref="input"
                                            keyboardType={'numeric'}
                                            style={amendItemInfoStyle.saleCardTextInput}
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
                                {/*加减次数*/}
                                {!cardType && !consumeMode && (
                                    <View style={amendItemInfoStyle.AmendCardItemCount}>
                                        <TouchableOpacity
                                            disabled={!data.id}
                                            style={amendItemInfoStyle.AmendCardItemCountAdd}
                                            onPress={() => this.onNumberChange(-1)}>
                                            <Text style={amendItemInfoStyle.AmendCardItemCountMinText}>
                                                -
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={ active ? amendItemInfoStyle.AmendCardItemCountTextBoxActive : amendItemInfoStyle.AmendCardItemCountTextBox}>
                                            <TextInput
                                                ref="input"
                                                editable={!!data.id}
                                                maxLength={2}
                                                keyboardType={'numeric'}
                                                style={amendItemInfoStyle.AmendCardItemCountTextInput}
                                                underlineColorAndroid="transparent"
                                                onFocus={() => {
                                                    this.setState({active: true});
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
                                            disabled={!data.id}>
                                            <Text style={amendItemInfoStyle.AmendCardItemCountAddText}>
                                                +
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                                }

                            </View>
                        </View>
                        {/*附加信息*/}
                        {depositMoney != 0 && (
                            <View style={RechargeStoredCardStyles.openCardExtInfo}>
                                <Text style={RechargeStoredCardStyles.cardOperateNoneText}>* 需支付</Text>
                                <Text style={RechargeStoredCardStyles.storedCardTipPrice}>工本费 {depositMoney}元</Text>
                            </View>
                        )}
                        {
                            showSimKeyboard && (
                                <View style={RechargeStoredCardStyles.openCardPwdInfo}>
                                    <View style={RechargeStoredCardStyles.cardPwdBox}>
                                        <Text style={RechargeStoredCardStyles.cardPwdTitle}>会员密码设置</Text>
                                        <View style={RechargeStoredCardStyles.cardPwdInputBox}>
                                            <Text style={RechargeStoredCardStyles.cardPwdRequired}>*</Text>
                                            <Text style={RechargeStoredCardStyles.cardPwdName}>会员密码：</Text>
                                            <TextInput
                                                editable={false}
                                                keyboardType={'phone-pad'}
                                                style={RechargeStoredCardStyles.cardPwdValue}
                                                placeholder={'请输入会员密码'}
                                                placeholderTextColor={'#8e8e8e'}
                                                value={password && password.length > 0 ? '******':''}
                                                onPressIn={()=>{
                                                    onShowSimKeyboard('general')
                                                }}
                                                maxLength={6}/>
                                        </View>
                                        <View style={RechargeStoredCardStyles.cardPwdInputBox}>
                                            <Text style={RechargeStoredCardStyles.cardPwdRequired}>*</Text>
                                            <Text style={RechargeStoredCardStyles.cardPwdName}>确认密码：</Text>
                                            <TextInput
                                                editable={false}
                                                keyboardType={'phone-pad'}
                                                style={RechargeStoredCardStyles.cardPwdValue}
                                                placeholder={'请再次输入会员密码'}
                                                placeholderTextColor={'#8e8e8e'}
                                                value={confirmPassWord && confirmPassWord.length > 0 ? '******':''}
                                                onPressIn={()=>{
                                                    onShowSimKeyboard('confirm')
                                                }}
                                                maxLength={6}/>
                                        </View>
                                        {
                                            enableCheckSms && portrait && portrait.phone && (
                                                <View style={RechargeStoredCardStyles.cardPwdInputBox}>
                                                    <Text style={RechargeStoredCardStyles.cardPwdRequired}>*</Text>
                                                    <Text style={RechargeStoredCardStyles.cardPwdName}>手&ensp;机&ensp;号：</Text>
                                                    <TextInput
                                                        editable={false}
                                                        style={RechargeStoredCardStyles.cardPhoneValue}
                                                        value={portrait.phone}/>
                                                </View>
                                            )
                                        }
                                        {
                                            enableCheckSms && portrait && portrait.phone && (
                                                <View style={RechargeStoredCardStyles.cardPwdInputBox}>
                                                    <Text style={RechargeStoredCardStyles.cardPwdRequired}>*</Text>
                                                    <Text style={RechargeStoredCardStyles.cardPwdName}>验&ensp;证&ensp;码：</Text>
                                                    <TextInput
                                                        editable={true}
                                                        keyboardType={'numeric'}
                                                        style={RechargeStoredCardStyles.cardPwdValue}
                                                        placeholder={'请入验证码'}
                                                        placeholderTextColor={'#8e8e8e'}
                                                        value={smsCode}
                                                        onChangeText={value=> {changeSmsCode(value)}}
                                                        maxLength={6}/>
                                                    <TouchableOpacity
                                                        style={RechargeStoredCardStyles.cardSMSBtn}
                                                        onPress={()=>{
                                                            if(smsType == '0') {
                                                                this.getSmsCode()
                                                            }
                                                        }}>
                                                        <Text style={smsType == '0' ? RechargeStoredCardStyles.cardSMSTxt:RechargeStoredCardStyles.cardSMSTxtDisable}>
                                                            {smsTips}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </View>
            )
        }else{
            return (
                <View style={RechargeStoredCardStyles.openCardBox}>
                    <View style={RechargeStoredCardStyles.cardOperateNoneBox}>
                        <View>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/buy-card.png')}
                                   style={RechargeStoredCardStyles.cardOperateNoneImg}
                                   resizeMode={'contain'}
                            />
                            <Text style={RechargeStoredCardStyles.cardOperateNoneT}>请选择您要购买的会员卡</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
}
