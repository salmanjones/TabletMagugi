//轮牌-单牌
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image, Animated, Text, ImageBackground } from 'react-native';
import { PlacardImg, PlacardTimer } from '../../components';

import { rotateItemStyles } from '../../styles';

class Arrows extends PureComponent {
    render() {
        const { onBack, onForward, staff, isFirst, isLast } = this.props;
        return (
            <View style={rotateItemStyles.maskbg}>
                <TouchableOpacity style={rotateItemStyles.maskbgLeftBtn} onPress={() => onBack(staff)}>
                    <Image resizeMethod="resize"
                        source={isFirst ? require('@imgPath/left-btn-un.png') : require('@imgPath/left-btn.png')}
                        style={rotateItemStyles.btnIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={rotateItemStyles.maskbgRightBtn} onPress={() => onForward(staff)}>
                    <Image resizeMethod="resize"
                        source={isLast ? require('@imgPath/right-btn-un.png') : require('@imgPath/right-btn.png')}
                        style={rotateItemStyles.btnIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

export class Placard extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rotate: new Animated.Value(0), //翻牌动画
            fade: new Animated.Value(0), //跳牌动画
        };
    }

    componentDidUpdate(prevProps, prevState) {
        let serviceStatus = this.props.serviceStatus;
        let orgServiceStatus = prevProps.serviceStatus;
        let setting = this.props.setting;

        if (setting.type !== '1' && serviceStatus !== null && orgServiceStatus !== null && serviceStatus + orgServiceStatus === 1) {
            this.rotate();
        }
    }

    rotate = () => {
        //翻牌动画 - 左右翻转
        this.state.rotate.setValue(0);
        Animated.timing(this.state.rotate, {
            toValue: 1, //属性目标值
            duration: 800, //动画执行时间
        }).start(); //执行动画
    };
    fade = () => {
        //跳牌动画 - 淡入淡出
        Animated.timing(this.state.fade, {
            toValue: 1, //属性目标值
            duration: 2500, //动画执行时间
        }).start(); //执行动画
    };

    render() {
        const { staff, serviceStatus, setting, sortting, onForward, onBack, isFirst, isLast } = this.props;
        const { rotate, fade } = this.state;
		const vm = this.getViewModel(staff, setting);
        return (
            <Animated.View
                style={[
                    rotateItemStyles.rotate,
                    {
                        transform: [
                            //翻牌动画
                            {
                                rotateY: rotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'],
                                }),
                                //opacity: fade //跳牌动画
                            },
                        ],
                    },
                ]}
            >
                <ImageBackground source={vm.bgImg} style={rotateItemStyles.rotateItem}  resizeMode={'contain'}>
                    {/* <PlacardStatusBar staff={staff} setting={setting} /> */}
                    <View style={vm.status && rotateItemStyles.rotateBtmLabel}>
                        {/* <Text style={rotateItemStyles.rotateBtmLabelT}>{vm.status || ''}</Text> */}
                    </View>
                    <View style={rotateItemStyles.rotateItemCenter}>
                        <PlacardImg staffImg={staff.staffImg} orderAmt={staff.orderAmt} isRed={staff.isRed} setting={setting} />
                        <View style={rotateItemStyles.totateBtmT}>
                            <View style={rotateItemStyles.totateBtmTBox}>
                                <Text style={vm.statusTextStyle} numberOfLines={1}>
                                    {staff.staffName}
                                </Text>
                                <Text style={vm.statusTextStyle} numberOfLines={1}>
                                    {staff.staffJobNum || ''}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {vm.displayTimer &&
                    <View style={rotateItemStyles.timeBox}>
                        <Image resizeMethod="resize"  source={require('@imgPath/time.png')} style={rotateItemStyles.rotateImgTime}  resizeMode={'contain'} />
						 <PlacardTimer startTimeL={vm.startTimeL} elapse={vm.elapse} color={'white'} />
                    </View>
                    }
                    {sortting && <Arrows onBack={onBack} onForward={onForward} staff={staff} isFirst={isFirst} isLast={isLast} />}
                </ImageBackground>
            </Animated.View>
        );
    }

    getViewModel(staff, setting) {
        var vm = {
            status: '未知',
            startTimeL: new Date().getTime(),
            displayTimer: false,
            elapse: false
        };

        let isServicing = staff.serviceStatus === 1;
		vm.status = isServicing ? '服务中' : '等待中';
		vm.bgImg=isServicing ?require('@imgPath/rotate-service.png'):require('@imgPath/rotate-wait.png');
        vm.startTimeL = staff.serviceStartTimeL;
        vm.displayTimer = Boolean(staff.serviceStartTimeL) && setting.serviceTiming === '0';
        vm.elapse = vm.displayTimer;
        vm.statusBgColor = isServicing ? rotateItemStyles.rotateBtmService : rotateItemStyles.rotateBtmWait;
        vm.statusTextStyle = rotateItemStyles.rotateBtmLabelT;

        if (staff.awayStatus === 1) {
			vm.status = '临休';
			vm.bgImg=require('@imgPath/rotate-furlough.png');
            vm.startTimeL = staff.awayStartTimeL;
            vm.displayTimer = Boolean(staff.awayStartTimeL) && setting.restTiming === '0';
            vm.elapse = vm.displayTimer;
            vm.statusBgColor = rotateItemStyles.rotateBtmFurlough;
            vm.statusTextStyle = rotateItemStyles.rotateBtmLabelT;
        }

        if (staff.standStatus === 1) {
			vm.status = '迎宾';
			vm.bgImg=require('@imgPath/rotate-usher.png');
            vm.startTimeL = staff.standStartTimeL;
            vm.displayTimer = Boolean(staff.standStartTimeL) && setting.restTiming === '0';
            vm.elapse = vm.displayTimer;
            vm.statusBgColor = rotateItemStyles.rotateBtmFurlough;
            vm.statusTextStyle = rotateItemStyles.rotateBtmLabelT;
        }

        if(staff.offWork){
            vm.status = '未上班';
			vm.bgImg=require('@imgPath/rotate-absentee.png');
            vm.startTimeL = null;//staff.standStartTimeL;
            vm.displayTimer = false;
            vm.elapse = false;
            vm.statusBgColor = rotateItemStyles.rotateBtmFurlough;
            vm.statusTextStyle = rotateItemStyles.rotateBtmLabelTO;
        }

        // if (setting.type === '1') {
        // 	vm.startTimeL = staff.standStartTimeL;
        // 	vm.displayTimer=Boolean(staff.standStartTimeL);
        // 	vm.elapse = Boolean(staff.standStartTimeL);
        // }

        return vm;
    }
}
