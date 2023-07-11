import React from 'react';
import {
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import {RechargeStoredCardStyles, cashierBillingStyle} from '../styles';
import {getImage, ImageQutity} from '../utils';

const defaultImg = 'https://pic.magugi.com/rotate-portrait.png';
const addImgBtn = require('@imgPath/add.png');

export class StaffServiceBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: null,
        };
    }

    onSelected = ({index}) => {
        this.props.onSelected(index);
        this.setState({currentIndex: index});
    };

    render() {
        const {data = [], onSelected} = this.props;
        return (
            <View style={RechargeStoredCardStyles.openCardServicerInfo}>
                <View style={RechargeStoredCardStyles.cardServicerTitle}>
                    <Text style={RechargeStoredCardStyles.cardServicerTitleItem}>
                        服务人1
                    </Text>
                    <Text style={RechargeStoredCardStyles.cardServicerTitleItem}>
                        服务人2
                    </Text>
                    <Text style={RechargeStoredCardStyles.cardServicerTitleItem}>
                        服务人3
                    </Text>
                    <Text style={RechargeStoredCardStyles.cardServicerTitleItem}>
                        服务人4
                    </Text>
                </View>
                <View style={RechargeStoredCardStyles.cardServicerBox}>
                    <View style={RechargeStoredCardStyles.servicerBodyLi}>
                        <FlatList
                            horizontal={true}
                            data={data}
                            extraData={this.state.currentIndex}
                            keyExtractor={(item, index) => index}
                            renderItem={this.renderItem}
                        />
                    </View>
                </View>
            </View>
        );
    }

    renderItem = o => {
        const isSelected = o.index === this.state.currentIndex;
        return (
            <View>
                <TouchableOpacity
                    style={
                        isSelected
                            ? RechargeStoredCardStyles.servicerPersonInfoSelected
                            : RechargeStoredCardStyles.servicerPersonInfo
                    }
                    onPress={() => {
                        this.onSelected(o);
                    }}
                >
                    <View style={cashierBillingStyle.servicerPersonBox}>
                        <Image resizeMethod="resize"
                               source={
                                   o.item.id
                                       ? getImage(
                                           o.item.showImage,
                                           ImageQutity.staff,
                                           require('@imgPath/rotate-portrait.png')
                                       )
                                       : addImgBtn
                               }
                               style={
                                   o.item.id
                                       ? cashierBillingStyle.servicerPersonImg
                                       : cashierBillingStyle.addServicerPerson
                               }
                        />
                        {o.item.id && (
                            <View style={cashierBillingStyle.servicerPersonNameBox}>
                                <Text style={cashierBillingStyle.servicerPersonName}>
                                    {o.item.value}
                                </Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}
