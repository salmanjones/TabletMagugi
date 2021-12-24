//libs
import React from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View,} from 'react-native';
import {showMessage} from '../../utils';
import {SimulateKeyboard,} from '../../components';
import {fetchCheckFlowNumber} from '../../services';
//self
import {cashierBillInfoStyle, MemberQueryStyle} from '../../styles';

export class CashierBillInfo extends React.Component {
    constructor(props) {
        super(props);
        let customerSex = '0';
        if (props.datas.customerSex != undefined && props.datas.customerSex != '') {
            customerSex = props.datas.customerSex
        }

        this.state = {
            flowNumber: props.datas.flowNumber,
            handNumber: props.datas.handNumber,
            customerNumber: props.datas.customerNumber,
            isOldCustomer: props.datas.isOldCustomer,
            customerSex: customerSex,
            billingNo: this.props.billInfo.billingNo,

            flowNumberOnePress: true,
            handNumberOnePress: true,
            customerNumberOnePress: true,

            showTips: true,
            showCustomerChoose: false,
            showKeyboard: false,
            currentEdit: '',

            flowNumberBg: DefData.inputBg,
            handNumberBg: DefData.inputBg,
            customerNumberBg: DefData.inputBg,
            isOldCustomerBg: DefData.inputBg,
            sexNumBg: DefData.inputBg,

            newCustomerBg: DefData.newCustomerBg,
            oldCustomerBg: DefData.oldCustomerBg,

            womanSex: DefData.womanSex,
            manSex: DefData.manSex,
            showSexChoose: false,
        };
    }

    onChangeInfo(type, value) {
        let canModifyCustomerNum=this.props.canModifyCustomerNum;
        if(canModifyCustomerNum===false && type == '2'){
            return;
        }
        if (this.props.modifyNumberOnly && type !== '2') {
            return;
        }

        this.setState((prevState, props) => {
            prevState.showTips = false;
            if (type == '0' || type == '1' || type == '2') {
                prevState.showKeyboard = true;
                prevState.showCustomerChoose = false;
                prevState.showSexChoose = false;
            } else if (type == '3') {
                prevState.showCustomerChoose = true;
                prevState.showSexChoose = false;
                prevState.showKeyboard = false;
            } else if (type == '4') {
                prevState.showCustomerChoose = false;
                prevState.showSexChoose = true;
                prevState.showKeyboard = false;
            } else {
                prevState.showCustomerChoose = false;
                prevState.showSexChoose = false;
                prevState.showKeyboard = false;
            }

            if (type == '0') {
                prevState.flowNumberBg = DefData.inputBgActive;
                prevState.handNumberBg = DefData.inputBg;
                prevState.customerNumberBg = DefData.inputBg;
                prevState.isOldCustomerBg = DefData.inputBg;
                prevState.sexNumBg = DefData.inputBg;

                prevState.flowNumber = value;
            } else if (type == '1') {
                prevState.flowNumberBg = DefData.inputBg;
                prevState.handNumberBg = DefData.inputBgActive;
                prevState.customerNumberBg = DefData.inputBg;
                prevState.isOldCustomerBg = DefData.inputBg;
                prevState.sexNumBg = DefData.inputBg;

                prevState.handNumber = value;
            } else if (type == '2') {
                prevState.flowNumberBg = DefData.inputBg;
                prevState.handNumberBg = DefData.inputBg;
                prevState.customerNumberBg = DefData.inputBgActive;
                prevState.isOldCustomerBg = DefData.inputBg;
                prevState.sexNumBg = DefData.inputBg;

                prevState.customerNumber = value;
            } else if (type == '3') {
                prevState.flowNumberBg = DefData.inputBg;
                prevState.handNumberBg = DefData.inputBg;
                prevState.customerNumberBg = DefData.inputBg;
                prevState.isOldCustomerBg = DefData.inputBgActive;
                prevState.sexNumBg = DefData.inputBg;

                prevState.isOldCustomer = value;
            } else if (type == '4') {
                prevState.flowNumberBg = DefData.inputBg;
                prevState.handNumberBg = DefData.inputBg;
                prevState.customerNumberBg = DefData.inputBg;
                prevState.isOldCustomerBg = DefData.inputBg;
                prevState.sexNumBg = DefData.inputBgActive;
            }

            prevState.currentEdit = type;
            return prevState;
        });
    }

