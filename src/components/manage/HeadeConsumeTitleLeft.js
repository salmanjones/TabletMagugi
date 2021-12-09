import React from 'react';
import {View,Text,TouchableOpacity,Image,ImageBackground,Alert} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';

import { commonStyles } from 'styles';

class HeadeConsumeTitleLeftCpm extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render() {
        let iconShow = require('@imgPath/consumables.png');
        let broderRight = require('@imgPath/border-right.png');
        if(this.props.navigation){
            showModifyBill = this.props.navigation.state.params.showModifyBill;
            orderInfoData = this.props.navigation.state.params.orderInfoLeftData || this.props.orderInfo.orderData;
        }

        return (
            <View style={commonStyles.headOrderBox}>
                <TouchableOpacity onPress={this.props.backPage}
                    underlayColor="transparent"
                    style={commonStyles.back}
                    hitSlop={{ top: 40, left: 40, bottom: 40, right: 0 }}>
                    <Image resizeMethod="resize"  source={require('@imgPath/back.png')} style={commonStyles.back}/>
                </TouchableOpacity>
                <View style={commonStyles.headOrderInfoBox}>
                    <Image resizeMethod="resize"  source={iconShow} style={commonStyles.headOrderGenre} resizeMode={'contain'} />
                    <Image resizeMethod="resize"  source={broderRight} style={commonStyles.borderRightImg} resizeMode={'contain'}/>
                    <Text style={commonStyles.headGuestNumber}>消耗品管理</Text>
               </View>
            </View>
        );
    }
}

//mapping props
const mapStateToProps = (state) => {
    return {
        orderInfo: state.billingOrder
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        backPage: () => {
            dispatch(CommonActions.goBack());
        },
    };
};

export const HeadeConsumeTitleLeft = connect(mapStateToProps, mapDispatchToProps)(
    HeadeConsumeTitleLeftCpm
);
