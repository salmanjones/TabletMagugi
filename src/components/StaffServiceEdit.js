import React from 'react';
import {Image, Text, TouchableOpacity, View,} from 'react-native';
import {cashierBillingStyle, RechargeStoredCardStyles} from 'styles';

const numberBg = require('@imgPath/store-staff-No.png');
const assignBg = require('@imgPath/assign.png');
const deleteBg = require('@imgPath/delete.png');

export class StaffServiceEdit extends React.PureComponent {
    render() {
        const {
            data,
            onAssign,
            onCancel,
            onDelete,
            showAssign = true,
        } = this.props;

        return (
            <View style={RechargeStoredCardStyles.chooseItem}>
                <View style={cashierBillingStyle.designerLeftInfo}>
                    <Text style={cashierBillingStyle.designerName} numberOfLines={2}
                          ellipsizeMode={'tail'}>{data.value}</Text>
                    <View style={cashierBillingStyle.designerNumber}>
                        <Image resizeMethod="resize" source={numberBg} style={cashierBillingStyle.storeStaffImg}
                               resizeMode={'contain'}/>
                        <Text style={cashierBillingStyle.designerNumberText} numberOfLines={1}
                              ellipsizeMode={'tail'}>{data.storeStaffNo}</Text>
                    </View>
                </View>
                <View style={cashierBillingStyle.designerDuty}>
                    <Text style={cashierBillingStyle.designerDutyText}>
                        {data.position}
                    </Text>
                </View>
                {showAssign && (
                    <View style={cashierBillingStyle.designerChooseWayBox}>
                        <View style={cashierBillingStyle.designerChooseWay}>
                            <TouchableOpacity
                                style={
                                    data.isAssign
                                        ? cashierBillingStyle.designerChooseWayLi
                                        : cashierBillingStyle.designerChooseWayLiActive
                                }
                                onPress={onCancel}
                            >
                                <Text style={cashierBillingStyle.designerChooseWayText}>
                                    轮牌
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={
                                    data.isAssign
                                        ? cashierBillingStyle.designerChooseWayLiActive
                                        : cashierBillingStyle.designerChooseWayLi
                                }
                                onPress={onAssign}
                            >
                                <Text style={cashierBillingStyle.designerChooseWayText}>
                                    指定
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Image resizeMethod="resize"
                               style={cashierBillingStyle.designerAppointImg}
                               source={assignBg}
                        />
                    </View>
                )}
                <TouchableOpacity
                    style={cashierBillingStyle.designerDelete}
                    onPress={onDelete}
                >
                    <Image resizeMethod="resize"
                           source={deleteBg}
                           style={cashierBillingStyle.designerDeleteImg}
                           resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
