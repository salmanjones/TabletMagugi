import React, {PureComponent} from 'react';
import {Image, ImageBackground, Platform, Text, TouchableOpacity, View} from 'react-native';
import {manageConsumablesStyle, pendingStyles} from '../../styles';

import {CheckBox} from 'react-native-elements';
import moment from 'moment';

export class PendingOrderItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showLockTime: null
        }

        // 最大锁定时间
        this.maxLockTime = 30
        // 倒计时的id
        this.lockTimeId = null
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        // 清除倒计时
        this.clearTimer()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.processLockTime(nextProps)
    }

    processLockTime(props){
        // 清除倒计时
        this.clearTimer()

        // 开启倒计时
        const {lockState, lockStartTime} = props // lockState:1已推送，2已推送，用户取消，3已推送，超时未付 4:用户支付中  lockStartTime:代表单子锁定开始时间
        if((lockState == '1' || lockState == '4' ) && lockStartTime && lockStartTime.length > 0){
            // 倒计时开始时间
            const startTime = parseInt(lockStartTime)
            // 倒计时结束时间
            const endTime = startTime + this.maxLockTime * 60 * 1000
            // 当前最新时间
            let timeNow = new Date().getTime()
            // 计算剩余时间
            let timeDiff = endTime - timeNow
            this.lockTimeId = setInterval(()=>{ // 创建新的定时
                // 叠加定时
                timeNow = timeNow + 1000
                // 计算剩余时间
                timeDiff = endTime - timeNow

                if(timeDiff <= 0){ // 超过锁定时间，则清除倒计时
                    this.clearTimer()
                    this.setState({
                        showLockTime: null
                    })
                }else{
                    // 剩余分钟数
                    let minutes = parseInt((timeDiff /(60 * 1000)).toString())
                    if(minutes.length < 2){
                        minutes = '0' + minutes.toString()
                    }
                    let seconds = Math.floor(timeDiff / 1000 % 60, 10).toString();
                    if(seconds.length < 2){
                        seconds = '0' + seconds.toString()
                    }

                    this.setState({
                        showLockTime: minutes + ":" + seconds
                    })
                }
            }, 1000)

        }
    }

    clearTimer(){
        this.lockTimeId && clearInterval(this.lockTimeId)
    }

    render() {
        const {
            flowNumber,
            name,
            keyNumber,
            timeCount,
            phone,
            totalPrice,
            createTime,
            payEndTime,
            billingStatus,
            prickStatus,
            onPress,
            showCheckBox,
            isSelected,
            paidIn,
            staffName,
            lockState
        } = this.props;

        const formatCreateTime = moment(createTime).format('MM月DD日 HH:mm');
        const formatPayEndTime = moment(payEndTime).format('MM月DD日 HH:mm');
        const showKeyNumber = keyNumber && keyNumber.length > 0;
        const showLockTime = this.state.showLockTime

        return (
            <TouchableOpacity style={pendingStyles.swiperLi} onPress={onPress}>
                {
                    (()=>{
                        // 1已推送,倒计时中，2已推送，用户取消，3已推送，超时未付 4:用户支付中
                        if(lockState == 1){
                            return (
                                <ImageBackground style={pendingStyles.swiperLiPhoneTips} resizeMode={'contain'} source={require("@imgPath/padding-order-tips.png")}>
                                    <Text style={pendingStyles.swiperLiPhoneTipsText}>已推送{showLockTime ? ',剩余时间' + showLockTime: ''}</Text>
                                </ImageBackground>
                            )
                        }else if(lockState == 2) {
                            return (
                                <ImageBackground style={pendingStyles.swiperLiPhoneCancel} resizeMode={'contain'} source={require("@imgPath/padding-order-cancel.png")}>
                                    <Text style={pendingStyles.swiperLiPhoneTipsText}>客户已取消</Text>
                                </ImageBackground>
                            )
                        }else if(lockState == 3) {
                            return (
                                <ImageBackground style={pendingStyles.swiperLiPhoneCancel} resizeMode={'contain'} source={require("@imgPath/padding-order-cancel.png")}>
                                    <Text style={pendingStyles.swiperLiPhoneTipsText}>已超时</Text>
                                </ImageBackground>
                            )
                        }else if(lockState == 4) {
                            return (
                                <ImageBackground style={pendingStyles.swiperLiPhoneTips} resizeMode={'contain'} source={require("@imgPath/padding-order-paying.png")}>
                                    <Text style={pendingStyles.swiperLiPhoneTipsText}>支付中{showLockTime ? ',剩余时间' + showLockTime: ''}</Text>
                                </ImageBackground>
                            )
                        }
                    })()
                }
                <View
                    style={{
                        flex: 0,
                        marginTop: Platform.OS === 'ios' ? '6%' : '4%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: '12.4%',
                        marginBottom: '2%',
                    }}
                >
                    <View style={showCheckBox && pendingStyles.swiperLiTop}>
                        <Text style={showCheckBox ? pendingStyles.swiperMemo : pendingStyles.swiperMemoO}
                              numberOfLines={1}>
                            {flowNumber}
                        </Text>

                        {showCheckBox && (
                            <CheckBox
                                title=""
                                iconType="materialdesignicons"
                                checkedIcon="check-box"
                                uncheckedIcon="check-box-outline-blank"
                                containerStyle={pendingStyles.settingCheckBoxO}
                                textStyle={pendingStyles.rotateModalText}
                                checkedColor={'#111c3c'}
                                uncheckedColor={'#999'}
                                checked={isSelected}
                                onPress={onPress}
                            />
                        )}
                    </View>
                    {billingStatus == '1' && prickStatus == '1' && (
                        <Image
                            resizeMethod="resize"
                            source={require('@imgPath/suo-dan.png')}
                            resizeMode={'contain'}
                            style={manageConsumablesStyle.suoDanImg}
                        />
                    )}
                </View>

                <View style={pendingStyles.swiperInfoMemo}>
                    <View style={pendingStyles.swiperNameBox}>
                        <Text style={pendingStyles.swiperName} numberOfLines={1}>
                            {name}
                        </Text>
                    </View>
                    {
                        staffName != undefined && (
                            <View style={pendingStyles.swiperPeoPel}>
                                <ImageBackground source={require('@imgPath/people.png')} style={pendingStyles.swiperPeopel} resizeMode={'contain'}></ImageBackground>
                                <Text style={pendingStyles.swiperName0}>{staffName}</Text>
                            </View>
                        )
                    }
                </View>
                <View style={pendingStyles.swiperInfoMemo0}>
                    <Text style={pendingStyles.swiperTelphone}>{phone}</Text>
                    {showKeyNumber && (
                        <View style={pendingStyles.swiperHand}>
                            <ImageBackground source={require('@imgPath/hand.png')} style={pendingStyles.swiperHandBg}
                                             resizeMode={'contain'}>
                                <Text style={pendingStyles.swiperHandText}>{keyNumber}</Text>
                            </ImageBackground>
                        </View>
                    )}
                </View>


                <View style={pendingStyles.swiperInfo}>
                    <Text style={pendingStyles.swiperLeft}>
                        {billingStatus != '1' && '次卡待付：'} {billingStatus == '1' && '次卡支付：'}
                    </Text>
                    <Text style={[pendingStyles.swiperRight, pendingStyles.swiperPrice]} numberOfLines={1}>
                        {timeCount}
                    </Text>
                </View>
                <View style={pendingStyles.swiperInfo}>
                    <Text style={pendingStyles.swiperLeft}>
                        {billingStatus != '1' && '待付金额：'} {billingStatus == '1' && '实付金额：'}{' '}
                    </Text>
                    <Text style={[pendingStyles.swiperRight, pendingStyles.swiperPrice]} numberOfLines={1}>
                        ￥{billingStatus == '1' ? paidIn : totalPrice}
                    </Text>
                </View>
                <View style={pendingStyles.swiperInfo}>
                    <Text style={pendingStyles.swiperLeft}>
                        {billingStatus != '1' && '开单日期：'} {billingStatus == '1' && '结单日期：'}
                    </Text>
                    <Text style={[pendingStyles.swiperRight, pendingStyles.swiperDate]} numberOfLines={1}>
                        {billingStatus != '1' && <Text>{formatCreateTime}</Text>} {billingStatus == '1' &&
                        <Text>{formatPayEndTime}</Text>}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
