import React, {PureComponent} from 'react';
import {Text, View, TouchableHighlight, TouchableOpacity, Image, Platform, ImageBackground} from 'react-native';
import {pendingStyles, manageConsumablesStyle} from '../../styles';

import {Icon, CheckBox} from 'react-native-elements';
import moment from 'moment';
import locale from 'moment/locale/zh-cn';

export class PendingOrderItem extends PureComponent {
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
        } = this.props;

        const formatCreateTime = moment(createTime).format('MMM Do H:mm');
        const formatPayEndTime = moment(payEndTime).format('MMM Do H:mm');
        const showKeyNumber = keyNumber.length > 0;

        return (
            <TouchableOpacity style={pendingStyles.swiperLi} onPress={onPress}>
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
                        staffName!=undefined && (
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
