//轮牌-单牌-底部
import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { PlacardTimer } from 'components';

import { rotateItemStyles } from '../../styles';
export class PlacardStatusBar extends PureComponent {
    render() {
        const { staff, setting } = this.props;
        const vm = this.getViewModel(staff, setting);
        let isStandingCard = setting.type === '1';
        return (
            // <View style={isStandingCard ? rotateItemStyles.rotateBtmBOther : rotateItemStyles.rotateBtmB}>

            // 	{vm.displayTimer && <PlacardTimer startTimeL={vm.startTimeL} elapse={vm.elapse} />}
            // </View>
            <View style={vm.status && rotateItemStyles.rotateBtmLabel}>
                <Text style={rotateItemStyles.rotateBtmLabelT}>{vm.status || ''}</Text>
            </View>
        );
    }

    getViewModel(staff, setting) {
        var vm = {
            status: '未知',
            startTimeL: new Date().getTime(),
            displayTimer: false,
            elapse: false,
        };

        let isServicing = staff.serviceStatus === 1;
        vm.status = isServicing ? '服务中' : '等待中';
        vm.startTimeL = staff.serviceStartTimeL;
        vm.displayTimer = Boolean(staff.serviceStartTimeL) && setting.serviceTiming === '0';
        vm.elapse = vm.displayTimer;
        vm.statusBgColor = isServicing ? rotateItemStyles.rotateBtmService : rotateItemStyles.rotateBtmWait;

        if (staff.awayStatus === 1) {
            vm.status = '临休';
            vm.startTimeL = staff.awayStartTimeL;
            vm.displayTimer = Boolean(staff.awayStartTimeL) && setting.restTiming === '0';
            vm.elapse = vm.displayTimer;
            vm.statusBgColor = rotateItemStyles.rotateBtmFurlough;
        }

        if (staff.standStatus === 1) {
            vm.status = '迎宾';
            vm.startTimeL = staff.standStartTimeL;
            vm.displayTimer = Boolean(staff.standStartTimeL) && setting.restTiming === '0';
            vm.elapse = vm.displayTimer;
            vm.statusBgColor = rotateItemStyles.rotateBtmFurlough;
        }

        // if (setting.type === '1') {
        // 	vm.startTimeL = staff.standStartTimeL;
        // 	vm.displayTimer=Boolean(staff.standStartTimeL);
        // 	vm.elapse = Boolean(staff.standStartTimeL);
        // }

        return vm;
    }
}
