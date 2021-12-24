import React, {PureComponent} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {cashierBillingStyle} from '../../styles';

export class StaffEditBar extends PureComponent {

    render(){
        const {data,onDelete}=this.props;
        return data && data.id ? (

            <View style={cashierBillingStyle.chooseItemXH}>
                <View style={cashierBillingStyle.designerLeftInfo}>
                    <Text style={cashierBillingStyle.designerName} numberOfLines={2} ellipsizeMode={'tail'}>{data.value}</Text>
                    <View style={cashierBillingStyle.designerNumber}>
                        <Image resizeMethod="resize"  source={require('@imgPath/store-staff-No.png')} style={cashierBillingStyle.storeStaffImg}  resizeMode={'contain'}/>
                        <Text style={cashierBillingStyle.designerNumberText} numberOfLines={1} ellipsizeMode={'tail'}>{data.storeStaffNo}</Text>
                    </View>
                </View>
                <View style={cashierBillingStyle.designerDuty}>
                    <Text style={cashierBillingStyle.designerDutyText}>
                        {data.position}
                    </Text>
                </View>

                <TouchableOpacity style={cashierBillingStyle.designerDelete}
                    onPress={onDelete}>
                    <Image resizeMethod="resize"  source={require('@imgPath/delete.png')} style={cashierBillingStyle.designerDeleteImg}  resizeMode={'contain'}/>
                </TouchableOpacity>
            </View>



        ) : (
            <View style={cashierBillingStyle.chooseItemNone}>
                <Text style={cashierBillingStyle.chooseItemNoneText}>
                    请选择服务人
                </Text>
            </View>
        )
    }
}
