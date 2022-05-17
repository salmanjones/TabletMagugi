import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity, ImageBackground } from 'react-native';
import { rotateModalStyle, rotateItemStyles } from '../../styles';
import { Button } from '../../../node_modules/react-native-elements';
import { getImage, ImageQutity, PixelUtil } from '../../utils';
import { PlacardTimer } from '../../components';
// 操作按钮
class OperateArea extends React.PureComponent {
    getViewModel(staff, setting, isAdmin) {
        let vm = {
            rotate: true,
            order: true,
            cancelOrder: true,
            away: true,
            cancelAway: true,
            red: true,
            cancelRed: true,
            last: true,
            remove: false,
            stand: true,
            serviceBtn: '',
            standBtn: '',
            awayBtn: '',
            time: '',
        };

        if (staff.serviceStatus === 1) {
            vm.serviceBtn = '等待';
            vm.away = false;
            vm.cancelAway = false;
            vm.stand = false;
        } else {
            vm.serviceBtn = '翻牌';
        }

        if (staff.awayStatus === 1) {
            vm.awayBtn = '取消临休';
            vm.rotate = false;
            vm.away = false;
            vm.stand = false;
            vm.time = staff.awayStartTimeL;
        } else {
            vm.awayBtn = '临休';
        }

        if (staff.standStatus === 1) {
            vm.standBtn = '取消迎宾';
            vm.rotate = false;
            vm.away = false;
            vm.cancelAway = false;
            vm.time = staff.standStartTimeL;
        } else {
            vm.standBtn = '迎宾';
        }

        if (setting.redCardSetting === '-1') {
            vm.red = false;
            vm.cancelRed = false;
        }

        if (isAdmin) {
            vm.remove = true;
        }

        return vm;
    }