    onPress = num => {
        num = num.length < 1 ? '' : parseInt(num);
        num = num + '';
        this.setState((prevState, props) => {
            let type = prevState.currentEdit;
            if (type == '0') {
                let flowNumber = prevState.flowNumberOnePress
                    ? num
                    : prevState.flowNumber + num;
                if (flowNumber.length < 45) {
                    prevState.flowNumber = flowNumber;
                    prevState.flowNumberOnePress = false;
                }
            } else if (type == '1') {
                let handNumber = prevState.handNumberOnePress
                    ? num
                    : prevState.handNumber + num;
                if ((handNumber + '').length <= 3) {
                    prevState.handNumber = handNumber;
                    prevState.handNumberOnePress = false;
                }
            } else if (type == '2') {
                let customerNumber = prevState.customerNumberOnePress
                    ? num
                    : prevState.customerNumber + num;
                if ((customerNumber + '').length <= 3) {
                    prevState.customerNumber = customerNumber;
                    prevState.customerNumberOnePress = false;
                }
            }

            return prevState;
        });
    };

    onBack() {
        this.setState((prevState, props) => {
            let type = prevState.currentEdit;
            if (type == '0') {
                let number = prevState.flowNumber;
                number = number.slice(0, -1);
                number = number.length > 0 ? number : '';

                prevState.flowNumber = number;
            } else if (type == '1') {
                let number = prevState.handNumber;
                number = number.slice(0, -1);
                number = number.length > 0 ? number : '';

                prevState.handNumber = number;
            } else if (type == '2') {
                let number = prevState.customerNumber + '';
                number = number.slice(0, -1);
                number = number.length > 0 ? number : '';

                prevState.customerNumber = number;
            }

            return {prevState};
        });
    }

    onClear() {
        this.setState((prevState, props) => {
            let type = prevState.currentEdit;
            if (type == '0') {
                prevState.flowNumber = '';
            } else if (type == '1') {
                prevState.handNumber = '';
            } else if (type == '2') {
                prevState.customerNumber = '';
            }

            return prevState;
        });
    }

    swipCustomerType(type) {
        this.setState((prevState, props) => {
            prevState.isOldCustomer = type;

            if (type == '0') {
                //新客
                prevState.newCustomerBg = DefData.newCustomerBgActive;
                prevState.oldCustomerBg = DefData.oldCustomerBg;
            } else {
                prevState.newCustomerBg = DefData.newCustomerBg;
                prevState.oldCustomerBg = DefData.oldCustomerBgActive;
            }

            return prevState;
        });
    }

    swipSexType(type) {
        this.setState((prevState, props) => {
            prevState.customerSex = type;

            if (type == '0') {
                //女客
                prevState.womanSex = DefData.womanSexActive;
                prevState.manSex = DefData.manSex;
            } else {
                prevState.womanSex = DefData.womanSex;
                prevState.manSex = DefData.manSexActive;
            }

            return prevState;
        });
    }

    onConfirm = () => {
        let orderInfo = {
            flowNumber: this.state.flowNumber,
            handNumber: this.state.handNumber,
            customerNumber: this.state.customerNumber,
            isOldCustomer: this.state.isOldCustomer,
            customerSex: this.state.customerSex,
            billingNo: this.state.billingNo,
        };

        if (orderInfo.flowNumber.length < 1) {
            showMessage('水单号不能为空', true);
            this.setState((prevState, props) => {
                prevState.flowNumberBg = DefData.inputBgActive;
                prevState.handNumberBg = DefData.inputBg;
                prevState.customerNumberBg = DefData.inputBg;
                prevState.isOldCustomerBg = DefData.inputBg;

                return prevState;
            });
            return;
        }

        if (
            orderInfo.customerNumber.length < 1
            //||parseInt(orderInfo.customerNumber) < 1
        ) {
            orderInfo.customerNumber = '0';
            this.setState((prevSatte, props) => {
                prevSatte.customerNumber = '0';
                return prevSatte;
            });
        } else {
            orderInfo.customerNumber = parseInt(orderInfo.customerNumber) + "";
            this.setState((prevSatte, props) => {
                prevSatte.customerNumber = parseInt(orderInfo.customerNumber) + "";
                return prevSatte;
            });
        }

        if (this.props.modifyNumberOnly) {
            this.props.confirmOrderEdit && this.props.confirmOrderEdit(orderInfo);
        } else {
            this.props.billInfoLoading(true);
            let checkParams = this.props.billInfo;
            checkParams.flowNumber = this.state.flowNumber;
            fetchCheckFlowNumber(checkParams)
                .then(backData => {
                    this.props.billInfoLoading(false);

                    let checkStat = backData.data.checkStatus;
                    if (checkStat == '0') {
                        this.props.confirmOrderEdit &&
                        this.props.confirmOrderEdit(orderInfo);
                    } else {
                        showMessage('水单号已存在', true);
                    }
                })
                .catch(err => {
                    this.props.billInfoLoading(false);
                    displayError(err, '', true);
                });
        }
    };

