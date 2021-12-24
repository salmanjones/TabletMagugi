//libs
import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {MemberIdentify} from '../../../components';
import {MemberQueryStyle} from '../../../styles';
import Toast from 'react-native-root-toast';

export class ModalMemberIndentify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const {visible} = nextProps;
        this.setState({visible});
    }

    onConfirm = () => {
        if (!this.member || !this.member.id) {
            Toast.show('请选择会员', {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
            });
            return;
        }
        this.setState({visible: false});
        this.props.onConfirm(this.member);
    };

    onCancel = () => {
        this.setState({visible: false});
        this.props.onCancel();
    };

    onMemberPress = member => {
        this.member = member;
    };

    render() {
        const {navigation} = this.props;
        const {visible} = this.state;

        return (
            <Modal
                animationType={'fade'}
                transparent={false}
                onRequestClose={() => null}
                visible={visible}
            >
                <View style={MemberQueryStyle.modalBackground}>
                    <View style={MemberQueryStyle.cashierBillInfoWrapper}>
                        <View style={MemberQueryStyle.title}>
                            <Text style={MemberQueryStyle.MemberQueryTitleText}>
                                会员查询
                            </Text>
                        </View>
                        <View style={MemberQueryStyle.body}>
                            <View style={MemberQueryStyle.MemberQueryBoxRight}>
                                <MemberIdentify
                                    navigation={navigation}
                                    showRecharge={false}
                                    showTab={false}
                                    clearData={!visible}
                                    onMemberPress={this.onMemberPress}
                                />
                            </View>
                        </View>
                        <View style={MemberQueryStyle.MemberQueryBtnBoxNew}>
                            <TouchableOpacity
                                style={MemberQueryStyle.MemberQueryCancelBtn}
                                onPress={this.onCancel}
                            >
                                <Text style={MemberQueryStyle.MemberQueryCancelText}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={MemberQueryStyle.MemberQueryConfirmBtn}
                                onPress={this.onConfirm}
                            >
                                <Text style={MemberQueryStyle.MemberQueryConfirmText}>
                                    确定
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
