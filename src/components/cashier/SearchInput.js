//libs
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {cashierBillingStyle} from '../../styles';

export class SearchInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showFilterMsgBoard: props.showFilterMsgBoard,
            queryBoxActive: false
		};
    }

    componentWillReceiveProps(props) {
        this.setState({showFilterMsgBoard: props.showFilterMsgBoard});
    }

    render() {
        const {onCancel} = this.props;
        const {showFilterMsgBoard} = this.state;

        return (
            <View>
                {
                    showFilterMsgBoard == 0 &&(
                        <View style={cashierBillingStyle.queryBox}>
                            <View style={cashierBillingStyle.queryNoContent}>
                                <Image source={require('@imgPath/no-content.png')} resizeMode={'contain'} style={cashierBillingStyle.queryNoContentImg}/>
                                <Text style={cashierBillingStyle.queryNoContentTxt}>没有查询到相关结果</Text>
                                <TouchableOpacity style={cashierBillingStyle.queryCancelBtn} onPress={onCancel}>
                                    <Text style={cashierBillingStyle.queryInputTxt}>返回</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}
