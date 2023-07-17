import React, {PureComponent} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';

import {ListStatus, PixelUtil} from '../utils';

export class FlatListFooter extends PureComponent {
    render() {
        const {state, itemCount, pageSize, onRefresh} = this.props;
        let footer = null;
        if (state === ListStatus.loading) {
            footer = (
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: PixelUtil.size(96),
                    }}>
                    <ActivityIndicator size="large" color="#888888"/>
                    <Text style={[{marginLeft: 7, lineHeight: PixelUtil.size(96)}]}>
                        加载中
                    </Text>
                </View>
            );
        } else if (state === 'end') {
            if (itemCount && itemCount > pageSize) {
                footer = (
                    <View
                        style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center',
                            height: PixelUtil.size(96),
                        }}>
                        <Text style={[{marginLeft: 7, lineHeight: PixelUtil.size(96)}]}>
                            无更多内容
                        </Text>
                    </View>
                );
            } else if (!itemCount) {
                footer = (
                    <View
                        style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center',
                            height: PixelUtil.size(96),
                        }}>
                        <Text style={[{marginLeft: 7, lineHeight: PixelUtil.size(96)}]}>
                            暂无内容
                        </Text>
                    </View>
                );
            }
        } else if (state === 'error') {
            footer = (
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        height: PixelUtil.size(96),
                    }}>
                    <Text style={[{marginLeft: 7, lineHeight: PixelUtil.size(96)}]}>
                        页面开小差，试试
                    </Text>
                    <TouchableOpacity
                        style={{
                            flex: 0,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center',
                            height: PixelUtil.size(50),
                            // width: PixelUtil.size(80),
                            marginTop: PixelUtil.size(23),
                            borderWidth: PixelUtil.size(2),
                            borderColor: '#111c3c',
                            borderRadius: PixelUtil.size(4),
                            marginLeft: PixelUtil.size(8),
                        }}
                        onPress={onRefresh}
                    >
                        <Text style={[{lineHeight: PixelUtil.size(50)}]}>刷新</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return footer;
    }
}
