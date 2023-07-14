import React from 'react';
import {Alert, Image, Text, TouchableHighlight, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {logoutAction} from '../actions';
import {homeStyles} from '../styles';
import {AppConfig, clearFetchCache} from '../utils';

export class HeaderLogout extends React.PureComponent {
    handleLogout = () => {
        const { dispatch } = this.props;
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
                        clearFetchCache()
                        AsyncStorage.setItem(AppConfig.staffRStore, null)
                        AsyncStorage.setItem(AppConfig.sessionStaffId, null)
                        AsyncStorage.removeItem(AppConfig.staffRStore)
                        AsyncStorage.removeItem(AppConfig.sessionStaffId)

                        dispatch(logoutAction())
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
