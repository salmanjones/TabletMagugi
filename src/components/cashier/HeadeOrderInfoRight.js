import React from 'react';
import {Image, Text, TouchableHighlight, TouchableOpacity, View,} from 'react-native';

import {commonStyles} from '../../styles';
import {AppNavigate} from "../../navigators";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class HeadeOrderInfoRight extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            routed: undefined
        }
    }

    onSaleCard = () => {
        let {router} = this.props
        AppNavigate.navigate('VipcardActivity', {
            type: 'vip',
            member: router.params.memberInfo,
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        AsyncStorage.getItem("queryMemberInfo").then((args) => {
            if(args !== null && args !== undefined) {
                let memberInfo = JSON.parse(args)
                this.setState((prevState, props) => {
                    return {
                        routed: memberInfo.route,
                        navi: memberInfo.navigation
                    };
                });
            }
        })
    }

    render() {
        let router = this.props.router
        let routed = this.state.routed
        if(routed){
            router.params = Object.assign({}, router.params, routed.params)
        }
        let showMemberInfo = router.params.showMemberIcon;
        let currMemberInfo = router.params.memberInfo;
        let iconType = (this.props.from || '') == 'recharge' ? '0' : '1';
        let ShowCmpt;

        if (showMemberInfo) {
            ShowCmpt = () => (
                <View style={commonStyles.HeadClientBox}>
                    <TouchableHighlight
                        // onPress={router.params.showRightCardPanel}
                        underlayColor="transparent"
                        style={
                            showMemberInfo
                                ? commonStyles.HeadClientImgBox
                                : commonStyles.hidden
                        }
                    >
                        <View style={commonStyles.HeadClientImgBox}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/rotate-portrait.png')}
                                   style={commonStyles.HeadClientImg}
                                   resizeMode={'contain'}
                            />
                        </View>
                    </TouchableHighlight>
                    {/* <TouchableOpacity style={commonStyles.HeadClientOtherInfo}
            onPress={(iconType!=='recharge'&&prevPage!='pendingOrder')? router.params.showMemberModal:null}> */}

                    <View style={commonStyles.HeadClientOtherInfo}>
                        <View style={commonStyles.HeadClientInfo}>
                            <View style={commonStyles.HeadClientOtherNameBox}>
                                <Text style={commonStyles.HeadClientOtherInfoText}
                                    numberOfLines={1} ellipsizeMode={'tail'}>
                                    {currMemberInfo.name}
                                </Text>
                                <Text style={commonStyles.HeadClientOtherInfoText}
                                    numberOfLines={1} ellipsizeMode={'tail'}>
                                    {currMemberInfo.sex == '0' ? '女' : '男'}
                                </Text>
                            </View>
                        </View>
                        <Text style={commonStyles.HeadClientOtherInfoText}>
                            {currMemberInfo.phone}
                        </Text>
                    </View>
                    {iconType == '0' ? (
                        <TouchableHighlight onPress={this.onSaleCard}>
                            <View style={commonStyles.HeadClientCardInfo}>
                                <View style={commonStyles.HeadClientCardImgBox}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/new-card.png')}
                                           style={commonStyles.HeadClientCardImg}
                                    />
                                </View>
                                <Text style={commonStyles.HeadClientOtherInfoText}>
                                    购买新卡
                                </Text>
                            </View>
                        </TouchableHighlight>
                    ) : (
                        <TouchableOpacity onPress={router.params.showRightCardPanel}>
                            <View style={commonStyles.HeadClientCardInfo}>
                                <View style={commonStyles.HeadClientCardImgBox}>
                                    <Image resizeMethod="resize"
                                           source={require('@imgPath/card.png')}
                                           style={commonStyles.HeadClientCardImg}
                                    />
                                </View>
                                <Text style={commonStyles.HeadClientOtherInfoText}>
                                    会员卡 {currMemberInfo.vipStorageCardList ? currMemberInfo.vipStorageCardList.length : '0'} 张
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {/* 预约信息 */}
                    {currMemberInfo.reserveStatus === '0' &&
                        <View style={commonStyles.appointmentInfoBox}>
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/left-dashed.png')}
                                   resizeMode={'contain'}
                                   style={commonStyles.titleLeftDashed}
                            />
                            <View style={commonStyles.appointmentInfoBoxO}>
                                <Image resizeMethod="resize"
                                       source={require('@imgPath/appointment_img.png')}
                                       resizeMode={'contain'}
                                       style={commonStyles.titleAppointmentImg}
                                />
                                <Text
                                    style={commonStyles.titleAppointmentText}>{currMemberInfo.reserveStaffName} {currMemberInfo.reserveTrueTime}</Text>
                            </View>
                        </View>
                    }
                </View>
            );
        } else {
            ShowCmpt = () => (
                <View style={commonStyles.HeadClientBox}>
                    <View style={commonStyles.HeadClientSearchContent}>
                        <TouchableOpacity
                            onPress={router.params.showMemberModal}
                            style={commonStyles.HeadClientSearchIBox}
                        >
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/discern.png')}
                                   resizeMode={'contain'}
                                   style={commonStyles.HeadClientSearchIBox}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        return <ShowCmpt/>;
    }
}
