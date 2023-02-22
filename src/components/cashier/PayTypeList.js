import React, { PureComponent } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { multiplyPayStyle } from '../../styles';
import { CheckBox } from 'react-native-elements';
import Dash from 'react-native-dash';
export class PayTypeList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        return (
            <FlatList
                style={multiplyPayStyle.bodyerLeft}
                data={data}
                //extraData={this.state.toggleState}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent={this.renderDash}
                renderItem={this.renderItem}
            />
        );
    }

    renderDash = () => {
        return <Dash style={multiplyPayStyle.bodyLeftItemSplit} dashColor="#cbcbcb" dashLength={4} dashGap={4} dashThickness={1} />;
    };

    getInfo(payType, paidAmt) {

        if(!paidAmt) return '';
        switch (payType) {
            case 5:
                return '抵扣-¥' + paidAmt;
            default:
                return '支付：'+ paidAmt;
        }
    }

    renderItem = ({ item, index }) => {
        const { payType, payTypeId, paidAmt, icon, name, disable,itemAmt } = item;
        const { onSelected, onChecked ,selectedIndex} = this.props;
        let selected=index==selectedIndex;
        let checked = paidAmt!==null && paidAmt!==undefined && paidAmt != 0;
        let info = this.getInfo(payType, paidAmt);
        let amtInfo=itemAmt?'('+itemAmt+')':'';
        return (
            <TouchableOpacity
                onPress={() => {
                    disable != true && onSelected(index);
                }}
            >
                <View style={ disable == true
                            ? multiplyPayStyle.bodyLeftItemDisable
                            : selected
                            ? multiplyPayStyle.bodyLeftItemActive
                            : multiplyPayStyle.bodyLeftItem
                    }
                >
                    <View style={multiplyPayStyle.bodyLeftItemContent}>
                        <View style={multiplyPayStyle.bodyLeftItemLeft}>
                            <CheckBox
                                iconType="materialdesignicons"
                                checkedIcon="check-box"
                                uncheckedIcon="check-box-outline-blank"
                                containerStyle={multiplyPayStyle.itemLeftCheckBox}
                                checkedColor={'#86a2f1'}
                                uncheckedColor={'#979797'}
                                checked={checked}
                                onPress={() => {
                                    disable != true && onChecked(index);
                                }}
                            />
                            <View style={multiplyPayStyle.itemLeftImgTitle}>
                                {icon && <Image style={multiplyPayStyle.itemLeftImg} resizeMethod="resize" source={icon}></Image>}
                                <Text style={multiplyPayStyle.itemLeftTitle}>{name + amtInfo}</Text>
                            </View>
                        </View>
                        <View style={multiplyPayStyle.bodyLeftItemRight}>
                            <Text style={multiplyPayStyle.itemRightTxt}>{info}</Text>
                            <Image
                                style={multiplyPayStyle.itemRightImgArrow}
                                resizeMethod="resize"
                                resizeMode={'contain'}
                                source={require('@imgPath/pay-multiply-arrow.png')}
                            ></Image>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
}
