import React from 'react';
import { View, TextInput, TouchableOpacity, Text} from 'react-native';
import { SimulateKeyboard } from '../components';
import { commonStyles, multiplyPayStyle } from '../styles';

//混合支付页面使用虚拟键盘：含输入框，确定｜清除按钮
export class SimulateKeyboardPay extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            number: props.number ? props.number.toString() : '',
            showInput: props.showInput ? props.showInput : false,
            showCanel: props.showCanel ? props.showCanel : false,
            pageType: props.pageType ? props.pageType : 'mulPay',
            placeholder: props.placeholder ? props.placeholder : '请输入支付金额',
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ number: nextProps.number || '' });
    }

    componentDidMount() {
        if(this.props.refType == 'setPassword'){ // 设置密码
            if(this.props.showSimType == 'confirm'){ // 确认密码
                this.setState({ number: this.props.confirmPassWord || ''});
            }else{
                this.setState({ number: this.props.password || ''});
            }
        }
    }

    onBack = () => {
        if (!this.state.number.length) return;
        this.setState({ number: this.state.number.slice(0, -1) });
    };

    onClear = () => {
        this.setState({ number: '' });
        this.props.onClear && this.props.onClear();
    };

    onCanel() {
        this.props.onCanel && this.props.onCanel(this.state.number);
    }

    onConfirm = () => {
        let result=this.state.number;
        if(isNaN(result)) return;

        if(result.slice(-1)=='.')  result=result.slice(0,-1)

        this.props.onConfirm && this.props.onConfirm(result);
    };

    onPress(num) {
        let number = this.state.number || '';
        if (this.state.pageType == 'pwd') {
            if (number.length >= 6) return;
        } else {
            if (number.length > 11) return;

            if (number.length == 1 && number[0] === '0' && num !== '.') return;

            if (number.length == 1 && number.startsWith('.')) {
                number = '0.';
            }

            if (number.includes('.') && number.indexOf('.') + 2 < number.length) return;
        }
        this.setState({ number: number.toString() + num.toString() });
    }

    onPointPress = (point) => {
        if (this.state.pageType == 'pwd') return;

        this.setState((prevState, props) => {
            let number = prevState.number.toString();
            if (number.indexOf('.') != -1 || number.startsWith('.')) {
                return;
            }

            if (number == '.') {
                number = '0.';
            } else {
                number = number + '.';
            }

            return { ...prevState, number };
        });
    };

    render() {
        const {pageType} = this.props;
        const {number, placeholder } = this.state;
        let isPwd = pageType == 'pwd';
        let textContent = isPwd
            ? number.split('').map((x) => '*').join('')
            : number;
        return (
            <View style={multiplyPayStyle.payKeyBoardWrap}>
                <TextInput
                    maxLength={11}
                    keyboardType={'numeric'}
                    placeholder={placeholder}
                    style={this.state.showInput ? commonStyles.simulateKeyboardInput : commonStyles.hidden}
                    underlineColorAndroid="transparent"
                    onChangeText={(number) => this.setState({ number })}
                    value={textContent}
                    editable={!isPwd}
                />
                <SimulateKeyboard
                    pageType={this.state.pageType}
                    onPointPress={this.onPointPress.bind(this)}
                    onPress={this.onPress.bind(this)}
                    onBack={this.onBack}
                    onClear={this.onClear}
                />
                <View style={multiplyPayStyle.payKeyBoardFooter}>
                    {!this.state.showCanel && (
                        <TouchableOpacity style={multiplyPayStyle.canelBtn} onPress={this.onClear.bind(this)}>
                            <Text style={multiplyPayStyle.btnText}>清除</Text>
                        </TouchableOpacity>
                    )}
                    {this.state.showCanel && (
                        <TouchableOpacity style={multiplyPayStyle.canelBtn} onPress={this.onCanel.bind(this)}>
                            <Text style={multiplyPayStyle.btnText}>返回</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={multiplyPayStyle.confirmBtn} onPress={this.onConfirm.bind(this)}>
                        <Text style={multiplyPayStyle.btnText}>确认</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
