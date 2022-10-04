import React from 'react';
import {Image, ImageBackground, Modal, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {manageConsumablesStyle, memberFilingStyle} from '../../styles';
import {displayError, isPhone, isValidCardPwd, PixelUtil, showMessage,} from '../../utils';
import {fetchCreateMember, fetchMemberPasswordStat} from '../../services';
import moment from "moment";
import DatePicker from "react-native-date-picker";
import Spinner from "react-native-loading-spinner-overlay";

const initMemberStatus = {
    isCreateMemberPending: false,
    systemMemberNo: '',
    memberNo: '',
    memberError: '',
    canEditMemberNo: false,
    memberName: '',
    memberNameError: '',
    phone: '',
    phoneError: '',
    pwd: '',
    pwdError: '',
    confirmPwd: '',
    confirmPwdError: '',
    sex: 0,
    birthday: '2000-01-01',
    birthdayError: '',
    nowDate: new Date(),
    image: '',
    activeLabel: '',
    showDatePicker: false
};

export class ModalCreateMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initMemberStatus,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const {memberNo} = nextProps;
        this.setState({
            ...initMemberStatus,
            systemMemberNo: memberNo,
            memberNo: memberNo,
        });
        fetchMemberPasswordStat()
            .then((backData) => {
                if (backData.code == '6000') {
                    this.setState({isShowPwd: backData.data.memberPwdStat});
                } else {
                    this.setState({isShowPwd: false});
                }
            })
            .catch((err) => {
                requestAnimationFrame(() => {
                    this.setState({isShowPwd: false});
                    requestAnimationFrame(() => {
                        displayError(err, null, true);
                    });
                });
            });
    }

    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    };

    onConfirm(oper) {
        const {
            memberNo,
            memberName,
            phone,
            sex,
            pwd,
            confirmPwd,
            image,
            memberError,
            memberNameError,
            phoneError,
            pwdError,
            birthday,
            birthdayError,
            isShowPwd
        } = this.state;
        const {onConfirm} = this.props;
        oper = oper.oper;

        if (
            !memberNo ||
            !memberName ||
            (pwd && pwd != confirmPwd) ||
            memberError ||
            memberNameError ||
            phoneError ||
            pwdError ||
            birthdayError
        ) {
            showMessage('验证失败，请检查输入', true);
            return;
        }

        if (isShowPwd && (!pwd || !confirmPwd)) {
            showMessage('密码不能为空', true);
            return;
        }

        let that = this;
        this.setState({isCreateMemberPending: true});
        fetchCreateMember({
            memberNo: memberNo,
            memberName: memberName,
            memberPhone: phone,
            memberSex: sex + '',
            memberPWD: pwd,
            bmsImgUrl: image,
            memberBirthDay: birthday,
        })
            .then(res => {
                that.setState({
                    isCreateMemberPending: false,
                    visible: false,
                    oper: "",
                });
                if ('add' == this.props.oper) {
                    showMessage('会员建档成功');
                }
                onConfirm && onConfirm(res.data, oper);
            })
            .catch(err => {
                requestAnimationFrame(() => {
                    that.setState({
                        isCreateMemberPending: false,
                    });
                    requestAnimationFrame(() => {
                        displayError(err, null, true);
                    })
                })
            });
    };

    onEditMemberNoPress = () => {
        if (!this.state.canEditMemberNo) {
            this.setState({canEditMemberNo: true, memberNo: ''});
        } else {
            this.setState({
                canEditMemberNo: false,
                memberNo: this.state.systemMemberNo,
            });
        }
    };

    renderInput = options => {
        const {
            label,
            maxLength = 20,
            editable = true,
            secureTextEntry = false,
            keyboardType = 'default',
            onChangeText,
            value,
            error,
        } = options;
        const {activeLabel} = this.state;
        const isActive = activeLabel === label;
        return (
            <View style={memberFilingStyle.memberFilingInfoList}>
                <View style={memberFilingStyle.memberFilingInfoTr}>
                    <View style={memberFilingStyle.memberFilingInfoTdL}>
                        <Text style={memberFilingStyle.memberFilingInfoText}>
                            <Text style={memberFilingStyle.required}>
                                *
                            </Text>
                            {label}：
                        </Text>
                    </View>
                    <View style={memberFilingStyle.memberFilingInfoTdR}>
                        <ImageBackground
                            source={
                                isActive
                                    ? require('@imgPath/input-active.png')
                                    : require('@imgPath/input.png')
                            }
                            resizeMode="contain"
                            style={memberFilingStyle.memberFilingInfoInpBox}
                        >
                            <TextInput
                                maxLength={maxLength}
                                keyboardType={keyboardType}
                                secureTextEntry={secureTextEntry}
                                editable={editable}
                                style={memberFilingStyle.memberFilingInfoInp}
                                underlineColorAndroid="transparent"
                                onChangeText={onChangeText}
                                onFocus={() => {
                                    this.setState({activeLabel: label});
                                }}
                                onBlur={() => {
                                    this.setState({activeLabel: ''});
                                }}
                                value={value}
                            />
                        </ImageBackground>
                        <View style={memberFilingStyle.memberFilingErrorTip}>
                            <Text style={memberFilingStyle.memberFilingErrorTipText}>
                                {error}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    renderDate = options => {
        const {
            label,
            value,
            error,
        } = options;
        const {activeLabel} = this.state;
        const isActive = activeLabel === label;

        return (
            <View style={memberFilingStyle.memberFilingInfoList}>
                <View style={memberFilingStyle.memberFilingInfoTr}>
                    <View style={memberFilingStyle.memberFilingInfoTdL}>
                        <Text style={memberFilingStyle.memberFilingInfoText}>{label}：</Text>
                    </View>
                    <View style={memberFilingStyle.memberFilingInfoTdR}>
                        <ImageBackground
                            source={isActive ? require('@imgPath/input-active.png') : require('@imgPath/input.png')}
                            resizeMode="contain"
                            style={memberFilingStyle.memberFilingInfoInpBox}
                        >
                            <TouchableOpacity style={manageConsumablesStyle.DatepickerInpBoxJD}
                                onPress={() => {
                                    this.setState({showDatePicker: true});
                                }}
                            >
                                <Text>
                                    {this.state.birthday}
                                </Text>
                            </TouchableOpacity>

                            <DatePicker
                                modal
                                title="选择生日"
                                open={this.state.showDatePicker}
                                date={new Date(this.state.birthday)}
                                minimumDate={new Date("1900-01-01")}
                                maximumDate={new Date()}
                                format="YYYY-MM-DD"
                                mode="date"
                                locale="zh-Hans"
                                confirmText="确定"
                                cancelText="取消"
                                onConfirm={(date) => {
                                    this.setState({ birthday: moment(date).format('YYYY-MM-DD') , showDatePicker: false}, () => {});
                                }}
                                onCancel={() => {
                                    this.setState({showDatePicker: false})
                                }}
                            />
                        </ImageBackground>
                        <View style={memberFilingStyle.memberFilingErrorTip}>
                            <Text style={memberFilingStyle.memberFilingErrorTipText}>{error}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const {
            memberNo,
            memberError,
            canEditMemberNo,
            memberName,
            memberNameError,
            phone,
            phoneError,
            pwd,
            pwdError,
            confirmPwd,
            confirmPwdError,
            sex,
            birthday,
            birthdayError,
            isCreateMemberPending,
            isShowPwd,
        } = this.state;

        const {visible, oper} = this.props;
        const loading = isCreateMemberPending;

        return (
            <Modal
                transparent={true}
                visible={visible}
                oper={oper}
                animationType={'fade'}
                onRequestClose={() => null}
            >
                <Spinner
                    visible={loading}
                    textContent={'请求中'}
                    textStyle={{
                        color: '#FFF'
                    }}
                />
                {visible && (
                    <View style={memberFilingStyle.modalBackground}>
                        <View style={memberFilingStyle.cashierBillInfoWrapper}>
                            <View style={memberFilingStyle.MemberQueryTitle}>
                                <Text style={memberFilingStyle.MemberQueryTitleText}>
                                    会员建档
                                </Text>
                            </View>
                            <View style={memberFilingStyle.billInfoBox}>
                                <View style={memberFilingStyle.memberFiling}>
                                    <View style={memberFilingStyle.memberFilingImg}>
                                        <View style={memberFilingStyle.memberPortraitBox}>
                                            <Image resizeMethod="resize"
                                                   source={require('@imgPath/rotate-portrait.png')}
                                                   style={[memberFilingStyle.memberPortrait, {resizeMode: 'contain'}]}
                                            />
                                        </View>
                                        {/* <TouchableOpacity
                      onPress={this.onTakePhoto}
                      style={memberFilingStyle.memberPortraitOperate}
                    >
                      <Text style={memberFilingStyle.memberPortraitOperateText}>
                        拍照
                      </Text>
                    </TouchableOpacity> */}
                                    </View>
                                    <View style={memberFilingStyle.memberFilingInfo}>


                                        {this.renderInput({
                                            label: '会员号',
                                            onChangeText: text => {
                                                const errorMsg = text ? '' : '会员号不能为空';
                                                this.setState({
                                                    memberNo: text,
                                                    memberError: errorMsg,
                                                });
                                            },
                                            value: memberNo,
                                            error: memberError,
                                            editable: canEditMemberNo,
                                        })}
                                        <TouchableOpacity
                                            style={memberFilingStyle.memberFilingInfoChange}
                                            onPress={this.onEditMemberNoPress}
                                        >
                                            <ImageBackground
                                                source={require('@imgPath/btn-border.png')}
                                                resizeMode="contain"
                                                style={memberFilingStyle.memberFilingInfoChangeImg}
                                            >
                                                <Text
                                                    style={memberFilingStyle.memberFilingInfoChangeText}
                                                >
                                                    {!canEditMemberNo ? '修改' : '取消'}
                                                </Text>
                                            </ImageBackground>
                                        </TouchableOpacity>


                                        {this.renderInput({
                                            label: '持卡人',
                                            onChangeText: text => {
                                                const errorMsg = text ? '' : '会员名称不能为空';
                                                this.setState({
                                                    memberName: text,
                                                    memberNameError: errorMsg,
                                                });
                                            },
                                            value: memberName,
                                            error: memberNameError,
                                        })}


                                        {this.renderInput({
                                            label: '手机号',
                                            keyboardType: 'numeric',
                                            maxLength: 11,
                                            onChangeText: text => {
                                                const errorMsg = isPhone(text)
                                                    ? ''
                                                    : '手机号格式不正确';
                                                this.setState({
                                                    phone: text,
                                                    phoneError: errorMsg,
                                                });
                                            },
                                            value: phone,
                                            error: phoneError,
                                        })}


                                        {isShowPwd && this.renderInput({
                                            label: '支付密码',
                                            secureTextEntry: true,
                                            maxLength: 6,
                                            onChangeText: text => {
                                                let errorMsg, confirmPwdError;
                                                if (text && !isValidCardPwd(text)) {
                                                    errorMsg = '密码为6位数字';
                                                } else if (confirmPwd && text != confirmPwd) {
                                                    confirmPwdError = '两次密码输入不一致';
                                                }
                                                this.setState({
                                                    pwd: text,
                                                    pwdError: errorMsg,
                                                    confirmPwdError: confirmPwdError,
                                                });
                                            },
                                            value: pwd,
                                            error: pwdError,
                                        })}


                                        {isShowPwd && this.renderInput({
                                            label: '确认密码',
                                            maxLength: 6,
                                            secureTextEntry: true,
                                            onChangeText: text => {
                                                let errorMsg;
                                                if (text && !isValidCardPwd(text)) {
                                                    errorMsg = '密码为6位数字';
                                                } else if (text != pwd) {
                                                    errorMsg = '两次密码输入不一致';
                                                }
                                                this.setState({
                                                    confirmPwd: text,
                                                    confirmPwdError: errorMsg,
                                                });
                                            },
                                            value: confirmPwd,
                                            error: confirmPwdError,
                                        })}


                                        {this.renderDate({
                                            label: '生日',
                                            value: birthday,
                                            error: birthdayError,
                                        })}

                                        <View style={memberFilingStyle.memberFilingInfoSexTr}>
                                            <View style={memberFilingStyle.memberFilingInfoTdL}>
                                                <Text style={memberFilingStyle.memberFilingInfoText}>
                                                    性别：
                                                </Text>
                                            </View>
                                            <View style={memberFilingStyle.memberFilingInfoSexTdR}>
                                                <CheckBox
                                                    center
                                                    iconType='materialdesignicons'
                                                    checkedIcon="radio-button-checked"
                                                    uncheckedIcon="radio-button-unchecked"
                                                    checked={sex === 0}
                                                    onPress={() => this.setState({sex: 0})}
                                                    size={PixelUtil.size(52)}
                                                    containerStyle={memberFilingStyle.checkBoxContainer}
                                                    textStyle={memberFilingStyle.checkBoxText}
                                                    checkedColor={'#111c3c'}
                                                    title="女"
                                                />
                                                <CheckBox
                                                    center
                                                    iconType='materialdesignicons'
                                                    checkedIcon="radio-button-checked"
                                                    uncheckedIcon="radio-button-unchecked"
                                                    checked={sex === 1}
                                                    onPress={() => this.setState({sex: 1})}
                                                    size={PixelUtil.size(52)}
                                                    containerStyle={memberFilingStyle.checkBoxContainer}
                                                    textStyle={memberFilingStyle.checkBoxText}
                                                    checkedColor={'#111c3c'}
                                                    title="男"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={memberFilingStyle.MemberQueryBtnBox}>
                                <TouchableOpacity
                                    style={memberFilingStyle.MemberQueryCancelBtn}
                                    onPress={this.onCancel}
                                >
                                    <Text style={memberFilingStyle.MemberQueryCancelText}>
                                        取消
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={memberFilingStyle.MemberQueryConfirmBtn}
                                    onPress={this.onConfirm.bind(this, {oper})}
                                >
                                    <Text style={memberFilingStyle.MemberQueryConfirmText}>
                                        确定
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Modal>
        );
    }
}