    render() {
        const { staff, setting, onChangeStatus, isAdmin } = this.props;
        let isStandingCard = setting.type === '1';
        let content;
        let vm = this.getViewModel(staff, setting, isAdmin);
        let isTimeExists = Boolean(vm.time);
        if (isStandingCard) {
            content = (
                <View>
                    <View style={rotateModalStyle.rotateBodyRO}>
                        <PlacardTimer startTimeL={vm.time} elapse={isTimeExists} big={true} />
                    </View>
                    <View style={rotateModalStyle.rotateBodyROther}>
                        <Button
                            title={vm.standBtn}
                            borderRadius={PixelUtil.size(8)}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            fontSize={PixelUtil.size(34)}
                            titleStyle={!vm.stand ? {color:'#ccc'}: staff.standStatus === 1 ? {color:'#333'}:{color:'#1BBC93'}}
                            buttonStyle={
                                staff.standStatus === 1 ?
                                    Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f3f3f3"}):
                                    Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#E8FEF8"})
                            }

                            disabled={!vm.stand}
                            onPress={() => {
                                onChangeStatus(staff.standStatus === 1 ? 'cancelStand' : 'stand');
                            }}
                        />
                        <Button
                            title={vm.awayBtn}
                            backgroundColor={'#f0f5ff'}
                            borderRadius={PixelUtil.size(8)}
                            fontSize={PixelUtil.size(34)}
                            titleStyle={vm.away || vm.cancelAway ? {color:'#111c3c'}:{color:'#ccc'}}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f0f5ff"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.away && !vm.cancelAway}
                            onPress={() => {
                                onChangeStatus(staff.awayStatus === 1 ? 'cancelAway' : 'away');
                            }}
                        />
                    </View>
                    <View style={rotateModalStyle.rotateBodyROther}>
                        <Button
                            title={'跳牌'}
                            borderRadius={PixelUtil.size(8)}
                            fontSize={PixelUtil.size(34)}
                            titleStyle={{color:'#111c3c'}}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f0f5ff"})}
                            onPress={() => {
                                onChangeStatus('last');
                            }}
                        />
                        <Button
                            title="置顶"
                            borderRadius={PixelUtil.size(8)}
                            fontSize={PixelUtil.size(34)}
                            titleStyle={{color:'#ff2626'}}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#ffeeee"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.remove}
                            onPress={() => {
                                onChangeStatus('first');
                            }}
                        />
                    </View>
                </View>
            );
        } else {
            content = (
                <View>
                    <View style={rotateModalStyle.rotateBodyROBox}>
                        <Button
                            title={vm.serviceBtn}
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={!vm.rotate ? {color: '#ccc'} : staff.serviceStatus === 1 ? {color: '#FAA132'} : {color: '#111c3c'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={
                                staff.serviceStatus === 1 ?
                                    Object.assign({}, rotateModalStyle.rotateBodyROBtn , {backgroundColor: '#FFF4E5'}):
                                    Object.assign({}, rotateModalStyle.rotateBodyROBtn , {backgroundColor: '#f0f5ff'})
                            }
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.rotate}
                            onPress={() => {
                                onChangeStatus('rotate');
                            }}
                        />
                    </View>
                    <View style={rotateModalStyle.rotateBodyROther}>
                        <Button
                            title="点客"
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={vm.order == false ? {color: '#ccc'} : {color:'#111c3c'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f0f5ff"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.order}
                            onPress={() => {
                                onChangeStatus('order');
                            }}
                        />
                        <Button
                            title="取消点客"
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={vm.cancelOrder == false ? {color: '#ccc'} : {color:'#333'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f3f3f3"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.cancelOrder}
                            onPress={() => {
                                onChangeStatus('cancelOrder');
                            }}
                        />
                    </View>
                    <View style={rotateModalStyle.rotateBodyROther}>
                        <Button
                            title="临休"
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={vm.away == false ? {color: '#ccc'} : {color:'#111c3c'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f0f5ff"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.away}
                            onPress={() => {
                                onChangeStatus('away');
                            }}
                        />
                        <Button
                            title="取消临休"
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={vm.cancelAway == false ? {color: '#ccc'} : {color:'#333'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f3f3f3"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.cancelAway}
                            onPress={() => {
                                onChangeStatus('cancelAway');
                            }}
                        />
                    </View>
                    <View style={rotateModalStyle.rotateBodyROther}>
                        <Button
                            title="红牌"
                            backgroundColor="#f0f5ff"
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={vm.red == false ? {color: '#ccc'} : {color:'#111c3c'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f0f5ff"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.red}
                            onPress={() => {
                                onChangeStatus('red');
                            }}
                        />
                        <Button
                            title="取消红牌"
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={vm.red == false ? {color: '#ccc'} : {color:'#333'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f3f3f3"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.cancelRed}
                            onPress={() => {
                                onChangeStatus('cancelRed');
                            }}
                        />
                    </View>
                    <View style={rotateModalStyle.rotateBodyROther}>
                        <Button
                            title="跳牌"
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={{color:'#111c3c'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#f0f5ff"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.last}
                            onPress={() => {
                                onChangeStatus('last');
                            }}
                        />
                        <Button
                            title="置顶"
                            borderRadius={PixelUtil.size(8)}
                            titleStyle={{color:'#ff2626'}}
                            fontSize={PixelUtil.size(34)}
                            buttonStyle={Object.assign({}, rotateModalStyle.rotateBodyRBtn, {backgroundColor:"#ffeeee"})}
                            disabledStyle={{ backgroundColor: '#f3f3f3' }}
                            disabled={!vm.remove}
                            onPress={() => {
                                onChangeStatus('first');
                            }}
                        />
                    </View>
                </View>
            );
        }

        return content;
    }
}

// 员工信息
class StaffInfoArea extends React.PureComponent {
    getViewModel(staff, setting) {
        var vm = { status: '未知', startTimeL: new Date().getTime(), displayTimer: false };

        let isStandingCard = setting.type === '1';
        let serviceBgImg = require('@imgPath/rotate-service-mp.png');
        let waitBgImg = require('@imgPath/rotate-wait-mp.png');
        let awayBgImg = require('@imgPath/rotate-furlough-mp.png');
        let standBgImg = require('@imgPath/rotate-usher-mp.png');

        let isServicing = staff.serviceStatus === 1;
        vm.status = isServicing ? '服务中' : '等待中';
        vm.bgImg = isServicing ? serviceBgImg : waitBgImg;
        vm.startTimeL = staff.serviceStartTimeL;
        vm.statusBgColor = isServicing ? rotateItemStyles.rotateBtmService : rotateItemStyles.rotateBtmWait;

        if (staff.awayStatus === 1) {
            vm.status = '临休';
            vm.bgImg = awayBgImg;
            vm.startTimeL = staff.awayStartTimeL;
            vm.statusBgColor = rotateItemStyles.rotateBtmFurlough;
        }

        if (staff.standStatus === 1) {
            vm.status = '迎宾';
            vm.bgImg = standBgImg;
            vm.startTimeL = staff.standStartTimeL;
            //vm.statusBgColor = rotateItemStyles.rotateBtmFurlough;
        }

        if (isStandingCard) {
            // vm.status = '';
            vm.startTimeL = staff.standStartTimeL;
            vm.displayTimer = true;
        }

        return vm;
    }

    render() {
        const { staff, setting } = this.props;
        let isStandingCard = setting.type === '1';
        let vm = this.getViewModel(staff, setting);
        return (
            <ImageBackground source={vm.bgImg} style={rotateModalStyle.rotateItem}>
                <View style={rotateModalStyle.rotateBtmB}>
                    <View style={vm.status && rotateModalStyle.rotateBtmLabel}>
                        <Text style={rotateModalStyle.rotateBtmLabelT}>{vm.status}</Text>
                    </View>
                </View>
                <View style={rotateModalStyle.rotateItemImgBox}>
                    <Image resizeMethod="resize"
                        source={getImage(staff.staffImg, ImageQutity.staff, require('@imgPath/rotate-portrait.png'))}
                        style={rotateModalStyle.rotateItemImg}
                        resizeMode="cover"
                    />
                    <View style={isStandingCard ? rotateModalStyle.totateBtmTOther : rotateModalStyle.totateBtmT}>
                        <Text style={[rotateModalStyle.rotateItemText, rotateModalStyle.marginBtm15]}>{staff.staffName}</Text>
                        <Text style={rotateModalStyle.rotateItemText}>{staff.staffJobNum || ''}</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export class RotateOperateModal extends React.PureComponent {
    onCancel = () => {
        this.props.onClose();
    };

    render() {
        const { staff, setting, group, visible, onChangeStatus, isAdmin } = this.props;

        return (
            <Modal transparent={true} animationType={'fade'} onRequestClose={() => null} visible={visible}>
                <View style={rotateModalStyle.modalBackground}>
                    <View style={rotateModalStyle.rotateWrapper}>
                        <View style={rotateModalStyle.rotateTitle}>
                            <View style={rotateModalStyle.rotateTitleL}>
                                <Text style={rotateModalStyle.rotateModalText}>轮牌操作</Text>
                            </View>
                            <TouchableOpacity style={rotateModalStyle.rotateTitleImgBox} onPress={this.onCancel}>
                                <View>
                                    <Image resizeMethod="resize"  style={rotateModalStyle.rotateTitleImg} source={require('@imgPath/hide-modal.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={rotateModalStyle.rotateBody}>
                            <StaffInfoArea staff={staff} setting={setting} />
                            <OperateArea
                                staff={staff}
                                setting={setting}
                                isAdmin={isAdmin}
                                onChangeStatus={operate => {
                                    onChangeStatus(staff, group, operate);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
