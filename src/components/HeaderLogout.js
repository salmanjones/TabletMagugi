import React from 'react';
import {Alert, AsyncStorage, Image, Text, TouchableHighlight, View,} from 'react-native';

import {logoutAction} from '../actions';
import {homeStyles} from '../styles';
import {AppConfig, clearFetchCache} from '../utils';

export class HeaderLogout extends React.PureComponent {
    handleLogout = () => {
        debugger

        Alert.alert(
            null,
            '您确定要注销吗?',
            [
                {
                    text: '取消',
                    style: 'cancel',
                },
                {
                    text: '确定',
                    onPress: () => {
                        clearFetchCache();
                        AsyncStorage.removeItem(AppConfig.sessionStaffId);
                        navigation.dispatch(logoutAction());
                    },
                },
            ],
            {
                cancelable: false,
            }
        );
    };

    render() {
        return (
            <TouchableHighlight
                onPress={this.handleLogout}
                underlayColor="transparent">
                <View style={homeStyles.logoutWrapper}>
                    <Image resizeMethod="resize"
                           source={require('@imgPath/shut.png')}
                           style={homeStyles.logout}
                    />
                    <Text style={homeStyles.logoutText}>注销</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
