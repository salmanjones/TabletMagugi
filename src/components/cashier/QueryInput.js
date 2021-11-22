//libs
import React from 'react';
import { Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import {cashierBillingStyle} from 'styles';

export class QueryInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: "",
            tips: props.tips? props.tips: "消耗编号、名称",
            queryBoxActive: false
		};
    }

    componentWillReceiveProps(props) {
        this.setState({text: props.text});
    }

    inputBgChange(type) {
        if ('in' == type) {
            this.setState((prestate, props) => {
                return {...prestate, queryBoxActive: true};
            });
        } else {
            this.setState((prestate, props) => {
                return {...prestate, queryBoxActive: false};
            });
        }
    }

    inputValueChange(value){
        this.setState({
            text:value
        });
    }

    clear(){
        this.props.onClear();
        this.setState({
            text:"",
            queryBoxActive: false
        });
    }

    onConfirm=()=>{
        this.textInput.blur();
        this.props.onConfirm(this.state.text);
    }

    render() {
        const {type , tips} = this.props;
        const {text} = this.state;

        return (
            <View style={type == 'consumable' ? cashierBillingStyle.topQueryWrap:cashierBillingStyle.topQueryCasiher}>
                <View style={type == 'consumable' ? cashierBillingStyle.topQueryBox:cashierBillingStyle.topQueryCasiherBox}>
                    <TextInput
                        ref={ref => {
                            this.textInput = ref;
                        }}
                        maxLength={30}
                        keyboardType={'default'}
                        style={this.state.queryBoxActive ? cashierBillingStyle.topQueryInputActive:cashierBillingStyle.topQueryInput}
                        underlineColorAndroid="transparent"
                        value={text}
                        placeholder={tips}
                        onChangeText={this.inputValueChange.bind(this)}
                        onFocus={this.inputBgChange.bind(this, 'in')}
                        onSubmitEditing={this.onConfirm}
                        onBlur={this.inputBgChange.bind(this, 'out')}/>
                    <TouchableOpacity style={cashierBillingStyle.queryInputClear} onPress={this.clear.bind(this)}>
                        <Image resizeMethod="resize"
                            source={this.state.queryBoxActive ?require('@imgPath/icon-clear-active.png'): require('@imgPath/icon-clear.png')}
                            style={cashierBillingStyle.queryInputIconClear}
                            resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={cashierBillingStyle.topQueryInputStart} onPress={this.onConfirm}>
                    <Image resizeMethod="resize"
                           source={require('@imgPath/icon-find-white.png')}
                           style={cashierBillingStyle.topQueryInputIconFind}
                           resizeMode={'contain'}/>
                </TouchableOpacity>
            </View>
        )
    }
}
