import React, { PureComponent } from 'react';
import { Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native';
import { cashierBillingStyle,  manageConsumablesStyle} from 'styles';

export class StaffEditWidget extends PureComponent {
    render(){
        const {data,onDelete}=this.props;
        return data && data.id ? (
            <View style={manageConsumablesStyle.consumeServicerSingle}>
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
            <View style={manageConsumablesStyle.consumeServicerTips}>
                <Text style={cashierBillingStyle.chooseItemNoneText}>
                    请选择服务人
                </Text>
            </View>
        )
    }
}
