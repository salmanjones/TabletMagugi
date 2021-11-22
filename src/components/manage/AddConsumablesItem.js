//libs
import React from 'react';
import { connect } from 'react-redux';
import { Text, View, ImageBackground, TouchableOpacity, Image, TextInput, Modal} from 'react-native';
import { SimulateKeyboard, ModalLoadingIndicator} from 'components';
//self
import { amendItemInfoStyle,manageConsumablesStyle} from 'styles';

export class AddConsumablesItem extends React.Component {


    render() {

        return (

            // <View style={amendItemInfoStyle.bodybox}>
                <View style={manageConsumablesStyle.bodyContent}>
                    <View style={amendItemInfoStyle.iteminfoBox}>
                        <Text style={amendItemInfoStyle.AmendCardItemNameText} numberOfLines={1} ellipsizeMode={'tail'}> 
                            消耗：消耗品名称
                        </Text>
                        <View style={amendItemInfoStyle.AmendCardItemPrice}>
                            <Text style={amendItemInfoStyle.AmendCardItemPriceText}>规格：</Text>
                            <View style={manageConsumablesStyle.unitBox}>
                                <TouchableOpacity style={manageConsumablesStyle.unitItemActive}>
                                    <Text style={manageConsumablesStyle.unitItemText}>克</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={manageConsumablesStyle.unitItem}>
                                    <Text style={manageConsumablesStyle.unitItemText}>盒</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={manageConsumablesStyle.AmendCardItemCount}>
                            <Text style={amendItemInfoStyle.AmendCardItemCountText}>
                            数量：                            
                            </Text>
                            <View style={manageConsumablesStyle.AmendCardItemCountTextBox}>
                                <View style={manageConsumablesStyle.AmendCardItemCountTextInp}>
                                    <Text style={amendItemInfoStyle.AmendCardItemCountT}>0</Text>   
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={manageConsumablesStyle.AmendCardItemKeyboard}>
                        <SimulateKeyboard  />
                    </View>
                    <View style={manageConsumablesStyle.bodyBottom}>
                        <TouchableOpacity style={manageConsumablesStyle.bodyCanelBtn}>
                            <Text style={amendItemInfoStyle.bodyCanelBtnText}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={manageConsumablesStyle.bodyConfirmBtn}>
                            <Text style={amendItemInfoStyle.bodyConfirmText}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
               
            // </View>
                             
        )
    }
}
