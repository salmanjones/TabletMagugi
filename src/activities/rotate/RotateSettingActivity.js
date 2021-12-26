import React from 'react';
import {Image, Text, TouchableHighlight, View,} from 'react-native';
import {RotateSettingStyles} from '../../styles';
import {ToggleImageBackground,} from '../../components';
import {AppNavigate} from "../../navigators";

const initState = {
    rotate: false,
    staff: false,
};

export class RotateSettingActivity extends React.Component {


    constructor(props) {
        super(props);
        this.state = initState;
    }

    activeButton(field) {
        let newState = {...initState};
        newState[field] = true;
        this.setState(newState);
    }


    render() {
        return (
            <View style={RotateSettingStyles.container}>
                <View style={RotateSettingStyles.flexBox}>
                    <TouchableHighlight
                        underlayColor="white"
                        onPress={() => AppNavigate.navigate('RotateSettingIndexActivity')}
                        onPressIn={() => this.activeButton('rotate')}
                    >
                        <ToggleImageBackground
                            isActive={this.state.rotate}
                            style={RotateSettingStyles.flexLi}
                        >
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/rotate_setting.png')}
                                   style={RotateSettingStyles.imgStyle}
                                   resizeMode={'contain'}
                            />
                            <Text style={RotateSettingStyles.liText}>轮牌设置</Text>
                        </ToggleImageBackground>
                    </TouchableHighlight>

                    <TouchableHighlight
                        underlayColor="white"
                        onPress={() =>
                            AppNavigate.navigate('RotateSettingStaffActivity')
                        }
                        onPressIn={() => this.activeButton('staff')}
                    >
                        <ToggleImageBackground
                            isActive={this.state.staff}
                            style={RotateSettingStyles.flexLiNoRight}
                        >
                            <Image resizeMethod="resize"
                                   source={require('@imgPath/rotate_staff_setting.png')}
                                   style={RotateSettingStyles.imgStyle}
                                   resizeMode={'contain'}
                            />
                            <Text style={RotateSettingStyles.liText}>员工轮牌设置</Text>
                        </ToggleImageBackground>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