    onCanel = () => {
        this.props.canelOrderEdit && this.props.canelOrderEdit();
    };

    render() {
        let operatorText = this.props.datas.operatorText;
        let operatorImg = require('@imgPath/bill-hairdresser.png');
        if (operatorText == '美发') {
            operatorImg = require('@imgPath/bill-hairdresser.png');
        } else if (operatorText == '美容') {
            operatorImg = require('@imgPath/bill-beautify.png');
        } else if (operatorText == '美甲') {
            operatorImg = require('@imgPath/bill-manicure.png');
        }
        let flowNumber = this.state.flowNumber;
        let handNumber = this.state.handNumber;
        let customerNumber = this.state.customerNumber;
        let isOldCustomer = this.state.isOldCustomer;
        let customerSex = this.state.customerSex;

        return (
            <View style={cashierBillInfoStyle.modalBackground}>
                <View style={cashierBillInfoStyle.cashierBillInfoWrapper}>
                    <View style={MemberQueryStyle.MemberQueryTitle}>
                        <Text style={MemberQueryStyle.MemberQueryTitleText}>单据信息</Text>
                    </View>
                    <View style={cashierBillInfoStyle.billInfoBox}>
                        <View style={cashierBillInfoStyle.leftBodyBox}>
                            <View style={cashierBillInfoStyle.leftBox}>
                                <View style={cashierBillInfoStyle.billGenre}>
                                    <View style={cashierBillInfoStyle.textBox}>
                                        <Text style={cashierBillInfoStyle.textStyle}>
                                            单据类型：
                                        </Text>
                                    </View>
                                    <View style={cashierBillInfoStyle.billGenreBox}>
                                        <Text style={cashierBillInfoStyle.billGenreName}>
                                            {operatorText}
                                        </Text>
                                        <Image resizeMethod="resize"
                                               source={operatorImg}
                                               style={cashierBillInfoStyle.billGenreImg}
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={cashierBillInfoStyle.billBox}
                                    onPress={this.onChangeInfo.bind(this, '0', flowNumber)}
                                >
                                    <ImageBackground style={cashierBillInfoStyle.textBox}>
                                        <Text style={cashierBillInfoStyle.textStyle}>水单号：</Text>
                                    </ImageBackground>
                                    <ImageBackground
                                        style={cashierBillInfoStyle.inputBox}
                                        source={this.state.flowNumberBg}
                                        resizeMode="contain"
                                    >
                                        <Text style={cashierBillInfoStyle.inpStyle}>
                                            {flowNumber}
                                        </Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={cashierBillInfoStyle.billBox}
                                    onPress={this.onChangeInfo.bind(this, '1', handNumber)}
                                >
                                    <View style={cashierBillInfoStyle.textBox}>
                                        <Text style={cashierBillInfoStyle.textStyle}>手牌号：</Text>
                                    </View>
                                    <ImageBackground
                                        style={cashierBillInfoStyle.inputBox}
                                        source={this.state.handNumberBg}
                                        resizeMode="contain"
                                    >
                                        <Text style={cashierBillInfoStyle.inpStyle}>
                                            {handNumber}
                                        </Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={cashierBillInfoStyle.billBox}
                                    onPress={this.onChangeInfo.bind(this, '2', customerNumber)}
                                >
                                    <View style={cashierBillInfoStyle.textBox}>
                                        <Text style={cashierBillInfoStyle.textStyle}>客数：</Text>
                                    </View>
                                    <ImageBackground
                                        style={cashierBillInfoStyle.inputBox}
                                        source={this.state.customerNumberBg}
                                        resizeMode="contain"
                                    >
                                        <Text style={cashierBillInfoStyle.inpStyle}>
                                            {customerNumber}
                                        </Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={cashierBillInfoStyle.billBox}
                                    onPress={this.onChangeInfo.bind(this, '3', isOldCustomer)}
                                >
                                    <View style={cashierBillInfoStyle.textBox}>
                                        <Text style={cashierBillInfoStyle.textStyle}>
                                            门店新老客：
                                        </Text>
                                    </View>
                                    <ImageBackground
                                        style={cashierBillInfoStyle.inputBox}
                                        source={this.state.isOldCustomerBg}
                                        resizeMode="contain"
                                    >
                                        <Text style={cashierBillInfoStyle.inpStyle}>
                                            {isOldCustomer == '0' ? '新客' : '老客'}
                                        </Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={cashierBillInfoStyle.billBox}
                                    onPress={this.onChangeInfo.bind(this, '4', customerSex)}
                                >
                                    <View style={cashierBillInfoStyle.textBox}>
                                        <Text style={cashierBillInfoStyle.textStyle}>
                                            顾客性别：
                                        </Text>
                                    </View>
                                    <ImageBackground
                                        style={cashierBillInfoStyle.inputBox}
                                        source={this.state.sexNumBg}
                                        resizeMode="contain"
                                    >
                                        <Text style={cashierBillInfoStyle.inpStyle}>
                                            {customerSex == '0' ? '女客' : '男客'}
                                        </Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={cashierBillInfoStyle.rightBodyBox}>
                            <View style={cashierBillInfoStyle.rightBox}>
                                <Text
                                    style={
                                        this.state.showTips
                                            ? cashierBillInfoStyle.noneContent
                                            : cashierBillInfoStyle.hidden
                                    }
                                >
                                    您可以点击左侧的信息框编辑相应的单据信息
                                </Text>
                                <View
                                    style={
                                        this.state.showCustomerChoose
                                            ? cashierBillInfoStyle.chooseGuestType
                                            : cashierBillInfoStyle.hidden
                                    }
                                >
                                    <TouchableOpacity
                                        onPress={this.swipCustomerType.bind(this, '0')}
                                    >
                                        <Image resizeMethod="resize"
                                               source={this.state.newCustomerBg}
                                               style={cashierBillInfoStyle.guestTypeImg}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this.swipCustomerType.bind(this, '1')}
                                    >
                                        <Image resizeMethod="resize"
                                               source={this.state.oldCustomerBg}
                                               style={cashierBillInfoStyle.guestTypeImg}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={
                                        this.state.showSexChoose
                                            ? cashierBillInfoStyle.chooseSexType
                                            : cashierBillInfoStyle.hidden
                                    }
                                >
                                    <TouchableOpacity
                                        onPress={this.swipSexType.bind(this, '0')}
                                    >
                                        <Image resizeMethod="resize"
                                               source={this.state.womanSex}
                                               style={cashierBillInfoStyle.sexTypeImgRight}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this.swipSexType.bind(this, '1')}
                                    >
                                        <Image resizeMethod="resize"
                                               source={this.state.manSex}
                                               style={cashierBillInfoStyle.sexTypeImg}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {this.state.showKeyboard ? (
                                    <SimulateKeyboard
                                        onPress={this.onPress.bind(this)}
                                        onBack={this.onBack.bind(this)}
                                        onClear={this.onClear.bind(this)}
                                    />
                                ) : null}
                            </View>
                        </View>
                    </View>
                    <View style={MemberQueryStyle.MemberQueryBtnBox}>
                        <TouchableOpacity
                            style={MemberQueryStyle.MemberQueryCancelBtn}
                            onPress={this.onCanel.bind(this)}
                        >
                            <Text style={MemberQueryStyle.MemberQueryCancelText}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={MemberQueryStyle.MemberQueryConfirmBtn}
                            onPress={this.onConfirm}
                        >
                            <Text style={MemberQueryStyle.MemberQueryConfirmText}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const DefData = {
    inputBg: require('@imgPath/input.png'),
    inputBgActive: require('@imgPath/input-active.png'),
    newCustomerBg: require('@imgPath/store-new.png'),
    newCustomerBgActive: require('@imgPath/store-new-active.png'),
    oldCustomerBg: require('@imgPath/store-old.png'),
    oldCustomerBgActive: require('@imgPath/store-old-active.png'),

    womanSex: require('@imgPath/rotate_woman.png'),
    womanSexActive: require('@imgPath/rotate_woman_active.png'),
    manSex: require('@imgPath/rotate_man.png'),
    manSexActive: require('@imgPath/rotate_man_active.png'),
};
